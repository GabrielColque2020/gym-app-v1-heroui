"use client";

import { unwrapped } from "@/lib/action-result";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
	ADMIN_EXERCISE_GLOBALS_QUERY_KEY,
	adminExerciseGlobalsQueryOptions,
} from "@/features/role/admin/exercises/services/admin-exercise-globals-query";
import { updateAdminExerciseGlobalAction } from "@/features/role/admin/exercises/actions/admin-exercise-global-mutations";

// Desenvueltas aca y no dentro de `useMutation`: ahi TypeScript perdia el tipo
// de lo que devuelven.
const updateAdminExerciseGlobal = unwrapped( updateAdminExerciseGlobalAction );

export function useAdminExerciseGlobals() {
	return useQuery( adminExerciseGlobalsQueryOptions() );
}

export function useUpdateAdminExerciseGlobal() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: updateAdminExerciseGlobal,
		onSuccess: async () => {
			await queryClient.invalidateQueries( { queryKey: ADMIN_EXERCISE_GLOBALS_QUERY_KEY } );
		},
	} );
}
