"use server";

import prisma from "@/lib/prisma";

import { getAuthenticatedSession } from "@/features/auth/session";
import { getRoutineDayAction } from "@/features/routine/actions/get-routine-day";
import { getStudentRoutineSessionAction } from "@/features/role/student/routine/actions/get-routine-session";
import {
	buildStudentRoutineProgressRows,
	resolveStudentRoutineExercises,
} from "@/features/role/student/routine/actions/save-routine-session.utils";
import type { StudentRoutineSessionSaveInput } from "@/features/routine/services/routine-session";

type SaveStudentRoutineSessionInput = StudentRoutineSessionSaveInput & {
	// El estudiante toco "Terminar día". El guardado automatico no lo manda: cargar
	// una serie no es haber terminado.
	finalize?: boolean;
	studentId?: string | null;
};

export async function saveStudentRoutineSessionAction( {
														   exercises,
														   finalize = false,
														   routineDayId,
														   studentId,
													   }: SaveStudentRoutineSessionInput ) {
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

		const routineDay = await getRoutineDayAction( {
			routineDayId: normalizedRoutineDayId,
			studentId: activeStudentId,
		} );
		const resolvedExercises = resolveStudentRoutineExercises( routineDay, exercises );
		const progressRows = buildStudentRoutineProgressRows( routineDay, resolvedExercises, activeStudentId );

		// Se guarda aplicando solo las diferencias: con el guardado automatico esto
		// corre con cada serie que el estudiante carga, y borrar y recrear todo le
		// cambiaria la fecha a las series que ya estaban.
		await prisma.$transaction( async ( tx ) => {
			// Bloquea el dia mientras dura el guardado, para que dos guardados a la
			// vez (dos pestañas, o el telefono y la computadora) no dupliquen series.
			await tx.$queryRaw`SELECT "id" FROM "RoutineDay" WHERE "id" = ${ routineDay.id } FOR UPDATE`;

			const existingRows = await tx.exerciseProgress.findMany( {
				orderBy: [ { date: "desc" }, { id: "desc" } ],
				select: {
					exerciseId: true,
					id: true,
					notes: true,
					repsCompleted: true,
					repsNumber: true,
					setsCompleted: true,
					variantExerciseId: true,
					weightUsed: true,
				},
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

				if (hasChanges) {
					await tx.exerciseProgress.update( {
						data: {
							notes: row.notes,
							repsCompleted: row.repsCompleted,
							setsCompleted: row.setsCompleted,
							variantExerciseId: row.variantExerciseId,
							weightUsed: row.weightUsed,
						},
						where: { id: existing.id },
					} );
				}
			}

			const rowIdsToDelete = existingRows.filter( ( row ) => !keptRowIds.has( row.id ) ).map( ( row ) => row.id );

			if (rowIdsToDelete.length > 0) {
				await tx.exerciseProgress.deleteMany( { where: { id: { in: rowIdsToDelete } } } );
			}

			if (rowsToCreate.length > 0) {
				await tx.exerciseProgress.createMany( { data: rowsToCreate as never } );
			}

			if (finalize) {
				await tx.routineDay.update( {
					data: {
						isFinalized: true,
					},
					where: {
						id: routineDay.id,
					},
				} );
			}
		} );

		return await getStudentRoutineSessionAction( {
			routineDayId: routineDay.id,
			studentId: activeStudentId,
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al guardar la rutina del estudiante.";

		throw new Error( `No se pudo guardar la rutina del estudiante. ${ message }` );
	}
}

