import { queryOptions } from "@tanstack/react-query";

import {
	getExerciseVariantsAction,
	searchExerciseVariantCandidatesAction,
} from "@/features/admin/exercises/actions/exercise-variants";
import type { BodyPartFilter } from "@/features/admin/exercises/services/exercise-form";

export const exerciseVariantsQueryKey = ( routineId: string ) =>
	[ "admin-exercise-variants", routineId, "list" ] as const;

export const exerciseVariantCandidatesQueryKey = (
	exerciseId: string,
	query: string,
	bodyPart: BodyPartFilter,
) =>
	[ "admin-exercise-variants", exerciseId, "search", query, bodyPart ] as const;

export function exerciseVariantsQueryOptions( routineId: string, enabled = true ) {
	return queryOptions( {
		enabled: enabled && Boolean( routineId ),
		queryFn: () => getExerciseVariantsAction( { routineId } ),
		queryKey: exerciseVariantsQueryKey( routineId ),
		refetchOnWindowFocus: true,
		staleTime: 0,
	} );
}

export function exerciseVariantCandidatesQueryOptions(
	exerciseId: string,
	query: string,
	bodyPart: BodyPartFilter,
	enabled = true,
) {
	return queryOptions( {
		enabled: enabled && Boolean( exerciseId ),
		queryFn: () => searchExerciseVariantCandidatesAction( {
			exerciseId,
			bodyPart,
			query,
		} ),
		queryKey: exerciseVariantCandidatesQueryKey( exerciseId, query, bodyPart ),
		refetchOnWindowFocus: false,
		staleTime: 0,
	} );
}
