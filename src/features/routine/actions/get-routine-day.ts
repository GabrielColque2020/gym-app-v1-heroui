"use server";

import { runAction } from "@/lib/run-action";
import { getAuthenticatedSession } from "@/features/auth/session";
import type { RoutineDayDetail, RoutineDayExercise } from "@/features/routine/services/routine-day-detail";
import type { GetRoutineDayDetailInput } from "@/features/routine/services/routine-day-detail.query";
import { getRoutineDayDetailBase } from "@/features/routine/services/routine-day-detail";

// De quien es el dia sale de la sesion y no de lo que mande la pantalla: un
// entrenador solo lee dias de sus estudiantes o de sus plantillas, y un
// estudiante solo los suyos. Conocer el identificador de un dia no alcanza.
export async function getRoutineDayAction( { routineDayId, studentId, templateId }: Omit<GetRoutineDayDetailInput, "coachId"> ) {
	return runAction( "No se pudo obtener el día de rutina.", async () => {
		const session = await getAuthenticatedSession();

		if (!session) {
			throw new Error( "Tenés que iniciar sesión para ver la rutina." );
		}

		if (session.role === "STUDENT") {
			return await getRoutineDayDetailBase( {
				routineDayId,
				studentId: session.sub,
			} );
		}

		if (session.role !== "COACH") {
			throw new Error( "No tenés permiso para ver esta rutina." );
		}

		return await getRoutineDayDetailBase( {
			coachId: session.sub,
			routineDayId,
			studentId,
			templateId,
		} );
	} );
}

export type RoutineDayDetailBase = RoutineDayDetail;
export type RoutineDayExerciseBase = RoutineDayExercise;
