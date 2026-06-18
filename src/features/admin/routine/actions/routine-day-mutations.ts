"use server";

import prisma from "@/lib/prisma";
import { emptyToNull } from "@/features/admin/exercises/services/exercise-form";
import { TEMP_COACH_ID } from "@/features/admin/shared/tempCoach";
import { getRoutineDayAction } from "@/features/admin/routine/actions/get-routine-day";
import { validateRoutineDayDraft, type SaveRoutineDayExerciseInput } from "@/features/admin/routine/services/routine-day-editor";

export type SaveRoutineDayExercisesActionInput = {
	exercises: SaveRoutineDayExerciseInput[];
	routineDayId: string;
	studentId?: string | null;
};

export async function saveRoutineDayExercisesAction( input: SaveRoutineDayExercisesActionInput ) {
	try {
		const routineDayId = input.routineDayId.trim();
		const studentId = input.studentId?.trim();
		const exercises = input.exercises.map( ( exercise ) => ( {
			exerciseId: exercise.exerciseId.trim(),
			observation: exercise.observation,
			order: exercise.order,
			reps: exercise.reps,
			sets: exercise.sets,
		} ) );

		if (!routineDayId) {
			throw new Error( "Selecciona un dia valido antes de guardar cambios." );
		}

		const validationError = validateRoutineDayDraft( exercises.map( ( exercise ) => ( {
			clientId: exercise.exerciseId,
			exercise: null,
			exerciseId: exercise.exerciseId,
			id: null,
			observation: exercise.observation,
			order: exercise.order,
			reps: exercise.reps,
			sets: exercise.sets,
		} ) ) );

		if (validationError) {
			throw new Error( validationError );
		}

		const routineDay = await prisma.routineDay.findFirst( {
			select: {
				id: true,
			},
			where: {
				id: routineDayId,
				trainingRoutine: {
					student: {
						active: true,
						coachId: TEMP_COACH_ID,
						id: studentId || undefined,
						role: "STUDENT",
					},
				},
			},
		} );

		if (!routineDay) {
			throw new Error( "No se encontro el dia seleccionado para guardar ejercicios." );
		}

		if (exercises.length > 0) {
			const existingExercises = await prisma.exercise.findMany( {
				select: {
					id: true,
				},
				where: {
					active: true,
					id: {
						in: exercises.map( ( exercise ) => exercise.exerciseId ),
					},
				},
			} );

			if (existingExercises.length !== exercises.length) {
				throw new Error( "Uno o mas ejercicios ya no estan disponibles en el catalogo activo." );
			}
		}

		await prisma.$transaction( async ( transaction ) => {
			await transaction.routine.deleteMany( {
				where: {
					routineDayId: routineDay.id,
				},
			} );

			if (exercises.length === 0) return;

			await transaction.routine.createMany( {
				data: exercises.map( ( exercise ) => ( {
					exerciseId: exercise.exerciseId,
					observation: emptyToNull( exercise.observation ),
					order: exercise.order,
					reps: exercise.reps.trim(),
					routineDayId: routineDay.id,
					sets: exercise.sets.trim(),
				} ) ),
			} );
		} );

		return await getRoutineDayAction( {
			routineDayId: routineDay.id,
			studentId,
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al guardar la rutina del dia.";

		throw new Error( `No se pudo guardar el dia de rutina. ${ message }` );
	}
}
