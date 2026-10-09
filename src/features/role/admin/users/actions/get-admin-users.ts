"use server";

import type { ActionResult } from "@/lib/action-result";
import { runAction } from "@/lib/run-action";
import { requireAdminSession } from "@/features/auth/admin-session";
import { adminUserSelect } from "@/features/role/admin/users/services/admin-user-select";
import prisma from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

export type AdminUserListItem = Prisma.UserGetPayload<{
	select: typeof adminUserSelect;
}>;

export async function getAdminUsersAction(): Promise<ActionResult<AdminUserListItem[]>> {
	return runAction( "No se pudo obtener la lista de usuarios.", async () => {
		await requireAdminSession( "consultar usuarios" );

		return await prisma.user.findMany( {
			orderBy: [
				{ role: "asc" },
				{ active: "desc" },
				{ name: "asc" },
			],
			select: adminUserSelect,
		} ) as unknown as AdminUserListItem[];
	} );
}
