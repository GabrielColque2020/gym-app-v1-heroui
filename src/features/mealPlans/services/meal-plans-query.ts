import { queryOptions } from "@tanstack/react-query";

import { getMealPlansByStudentAction } from "@/features/mealPlans/actions/get-meal-plans-by-student";

export const mealPlansQueryKey = ( studentId: string ) => [ "meal-plans", studentId ] as const;

export type MealPlansByStudent = Awaited<ReturnType<typeof getMealPlansByStudentAction>>;

export function mealPlansQueryOptions( studentId: string ) {
	return queryOptions( {
		queryFn: () => getMealPlansByStudentAction( { studentId } ),
		queryKey: mealPlansQueryKey( studentId ),
		refetchOnWindowFocus: true,
		staleTime: 60_000,
	} );
}
