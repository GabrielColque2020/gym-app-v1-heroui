import { queryOptions } from "@tanstack/react-query";

import { getMealPlansByStudentAction } from "@/features/student/mealPlans/actions/get-meal-plans-by-student";

export const mealPlansQueryKey = ( studentId: string ) => [ "student-meal-plans", studentId ] as const;

export type StudentMealPlansByStudent = Awaited<ReturnType<typeof getMealPlansByStudentAction>>;

export function mealPlansQueryOptions( studentId: string ) {
	return queryOptions( {
		queryFn: () => getMealPlansByStudentAction( { studentId } ),
		queryKey: mealPlansQueryKey( studentId ),
		refetchOnWindowFocus: true,
		staleTime: 60_000,
	} );
}
