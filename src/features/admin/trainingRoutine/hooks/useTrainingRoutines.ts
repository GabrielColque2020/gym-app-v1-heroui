"use client";

import { useQuery } from "@tanstack/react-query";

import { getTrainingRoutinesByStudentAction } from "@/features/admin/trainingRoutine/actions/get-training-routines-by-student";
import { trainingRoutinesQueryKey } from "@/features/admin/trainingRoutine/services/training-routines-query";

type UseTrainingRoutinesParams = {
	month: number;
	studentId: string | null;
	year: number;
};

export function useTrainingRoutines( { month, studentId, year }: UseTrainingRoutinesParams ) {
	return useQuery( {
		enabled: Boolean( studentId ),
		queryFn: () => getTrainingRoutinesByStudentAction( {
			month,
			studentId: studentId ?? "",
			year,
		} ),
		queryKey: trainingRoutinesQueryKey( studentId ?? "missing-student", month, year ),
		refetchOnWindowFocus: true,
		staleTime: 60_000,
	} );
}
