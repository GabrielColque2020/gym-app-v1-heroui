"use server";

import prisma from "@/lib/prisma";

import { getAuthenticatedSession } from "@/features/auth/session";
import { getRoutineDayAction } from "@/features/routine/actions/get-routine-day";
import {
	buildStudentRoutineProgressWhere,
	collectStudentRoutineProgressIds,
} from "@/features/role/student/routine/actions/get-routine-session.utils";
import type { StudentRoutineProgressEntry, StudentRoutineSessionDetail } from "@/features/routine/services/routine-session";

type GetStudentRoutineSessionInput = {
	routineDayId: string;
	studentId?: string | null;
};

export async function getStudentRoutineSessionAction( {
	routineDayId,
	studentId,
}: GetStudentRoutineSessionInput ): Promise<StudentRoutineSessionDetail> {
	try {
		const session = await getAuthenticatedSession();

		if (!session) {
			throw new Error( "Debes iniciar sesion para ver tu rutina." );
		}

		if (session.role !== "STUDENT") {
			throw new Error( "No tienes permisos para consultar esta rutina." );
		}

		const activeStudentId = studentId?.trim() || session.sub;

		if (activeStudentId !== session.sub) {
			throw new Error( "La rutina solicitada no pertenece al estudiante autenticado." );
		}

		const routineDay = await getRoutineDayAction( {
			routineDayId,
			studentId: activeStudentId,
		} );
		const { exerciseIds, variantExerciseIds } = collectStudentRoutineProgressIds( routineDay );
		const progressEntries = ( await prisma.exerciseProgress.findMany( {
			orderBy: [
				{
					date: "desc",
				},
				{
					id: "desc",
				},
			],
			where: buildStudentRoutineProgressWhere( activeStudentId, exerciseIds, variantExerciseIds ),
		} ) ) as unknown as StudentRoutineProgressEntry[];

		return {
			...routineDay,
			progressEntries,
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la rutina del estudiante.";

		throw new Error( `No se pudo obtener la rutina del estudiante. ${ message }` );
	}
}
