"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getTrainingRoutinesByStudentBase } from "@/features/trainingRoutine/services/training-routines-by-student";
import { adminTrainingRoutinesQueryKey } from "@/features/trainingRoutine/services/training-routines.keys";

type UseTrainingRoutinesParams = {
	month: number;
	studentId: string | null;
	year: number;
};

export function useTrainingRoutines( { month, studentId, year }: UseTrainingRoutinesParams ) {
	return useQuery( {
		...QUERY_DEFAULTS.admin,
		enabled: Boolean( studentId ),
		queryFn: () => getTrainingRoutinesByStudentBase( {
			month,
			studentId: studentId ?? "",
			year,
		} ),
		queryKey: adminTrainingRoutinesQueryKey( studentId ?? "missing-student", month, year ),
	} );
}
