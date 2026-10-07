import prisma from "@/lib/prisma";

import { emptyToNull } from "@/features/exercises/services/exercise-form";
import { buildCoachExerciseSearchName, mapCategoryToBodyPart } from "@/features/role/coach/exercises/services/coach-exercise-form";
import type { SaveRoutineDayExercisesActionInput, SavedRoutineRow } from "@/features/routine/actions/routine-day-mutations";
import { validateRoutineDayDraft, type SaveRoutineDayExerciseInput } from "@/features/routine/services/routine-day-editor";
import { normalizeRestSeconds } from "@/features/routine/services/rest-seconds";

type NormalizedRoutineDayExerciseInput = SaveRoutineDayExerciseInput;

export function normalizeRoutineDayExercises( exercises: SaveRoutineDayExerciseInput[] ): NormalizedRoutineDayExerciseInput[] {
	return exercises.map( ( exercise ) => ( {
		exerciseId: exercise.exerciseId.trim(),
		observation: exercise.observation,
		order: exercise.order,
		reps: exercise.reps,
		restSeconds: normalizeRestSeconds( exercise.restSeconds ),
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
		restSeconds: exercise.restSeconds,
		sets: exercise.sets,
	} ) ) );

	if (validationError) {
		throw new Error( validationError );
	}
}

// `keptExerciseIds`: los ejercicios que el dia ya tenia. Siguen valiendo aunque el
// coach los haya desactivado despues; si no, un ejercicio desactivado impediria
// guardar cualquier otro cambio del dia.
async function resolveCoachExerciseIds(
	coachId: string,
	exercises: NormalizedRoutineDayExerciseInput[],
	keptExerciseIds: string[],
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
			id: {
				in: requestedIds,
			},
			OR: [ { active: true }, { id: { in: keptExerciseIds } } ],
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
				bodyPart: mapCategoryToBodyPart( globalExercise.category, globalExercise.target ),
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
			id: {
				in: resolvedExercises.map( ( exercise ) => exercise.exerciseId ),
			},
			OR: [ { active: true }, { id: { in: keptExerciseIds } } ],
		},
	} );
	const resolvedExerciseIds = new Set( resolvedExercises.map( ( exercise ) => exercise.exerciseId ) );

	if (resolvedExistingExercises.length !== resolvedExerciseIds.size) {
		throw new Error( "Uno o más ejercicios ya no están disponibles en el catálogo activo." );
	}

	// Un ejercicio del catalogo global y su copia propia del coach son el mismo
	// ejercicio: recien aca, con los ids ya resueltos, se nota si vino dos veces.
	if (resolvedExerciseIds.size !== resolvedExercises.length) {
		throw new Error( "No puede agregar el mismo ejercicio más de una vez en el mismo día." );
	}

	return resolvedExercises;
}

export async function assertRoutineCatalogExercisesAvailable(
	coachId: string,
	exercises: NormalizedRoutineDayExerciseInput[],
	keptExerciseIds: string[] = [],
) {
	return resolveCoachExerciseIds( coachId, exercises, keptExerciseIds );
}

// Guarda el dia aplicando solo las diferencias: actualiza las filas que ya estan,
// crea las nuevas y borra las que el coach quito. Antes se borraba y se volvia a
// crear todo, y cada guardado le cambiaba el id a todas las filas: las variantes
// habia que copiarlas a mano y lo que el alumno tenia abierto quedaba apuntando a
// filas que ya no existian.
//
// Una fila se reconoce por su ejercicio, que no se repite dentro de un dia. Por
// eso el coach puede quitar un ejercicio y volver a agregarlo antes de que se
// guarde sin perder sus variantes.
//
// Devuelve como quedaron las filas cuando no se creo ni se borro ninguna, y
// `null` cuando si: en ese caso quien llama tiene que volver a leer el dia.
export async function persistRoutineDayExercises(
	routineDayId: string,
	exercises: NormalizedRoutineDayExerciseInput[],
): Promise<SavedRoutineRow[] | null> {
	return prisma.$transaction( async ( transaction ) => {
		// Bloquea el dia mientras dura el guardado. Dos guardados a la vez (dos
		// pestañas, o uno que sale al cambiar de dia mientras otro viaja) leerian las
		// mismas filas y los dos crearian el mismo ejercicio.
		await transaction.$queryRaw`SELECT "id" FROM "RoutineDay" WHERE "id" = ${ routineDayId } FOR UPDATE`;

		const existingRoutines = await transaction.routine.findMany( {
			orderBy: [ { order: "asc" }, { createdAt: "asc" } ],
			select: {
				exerciseId: true,
				id: true,
				observation: true,
				order: true,
				reps: true,
				restSeconds: true,
				sets: true,
			},
			where: {
				routineDayId,
			},
		} );
		const existingByExerciseId = new Map<string, ( typeof existingRoutines )[ number ]>();

		for (const routine of existingRoutines) {
			// Si quedo un ejercicio repetido de antes, se conserva la primera fila.
			if (routine.exerciseId && !existingByExerciseId.has( routine.exerciseId )) {
				existingByExerciseId.set( routine.exerciseId, routine );
			}
		}

		const keptRoutineIds = new Set<string>();
		const savedRoutines: SavedRoutineRow[] = [];
		const routinesToCreate: Array<{
			exerciseId: string;
			observation: string | null;
			order: number;
			reps: string;
			restSeconds: number | null;
			routineDayId: string;
			sets: string;
		}> = [];

		for (const exercise of exercises) {
			const data = {
				observation: emptyToNull( exercise.observation ),
				order: exercise.order,
				reps: exercise.reps.trim(),
				restSeconds: exercise.restSeconds,
				sets: exercise.sets.trim(),
			};
			const existing = existingByExerciseId.get( exercise.exerciseId );

			if (!existing) {
				routinesToCreate.push( { ...data, exerciseId: exercise.exerciseId, routineDayId } );
				continue;
			}

			keptRoutineIds.add( existing.id );
			savedRoutines.push( { ...data, id: existing.id } );

			const hasChanges = existing.observation !== data.observation
				|| existing.order !== data.order
				|| existing.reps !== data.reps
				|| existing.restSeconds !== data.restSeconds
				|| existing.sets !== data.sets;

			if (hasChanges) {
				await transaction.routine.update( { data, where: { id: existing.id } } );
			}
		}

		// Lo que el coach quito, las filas sin ejercicio y las repetidas. Sus
		// variantes se borran con la fila.
		const routineIdsToDelete = existingRoutines
			.filter( ( routine ) => !keptRoutineIds.has( routine.id ) )
			.map( ( routine ) => routine.id );

		if (routineIdsToDelete.length > 0) {
			await transaction.routine.deleteMany( { where: { id: { in: routineIdsToDelete } } } );
		}

		if (routinesToCreate.length > 0) {
			await transaction.routine.createMany( { data: routinesToCreate } );
		}

		return routineIdsToDelete.length === 0 && routinesToCreate.length === 0 ? savedRoutines : null;
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
