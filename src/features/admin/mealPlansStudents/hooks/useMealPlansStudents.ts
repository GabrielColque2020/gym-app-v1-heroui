"use client";

import { useQuery } from "@tanstack/react-query";

import { mealPlansStudentsQueryOptions } from "@/features/admin/mealPlansStudents/services/meal-plans-students-query";

export function useMealPlansStudents() {
	return useQuery( mealPlansStudentsQueryOptions() );
}
