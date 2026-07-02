"use client";
import { useQuery } from "@tanstack/react-query";
import { trainingRoutinesQueryOptions } from "@/features/role/student/training-routine/services/training-routines-query";
type UseTrainingRoutinesParams = { month: number; year: number };
export function useTrainingRoutines( { month, year }: UseTrainingRoutinesParams ) {
	return useQuery( trainingRoutinesQueryOptions( month, year ) );
}
