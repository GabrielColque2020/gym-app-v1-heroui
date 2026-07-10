import type { QueryClient } from "@tanstack/react-query";

import type { AdminCoachListItem } from "@/features/role/admin/users/actions/get-admin-coaches";
import { ADMIN_COACHES_QUERY_KEY } from "@/features/role/admin/users/services/admin-coaches-query";

export function replaceAdminCoachInCache( queryClient: QueryClient, updatedCoach: AdminCoachListItem ) {
	queryClient.setQueryData<AdminCoachListItem[]>( ADMIN_COACHES_QUERY_KEY, ( currentCoaches ) => {
		if (!currentCoaches) return currentCoaches;

		return currentCoaches.map( ( coach ) => coach.id === updatedCoach.id ? updatedCoach : coach );
	} );
}
