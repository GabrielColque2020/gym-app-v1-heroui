import { queryOptions } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getMealPlansByStudentAction } from "@/features/meal-plans/actions/get-meal-plans-by-student";
export type { MealPlansByStudent } from "@/features/meal-plans/types/meal-plans-types";

export const mealPlansQueryKey = ( studentId: string ) => [ "meal-plans", studentId ] as const;

export function mealPlansQueryOptions( studentId: string ) {
	return queryOptions( {
		...QUERY_DEFAULTS.coach,
		queryFn: () => getMealPlansByStudentAction( { studentId } ),
		queryKey: mealPlansQueryKey( studentId ),
	} );
}
