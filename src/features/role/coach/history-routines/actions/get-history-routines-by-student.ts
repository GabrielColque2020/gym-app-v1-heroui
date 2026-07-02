"use server";

import { getAuthenticatedSession } from "@/features/auth/session";
import {
	getHistoryRoutinesByStudentBase,
	type HistoryRoutinesByStudentBase,
} from "@/features/history-routines/services/history-routines-by-student";

type GetHistoryRoutinesByStudentInput = {
	month: number;
	studentId: string;
	year: number;
};

export async function getHistoryRoutinesByStudentAction( {
	month,
	studentId,
	year,
}: GetHistoryRoutinesByStudentInput ) {
	const session = await getAuthenticatedSession();

	if (!session) {
		throw new Error( "Debes iniciar sesion para ver el historial de rutinas." );
	}

	if (session.role !== "COACH") {
		throw new Error( "No tienes permisos para consultar historial de rutinas." );
	}

	return getHistoryRoutinesByStudentBase( {
		month,
		studentId,
		studentNotFoundMessage: "No se encontro un estudiante activo para consultar su historial.",
		studentWhere: {
			coachId: session.sub,
		},
		year,
	} );
}

export type HistoryRoutinesByStudent = HistoryRoutinesByStudentBase;
export type CoachHistoryRoutine = HistoryRoutinesByStudent["historyRoutines"][number];
