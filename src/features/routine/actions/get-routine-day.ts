"use server";

import { getAuthenticatedSession } from "@/features/auth/session";
import type { RoutineDayDetail, RoutineDayExercise } from "@/features/routine/services/routine-day-detail";
import type { GetRoutineDayDetailInput } from "@/features/routine/services/routine-day-detail.query";
import { getRoutineDayDetailBase } from "@/features/routine/services/routine-day-detail";

// De quien es el dia sale de la sesion y no de lo que mande la pantalla: un
// entrenador solo lee dias de sus estudiantes o de sus plantillas, y un
// estudiante solo los suyos. Conocer el identificador de un dia no alcanza.
export async function getRoutineDayAction( { routineDayId, studentId, templateId }: Omit<GetRoutineDayDetailInput, "coachId"> ) {
	try {
		const session = await getAuthenticatedSession();

		if (!session) {
			throw new Error( "Debes iniciar sesión para ver la rutina." );
		}

		if (session.role === "STUDENT") {
			return await getRoutineDayDetailBase( {
				routineDayId,
				studentId: session.sub,
			} );
		}

		if (session.role !== "COACH") {
			throw new Error( "No tienes permisos para ver esta rutina." );
		}

		return await getRoutineDayDetailBase( {
			coachId: session.sub,
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
