"use server";

import prisma from "@/lib/prisma";

import { getAuthenticatedSession } from "@/features/auth/session";
import { getRoutineDayAction } from "@/features/admin/routine/actions/get-routine-day";
import { getStudentRoutineSessionAction } from "@/features/student/routine/actions/get-routine-session";
import type {
	StudentRoutineSessionSaveInput,
	StudentRoutineSessionSaveSet,
} from "@/features/student/routine/services/routine-session";

type SaveStudentRoutineSessionInput = StudentRoutineSessionSaveInput & {
	studentId?: string | null;
};

function normalizeSetValue( value: number | null ) {
	return value === null ? "" : String( value );
}

function normalizeSetNotes( value: string | null ) {
	const trimmed = value?.trim() ?? "";

	return trimmed || null;
}

function validateSet( set: StudentRoutineSessionSaveSet ) {
	if (!Number.isInteger( set.setNumber ) || set.setNumber < 1) {
		throw new Error( "Hay una serie con numero invalido." );
	}

	if (set.currentReps !== null && !Number.isFinite( set.currentReps )) {
		throw new Error( "Las repeticiones de una serie no son validas." );
	}

	if (set.currentWeight !== null && !Number.isFinite( set.currentWeight )) {
		throw new Error( "El peso de una serie no es valido." );
	}
}

export async function saveStudentRoutineSessionAction( {
	exercises,
	routineDayId,
	studentId,
}: SaveStudentRoutineSessionInput ) {
	try {
		const session = await getAuthenticatedSession();

		if (!session) {
			throw new Error( "Debes iniciar sesion para guardar tu rutina." );
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
			throw new Error( "Selecciona un dia valido antes de guardar cambios." );
		}

		const routineDay = await getRoutineDayAction( {
			routineDayId: normalizedRoutineDayId,
			studentId: activeStudentId,
		} );

		const baseExerciseIds = Array.from(
			new Set(
				routineDay.routines
					.map( ( routine ) => routine.exerciseId )
					.filter( ( exerciseId ): exerciseId is string => Boolean( exerciseId ) ),
			),
		);
		const variantExerciseIds = Array.from(
			new Set(
				routineDay.routines.flatMap( ( routine ) =>
					routine.variants.map( ( variant ) => variant.variantExerciseId ),
				).filter( ( exerciseId ): exerciseId is string => Boolean( exerciseId ) ),
			),
		);
		const allowedExerciseIds = new Set( [ ...baseExerciseIds, ...variantExerciseIds ] );

		const resolvedExercises = exercises.map( ( exercise ) => {
			const routine = routineDay.routines.find( ( item ) =>
				item.exerciseId === exercise.exerciseId
				|| item.variants.some( ( variant ) => variant.variantExerciseId === exercise.exerciseId ),
			) ?? null;

			if (!routine) {
				throw new Error( "Uno o mas ejercicios no pertenecen al dia seleccionado." );
			}

			const baseExerciseId = routine.exerciseId ?? exercise.exerciseId;
			const variantExerciseId = exercise.variantExerciseId?.trim() || null;
			const legacyVariantExerciseId = !variantExerciseId && exercise.exerciseId !== baseExerciseId ? exercise.exerciseId : null;
			const selectedVariantExerciseId = variantExerciseId ?? legacyVariantExerciseId;

			if (selectedVariantExerciseId && !allowedExerciseIds.has( selectedVariantExerciseId )) {
				throw new Error( "Uno o mas ejercicios no pertenecen al dia seleccionado." );
			}

			for (const set of exercise.sets) {
				validateSet( set );
			}

			return {
				baseExerciseId,
				exercise,
				selectedVariantExerciseId,
			};
		} );

		const progressRows = resolvedExercises.flatMap( ( item ) =>
			item.exercise.sets.map( ( set ) => ( {
				dayNumber: routineDay.dayNumber,
				exerciseId: item.baseExerciseId,
				month: routineDay.trainingRoutine.month,
				notes: JSON.stringify( {
					setNumber: set.setNumber,
					notes: normalizeSetNotes( set.notes ),
				} ),
				variantExerciseId: item.selectedVariantExerciseId,
				repsCompleted: normalizeSetValue( set.currentReps ),
				setsCompleted: set.completed ? "1" : "0",
				studentId: activeStudentId,
				week: routineDay.trainingRoutine.week,
				weightUsed: normalizeSetValue( set.currentWeight ),
				year: routineDay.trainingRoutine.year,
			} ) ),
		);

		await prisma.$transaction( async ( tx ) => {
			await tx.exerciseProgress.deleteMany( {
				where: {
					dayNumber: routineDay.dayNumber,
					month: routineDay.trainingRoutine.month,
					studentId: activeStudentId,
					week: routineDay.trainingRoutine.week,
					year: routineDay.trainingRoutine.year,
					OR: [
						{
							exerciseId: {
								in: [ ...baseExerciseIds, ...variantExerciseIds ],
							},
						},
						{
							variantExerciseId: {
								in: variantExerciseIds,
							},
						},
					],
				},
			} );

			if (progressRows.length > 0) {
				await tx.exerciseProgress.createMany( {
					data: progressRows,
				} );
			}

			await tx.routineDay.update( {
				data: {
					isFinalized: true,
				},
				where: {
					id: routineDay.id,
				},
			} );
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
