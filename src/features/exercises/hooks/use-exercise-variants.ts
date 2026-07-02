"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { setExerciseVariantsAction } from "@/features/exercises/actions/exercise-variants";
import {
	exerciseVariantCandidatesQueryOptions,
	exerciseVariantsQueryKey,
	exerciseVariantsQueryOptions,
} from "@/features/exercises/services/exercise-variants-query";
import type { BodyPartFilter } from "@/features/exercises/services/exercise-form";

function invalidateExerciseVariantQueries( queryClient: ReturnType<typeof useQueryClient>, routineId: string ) {
	void queryClient.invalidateQueries( {
		queryKey: exerciseVariantsQueryKey( routineId ),
	} );
}

export function useExerciseVariants( routineId: string, enabled = true ) {
	return useQuery( exerciseVariantsQueryOptions( routineId, enabled ) );
}

export function useExerciseVariantCandidates(
	exerciseId: string,
	query: string,
	bodyPart: BodyPartFilter,
	enabled = true,
) {
	return useQuery( exerciseVariantCandidatesQueryOptions( exerciseId, query, bodyPart, enabled ) );
}

export function useSaveExerciseVariants( routineId: string ) {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: setExerciseVariantsAction,
		onSuccess: ( savedVariants ) => {
			queryClient.setQueryData( exerciseVariantsQueryKey( routineId ), savedVariants );
			invalidateExerciseVariantQueries( queryClient, routineId );
		},
	} );
}

export { exerciseVariantsQueryKey };
