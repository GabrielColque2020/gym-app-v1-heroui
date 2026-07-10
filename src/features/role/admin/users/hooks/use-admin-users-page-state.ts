"use client";

import { useMemo, useState } from "react";

import type { AdminUserListItem } from "@/features/role/admin/users/actions/get-admin-users";
import { ADMIN_USER_ROLE_FILTERS, ADMIN_USER_STATUS_FILTERS, type AdminUserRoleFilter, type AdminUserStatusFilter } from "@/features/role/admin/users/services/admin-users-query";

function normalizeSearchValue( value: string ) {
	return value
		.normalize( "NFD" )
		.replace( /[\u0300-\u036f]/g, "" )
		.toLowerCase()
		.trim()
		.replace( /\s+/g, " " );
}

export function useAdminUsersPageState( users: AdminUserListItem[] ) {
	const [ search, setSearch ] = useState( "" );
	const [ roleFilter, setRoleFilter ] = useState<AdminUserRoleFilter>( "ALL" );
	const [ statusFilter, setStatusFilter ] = useState<AdminUserStatusFilter>( "ALL" );

	const filteredUsers = useMemo( () => {
		const q = normalizeSearchValue( search );

		return users.filter( ( user ) => {
			const matchesSearch = q.length === 0
				|| normalizeSearchValue( user.name ).includes( q )
				|| normalizeSearchValue( user.email ).includes( q )
				|| String( user.dni ).includes( q )
				|| normalizeSearchValue( user.coach?.name ?? "" ).includes( q );

			const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
			const matchesStatus = statusFilter === "ALL"
				|| (statusFilter === "ACTIVE" && user.active)
				|| (statusFilter === "INACTIVE" && !user.active);

			return matchesSearch && matchesRole && matchesStatus;
		} );
	}, [ roleFilter, search, statusFilter, users ] );

	return {
		ADMIN_USER_ROLE_FILTERS,
		ADMIN_USER_STATUS_FILTERS,
		filteredUsers,
		roleFilter,
		search,
		setRoleFilter,
		setSearch,
		setStatusFilter,
		statusFilter,
	};
}
