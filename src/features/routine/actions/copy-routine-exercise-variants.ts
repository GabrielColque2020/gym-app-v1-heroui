"use server";

import prisma from "@/lib/prisma";
import type { ActionResult } from "@/lib/action-result";
import { runAction } from "@/lib/run-action";
import { requireCoachSession } from "@/features/auth/coach-session";
import { getRoutineWeekScope } from "@/features/routine/actions/routine-day-mutations.utils";

export type CopyRoutineExerciseVariantsInput = {
	// El dia desde el que se pide: de ahi sale cual es la rutina.
	routineDayId: string;
	// Los otros dias donde aplicarlas, que el coach marco. Solo valen los de esa rutina.
	routineDayIds: string[];
	// El ejercicio del dia cuyas variantes se copian.
	routineId: string;
	studentId?: string | null;
	templateId?: string | null;
};

export type CopyRoutineExerciseVariantsResult = {
	// Los dias en los que quedaron, para volver a pedirlos.
	updatedDayIds: string[];
	// Dias que el estudiante ya termino: lo que hizo queda como lo hizo.
	skippedFinalizedDays: number;
};

// Deja en el mismo ejercicio de los dias elegidos de la rutina del mes (o de la
// plantilla) las mismas variantes que tiene en este dia. Reemplaza las que
// tenia cada uno: el coach elige "las de este dia en todos lados".
export async function copyRoutineExerciseVariantsAction( input: CopyRoutineExerciseVariantsInput ): Promise<ActionResult<CopyRoutineExerciseVariantsResult>> {
	return runAction( "No se pudieron aplicar las variantes en los otros días.", async () => {
		const session = await requireCoachSession( "cambiar variantes de la rutina" );
		const routineDayId = input.routineDayId.trim();
		const routineId = input.routineId.trim();

		if (!routineDayId || !routineId) {
			throw new Error( "Elegí el ejercicio del día." );
		}

		const weekWhere = await getRoutineWeekScope( {
			coachId: session.sub,
			routineDayId,
			studentId: input.studentId,
			templateId: input.templateId,
		} );
		// El ejercicio tiene que ser del dia desde el que se pide, que ya se
		// comprobo que es de este entrenador.
		const source = await prisma.routine.findFirst( {
			select: { exerciseId: true, variants: { select: { variantExerciseId: true } } },
			where: { id: routineId, routineDayId },
		} );

		if (!source?.exerciseId) {
			throw new Error( "No se encontró el ejercicio del día." );
		}

		const exerciseId = source.exerciseId;
		const variantExerciseIds = source.variants.map( ( variant ) => variant.variantExerciseId );

		return prisma.$transaction( async ( transaction ) => {
			const days = await transaction.routineDay.findMany( {
				select: {
					id: true,
					isFinalized: true,
					routines: { select: { id: true }, where: { exerciseId } },
				},
				where: {
					id: { in: input.routineDayIds.filter( ( id ) => id !== routineDayId ) },
					routines: { some: { exerciseId } },
					trainingRoutineWeek: weekWhere,
				},
			} );
			const dayIds = days.map( ( day ) => day.id ).sort();

			// Mismo bloqueo que el guardado de un dia: si uno de estos dias se esta
			// guardando a la vez, se espera a que termine.
			if (dayIds.length > 0) {
				await transaction.$queryRaw`SELECT "id" FROM "RoutineDay" WHERE "id" = ANY(${ dayIds }) ORDER BY "id" FOR UPDATE`;
			}

			const openDays = days.filter( ( day ) => !day.isFinalized );
			const routineIds = openDays.flatMap( ( day ) => day.routines.map( ( routine ) => routine.id ) );

			if (routineIds.length > 0) {
				await transaction.routineExerciseVariant.deleteMany( { where: { routineId: { in: routineIds } } } );

				if (variantExerciseIds.length > 0) {
					await transaction.routineExerciseVariant.createMany( {
						data: routineIds.flatMap( ( id ) => variantExerciseIds.map( ( variantExerciseId ) => ( {
							routineId: id,
							variantExerciseId,
						} ) ) ),
					} );
				}
			}

			return {
				skippedFinalizedDays: days.length - openDays.length,
				updatedDayIds: openDays.map( ( day ) => day.id ),
			};
		} );
	} );
}
