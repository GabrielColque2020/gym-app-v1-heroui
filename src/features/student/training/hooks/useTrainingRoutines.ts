"use client";

import { useQuery } from "@tanstack/react-query";

import { trainingRoutinesQueryOptions } from "@/features/student/training/services/training-routines-query";

type UseTrainingRoutinesParams = {
	month: number;
	year: number;
};

export function useTrainingRoutines( { month, year }: UseTrainingRoutinesParams ) {
	return useQuery( trainingRoutinesQueryOptions( month, year ) );
}
