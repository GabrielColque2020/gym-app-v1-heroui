"use server";

import prisma from "@/lib/prisma";

import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import type { BodyPartFilter } from "@/features/exercises/services/exercise-form";
import { normalizeSearchName } from "@/features/exercises/services/exercise-form";
import type { ExerciseVariantListItem, ExerciseVariantSearchItem } from "@/features/exercises/types/exercise-variants.types";

const exerciseVariantSelect = {
	active: true,
	bodyPart: true,
	createdAt: true,
	id: true,
	imageUrl: true,
	name: true,
	tips: true,
	videoUrl: true,
} as const;

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

function normalizeId(value: string) {
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
		...(bodyPart && bodyPart !== "ALL" ? { bodyPart } : {} ),
		...(normalizedQuery.length > 0
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
			: {}),
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
		throw new Error( "No se encontro la rutina seleccionada." );
	}

	if (!routine.exerciseId) {
		throw new Error( "La rutina seleccionada no tiene un ejercicio principal asociado." );
	}

	return routine;
}

function normalizeVariantIds( variantExerciseIds: string[] ) {
	return Array.from( new Set( variantExerciseIds.map( normalizeId ).filter( Boolean ) ) );
}

export async function getExerciseVariantsAction( { routineId }: ExerciseVariantQueryInput ): Promise<ExerciseVariantListItem[]> {
	try {
		const normalizedRoutineId = normalizeId( routineId );

		if (!normalizedRoutineId) {
			throw new Error( "Selecciona una rutina valida." );
		}

		await assertRoutineExists( normalizedRoutineId );

		return await prisma.routineExerciseVariant.findMany( {
			include: {
				variantExercise: {
					select: exerciseVariantSelect,
				},
			},
			orderBy: {
				createdAt: "desc",
			},
			where: {
				routineId: normalizedRoutineId,
			},
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudieron obtener las variantes del ejercicio. ${ message }` );
	}
}

export async function searchExerciseVariantCandidatesAction( input: ExerciseVariantSearchInput ): Promise<ExerciseVariantSearchItem[]> {
	try {
		const normalizedExerciseId = normalizeId( input.exerciseId );

		if (!normalizedExerciseId) {
			throw new Error( "Selecciona un ejercicio valido." );
		}

		return await prisma.exercise.findMany( {
			orderBy: {
				name: "asc",
			},
			select: exerciseVariantSelect,
			where: buildExerciseSearchWhere( {
				...input,
				excludedIds: [ normalizedExerciseId ],
			} ),
			take: 20,
		} );
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
			throw new Error( "Selecciona una rutina y un ejercicio validos." );
		}

		const routine = await assertRoutineExists( routineId );

		if (routine.exerciseId === variantExerciseId) {
			throw new Error( "El ejercicio principal no puede ser variante de si mismo." );
		}

		const variantExercise = await prisma.exercise.findUnique( {
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

		return await prisma.routineExerciseVariant.create( {
			data: {
				routineId,
				variantExerciseId,
			},
			include: {
				variantExercise: {
					select: exerciseVariantSelect,
				},
			},
		} );
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
			throw new Error( "Selecciona una rutina valida." );
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

		return await prisma.routineExerciseVariant.findMany( {
			include: {
				variantExercise: {
					select: exerciseVariantSelect,
				},
			},
			orderBy: {
				createdAt: "desc",
			},
			where: {
				routineId,
			},
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al guardar las variantes.";

		throw new Error( `No se pudieron guardar las variantes. ${ message }` );
	}
}
