"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getTrainingRoutinesByStudentBase } from "@/features/training-routine/services/training-routines-by-student";
import { coachTrainingRoutinesQueryKey } from "@/features/training-routine/services/training-routines-keys";

type UseTrainingRoutinesParams = {
	month: number;
	studentId: string | null;
	year: number;
};

export function useTrainingRoutines( { month, studentId, year }: UseTrainingRoutinesParams ) {
	return useQuery( {
		...QUERY_DEFAULTS.coach,
		enabled: Boolean( studentId ),
		queryFn: () => getTrainingRoutinesByStudentBase( {
			month,
			studentId: studentId ?? "",
			year,
		} ),
		queryKey: coachTrainingRoutinesQueryKey( studentId ?? "missing-student", month, year ),
	} );
}
