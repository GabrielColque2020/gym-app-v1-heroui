"use server";

import { runAction } from "@/lib/run-action";
import { getAuthenticatedSession } from "@/features/auth/session";
import { getRoutineMonthsWithContent } from "@/features/training-routine/services/routine-months-with-content";

export async function getRoutineMonthsWithContentAction() {
	return runAction( "No se pudieron cargar los meses con rutina.", async () => {
		const session = await getAuthenticatedSession();

		if (!session || session.role !== "STUDENT") {
			throw new Error( "Tenés que iniciar sesión como estudiante para ver tus rutinas." );
		}

		return getRoutineMonthsWithContent( { studentId: session.sub } );
	} );
}
