"use server";

import type { ActionData } from "@/lib/action-result";
import { runAction } from "@/lib/run-action";
import { getAuthenticatedSession } from "@/features/auth/session";
import { getTrainingRoutinesByStudentBase } from "@/features/training-routine/services/training-routines-by-student";

type GetTrainingRoutinesByStudentInput = {
	month: number;
	year: number;
};

export async function getTrainingRoutinesByStudentAction( { month, year }: GetTrainingRoutinesByStudentInput ) {
	return runAction( "No se pudieron obtener tus rutinas.", async () => {
		const session = await getAuthenticatedSession();

		if (!session) {
			throw new Error( "Tenés que iniciar sesión para ver tus rutinas." );
		}

		if (session.role !== "STUDENT") {
			throw new Error( "No tenés permiso para consultar rutinas de estudiante." );
		}

		return await getTrainingRoutinesByStudentBase( {
			month,
			studentId: session.sub,
			year,
		} );
	} );
}

export type StudentTrainingRoutines = ActionData<typeof getTrainingRoutinesByStudentAction>;
export type StudentTrainingRoutine = StudentTrainingRoutines[ "routineMonth" ][ "weeks" ][ number ];
export type StudentTrainingRoutineDay = StudentTrainingRoutine[ "routineDays" ][ number ];
