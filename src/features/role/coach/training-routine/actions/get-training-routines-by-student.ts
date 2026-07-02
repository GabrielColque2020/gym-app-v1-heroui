"use server";

import { requireCoachSession } from "@/features/auth/coach-session";
import prisma from "@/lib/prisma";
import {
	getTrainingRoutinesByStudentBase,
	type TrainingRoutine,
	type TrainingRoutineDay,
} from "@/features/trainingRoutine/services/training-routines-by-student";

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
	try {
		const session = await requireCoachSession( "consultar rutinas del estudiante" );
		const student = await prisma.user.findFirst( {
			select: {
				id: true,
			},
			where: {
				active: true,
				coachId: session.sub,
				id: studentId,
				role: "STUDENT",
			},
		} );

		if (!student) {
			throw new Error( "No se encontro un estudiante activo para consultar rutinas." );
		}

		return await getTrainingRoutinesByStudentBase( {
			coachId: session.sub,
			month,
			studentId,
			year,
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudieron obtener las rutinas del estudiante. ${ message }` );
	}
}
export type CoachTrainingRoutine = TrainingRoutine;
export type CoachTrainingRoutineDay = TrainingRoutineDay;
