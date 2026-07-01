"use server";

import type { Prisma } from "@/generated/prisma/client";
import { QUERY_ACCELERATE_CACHE } from "@/constants/query";
import { requireCoachSession } from "@/features/auth/coach-session";
import prisma from "@/lib/prisma";

const studentListSelect = {
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
} satisfies Prisma.UserSelect;

export type StudentListItem = Prisma.UserGetPayload<{
	select: typeof studentListSelect;
}>;

export async function getStudentsAction(): Promise<StudentListItem[]> {
	try {
		const session = await requireCoachSession( "consultar estudiantes" );

		return await prisma.user.findMany( {
			cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
			orderBy: {
				createdAt: "desc",
			},
			select: studentListSelect,
			where: {
				coachId: session.sub,
				role: "STUDENT",
			},
		} ) as unknown as StudentListItem[];
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudo obtener la lista de estudiantes. ${ message }` );
	}
}
