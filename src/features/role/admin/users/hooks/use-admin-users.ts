"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { assignCoachToStudentAction, createAdminStudentAction, createCoachAction, deleteAdminUserAction, toggleUserStatusAction, updateAdminStudentAction, updateAdminUserAction } from "@/features/role/admin/users/actions/admin-user-mutations";
import { ADMIN_USERS_QUERY_KEY, adminUsersQueryOptions } from "@/features/role/admin/users/services/admin-users-query";
import { ADMIN_COACHES_QUERY_KEY } from "@/features/role/admin/users/services/admin-coaches-query";
import { prependAdminUserInCache, removeAdminUserFromCache, replaceAdminUserInCache } from "@/features/role/admin/users/hooks/admin-users-cache";

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
			void queryClient.invalidateQueries( { queryKey: ADMIN_COACHES_QUERY_KEY } );
		},
	} );
}

export function useCreateAdminStudent() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: createAdminStudentAction,
		onSuccess: ( createdStudent ) => {
			prependAdminUserInCache( queryClient, createdStudent );
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
			void queryClient.invalidateQueries( { queryKey: ADMIN_COACHES_QUERY_KEY } );
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
			void queryClient.invalidateQueries( { queryKey: ADMIN_COACHES_QUERY_KEY } );
		},
	} );
}

export function useUpdateAdminStudent() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: updateAdminStudentAction,
		onSuccess: ( updatedStudent ) => {
			replaceAdminUserInCache( queryClient, updatedStudent );
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

export function useDeleteAdminUser() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: deleteAdminUserAction,
		onSuccess: async ( _, input ) => {
			removeAdminUserFromCache( queryClient, input.id );
			await queryClient.invalidateQueries( { queryKey: ADMIN_USERS_QUERY_KEY } );
			await queryClient.invalidateQueries( { queryKey: ADMIN_COACHES_QUERY_KEY } );
		},
	} );
}
