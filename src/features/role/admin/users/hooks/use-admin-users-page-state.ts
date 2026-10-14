"use client";

import { useMemo } from "react";

import type { AdminUserListItem } from "@/features/role/admin/users/actions/get-admin-users";
import { ADMIN_USER_ROLE_FILTERS, ADMIN_USER_STATUS_FILTERS, type AdminUserRoleFilter, type AdminUserStatusFilter } from "@/features/role/admin/users/services/admin-users-query";
import { useUrlFlag, useUrlState, useUrlText } from "@/lib/use-url-state";

function normalizeSearchValue( value: string ) {
	return value
		.normalize( "NFD" )
		.replace( /[\u0300-\u036f]/g, "" )
		.toLowerCase()
		.trim()
		.replace( /\s+/g, " " );
}

// En la URL van en castellano ("?rol=entrenador&estado=activos"): son los que
// arman los contadores de Inicio y se leen en la barra del navegador.
const ROLE_IN_URL: Record<Exclude<AdminUserRoleFilter, "ALL">, string> = {
	ADMIN: "administrador",
	COACH: "entrenador",
	STUDENT: "estudiante",
};
const STATUS_IN_URL: Record<Exclude<AdminUserStatusFilter, "ALL">, string> = {
	ACTIVE: "activos",
	INACTIVE: "inactivos",
};

function fromUrl<T extends string>( map: Record<string, string>, raw: string ) {
	return ( Object.keys( map ).find( ( key ) => map[ key ] === raw ) ?? null ) as T | null;
}

// Un estudiante activo sin entrenador, o con uno desactivado: nadie le arma la rutina.
export function isStudentWithoutCoach( user: AdminUserListItem ) {
	return user.role === "STUDENT" && user.active && !user.coach?.active;
}

// Los filtros viven en la URL: al editar un usuario, recargar o volver, la lista
// sigue como estaba.
export function useAdminUsersPageState( users: AdminUserListItem[] ) {
	const [ search, setSearch ] = useUrlText( "buscar" );
	const [ roleFilter, setRoleFilter ] = useUrlState<AdminUserRoleFilter>( "rol", "ALL", {
		parse: ( raw ) => fromUrl<AdminUserRoleFilter>( ROLE_IN_URL, raw ),
		serialize: ( value ) => ( value === "ALL" ? "" : ROLE_IN_URL[ value ] ),
	} );
	const [ statusFilter, setStatusFilter ] = useUrlState<AdminUserStatusFilter>( "estado", "ALL", {
		parse: ( raw ) => fromUrl<AdminUserStatusFilter>( STATUS_IN_URL, raw ),
		serialize: ( value ) => ( value === "ALL" ? "" : STATUS_IN_URL[ value ] ),
	} );
	const [ onlyWithoutCoach, setOnlyWithoutCoach ] = useUrlFlag( "sinEntrenador" );
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
		toggleOnlyWithoutCoach: () => setOnlyWithoutCoach( !onlyWithoutCoach ),
		withoutCoachCount,
	};
}
