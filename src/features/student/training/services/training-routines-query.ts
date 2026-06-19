import { queryOptions } from "@tanstack/react-query";

import { getTrainingRoutinesByStudentAction } from "@/features/student/training/actions/get-training-routines-by-student";

export const trainingRoutinesQueryKey = ( month: number, year: number ) =>
	[ "student-training-routines", month, year ] as const;

export function trainingRoutinesQueryOptions( month: number, year: number ) {
	return queryOptions( {
		queryFn: () => getTrainingRoutinesByStudentAction( { month, year } ),
		queryKey: trainingRoutinesQueryKey( month, year ),
		refetchOnWindowFocus: true,
		staleTime: 60_000,
	} );
}
