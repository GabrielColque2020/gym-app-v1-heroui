"use server";

import type { Prisma } from "@/generated/prisma/client";
import { QUERY_ACCELERATE_CACHE } from "@/constants/query";
import { getAuthenticatedSession } from "@/features/auth/session";
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

export type MealPlansStudentListItem = Prisma.UserGetPayload<{
	select: typeof studentListSelect;
}>;

export async function getMealPlansStudentsAction(): Promise<MealPlansStudentListItem[]> {
	try {
		const session = await getAuthenticatedSession();

		if (!session) {
			throw new Error( "Debes iniciar sesion para ver los planes alimenticios." );
		}

		if (session.role !== "COACH") {
			throw new Error( "No tienes permisos para consultar estudiantes." );
		}

		return prisma.user.findMany( {
			cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
			orderBy: {
				createdAt: "desc",
			},
			select: studentListSelect,
			where: {
				active: true,
				coachId: session.sub,
				role: "STUDENT",
			},
		} ) as unknown as MealPlansStudentListItem[];
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudo obtener la lista de estudiantes activos. ${ message }` );
	}
}
