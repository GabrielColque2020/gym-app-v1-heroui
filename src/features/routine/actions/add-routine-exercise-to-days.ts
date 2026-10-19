"use server";

import prisma from "@/lib/prisma";
import type { ActionResult } from "@/lib/action-result";
import { runAction } from "@/lib/run-action";
import { requireCoachSession } from "@/features/auth/coach-session";
import { emptyToNull } from "@/features/exercises/services/exercise-form";
import { assertRoutineCatalogExercisesAvailable, getRoutineWeekScope } from "@/features/routine/actions/routine-day-mutations.utils";
import { normalizeRestSeconds } from "@/features/routine/services/rest-seconds";

export type AddRoutineExerciseToDaysInput = {
	// Puede ser un ejercicio del catalogo global: se usa la copia del coach.
	exerciseId: string;
	observation?: string;
	reps: string;
	restSeconds: number | null;
	// El dia desde el que se agrega: de ahi sale cual es la rutina. Ese dia se
	// guarda por su lado, como siempre; aca van los otros.
	routineDayId: string;
	routineDayIds: string[];
	sets: string;
	studentId?: string | null;
	templateId?: string | null;
	variantExerciseIds?: string[];
};

export type AddRoutineExerciseToDaysResult = {
	addedDayIds: string[];
	// El id con el que quedo el ejercicio (la copia del coach si era global).
	resolvedExerciseId: string;
	// Dias que ya tenian el ejercicio: no puede estar dos veces en un dia.
	skippedDuplicateDays: number;
	// Dias que el estudiante ya termino: quedan como los hizo.
	skippedFinalizedDays: number;
};

// Agrega un ejercicio, con sus series, repeticiones, descanso y variantes, al
// final de otros dias de la misma rutina (o plantilla).
export async function addRoutineExerciseToDaysAction( input: AddRoutineExerciseToDaysInput ): Promise<ActionResult<AddRoutineExerciseToDaysResult>> {
	return runAction( "No se pudo agregar el ejercicio en los otros días.", async () => {
		const session = await requireCoachSession( "agregar ejercicios a la rutina" );
		const coachId = session.sub;
		const sets = input.sets.trim();
		const reps = input.reps.trim();

		if (!sets || !reps) {
			throw new Error( "Cargá series y repeticiones para agregarlo en otros días." );
		}

		const weekWhere = await getRoutineWeekScope( {
			coachId,
			routineDayId: input.routineDayId,
			studentId: input.studentId,
			templateId: input.templateId,
		} );
		const [ resolved ] = await assertRoutineCatalogExercisesAvailable( coachId, [ {
			exerciseId: input.exerciseId.trim(),
			observation: "",
			order: 1,
			reps,
			restSeconds: null,
			sets,
		} ] );
		const exerciseId = resolved.exerciseId;
		const requestedVariantIds = [ ...new Set( ( input.variantExerciseIds ?? [] ).map( ( id ) => id.trim() ).filter( Boolean ) ) ];
		// Una variante ajena o que ya no existe se descarta sin frenar el resto.
		const ownVariants = requestedVariantIds.length === 0 ? [] : ( await prisma.exerciseCoach.findMany( {
			select: { id: true },
			where: { coachId, id: { in: requestedVariantIds } },
		} ) ) as Array<{ id: string }>;
		const variantIds: string[] = ownVariants.map( ( exercise ) => exercise.id ).filter( ( id ) => id !== exerciseId );

		return prisma.$transaction( async ( transaction ) => {
			const days = await transaction.routineDay.findMany( {
				select: {
					id: true,
					isFinalized: true,
					routines: { select: { exerciseId: true, order: true } },
				},
				where: {
					id: { in: input.routineDayIds.filter( ( id ) => id !== input.routineDayId ) },
					trainingRoutineWeek: weekWhere,
				},
			} );
			const dayIds = days.map( ( day ) => day.id ).sort();

			// Mismo bloqueo que el guardado de un dia: si uno de estos dias se esta
			// guardando a la vez, se espera a que termine.
			if (dayIds.length > 0) {
				await transaction.$queryRaw`SELECT "id" FROM "RoutineDay" WHERE "id" = ANY(${ dayIds }) ORDER BY "id" FOR UPDATE`;
			}

			const finalizedDays = days.filter( ( day ) => day.isFinalized );
			const openDays = days.filter( ( day ) => !day.isFinalized );
			const duplicateDays = openDays.filter( ( day ) => day.routines.some( ( routine ) => routine.exerciseId === exerciseId ) );
			const targetDays = openDays.filter( ( day ) => !duplicateDays.includes( day ) );

			for (const day of targetDays) {
				// Al final del dia, para no desacomodar el orden que ya tiene.
				const order = day.routines.reduce( ( highest, routine ) => Math.max( highest, routine.order ), 0 ) + 1;

				await transaction.routine.create( {
					data: {
						exerciseId,
						observation: emptyToNull( input.observation ?? "" ),
						order,
						reps,
						restSeconds: normalizeRestSeconds( input.restSeconds ),
						routineDayId: day.id,
						sets,
						variants: variantIds.length > 0
							? { createMany: { data: variantIds.map( ( variantExerciseId ) => ( { variantExerciseId } ) ) } }
							: undefined,
					},
				} );
			}

			return {
				addedDayIds: targetDays.map( ( day ) => day.id ),
				resolvedExerciseId: exerciseId,
				skippedDuplicateDays: duplicateDays.length,
				skippedFinalizedDays: finalizedDays.length,
			};
		} );
	} );
}
