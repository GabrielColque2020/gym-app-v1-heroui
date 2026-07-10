import { queryOptions } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getAdminCoachesAction } from "@/features/role/admin/users/actions/get-admin-coaches";

export const ADMIN_COACHES_QUERY_KEY = [ "admin-coaches" ] as const;

export type AdminCoaches = Awaited<ReturnType<typeof getAdminCoachesAction>>;

export async function fetchAdminCoaches(): Promise<AdminCoaches> {
	return getAdminCoachesAction();
}

export const adminCoachesQueryOptions = () => queryOptions( {
	...QUERY_DEFAULTS.coach,
	queryFn: fetchAdminCoaches,
	queryKey: ADMIN_COACHES_QUERY_KEY,
} );
