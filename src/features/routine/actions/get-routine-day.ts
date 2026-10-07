"use server";

import { requireCoachSession } from "@/features/auth/coach-session";
import type { RoutineDayDetail, RoutineDayExercise } from "@/features/routine/services/routine-day-detail";
import type { GetRoutineDayDetailInput } from "@/features/routine/services/routine-day-detail.query";
import { getRoutineDayDetailBase } from "@/features/routine/services/routine-day-detail";

export async function getRoutineDayAction( { coachId, routineDayId, studentId, templateId }: GetRoutineDayDetailInput ) {
	try {
		// Las plantillas son de un entrenador: el entrenador sale de la sesion, no
		// de lo que mande la pantalla.
		const resolvedCoachId = templateId
			? ( await requireCoachSession( "consultar el día de la plantilla" ) ).sub
			: coachId;

		return await getRoutineDayDetailBase( {
			coachId: resolvedCoachId,
			routineDayId,
			studentId,
			templateId,
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudo obtener el día de rutina. ${ message }` );
	}
}

export type RoutineDayDetailBase = RoutineDayDetail;
export type RoutineDayExerciseBase = RoutineDayExercise;
