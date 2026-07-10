"use server";

import { QUERY_ACCELERATE_CACHE } from "@/constants/query";
import { requireAdminSession } from "@/features/auth/admin-session";
import { adminUserSelect } from "@/features/role/admin/users/services/admin-user-select";
import prisma from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

export type AdminUserListItem = Prisma.UserGetPayload<{
	select: typeof adminUserSelect;
}>;

export async function getAdminUsersAction(): Promise<AdminUserListItem[]> {
	try {
		await requireAdminSession( "consultar usuarios" );

		return await prisma.user.findMany( {
			cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
			orderBy: [
				{ role: "asc" },
				{ active: "desc" },
				{ name: "asc" },
			],
			select: adminUserSelect,
		} ) as unknown as AdminUserListItem[];
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudo obtener la lista de usuarios. ${ message }` );
	}
}
