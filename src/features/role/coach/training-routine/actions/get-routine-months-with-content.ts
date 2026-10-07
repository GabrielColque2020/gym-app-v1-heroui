"use server";

import { requireCoachSession } from "@/features/auth/coach-session";
import { getRoutineMonthsWithContent } from "@/features/training-routine/services/routine-months-with-content";

export async function getRoutineMonthsWithContentAction( studentId: string ) {
	const session = await requireCoachSession( "consultar los meses con rutina del estudiante" );

	return getRoutineMonthsWithContent( { coachId: session.sub, studentId } );
}
