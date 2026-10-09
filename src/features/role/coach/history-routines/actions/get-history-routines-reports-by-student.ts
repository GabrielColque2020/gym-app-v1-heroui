"use server";

import { runAction } from "@/lib/run-action";
import { getAuthenticatedSession } from "@/features/auth/session";
import { getHistoryRoutinesReportsByStudentBase } from "@/features/history-routines/services/history-routines-reports";

type GetHistoryRoutinesReportsByStudentInput = {
	studentId: string;
};

export async function getHistoryRoutinesReportsByStudentAction( {
	studentId,
}: GetHistoryRoutinesReportsByStudentInput ) {
	return runAction( "No se pudieron cargar los reportes del historial.", async () => {
		const session = await getAuthenticatedSession();

		if (!session) {
			throw new Error( "Tenés que iniciar sesión para ver el historial de rutinas." );
		}

		if (session.role !== "COACH") {
			throw new Error( "No tenés permiso para consultar historial de rutinas." );
		}

		return getHistoryRoutinesReportsByStudentBase( {
			studentId,
			studentNotFoundMessage: "No se encontró el estudiante para consultar su historial.",
			studentWhere: {
				coachId: session.sub,
			},
		} );
	} );
}
