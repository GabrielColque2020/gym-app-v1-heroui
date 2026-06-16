"use client";

import { useQuery } from "@tanstack/react-query";

import { trainingRoutinesStudentsQueryOptions } from "@/features/admin/trainingRoutinesStudents/services/training-routines-students-query";

export function useTrainingRoutinesStudents() {
	return useQuery( trainingRoutinesStudentsQueryOptions() );
}
