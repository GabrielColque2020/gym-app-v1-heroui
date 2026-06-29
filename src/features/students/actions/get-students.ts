"use server";

import { requireCoachSession } from "@/features/auth/coach-session";
import prisma from "@/lib/prisma";

export async function getStudentsAction() {
	try {
		const session = await requireCoachSession( "consultar estudiantes" );

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
				coachId: session.sub,
				role: "STUDENT",
			},
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudo obtener la lista de estudiantes. ${ message }` );
	}
}

export type StudentListItem = Awaited<ReturnType<typeof getStudentsAction>>[ number ];
