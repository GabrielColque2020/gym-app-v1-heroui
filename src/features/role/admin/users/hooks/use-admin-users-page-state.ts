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

export type AdminUsersInitialFilters = {
	onlyWithoutCoach: boolean;
	role: AdminUserRoleFilter;
	status: AdminUserStatusFilter;
};

// Un estudiante activo sin entrenador, o con uno desactivado: nadie le arma la rutina.
export function isStudentWithoutCoach( user: AdminUserListItem ) {
	return user.role === "STUDENT" && user.active && !user.coach?.active;
}

export function useAdminUsersPageState( users: AdminUserListItem[], initialFilters?: AdminUsersInitialFilters ) {
	const [ search, setSearch ] = useState( "" );
	const [ roleFilter, setRoleFilter ] = useState<AdminUserRoleFilter>( initialFilters?.role ?? "ALL" );
	const [ statusFilter, setStatusFilter ] = useState<AdminUserStatusFilter>( initialFilters?.status ?? "ALL" );
	const [ onlyWithoutCoach, setOnlyWithoutCoach ] = useState( initialFilters?.onlyWithoutCoach ?? false );
	const withoutCoachCount = useMemo( () => users.filter( isStudentWithoutCoach ).length, [ users ] );

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

			return matchesSearch && matchesRole && matchesStatus && ( !onlyWithoutCoach || isStudentWithoutCoach( user ) );
		} );
	}, [ onlyWithoutCoach, roleFilter, search, statusFilter, users ] );

	return {
		ADMIN_USER_ROLE_FILTERS,
		ADMIN_USER_STATUS_FILTERS,
		filteredUsers,
		onlyWithoutCoach,
		roleFilter,
		search,
		setRoleFilter,
		setSearch,
		setStatusFilter,
		statusFilter,
		toggleOnlyWithoutCoach: () => setOnlyWithoutCoach( ( current ) => !current ),
		withoutCoachCount,
	};
}
