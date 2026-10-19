"use server";

import prisma from "@/lib/prisma";
import type { ActionResult } from "@/lib/action-result";
import { runAction } from "@/lib/run-action";
import { requireCoachSession } from "@/features/auth/coach-session";
import { assertRoutineCatalogExercisesAvailable, getRoutineWeekScope } from "@/features/routine/actions/routine-day-mutations.utils";

export type ReplaceRoutineExerciseInput = {
	fromExerciseId: string;
	// El dia desde el que se pide el cambio: de ahi sale cual es la rutina.
	routineDayId: string;
	// Los dias donde cambiarlo, que el coach marco. Solo valen los de esa rutina.
	routineDayIds: string[];
	studentId?: string | null;
	templateId?: string | null;
	// Puede ser un ejercicio del catalogo global: se usa la copia del coach.
	toExerciseId: string;
};

export type ReplaceRoutineExerciseResult = {
	// Los dias en los que se cambio, para actualizar sus borradores.
	replacedDayIds: string[];
	// El id con el que quedo el ejercicio nuevo (la copia del coach si era global).
	resolvedExerciseId: string;
	// Dias que ya tenian el ejercicio nuevo: no puede estar dos veces en un dia.
	skippedDuplicateDays: number;
	// Dias que el estudiante ya termino: lo que hizo queda como lo hizo.
	skippedFinalizedDays: number;
};

// Cambia un ejercicio por otro en los dias elegidos de la rutina del mes (o de
// la plantilla), conservando series, repeticiones, descanso, orden y
// nota. Las variantes eran del ejercicio anterior y se quitan.
export async function replaceRoutineExerciseAction( input: ReplaceRoutineExerciseInput ): Promise<ActionResult<ReplaceRoutineExerciseResult>> {
	return runAction( "No se pudo cambiar el ejercicio en la rutina.", async () => {
		const session = await requireCoachSession( "cambiar ejercicios de la rutina" );
		const coachId = session.sub;
		const fromExerciseId = input.fromExerciseId.trim();
		const toExerciseId = input.toExerciseId.trim();
		if (!fromExerciseId || !toExerciseId || !input.routineDayId.trim()) {
			throw new Error( "Elegí el ejercicio que reemplaza al anterior." );
		}

		const weekWhere = await getRoutineWeekScope( {
			coachId,
			routineDayId: input.routineDayId,
			studentId: input.studentId,
			templateId: input.templateId,
		} );
		const [ resolved ] = await assertRoutineCatalogExercisesAvailable( coachId, [ {
			exerciseId: toExerciseId,
			observation: "",
			order: 1,
			reps: "",
			restSeconds: null,
			sets: "",
		} ] );
		const resolvedExerciseId = resolved.exerciseId;

		if (resolvedExerciseId === fromExerciseId) {
			throw new Error( "Elegiste el mismo ejercicio que ya está." );
		}

		return prisma.$transaction( async ( transaction ) => {
			const days = await transaction.routineDay.findMany( {
				select: {
					id: true,
					isFinalized: true,
					routines: { select: { exerciseId: true, id: true } },
				},
				where: {
					id: { in: input.routineDayIds },
					routines: { some: { exerciseId: fromExerciseId } },
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
			const duplicateDays = openDays.filter( ( day ) => day.routines.some( ( routine ) => routine.exerciseId === resolvedExerciseId ) );
			const replacedDays = openDays.filter( ( day ) => !duplicateDays.includes( day ) );
			const routineIds = replacedDays.flatMap( ( day ) => (
				day.routines.filter( ( routine ) => routine.exerciseId === fromExerciseId ).map( ( routine ) => routine.id )
			) );

			if (routineIds.length > 0) {
				await transaction.routineExerciseVariant.deleteMany( { where: { routineId: { in: routineIds } } } );
				await transaction.routine.updateMany( {
					data: { exerciseId: resolvedExerciseId },
					where: { id: { in: routineIds } },
				} );
			}

			return {
				replacedDayIds: replacedDays.map( ( day ) => day.id ),
				resolvedExerciseId,
				skippedDuplicateDays: duplicateDays.length,
				skippedFinalizedDays: finalizedDays.length,
			};
		} );
	} );
}
