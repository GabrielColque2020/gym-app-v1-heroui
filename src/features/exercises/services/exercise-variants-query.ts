import { queryOptions } from "@tanstack/react-query";

import { QUERY_VOLATILE_DEFAULTS } from "@/constants/query";
import { getExerciseVariantsAction, searchExerciseVariantCandidatesAction, } from "@/features/exercises/actions/exercise-variants";
import type { BodyPartFilter } from "@/features/exercises/services/exercise-form";

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
		...QUERY_VOLATILE_DEFAULTS,
		enabled: enabled && Boolean( routineId ),
		queryFn: () => getExerciseVariantsAction( { routineId } ),
		queryKey: exerciseVariantsQueryKey( routineId )
	} );
}

export function exerciseVariantCandidatesQueryOptions(
	exerciseId: string,
	query: string,
	bodyPart: BodyPartFilter,
	enabled = true,
) {
	return queryOptions( {
		...QUERY_VOLATILE_DEFAULTS,
		enabled: enabled && Boolean( exerciseId ),
		queryFn: () => searchExerciseVariantCandidatesAction( {
			exerciseId,
			bodyPart,
			query,
		} ),
		queryKey: exerciseVariantCandidatesQueryKey( exerciseId, query, bodyPart ),
		refetchOnWindowFocus: false,
	} );
}
