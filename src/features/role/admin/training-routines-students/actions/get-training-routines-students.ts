"use server";

import prisma from "@/lib/prisma";
import { TEMP_COACH_ID } from "@/features/shared/temp-coach";

export async function getTrainingRoutinesStudentsAction() {
	try {
		return await prisma.user.findMany( {
			orderBy: {
				createdAt: "desc",
			},
			select: {
				DescriptionStudent: {
					select: {
						birthDate: true,
						height: true,
						id: true,
						objective: true,
						observations: true,
						weight: true,
					},
				},
				active: true,
				createdAt: true,
				dni: true,
				email: true,
				gender: true,
				id: true,
				name: true,
				updatedAt: true,
			},
			where: {
				active: true,
				coachId: TEMP_COACH_ID,
				role: "STUDENT",
			},
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudo obtener la lista de estudiantes activos. ${ message }` );
	}
}

export type TrainingRoutinesStudentListItem = Awaited<ReturnType<typeof getTrainingRoutinesStudentsAction>>[ number ];
