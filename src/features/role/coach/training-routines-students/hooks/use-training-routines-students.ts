"use client";

import { useQuery } from "@tanstack/react-query";

import { trainingRoutinesStudentsQueryOptions } from "@/features/role/coach/training-routines-students/services/training-routines-students-query";

export function useTrainingRoutinesStudents() {
	return useQuery( trainingRoutinesStudentsQueryOptions() );
}
