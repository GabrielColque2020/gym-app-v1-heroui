import { queryOptions } from "@tanstack/react-query";

import { getMealPlansStudentsAction } from "@/features/role/admin/meal-plans-students/actions/get-meal-plans-students";

export const MEAL_PLANS_STUDENTS_QUERY_KEY = [ "meal-plans-students" ] as const;

export type MealPlansStudents = Awaited<ReturnType<typeof getMealPlansStudentsAction>>;

export async function fetchMealPlansStudents(): Promise<MealPlansStudents> {
	return getMealPlansStudentsAction();
}

export const mealPlansStudentsQueryOptions = () => queryOptions( {
	queryFn: fetchMealPlansStudents,
	queryKey: MEAL_PLANS_STUDENTS_QUERY_KEY,
	refetchOnWindowFocus: true,
	staleTime: 60_000,
} );
