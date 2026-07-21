"use server";

import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import type { BodyPartFilter } from "@/features/exercises/services/exercise-form";
import { normalizeSearchName } from "@/features/exercises/services/exercise-form";
import type { ExerciseVariantListItem, ExerciseVariantSearchItem } from "@/features/exercises/types/exercise-variants-types";

const exerciseVariantSelect = {
	active: true,
	bodyPart: true,
	createdAt: true,
	globalExercise: {
		select: {
			imageUrl: true,
			instructions: true,
			videoUrl: true,
		},
	},
	id: true,
	imageUrl: true,
	name: true,
	tips: true,
	videoUrl: true,
} as const;

const routineExerciseVariantSelect = {
	createdAt: true,
	id: true,
	routineId: true,
	variantExercise: {
		select: exerciseVariantSelect,
	},
	variantExerciseId: true,
} satisfies Prisma.RoutineExerciseVariantSelect;

type RoutineExerciseVariantWithExercise = Prisma.RoutineExerciseVariantGetPayload<{
	select: typeof routineExerciseVariantSelect;
}>;

type ExerciseVariantQueryInput = {
	routineId: string;
};

type ExerciseVariantSearchInput = {
	exerciseId: string;
	bodyPart?: BodyPartFilter;
	query?: string;
};

type ExerciseVariantCreateInput = {
	routineId: string;
	variantExerciseId: string;
};

type ExerciseVariantSaveInput = {
	routineId: string;
	variantExerciseIds: string[];
};

function normalizeId( value: string ) {
	return value.trim();
}

function buildExerciseSearchWhere( { bodyPart, excludedIds, query }: ExerciseVariantSearchInput & { excludedIds: string[] } ) {
	const normalizedQuery = normalizeSearchName( query ?? "" );
	const trimmedQuery = query?.trim() ?? "";

	return {
		active: true,
		id: {
			notIn: excludedIds,
		},
		...( bodyPart && bodyPart !== "ALL" ? { bodyPart } : {} ),
		...( normalizedQuery.length > 0
			? {
				OR: [
					{
						name: {
							contains: trimmedQuery,
							mode: "insensitive" as const,
						},
					},
					{
						searchName: {
							contains: normalizedQuery,
						},
					},
				],
			}
			: {} ),
	};
}

async function assertRoutineExists( routineId: string ) {
	const routine = await prisma.routine.findUnique( {
		select: {
			id: true,
			exerciseId: true,
		},
		where: {
			id: routineId,
		},
	} );

	if (!routine) {
		throw new Error( "No se encontró la rutina seleccionada." );
	}

	if (!routine.exerciseId) {
		throw new Error( "La rutina seleccionada no tiene un ejercicio principal asociado." );
	}

	return routine;
}

function normalizeVariantIds( variantExerciseIds: string[] ) {
	return Array.from( new Set( variantExerciseIds.map( normalizeId ).filter( Boolean ) ) );
}

function mapExerciseWithGlobalMedia<T extends {
	active: boolean;
	bodyPart: unknown;
	createdAt: Date;
	globalExercise?: {
		imageUrl: string | null;
		instructions: string | null;
		videoUrl: string | null;
	} | null;
	id: string;
	imageUrl: string | null;
	name: string;
	tips: string | null;
	videoUrl: string | null;
}>( exercise: T ) {
	return {
		active: exercise.active,
		bodyPart: exercise.bodyPart,
		createdAt: exercise.createdAt,
		id: exercise.id,
		imageUrl: exercise.imageUrl?.trim() || exercise.globalExercise?.imageUrl || null,
		name: exercise.name,
		tips: exercise.tips?.trim() || exercise.globalExercise?.instructions || null,
		videoUrl: exercise.videoUrl?.trim() || exercise.globalExercise?.videoUrl || null,
	};
}

function mapRoutineExerciseVariant( variant: RoutineExerciseVariantWithExercise ): ExerciseVariantListItem {
	return {
		...variant,
		variantExercise: mapExerciseWithGlobalMedia( variant.variantExercise ),
	};
}

export async function getExerciseVariantsAction( { routineId }: ExerciseVariantQueryInput ): Promise<ExerciseVariantListItem[]> {
	try {
		const normalizedRoutineId = normalizeId( routineId );

		if (!normalizedRoutineId) {
			throw new Error( "Seleccioná una rutina valida." );
		}

		await assertRoutineExists( normalizedRoutineId );

		const variants = await prisma.routineExerciseVariant.findMany( {
			orderBy: {
				createdAt: "desc",
			},
			select: routineExerciseVariantSelect,
			where: {
				routineId: normalizedRoutineId,
			},
		} );

		return variants.map( mapRoutineExerciseVariant );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudieron obtener las variantes del ejercicio. ${ message }` );
	}
}

export async function searchExerciseVariantCandidatesAction( input: ExerciseVariantSearchInput ): Promise<ExerciseVariantSearchItem[]> {
	try {
		const normalizedExerciseId = normalizeId( input.exerciseId );

		if (!normalizedExerciseId) {
			throw new Error( "Seleccioná un ejercicio valido." );
		}

		const exercises = await prisma.exerciseCoach.findMany( {
			orderBy: {
				name: "asc",
			},
			select: exerciseVariantSelect,
			where: buildExerciseSearchWhere( {
				...input,
				excludedIds: [ normalizedExerciseId ],
			} ),
		} );

		return exercises.map( ( exercise ) => mapExerciseWithGlobalMedia( exercise ) );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudieron buscar ejercicios para variantes. ${ message }` );
	}
}

export async function createExerciseVariantAction( input: ExerciseVariantCreateInput ): Promise<ExerciseVariantListItem> {
	try {
		const routineId = normalizeId( input.routineId );
		const variantExerciseId = normalizeId( input.variantExerciseId );

		if (!routineId || !variantExerciseId) {
			throw new Error( "Seleccioná una rutina y un ejercicio validos." );
		}

		const routine = await assertRoutineExists( routineId );

		if (routine.exerciseId === variantExerciseId) {
			throw new Error( "El ejercicio principal no puede ser variante de si mismo." );
		}

		const variantExercise = await prisma.exerciseCoach.findUnique( {
			select: {
				id: true,
			},
			where: {
				id: variantExerciseId,
			},
		} );

		if (!variantExercise) {
			throw new Error( "Uno de los ejercicios seleccionados no existe." );
		}

		const duplicateRelation = await prisma.routineExerciseVariant.findFirst( {
			select: {
				id: true,
			},
			where: {
				routineId,
				variantExerciseId,
			},
		} );

		if (duplicateRelation) {
			throw new Error( "Ese ejercicio ya esta agregado como variante." );
		}

		const createdVariant = await prisma.routineExerciseVariant.create( {
			data: {
				routineId,
				variantExerciseId,
			},
			select: routineExerciseVariantSelect,
		} );

		return mapRoutineExerciseVariant( createdVariant );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al crear la variante.";

		throw new Error( `No se pudo agregar la variante. ${ message }` );
	}
}

export async function setExerciseVariantsAction( input: ExerciseVariantSaveInput ): Promise<ExerciseVariantListItem[]> {
	try {
		const routineId = normalizeId( input.routineId );
		const variantExerciseIds = normalizeVariantIds( input.variantExerciseIds );

		if (!routineId) {
			throw new Error( "Seleccioná una rutina valida." );
		}

		const routine = await assertRoutineExists( routineId );

		const routineExerciseId = routine.exerciseId;

		if (!routineExerciseId) {
			throw new Error( "La rutina seleccionada no tiene un ejercicio principal asociado." );
		}

		if (variantExerciseIds.includes( routineExerciseId )) {
			throw new Error( "El ejercicio principal no puede ser variante de si mismo." );
		}

		await prisma.$transaction( async ( tx ) => {
			await tx.routineExerciseVariant.deleteMany( {
				where: {
					routineId,
				},
			} );

			if (variantExerciseIds.length > 0) {
				await tx.routineExerciseVariant.createMany( {
					data: variantExerciseIds.map( ( variantExerciseId ) => ( {
						routineId,
						variantExerciseId,
					} ) ),
				} );
			}
		} );

		const variants = await prisma.routineExerciseVariant.findMany( {
			orderBy: {
				createdAt: "desc",
			},
			select: routineExerciseVariantSelect,
			where: {
				routineId,
			},
		} );

		return variants.map( mapRoutineExerciseVariant );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al guardar las variantes.";

		throw new Error( `No se pudieron guardar las variantes. ${ message }` );
	}
}
