"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getTrainingRoutinesByStudentAction } from "@/features/role/admin/training-routine/actions/get-training-routines-by-student";

type UseTrainingRoutinesParams = {
	month: number;
	studentId: string | null;
	year: number;
};

const trainingRoutinesQueryKey = ( studentId: string, month: number, year: number ) =>
	[ "admin-training-routines", studentId, month, year ] as const;

export function useTrainingRoutines( { month, studentId, year }: UseTrainingRoutinesParams ) {
	return useQuery( {
		...QUERY_DEFAULTS.admin,
		enabled: Boolean( studentId ),
		queryFn: () => getTrainingRoutinesByStudentAction( {
			month,
			studentId: studentId ?? "",
			year,
		} ),
		queryKey: trainingRoutinesQueryKey( studentId ?? "missing-student", month, year ),
	} );
}
