import { useQuery } from "@tanstack/react-query";

import { mealPlansQueryOptions } from "@/features/role/student/meal-plans/services/meal-plans-query";

// Usa la consulta del estudiante, que pide el plan cada vez que se abre la
// pantalla. Antes tomaba la del entrenador, que lo deja una hora sin volver a pedir.
export function useMealPlans( studentId: string ) {
	return useQuery( mealPlansQueryOptions( studentId ) );
}
