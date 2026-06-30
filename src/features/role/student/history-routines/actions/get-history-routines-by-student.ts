"use server";

import { getAuthenticatedSession } from "@/features/auth/session";
import {
	getHistoryRoutinesByStudentBase,
	type HistoryRoutinesByStudentBase,
} from "@/features/history-routines/services/history-routines-by-student";

type GetHistoryRoutinesByStudentInput = {
	month: number;
	studentId?: string | null;
	year: number;
};

export async function getHistoryRoutinesByStudentAction( {
	month,
	studentId,
	year,
}: GetHistoryRoutinesByStudentInput ) {
	const session = await getAuthenticatedSession();

	if (!session) {
		throw new Error( "Debes iniciar sesion para ver tu historial de rutinas." );
	}

	if (session.role !== "STUDENT") {
		throw new Error( "No tienes permisos para consultar este historial." );
	}

	const activeStudentId = studentId?.trim() || session.sub;

	if (activeStudentId !== session.sub) {
		throw new Error( "El historial solicitado no pertenece al estudiante autenticado." );
	}

	return getHistoryRoutinesByStudentBase( {
		month,
		studentId: activeStudentId,
		studentNotFoundMessage: "No se encontro un historial activo para el estudiante autenticado.",
		year,
	} );
}

export type HistoryRoutinesByStudent = HistoryRoutinesByStudentBase;
export type StudentHistoryRoutine = HistoryRoutinesByStudent["historyRoutines"][number];
