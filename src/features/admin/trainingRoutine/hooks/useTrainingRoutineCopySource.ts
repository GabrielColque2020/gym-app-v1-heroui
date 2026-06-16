"use client";

import { useQuery } from "@tanstack/react-query";

import { getTrainingRoutineCopySourceAction } from "@/features/admin/trainingRoutine/actions/copy-training-routine";
import { trainingRoutineCopySourceQueryKey } from "@/features/admin/trainingRoutine/services/training-routine-copy";

type UseTrainingRoutineCopySourceParams = {
	month: number;
	studentId: string;
	year: number;
};

export function useTrainingRoutineCopySource( {
	month,
	studentId,
	year,
}: UseTrainingRoutineCopySourceParams ) {
	return useQuery( {
		enabled: Boolean( studentId && month && year ),
		queryFn: () => getTrainingRoutineCopySourceAction( { month, studentId, year } ),
		queryKey: trainingRoutineCopySourceQueryKey( studentId, month, year ),
		refetchOnWindowFocus: true,
		staleTime: 60_000,
	} );
}
