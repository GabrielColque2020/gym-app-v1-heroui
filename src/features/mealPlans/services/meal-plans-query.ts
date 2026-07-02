import { queryOptions } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getMealPlansByStudentAction } from "@/features/mealPlans/actions/get-meal-plans-by-student";

export const mealPlansQueryKey = ( studentId: string ) => [ "meal-plans", studentId ] as const;

export type MealPlansByStudent = Awaited<ReturnType<typeof getMealPlansByStudentAction>>;

export function mealPlansQueryOptions( studentId: string ) {
	return queryOptions( {
		...QUERY_DEFAULTS.coach,
		queryFn: () => getMealPlansByStudentAction( { studentId } ),
		queryKey: mealPlansQueryKey( studentId ),
	} );
}
