"use client";

import { unwrapped } from "@/lib/action-result";
import { useQuery } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import {
	getLatestTrainingRoutineMonthAction,
	getTrainingRoutineCopySourceAction,
} from "@/features/training-routine/actions/copy-training-routine";
import { trainingRoutineCopySourceQueryKey } from "@/features/training-routine/services/training-routine-copy";

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
		...QUERY_DEFAULTS.coach,
		enabled: Boolean( studentId && month && year ),
		queryFn: () => unwrapped( getTrainingRoutineCopySourceAction )( { month, studentId, year } ),
		queryKey: trainingRoutineCopySourceQueryKey( studentId, month, year ),
	} );
}

// El ultimo mes con rutina anterior a `month`/`year`. No usa la cache larga del
// coach: crear, copiar o borrar una rutina cambia la respuesta.
// Con `inclusive` cuenta tambien ese mes: sirve cuando el origen es otro estudiante.
export function useLatestTrainingRoutineMonth( {
	inclusive = false,
	month,
	studentId,
	year,
}: UseTrainingRoutineCopySourceParams & { inclusive?: boolean } ) {
	return useQuery( {
		enabled: Boolean( studentId && month && year ),
		queryFn: () => unwrapped( getLatestTrainingRoutineMonthAction )( { inclusive, month, studentId, year } ),
		queryKey: [ "training-routine-latest-month", studentId, month, year, inclusive ] as const,
		staleTime: 0,
	} );
}
