"use server";

import type { RoutineDayDetail, RoutineDayExercise } from "@/features/routine/services/routine-day-detail";
import { getRoutineDayDetailBase } from "@/features/routine/services/routine-day-detail";

type GetRoutineDayInput = {
	coachId?: string | null;
	routineDayId: string;
	studentId?: string | null;
};

export async function getRoutineDayAction( { coachId, routineDayId, studentId }: GetRoutineDayInput ) {
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
