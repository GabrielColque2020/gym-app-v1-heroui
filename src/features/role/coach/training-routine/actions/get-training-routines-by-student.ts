"use server";

import { runAction } from "@/lib/run-action";
import { requireCoachSession } from "@/features/auth/coach-session";
import prisma from "@/lib/prisma";
import {
	getTrainingRoutinesByStudentBase,
	type TrainingRoutineMonth,
	type TrainingRoutineWeek,
	type TrainingRoutineDay,
} from "@/features/training-routine/services/training-routines-by-student";

type GetTrainingRoutinesByStudentInput = {
	month: number;
	studentId: string;
	year: number;
};

export async function getTrainingRoutinesByStudentAction( {
	month,
	studentId,
	year,
}: GetTrainingRoutinesByStudentInput ) {
	return runAction( "No se pudieron obtener las rutinas del estudiante.", async () => {
		const session = await requireCoachSession( "consultar rutinas del estudiante" );
		const student = await prisma.user.findFirst( {
			select: {
				id: true,
			},
			// Tambien un estudiante inactivo: el entrenador ve su rutina sin
			// reactivarlo, que le devolveria el acceso a la app.
			where: {
				coachId: session.sub,
				id: studentId,
				role: "STUDENT",
			},
		} );

		if (!student) {
			throw new Error( "No se encontró el estudiante para consultar sus rutinas." );
		}

		return await getTrainingRoutinesByStudentBase( {
			coachId: session.sub,
			month,
			studentId,
			year,
		} );
	} );
}
export type CoachTrainingRoutine = TrainingRoutineWeek;
export type CoachTrainingRoutineDay = TrainingRoutineDay;
export type CoachTrainingRoutineMonth = TrainingRoutineMonth;
