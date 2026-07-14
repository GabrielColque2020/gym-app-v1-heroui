import type { QueryClient } from "@tanstack/react-query";

import type { AdminUserListItem } from "@/features/role/admin/users/actions/get-admin-users";
import type { AdminCoachListItem } from "@/features/role/admin/users/actions/get-admin-coaches";
import { ADMIN_COACHES_QUERY_KEY } from "@/features/role/admin/users/services/admin-coaches-query";

function sortAdminCoaches( coaches: AdminCoachListItem[] ) {
	return [ ...coaches ].sort( ( left, right ) => {
		if (left.active !== right.active) {
			return left.active ? -1 : 1;
		}

		return left.name.localeCompare( right.name, "es", { sensitivity: "base" } );
	} );
}

function toAdminCoachListItem( user: AdminUserListItem ): AdminCoachListItem {
	return {
		active: user.active,
		dni: user.dni,
		email: user.email,
		id: user.id,
		name: user.name,
		role: user.role,
	};
}

export function prependAdminCoachInCache( queryClient: QueryClient, createdCoach: AdminUserListItem ) {
	if (createdCoach.role !== "COACH") return;

	queryClient.setQueryData<AdminCoachListItem[]>( ADMIN_COACHES_QUERY_KEY, ( currentCoaches ) => {
		if (!currentCoaches) return currentCoaches;

		return sortAdminCoaches( [
			toAdminCoachListItem( createdCoach ),
			...currentCoaches.filter( ( coach ) => coach.id !== createdCoach.id ),
		] );
	} );
}

export function replaceAdminCoachInCache( queryClient: QueryClient, updatedCoach: AdminCoachListItem ) {
	queryClient.setQueryData<AdminCoachListItem[]>( ADMIN_COACHES_QUERY_KEY, ( currentCoaches ) => {
		if (!currentCoaches) return currentCoaches;

		return sortAdminCoaches(
			currentCoaches.map( ( coach ) => coach.id === updatedCoach.id ? updatedCoach : coach ),
		);
	} );
}

export function removeAdminCoachFromCache( queryClient: QueryClient, coachId: string ) {
	queryClient.setQueryData<AdminCoachListItem[]>( ADMIN_COACHES_QUERY_KEY, ( currentCoaches ) => {
		if (!currentCoaches) return currentCoaches;

		return currentCoaches.filter( ( coach ) => coach.id !== coachId );
	} );
}
