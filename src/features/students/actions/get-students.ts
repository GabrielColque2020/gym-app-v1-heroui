"use server";

import type { ActionResult } from "@/lib/action-result";
import { runAction } from "@/lib/run-action";
import { requireCoachSession } from "@/features/auth/coach-session";
import { studentListSelect } from "@/features/students/services/student-select";
import prisma from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

export type StudentListItem = Prisma.UserGetPayload<{
	select: typeof studentListSelect;
}>;

export async function getStudentsAction(): Promise<ActionResult<StudentListItem[]>> {
	return runAction( "No se pudo obtener la lista de estudiantes.", async () => {
		const session = await requireCoachSession( "consultar estudiantes" );

		return await prisma.user.findMany( {
			orderBy: {
				createdAt: "desc",
			},
			select: studentListSelect,
			where: {
				coachId: session.sub,
				role: "STUDENT",
			},
		} ) as unknown as StudentListItem[];
	} );
}
