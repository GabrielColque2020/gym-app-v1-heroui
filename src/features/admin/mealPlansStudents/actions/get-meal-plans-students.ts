"use server";

import { getAuthenticatedSession } from "@/features/auth/session";
import prisma from "@/lib/prisma";

export async function getMealPlansStudentsAction() {
	try {
		const session = await getAuthenticatedSession();

		if (!session) {
			throw new Error( "Debes iniciar sesion para ver los planes alimenticios." );
		}

		if (session.role !== "COACH") {
			throw new Error( "No tienes permisos para consultar estudiantes." );
		}

		return prisma.user.findMany( {
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
				coachId: session.sub,
				role: "STUDENT",
			},
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudo obtener la lista de estudiantes activos. ${ message }` );
	}
}

export type MealPlansStudentListItem = Awaited<ReturnType<typeof getMealPlansStudentsAction>>[ number ];
