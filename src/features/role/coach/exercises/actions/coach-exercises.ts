"use server";

import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { requireCoachSession } from "@/features/auth/coach-session";
import { formatBodyPart } from "@/features/exercises/services/exercise-form";
import type { BodyPartValue } from "@/features/exercises/services/exercise-form";
import { buildCoachExerciseSearchName, mapCategoryToBodyPart } from "@/features/role/coach/exercises/services/coach-exercise-form";
import type { CoachExerciseListItem } from "@/features/role/coach/exercises/types/coach-exercise-list-item";

type CoachExerciseSourceType = "coach" | "global";

type CoachExerciseMutationInput = {
	active: boolean;
	bodyPart: BodyPartValue;
	category: string;
	coachExerciseId?: string | null;
	equipment: string;
	globalExerciseId?: string | null;
	imageUrl: string;
	instructions: string;
	muscleGroup: string;
	name: string;
	sourceType: CoachExerciseSourceType;
	target: string;
	videoUrl: string;
	externalId?: string | null;
};

const globalExerciseSelect = {
	active: true,
	category: true,
	createdAt: true,
	equipment: true,
	externalId: true,
	id: true,
	imageUrl: true,
	instructions: true,
	muscleGroup: true,
	name: true,
	searchName: true,
	target: true,
	updatedAt: true,
	videoUrl: true,
} satisfies Prisma.ExerciseGlobalSelect;

const coachExerciseInclude = {
	globalExercise: {
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
			searchName: true,
			target: true,
			updatedAt: true,
			videoUrl: true,
		},
	},
} satisfies Prisma.ExerciseCoachInclude;

type GlobalExerciseListResult = Prisma.ExerciseGlobalGetPayload<{
	select: typeof globalExerciseSelect;
}>;

type CoachExerciseListResult = Prisma.ExerciseCoachGetPayload<{
	include: typeof coachExerciseInclude;
}>;

function normalizeId( value: string | null | undefined ) {
	return value?.trim() ?? "";
}

function normalizeText( value: string ) {
	return value.trim();
}

function mapGlobalExerciseToListItem( exercise: {
	active: boolean;
	category: string;
	createdAt: Date;
	equipment: string;
	externalId: string;
	id: string;
	imageUrl: string | null;
	instructions: string | null;
	muscleGroup: string;
	name: string;
	searchName: string;
	target: string;
	updatedAt: Date;
	videoUrl: string | null;
} ): CoachExerciseListItem {
	const bodyPart = mapCategoryToBodyPart( exercise.category );

	return {
		active: exercise.active,
		bodyPart,
		category: exercise.category,
		coachExerciseId: null,
		createdAt: exercise.createdAt,
		equipment: exercise.equipment,
		externalId: exercise.externalId,
		globalExerciseId: exercise.id,
		id: exercise.id,
		imageUrl: exercise.imageUrl,
		instructions: exercise.instructions,
		isOverride: false,
		muscleGroup: exercise.muscleGroup,
		name: exercise.name,
		searchName: exercise.searchName,
		sourceType: "global",
		target: exercise.target,
		tips: exercise.instructions,
		updatedAt: exercise.updatedAt,
		videoUrl: exercise.videoUrl,
	};
}

function mapCoachExerciseToListItem( exercise: {
	active: boolean;
	bodyPart: BodyPartValue;
	category: string | null;
	coachId: string | null;
	createdAt: Date;
	equipment: string | null;
	externalId: string | null;
	globalExerciseId: string | null;
	id: string;
	imageUrl: string | null;
	instructions: string | null;
	isOverride: boolean;
	muscleGroup: string | null;
	name: string;
	searchName: string | null;
	target: string | null;
	updatedAt: Date;
	videoUrl: string | null;
	globalExercise?: {
		active: boolean;
		category: string;
		externalId: string;
		equipment: string;
		id: string;
		imageUrl: string | null;
		instructions: string | null;
		muscleGroup: string;
		name: string;
		searchName: string;
		target: string;
		updatedAt: Date;
		videoUrl: string | null;
	} | null;
} ): CoachExerciseListItem {
	const resolvedCategory = exercise.category?.trim() || exercise.globalExercise?.category || formatBodyPart( exercise.bodyPart );
	const resolvedEquipment = exercise.equipment?.trim() || exercise.globalExercise?.equipment || "";
	const resolvedTarget = exercise.target?.trim() || exercise.globalExercise?.target || "";
	const resolvedMuscleGroup = exercise.muscleGroup?.trim() || exercise.globalExercise?.muscleGroup || "";
	const resolvedInstructions = exercise.instructions?.trim() || exercise.globalExercise?.instructions || "";
	const resolvedImageUrl = exercise.imageUrl?.trim() || exercise.globalExercise?.imageUrl || null;
	const resolvedVideoUrl = exercise.videoUrl?.trim() || exercise.globalExercise?.videoUrl || null;
	const resolvedExternalId = exercise.externalId?.trim() || exercise.globalExercise?.externalId || null;

	return {
		active: exercise.active,
		bodyPart: exercise.bodyPart,
		category: resolvedCategory,
		coachExerciseId: exercise.id,
		createdAt: exercise.createdAt,
		equipment: resolvedEquipment,
		externalId: resolvedExternalId,
		globalExerciseId: exercise.globalExerciseId,
		id: exercise.id,
		imageUrl: resolvedImageUrl,
		instructions: resolvedInstructions || null,
		isOverride: exercise.isOverride,
		muscleGroup: resolvedMuscleGroup,
		name: exercise.name,
		searchName: exercise.searchName ?? buildCoachExerciseSearchName( {
			category: resolvedCategory,
			equipment: resolvedEquipment,
			instructions: resolvedInstructions,
			muscleGroup: resolvedMuscleGroup,
			name: exercise.name,
			target: resolvedTarget,
		} ),
		sourceType: "coach",
		target: resolvedTarget,
		tips: resolvedInstructions || null,
		updatedAt: exercise.updatedAt,
		videoUrl: resolvedVideoUrl,
	};
}

function validateCoachExerciseInput( input: CoachExerciseMutationInput ) {
	const name = normalizeText( input.name );
	const category = normalizeText( input.category );
	const equipment = normalizeText( input.equipment );
	const target = normalizeText( input.target );
	const muscleGroup = normalizeText( input.muscleGroup );
	const instructions = normalizeText( input.instructions );

	if (name.length < 2) {
		throw new Error( "El nombre del ejercicio debe tener al menos 2 caracteres." );
	}

	if (category.length < 2) {
		throw new Error( "La categoria del ejercicio debe tener al menos 2 caracteres." );
	}

	return {
		active: input.active,
		bodyPart: input.bodyPart,
		category,
		equipment,
		externalId: normalizeId( input.externalId ) || null,
		globalExerciseId: normalizeId( input.globalExerciseId ) || null,
		imageUrl: normalizeId( input.imageUrl ) || null,
		instructions: instructions || null,
		isOverride: input.sourceType === "global" || Boolean( input.globalExerciseId ),
		muscleGroup,
		name,
		searchName: buildCoachExerciseSearchName( {
			category,
			equipment,
			instructions,
			muscleGroup,
			name,
			target,
		} ),
		target,
		tips: instructions || null,
		videoUrl: normalizeId( input.videoUrl ) || null,
	};
}

async function assertCoachExerciseExists( coachId: string, exerciseId: string ) {
	const exercise = await prisma.exerciseCoach.findFirst( {
		select: {
			id: true,
		},
		where: {
			coachId,
			id: exerciseId,
		},
	} );

	if (!exercise) {
		throw new Error( "No se encontro el ejercicio solicitado." );
	}

	return exercise;
}

async function upsertCoachOverrideByGlobalExerciseId( coachId: string, globalExerciseId: string, input: ReturnType<typeof validateCoachExerciseInput> ) {
	return prisma.exerciseCoach.upsert( {
		create: {
			...input,
			coachId,
			globalExerciseId,
			isOverride: true,
		},
		update: {
			...input,
			globalExerciseId,
			isOverride: true,
		},
		where: {
			coachId_globalExerciseId: {
				coachId,
				globalExerciseId,
			},
		},
	} );
}

export async function getCoachExercisesAction(): Promise<CoachExerciseListItem[]> {
	try {
		const session = await requireCoachSession( "consultar ejercicios del coach" );

		const [ globalExercises, coachExercises ] = await Promise.all( [
			prisma.exerciseGlobal.findMany( {
				orderBy: {
					name: "asc",
				},
				select: globalExerciseSelect,
			} ) as Promise<GlobalExerciseListResult[]>,
			prisma.exerciseCoach.findMany( {
				orderBy: {
					name: "asc",
				},
				include: coachExerciseInclude,
				where: {
					coachId: session.sub,
				},
			} ) as Promise<CoachExerciseListResult[]>,
		] );

		const overridesByGlobalId = new Map(
			coachExercises
				.filter( ( exercise ) => Boolean( exercise.globalExerciseId ) )
				.map( ( exercise ) => [ exercise.globalExerciseId as string, exercise ] ),
		);
		const resolvedItems: CoachExerciseListItem[] = [];
		const usedCoachExerciseIds = new Set<string>();

		for (const globalExercise of globalExercises) {
			const override = overridesByGlobalId.get( globalExercise.id );

			if (override) {
				resolvedItems.push( mapCoachExerciseToListItem( override ) );
				usedCoachExerciseIds.add( override.id );
				continue;
			}

			resolvedItems.push( mapGlobalExerciseToListItem( globalExercise ) );
		}

		for (const coachExercise of coachExercises) {
			if (usedCoachExerciseIds.has( coachExercise.id )) {
				continue;
			}

			resolvedItems.push( mapCoachExerciseToListItem( coachExercise ) );
		}

		return resolvedItems.sort( ( left, right ) =>
			left.name.localeCompare( right.name, "es", { sensitivity: "base" } ) ||
			left.category.localeCompare( right.category, "es", { sensitivity: "base" } )
		);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudo obtener el catalogo de ejercicios. ${ message }` );
	}
}

export async function saveCoachExerciseAction( input: CoachExerciseMutationInput ) {
	try {
		const session = await requireCoachSession( "guardar ejercicios" );
		const normalizedInput = validateCoachExerciseInput( input );

		if (input.sourceType === "global" && input.globalExerciseId) {
			return await upsertCoachOverrideByGlobalExerciseId( session.sub, input.globalExerciseId, normalizedInput );
		}

		if (input.coachExerciseId) {
			await assertCoachExerciseExists( session.sub, input.coachExerciseId );

			return await prisma.exerciseCoach.update( {
				data: normalizedInput,
				where: {
					id: input.coachExerciseId,
				},
			} );
		}

		return await prisma.exerciseCoach.create( {
			data: {
				...normalizedInput,
				coachId: session.sub,
				isOverride: Boolean( input.globalExerciseId ),
			},
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al guardar el ejercicio.";

		throw new Error( `No se pudo guardar el ejercicio. ${ message }` );
	}
}

export async function toggleCoachExerciseStatusAction( input: CoachExerciseMutationInput ) {
	return saveCoachExerciseAction( input );
}



