"use client";

import { useQuery } from "@tanstack/react-query";

import { mealPlansStudentsQueryOptions } from "@/features/role/admin/meal-plans-students/services/meal-plans-students-query";

export function useMealPlansStudents() {
	return useQuery( mealPlansStudentsQueryOptions() );
}
