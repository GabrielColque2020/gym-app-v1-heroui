import { queryOptions } from "@tanstack/react-query";

import { getMealPlansByStudentAction } from "@/features/admin/mealPlans/actions/get-meal-plans-by-student";

export const mealPlansQueryKey = ( studentId: string ) => [ "meal-plans", studentId ] as const;

export type MealPlansByStudent = Awaited<ReturnType<typeof getMealPlansByStudentAction>>;

export async function fetchMealPlansByStudent( studentId: string ): Promise<MealPlansByStudent> {
	return getMealPlansByStudentAction( { studentId } );
}

export const mealPlansQueryOptions = ( studentId: string ) => queryOptions( {
	queryFn: () => fetchMealPlansByStudent( studentId ),
	queryKey: mealPlansQueryKey( studentId ),
	refetchOnWindowFocus: true,
	staleTime: 60_000,
} );
