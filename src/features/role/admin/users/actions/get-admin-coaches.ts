"use server";

import type { ActionResult } from "@/lib/action-result";
import { runAction } from "@/lib/run-action";
import { requireAdminSession } from "@/features/auth/admin-session";
import { adminCoachSelect } from "@/features/role/admin/users/services/admin-coach-select";
import prisma from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

export type AdminCoachListItem = Prisma.UserGetPayload<{
	select: typeof adminCoachSelect;
}>;

export async function getAdminCoachesAction(): Promise<ActionResult<AdminCoachListItem[]>> {
	return runAction( "No se pudo obtener la lista de entrenadores.", async () => {
		await requireAdminSession( "consultar entrenadores" );

		return await prisma.user.findMany( {
			orderBy: [
				{ active: "desc" },
				{ name: "asc" },
			],
			select: adminCoachSelect,
			where: {
				role: "COACH",
			},
		} ) as unknown as AdminCoachListItem[];
	} );
}
