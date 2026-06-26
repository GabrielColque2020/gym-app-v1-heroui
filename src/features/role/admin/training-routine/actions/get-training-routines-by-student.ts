"use server";

import prisma from "@/lib/prisma";
import { TEMP_COACH_ID } from "@/features/shared/temp-coach";
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
		const student = await prisma.user.findFirst( {
			select: {
				id: true,
			},
			where: {
				active: true,
				coachId: TEMP_COACH_ID,
				id: studentId,
				role: "STUDENT",
			},
		} );

		if (!student) {
			throw new Error( "No se encontro un estudiante activo para consultar rutinas." );
		}

		return await getTrainingRoutinesByStudentBase( {
			coachId: TEMP_COACH_ID,
			month,
			studentId,
			year,
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudieron obtener las rutinas del estudiante. ${ message }` );
	}
}
export type AdminTrainingRoutine = TrainingRoutine;
export type AdminTrainingRoutineDay = TrainingRoutineDay;
