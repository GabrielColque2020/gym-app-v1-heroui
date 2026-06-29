"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getTrainingRoutineCopySourceAction } from "@/features/trainingRoutine/actions/copy-training-routine";
import { trainingRoutineCopySourceQueryKey } from "@/features/trainingRoutine/services/training-routine-copy";

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
		...QUERY_DEFAULTS.admin,
		enabled: Boolean( studentId && month && year ),
		queryFn: () => getTrainingRoutineCopySourceAction( { month, studentId, year } ),
		queryKey: trainingRoutineCopySourceQueryKey( studentId, month, year ),
	} );
}
