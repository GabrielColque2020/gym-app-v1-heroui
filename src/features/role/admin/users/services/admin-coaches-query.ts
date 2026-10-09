import type { ActionData } from "@/lib/action-result";
import { unwrapped } from "@/lib/action-result";
import { queryOptions } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getAdminCoachesAction } from "@/features/role/admin/users/actions/get-admin-coaches";

export const ADMIN_COACHES_QUERY_KEY = [ "admin-coaches" ] as const;

export type AdminCoaches = ActionData<typeof getAdminCoachesAction>;

export async function fetchAdminCoaches(): Promise<AdminCoaches> {
	return unwrapped( getAdminCoachesAction )();
}

export const adminCoachesQueryOptions = () => queryOptions( {
	...QUERY_DEFAULTS.coach,
	queryFn: fetchAdminCoaches,
	queryKey: ADMIN_COACHES_QUERY_KEY,
} );
