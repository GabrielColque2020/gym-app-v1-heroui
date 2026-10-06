"use server";

import prisma from "@/lib/prisma";

import { getAuthenticatedSession } from "@/features/auth/session";
import {
	buildStudentRoutineProgressRows,
	resolveStudentRoutineExercises,
} from "@/features/role/student/routine/actions/save-routine-session.utils";
import type {
	StudentRoutineProgressEntry,
	StudentRoutineSessionSaveInput,
} from "@/features/routine/services/routine-session";

type SaveStudentRoutineSessionInput = StudentRoutineSessionSaveInput & {
	// El estudiante toco "Terminar día". El guardado automatico no lo manda: cargar
	// una serie no es haber terminado.
	finalize?: boolean;
	studentId?: string | null;
};

// Lo que cambia al guardar: las series de este dia y si quedo terminado. La
// pantalla ya tiene todo lo demas (ejercicios, variantes, historial), asi que no
// se le devuelve el dia completo.
export type SavedStudentRoutineSession = {
	dayNumber: number;
	isFinalized: boolean;
	month: number;
	progressEntries: StudentRoutineProgressEntry[];
	routineDayId: string;
	week: number;
	year: number;
};

// El cliente de Prisma extendido no infiere el tipo de un `select` anidado.
type SavedDayForSave = {
	dayNumber: number;
	id: string;
	isFinalized: boolean;
	routines: Array<{
		exerciseId: string | null;
		variants: Array<{ variantExerciseId: string }>;
	}>;
	trainingRoutineWeek: {
		trainingRoutineMonth: {
			month: number;
			year: number;
		};
		week: number;
	};
};

export async function saveStudentRoutineSessionAction( {
														   exercises,
														   finalize = false,
														   routineDayId,
														   studentId,
													   }: SaveStudentRoutineSessionInput ): Promise<SavedStudentRoutineSession> {
	try {
		const session = await getAuthenticatedSession();

		if (!session) {
			throw new Error( "Debes iniciar sesión para guardar tu rutina." );
		}

		if (session.role !== "STUDENT") {
			throw new Error( "No tienes permisos para guardar esta rutina." );
		}

		const activeStudentId = studentId?.trim() || session.sub;

		if (activeStudentId !== session.sub) {
			throw new Error( "La rutina solicitada no pertenece al estudiante autenticado." );
		}

		const normalizedRoutineDayId = routineDayId.trim();

		if (!normalizedRoutineDayId) {
			throw new Error( "Seleccioná un día válido antes de guardar cambios." );
		}

		// Solo lo necesario para validar y ubicar el dia. Con el guardado automatico
		// esto corre muchas veces por sesion: leer el dia completo, con imagenes,
		// instrucciones y variantes, era la consulta mas pesada de cada guardado.
		const savedDay = await prisma.routineDay.findFirst( {
			select: {
				dayNumber: true,
				id: true,
				isFinalized: true,
				routines: {
					select: {
						exerciseId: true,
						variants: {
							select: {
								variantExerciseId: true,
							},
						},
					},
				},
				trainingRoutineWeek: {
					select: {
						trainingRoutineMonth: {
							select: {
								month: true,
								year: true,
							},
						},
						week: true,
					},
				},
			},
			where: {
				id: normalizedRoutineDayId,
				trainingRoutineWeek: {
					trainingRoutineMonth: {
						student: {
							active: true,
							id: activeStudentId,
							role: "STUDENT",
						},
					},
				},
			},
		} ) as SavedDayForSave | null;

		if (!savedDay) {
			throw new Error( "No se encontró el día de rutina seleccionado." );
		}

		const routineDay = {
			dayNumber: savedDay.dayNumber,
			id: savedDay.id,
			routines: savedDay.routines,
			trainingRoutine: {
				month: savedDay.trainingRoutineWeek.trainingRoutineMonth.month,
				week: savedDay.trainingRoutineWeek.week,
				year: savedDay.trainingRoutineWeek.trainingRoutineMonth.year,
			},
		};
		const resolvedExercises = resolveStudentRoutineExercises( routineDay, exercises );
		const progressRows = buildStudentRoutineProgressRows( routineDay, resolvedExercises, activeStudentId );

		// Se guarda aplicando solo las diferencias: borrar y recrear todo le cambiaria
		// la fecha a las series que ya estaban.
		const progressEntries = await prisma.$transaction( async ( tx ) => {
			// Bloquea el dia mientras dura el guardado, para que dos guardados a la
			// vez (dos pestañas, o el telefono y la computadora) no dupliquen series.
			await tx.$queryRaw`SELECT "id" FROM "RoutineDay" WHERE "id" = ${ routineDay.id } FOR UPDATE`;

			const existingRows = await tx.exerciseProgress.findMany( {
				orderBy: [ { date: "desc" }, { id: "desc" } ],
				where: {
					dayNumber: routineDay.dayNumber,
					month: routineDay.trainingRoutine.month,
					studentId: activeStudentId,
					week: routineDay.trainingRoutine.week,
					year: routineDay.trainingRoutine.year,
				},
			} );
			// Una serie se reconoce por su ejercicio y su numero. Si quedo repetida
			// de antes, se conserva la mas nueva.
			const existingBySet = new Map<string, ( typeof existingRows )[ number ]>();

			for (const row of existingRows) {
				const key = `${ row.exerciseId }|${ row.repsNumber }`;

				if (row.exerciseId && row.repsNumber !== null && !existingBySet.has( key )) {
					existingBySet.set( key, row );
				}
			}

			// Como quedan las series del dia. Se arma con lo que ya se leyo y lo que
			// devuelve cada escritura, sin volver a consultar al final.
			const savedRows: Array<( typeof existingRows )[ number ]> = [];
			const keptRowIds = new Set<string>();
			const rowsToCreate: typeof progressRows = [];

			for (const row of progressRows) {
				const existing = existingBySet.get( `${ row.exerciseId }|${ row.repsNumber }` );

				if (!existing) {
					rowsToCreate.push( row );
					continue;
				}

				keptRowIds.add( existing.id );

				const hasChanges = existing.notes !== row.notes
					|| existing.repsCompleted !== row.repsCompleted
					|| existing.setsCompleted !== row.setsCompleted
					|| existing.variantExerciseId !== row.variantExerciseId
					|| existing.weightUsed !== row.weightUsed;

				savedRows.push( hasChanges
					? await tx.exerciseProgress.update( {
						data: {
							notes: row.notes,
							repsCompleted: row.repsCompleted,
							setsCompleted: row.setsCompleted,
							variantExerciseId: row.variantExerciseId,
							weightUsed: row.weightUsed,
						},
						where: { id: existing.id },
					} )
					: existing );
			}

			const rowIdsToDelete = existingRows.filter( ( row ) => !keptRowIds.has( row.id ) ).map( ( row ) => row.id );

			if (rowIdsToDelete.length > 0) {
				await tx.exerciseProgress.deleteMany( { where: { id: { in: rowIdsToDelete } } } );
			}

			if (rowsToCreate.length > 0) {
				savedRows.push( ...await tx.exerciseProgress.createManyAndReturn( { data: rowsToCreate as never } ) );
			}

			if (finalize && !savedDay.isFinalized) {
				await tx.routineDay.update( {
					data: {
						isFinalized: true,
					},
					where: {
						id: routineDay.id,
					},
				} );
			}

			return savedRows;
		} );

		return {
			dayNumber: routineDay.dayNumber,
			isFinalized: savedDay.isFinalized || finalize,
			month: routineDay.trainingRoutine.month,
			progressEntries: progressEntries as unknown as StudentRoutineProgressEntry[],
			routineDayId: routineDay.id,
			week: routineDay.trainingRoutine.week,
			year: routineDay.trainingRoutine.year,
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al guardar la rutina del estudiante.";

		throw new Error( `No se pudo guardar la rutina del estudiante. ${ message }` );
	}
}
