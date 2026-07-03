import { queryOptions } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import type { MealPlansByStudent } from "@/features/meal-plans/types/meal-plans-types";
import { getMealPlansByStudentAction } from "@/features/role/student/meal-plans/actions/get-meal-plans-by-student";

export const mealPlansQueryKey = ( studentId: string ) => [ "student-meal-plans", studentId ] as const;

export type StudentMealPlansByStudent = MealPlansByStudent;

export function mealPlansQueryOptions( studentId: string ) {
	return queryOptions( {
		...QUERY_DEFAULTS.student,
		queryFn: () => getMealPlansByStudentAction( { studentId } ),
		queryKey: mealPlansQueryKey( studentId ),
	} );
}
