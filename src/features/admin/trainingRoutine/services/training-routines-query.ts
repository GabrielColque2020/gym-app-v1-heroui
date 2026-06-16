import { queryOptions } from "@tanstack/react-query";

import { getTrainingRoutinesByStudentAction } from "@/features/admin/trainingRoutine/actions/get-training-routines-by-student";

export const trainingRoutinesQueryKey = ( studentId: string, month: number, year: number ) =>
	[ "admin-training-routines", studentId, month, year ] as const;

export function trainingRoutinesQueryOptions( studentId: string, month: number, year: number ) {
	return queryOptions( {
		queryFn: () => getTrainingRoutinesByStudentAction( { month, studentId, year } ),
		queryKey: trainingRoutinesQueryKey( studentId, month, year ),
		refetchOnWindowFocus: true,
		staleTime: 60_000,
	} );
}
