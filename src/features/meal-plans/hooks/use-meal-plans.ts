"use client";

import { useQuery } from "@tanstack/react-query";

import { mealPlansQueryOptions } from "@/features/meal-plans/services/meal-plans-query";

export function useMealPlans( studentId: string ) {
	return useQuery( mealPlansQueryOptions( studentId ) );
}
