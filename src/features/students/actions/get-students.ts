"use server";

import { QUERY_ACCELERATE_CACHE } from "@/constants/query";
import { requireCoachSession } from "@/features/auth/coach-session";
import { studentListSelect } from "@/features/students/services/student-select";
import prisma from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

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
