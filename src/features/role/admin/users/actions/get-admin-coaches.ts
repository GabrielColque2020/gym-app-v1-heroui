"use server";

import { QUERY_ACCELERATE_CACHE } from "@/constants/query";
import { requireAdminSession } from "@/features/auth/admin-session";
import { adminCoachSelect } from "@/features/role/admin/users/services/admin-coach-select";
import prisma from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

export type AdminCoachListItem = Prisma.UserGetPayload<{
	select: typeof adminCoachSelect;
}>;

export async function getAdminCoachesAction(): Promise<AdminCoachListItem[]> {
	try {
		await requireAdminSession( "consultar coaches" );

		return await prisma.user.findMany( {
			cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
			orderBy: [
				{ active: "desc" },
				{ name: "asc" },
			],
			select: adminCoachSelect,
			where: {
				role: "COACH",
			},
		} ) as unknown as AdminCoachListItem[];
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudo obtener la lista de coaches. ${ message }` );
	}
}
