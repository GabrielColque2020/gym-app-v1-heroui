"use server";

import { runAction } from "@/lib/run-action";
import { getAuthenticatedSession } from "@/features/auth/session";
import { getHistoryRoutinesReportsByStudentBase } from "@/features/history-routines/services/history-routines-reports";

type GetHistoryRoutinesReportsByStudentInput = {
	studentId?: string | null;
};

export async function getHistoryRoutinesReportsByStudentAction( {
	studentId,
}: GetHistoryRoutinesReportsByStudentInput = {} ) {
	return runAction( "No se pudieron cargar los reportes de tu historial.", async () => {
		const session = await getAuthenticatedSession();

		if (!session) {
			throw new Error( "Tenés que iniciar sesión para ver tu historial de rutinas." );
		}

		if (session.role !== "STUDENT") {
			throw new Error( "No tenés permiso para consultar este historial." );
		}

		const activeStudentId = studentId?.trim() || session.sub;

		if (activeStudentId !== session.sub) {
			throw new Error( "El historial solicitado no pertenece al estudiante autenticado." );
		}

		return getHistoryRoutinesReportsByStudentBase( {
			studentId: activeStudentId,
			studentNotFoundMessage: "No se encontró un historial activo para el estudiante autenticado.",
		} );
	} );
}
