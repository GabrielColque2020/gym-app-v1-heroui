import prisma from "@/lib/prisma";

import { emptyToNull } from "@/features/exercises/services/exercise-form";
import type { SaveRoutineDayExercisesActionInput } from "@/features/routine/actions/routine-day-mutations";
import type { RoutineDayDetail } from "@/features/routine/services/routine-day-detail";
import { validateRoutineDayDraft, type SaveRoutineDayExerciseInput } from "@/features/routine/services/routine-day-editor";

type NormalizedRoutineDayExerciseInput = SaveRoutineDayExerciseInput;

export function normalizeRoutineDayExercises( exercises: SaveRoutineDayExerciseInput[] ) {
	return exercises.map( ( exercise ) => ( {
		exerciseId: exercise.exerciseId.trim(),
		observation: exercise.observation,
		order: exercise.order,
		reps: exercise.reps,
		sets: exercise.sets,
	} ) );
}

export function validateNormalizedRoutineDayExercises( exercises: NormalizedRoutineDayExerciseInput[] ) {
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
}

export async function assertRoutineCatalogExercisesAvailable(
	exercises: NormalizedRoutineDayExerciseInput[],
) {
	if (exercises.length === 0) {
		return;
	}

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

export async function persistRoutineDayExercises(
	routineDay: RoutineDayDetail,
	exercises: NormalizedRoutineDayExerciseInput[],
) {
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
}

export function normalizeRoutineDayMutationInput( input: SaveRoutineDayExercisesActionInput ) {
	return {
		coachId: input.coachId,
		exercises: normalizeRoutineDayExercises( input.exercises ),
		routineDayId: input.routineDayId.trim(),
		studentId: input.studentId?.trim(),
	};
}
