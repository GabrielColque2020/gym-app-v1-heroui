import type { QueryClient } from "@tanstack/react-query";

import type { AdminUserListItem } from "@/features/role/admin/users/actions/get-admin-users";
import { ADMIN_USERS_QUERY_KEY } from "@/features/role/admin/users/services/admin-users-query";

export function replaceAdminUserInCache( queryClient: QueryClient, updatedUser: AdminUserListItem ) {
	queryClient.setQueryData<AdminUserListItem[]>( ADMIN_USERS_QUERY_KEY, ( currentUsers ) => {
		if (!currentUsers) return currentUsers;

		return currentUsers.map( ( user ) => user.id === updatedUser.id ? updatedUser : user );
	} );
}

export function prependAdminUserInCache( queryClient: QueryClient, user: AdminUserListItem ) {
	queryClient.setQueryData<AdminUserListItem[]>( ADMIN_USERS_QUERY_KEY, ( currentUsers ) => {
		if (!currentUsers) return [ user ];

		return [ user, ...currentUsers ];
	} );
}
