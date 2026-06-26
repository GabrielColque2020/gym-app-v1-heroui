"use client";

import { useQuery } from "@tanstack/react-query";

import { mealPlansQueryOptions } from "@/features/mealPlans/services/meal-plans-query";

export function useMealPlans( studentId: string ) {
	return useQuery( mealPlansQueryOptions( studentId ) );
}
