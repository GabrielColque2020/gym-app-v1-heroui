"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { assignCoachToStudentAction, createCoachAction, toggleUserStatusAction, updateAdminUserAction } from "@/features/role/admin/users/actions/admin-user-mutations";
import { ADMIN_USERS_QUERY_KEY, adminUsersQueryOptions } from "@/features/role/admin/users/services/admin-users-query";
import { prependAdminUserInCache, replaceAdminUserInCache } from "@/features/role/admin/users/hooks/admin-users-cache";

export function useAdminUsers() {
	return useQuery( adminUsersQueryOptions() );
}

export function useCreateCoach() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: createCoachAction,
		onSuccess: ( createdUser ) => {
			prependAdminUserInCache( queryClient, createdUser );
			void queryClient.invalidateQueries( { queryKey: ADMIN_USERS_QUERY_KEY } );
		},
	} );
}

export function useToggleUserStatus() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: toggleUserStatusAction,
		onSuccess: ( updatedUser ) => {
			replaceAdminUserInCache( queryClient, updatedUser );
			void queryClient.invalidateQueries( { queryKey: ADMIN_USERS_QUERY_KEY } );
		},
	} );
}

export function useUpdateAdminUser() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: updateAdminUserAction,
		onSuccess: ( updatedUser ) => {
			replaceAdminUserInCache( queryClient, updatedUser );
			void queryClient.invalidateQueries( { queryKey: ADMIN_USERS_QUERY_KEY } );
		},
	} );
}

export function useAssignCoachToStudent() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: assignCoachToStudentAction,
		onSuccess: ( updatedUser ) => {
			replaceAdminUserInCache( queryClient, updatedUser );
			void queryClient.invalidateQueries( { queryKey: ADMIN_USERS_QUERY_KEY } );
		},
	} );
}
