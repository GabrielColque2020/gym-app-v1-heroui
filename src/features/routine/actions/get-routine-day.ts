"use server";

import type { RoutineDayDetail, RoutineDayExercise } from "@/features/routine/services/routine-day-detail";
import type { GetRoutineDayDetailInput } from "@/features/routine/services/routine-day-detail.query";
import { getRoutineDayDetailBase } from "@/features/routine/services/routine-day-detail";

export async function getRoutineDayAction( { coachId, routineDayId, studentId }: GetRoutineDayDetailInput ) {
	try {
		return await getRoutineDayDetailBase( {
			coachId,
			routineDayId,
			studentId,
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudo obtener el dia de rutina. ${ message }` );
	}
}

export type RoutineDayDetailBase = RoutineDayDetail;
export type RoutineDayExerciseBase = RoutineDayExercise;
