"use server";

import { getAuthenticatedSession } from "@/features/auth/session";
import { getRoutineMonthsWithContent } from "@/features/training-routine/services/routine-months-with-content";

export async function getRoutineMonthsWithContentAction() {
	const session = await getAuthenticatedSession();

	if (!session || session.role !== "STUDENT") {
		throw new Error( "Debes iniciar sesión como estudiante para ver tus rutinas." );
	}

	return getRoutineMonthsWithContent( { studentId: session.sub } );
}
