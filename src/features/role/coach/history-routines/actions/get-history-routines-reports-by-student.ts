"use server";

import { getAuthenticatedSession } from "@/features/auth/session";
import { getHistoryRoutinesReportsByStudentBase } from "@/features/history-routines/services/history-routines-reports";

type GetHistoryRoutinesReportsByStudentInput = {
	studentId: string;
};

export async function getHistoryRoutinesReportsByStudentAction( {
	studentId,
}: GetHistoryRoutinesReportsByStudentInput ) {
	const session = await getAuthenticatedSession();

	if (!session) {
		throw new Error( "Debes iniciar sesion para ver el historial de rutinas." );
	}

	if (session.role !== "COACH") {
		throw new Error( "No tienes permisos para consultar historial de rutinas." );
	}

	return getHistoryRoutinesReportsByStudentBase( {
		studentId,
		studentNotFoundMessage: "No se encontro un estudiante activo para consultar su historial.",
		studentWhere: {
			coachId: session.sub,
		},
	} );
}
