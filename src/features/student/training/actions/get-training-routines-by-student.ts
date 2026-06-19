"use server";

import { getAuthenticatedSession } from "@/features/auth/session";
import { getTrainingRoutinesByStudentAction as getAdminTrainingRoutinesByStudentAction } from "@/features/admin/trainingRoutine/actions/get-training-routines-by-student";

type GetTrainingRoutinesByStudentInput = {
	month: number;
	year: number;
};

export async function getTrainingRoutinesByStudentAction( {
	month,
	year,
}: GetTrainingRoutinesByStudentInput ) {
	try {
		const session = await getAuthenticatedSession();

		if (!session) {
			throw new Error( "Debes iniciar sesion para ver tus rutinas." );
		}

		if (session.role !== "STUDENT") {
			throw new Error( "No tienes permisos para consultar rutinas de estudiante." );
		}

		return await getAdminTrainingRoutinesByStudentAction( {
			month,
			studentId: session.sub,
			year,
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudieron obtener tus rutinas. ${ message }` );
	}
}

export type StudentTrainingRoutines = Awaited<ReturnType<typeof getTrainingRoutinesByStudentAction>>;
export type StudentTrainingRoutine = StudentTrainingRoutines[ "routines" ][ number ];
export type StudentTrainingRoutineDay = StudentTrainingRoutine[ "routineDays" ][ number ];
