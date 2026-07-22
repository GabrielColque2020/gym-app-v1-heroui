import prisma from "@/lib/prisma";

import { emptyToNull } from "@/features/exercises/services/exercise-form";
import { buildCoachExerciseSearchName, mapCategoryToBodyPart } from "@/features/role/coach/exercises/services/coach-exercise-form";
import type { SaveRoutineDayExercisesActionInput } from "@/features/routine/actions/routine-day-mutations";
import type { RoutineDayDetail } from "@/features/routine/services/routine-day-detail";
import { validateRoutineDayDraft, type SaveRoutineDayExerciseInput } from "@/features/routine/services/routine-day-editor";

type NormalizedRoutineDayExerciseInput = SaveRoutineDayExerciseInput;

export function normalizeRoutineDayExercises( exercises: SaveRoutineDayExerciseInput[] ): NormalizedRoutineDayExerciseInput[] {
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

async function resolveCoachExerciseIds(
	coachId: string,
	exercises: NormalizedRoutineDayExerciseInput[],
) {
	if (exercises.length === 0) {
		return exercises;
	}

	const requestedIds = exercises.map( ( exercise ) => exercise.exerciseId );
	const existingExercises = ( await prisma.exerciseCoach.findMany( {
		select: {
			id: true,
		},
		where: {
			active: true,
			id: {
				in: requestedIds,
			},
		},
	} ) ) as Array<{ id: string }>;
	const existingExerciseIds = new Set( existingExercises.map( ( exercise ) => exercise.id ) );
	const missingIds = requestedIds.filter( ( exerciseId ) => !existingExerciseIds.has( exerciseId ) );

	if (missingIds.length === 0) {
		return exercises;
	}

	const globalExercises = await prisma.exerciseGlobal.findMany( {
		select: {
			active: true,
			category: true,
			equipment: true,
			externalId: true,
			id: true,
			imageUrl: true,
			instructions: true,
			muscleGroup: true,
			name: true,
			target: true,
			videoUrl: true,
		},
		where: {
			active: true,
			id: {
				in: missingIds,
			},
		},
	} );
	const existingOverrides = ( await prisma.exerciseCoach.findMany( {
		select: {
			globalExerciseId: true,
			id: true,
		},
		where: {
			active: true,
			coachId,
			globalExerciseId: {
				in: globalExercises.map( ( exercise ) => exercise.id ),
			},
		},
	} ) ) as Array<{ globalExerciseId: string | null; id: string }>;
	const overrideIdByGlobalExerciseId = new Map(
		existingOverrides
			.filter( ( exercise ) => Boolean( exercise.globalExerciseId ) )
			.map( ( exercise ) => [ exercise.globalExerciseId as string, exercise.id ] ),
	);

	for (const globalExercise of globalExercises) {
		if (overrideIdByGlobalExerciseId.has( globalExercise.id )) {
			continue;
		}

		const override = await prisma.exerciseCoach.upsert( {
			create: {
				active: globalExercise.active,
				bodyPart: mapCategoryToBodyPart( globalExercise.category ),
				category: globalExercise.category,
				coachId,
				equipment: globalExercise.equipment,
				externalId: globalExercise.externalId,
				globalExerciseId: globalExercise.id,
				imageUrl: globalExercise.imageUrl,
				instructions: globalExercise.instructions,
				isOverride: true,
				muscleGroup: globalExercise.muscleGroup,
				name: globalExercise.name,
				searchName: buildCoachExerciseSearchName( {
					category: globalExercise.category,
					equipment: globalExercise.equipment,
					instructions: globalExercise.instructions ?? "",
					muscleGroup: globalExercise.muscleGroup,
					name: globalExercise.name,
					target: globalExercise.target,
				} ),
				target: globalExercise.target,
				tips: globalExercise.instructions,
				videoUrl: globalExercise.videoUrl,
			},
			update: {
				active: globalExercise.active,
			},
			where: {
				coachId_globalExerciseId: {
					coachId,
					globalExerciseId: globalExercise.id,
				},
			},
		} );

		overrideIdByGlobalExerciseId.set( globalExercise.id, override.id );
	}

	const resolvedExercises: NormalizedRoutineDayExerciseInput[] = exercises.map( ( exercise ) => {
		if (existingExerciseIds.has( exercise.exerciseId )) {
			return exercise;
		}

		const overrideId = overrideIdByGlobalExerciseId.get( exercise.exerciseId );

		return overrideId
			? {
				...exercise,
				exerciseId: overrideId,
			}
			: exercise;
	} );
	const resolvedExistingExercises = await prisma.exerciseCoach.findMany( {
		select: {
			id: true,
		},
		where: {
			active: true,
			id: {
				in: resolvedExercises.map( ( exercise ) => exercise.exerciseId ),
			},
		},
	} );

	if (resolvedExistingExercises.length !== exercises.length) {
		throw new Error( "Uno o mas ejercicios ya no estan disponibles en el catalogo activo." );
	}

	return resolvedExercises;
}

export async function assertRoutineCatalogExercisesAvailable(
	coachId: string,
	exercises: NormalizedRoutineDayExerciseInput[],
) {
	return resolveCoachExerciseIds( coachId, exercises );
}

export async function persistRoutineDayExercises(
	routineDay: RoutineDayDetail,
	exercises: NormalizedRoutineDayExerciseInput[],
) {
	const existingRoutineVariants = routineDay.routines
		.map( ( routine ) => ( {
			exerciseId: routine.exerciseId,
			variantExerciseIds: Array.from(
				new Set( routine.variants.map( ( variant ) => variant.variantExerciseId ) ),
			),
		} ) )
		.filter( ( routine ) => routine.exerciseId && routine.variantExerciseIds.length > 0 );

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

		if (existingRoutineVariants.length === 0) return;

		const createdRoutines = await transaction.routine.findMany( {
			select: {
				exerciseId: true,
				id: true,
			},
			where: {
				routineDayId: routineDay.id,
			},
		} );
		const routineIdByExerciseId = new Map(
			createdRoutines
				.filter( ( routine ) => Boolean( routine.exerciseId ) )
				.map( ( routine ) => [ routine.exerciseId as string, routine.id ] ),
		);
		const variantRows = existingRoutineVariants.flatMap( ( routine ) => {
			const routineId = routineIdByExerciseId.get( routine.exerciseId as string );

			if (!routineId) return [];

			return routine.variantExerciseIds.map( ( variantExerciseId ) => ( {
				routineId,
				variantExerciseId,
			} ) );
		} );

		if (variantRows.length > 0) {
			await transaction.routineExerciseVariant.createMany( {
				data: variantRows,
			} );
		}
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
