"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
	ADMIN_EXERCISE_GLOBALS_QUERY_KEY,
	adminExerciseGlobalsQueryOptions,
} from "@/features/role/admin/exercises/services/admin-exercise-globals-query";
import { updateAdminExerciseGlobalAction } from "@/features/role/admin/exercises/actions/admin-exercise-global-mutations";

export function useAdminExerciseGlobals() {
	return useQuery( adminExerciseGlobalsQueryOptions() );
}

export function useUpdateAdminExerciseGlobal() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: updateAdminExerciseGlobalAction,
		onSuccess: async () => {
			await queryClient.invalidateQueries( { queryKey: ADMIN_EXERCISE_GLOBALS_QUERY_KEY } );
		},
	} );
}
