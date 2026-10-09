import { unwrapped } from "@/lib/action-result";
import { queryOptions } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import type { MealPlansByStudent } from "@/features/meal-plans/types/meal-plans-types";
import { getMealPlansByStudentAction } from "@/features/role/student/meal-plans/actions/get-meal-plans-by-student";

export const mealPlansQueryKey = ( studentId: string ) => [ "student-meal-plans", studentId ] as const;

export type StudentMealPlansByStudent = MealPlansByStudent;

export function mealPlansQueryOptions( studentId: string ) {
	return queryOptions( {
		...QUERY_DEFAULTS.student,
		// Se pide al abrir: si el entrenador cambio el plan, el estudiante no sigue
		// viendo el anterior. Mientras llega se muestra lo que ya tenia el telefono.
		refetchOnMount: "always",
		queryFn: () => unwrapped( getMealPlansByStudentAction )( { studentId } ),
		queryKey: mealPlansQueryKey( studentId ),
	} );
}
