"use server";

import { runAction } from "@/lib/run-action";
import { requireCoachSession } from "@/features/auth/coach-session";
import { getRoutineMonthsWithContent } from "@/features/training-routine/services/routine-months-with-content";

export async function getRoutineMonthsWithContentAction( studentId: string ) {
	return runAction( "No se pudieron cargar los meses con rutina.", async () => {
		const session = await requireCoachSession( "consultar los meses con rutina del estudiante" );

		return getRoutineMonthsWithContent( { coachId: session.sub, studentId } );
	} );
}
