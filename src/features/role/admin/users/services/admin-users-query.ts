import { queryOptions } from "@tanstack/react-query";

import type { Prisma } from "@/generated/prisma/client";
import { QUERY_DEFAULTS } from "@/constants/query";
import { getAdminUsersAction } from "@/features/role/admin/users/actions/get-admin-users";

export const ADMIN_USERS_QUERY_KEY = [ "admin-users" ] as const;

export type AdminUsers = Awaited<ReturnType<typeof getAdminUsersAction>>;

export async function fetchAdminUsers(): Promise<AdminUsers> {
	return getAdminUsersAction();
}

export const adminUsersQueryOptions = () => queryOptions( {
	...QUERY_DEFAULTS.coach,
	queryFn: fetchAdminUsers,
	queryKey: ADMIN_USERS_QUERY_KEY,
} );

export const ADMIN_USER_ROLE_FILTERS = [ "ALL", "ADMIN", "COACH", "STUDENT" ] as const;
export const ADMIN_USER_STATUS_FILTERS = [ "ALL", "ACTIVE", "INACTIVE" ] as const;

export type AdminUserRoleFilter = typeof ADMIN_USER_ROLE_FILTERS[ number ];
export type AdminUserStatusFilter = typeof ADMIN_USER_STATUS_FILTERS[ number ];

export type AdminUserSelect = Prisma.UserSelect;
