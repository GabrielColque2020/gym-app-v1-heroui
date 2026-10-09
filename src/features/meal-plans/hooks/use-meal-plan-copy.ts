"use client";

import { unwrapped } from "@/lib/action-result";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { QUERY_VOLATILE_DEFAULTS } from "@/constants/query";
import { copyMealPlanAction, getMealPlanCopySourcesAction } from "@/features/meal-plans/actions/copy-meal-plan";
import { mealPlansQueryKey } from "@/features/meal-plans/services/meal-plans-query";

// Desenvueltas aca y no dentro de `useMutation`: ahi TypeScript perdia el tipo
// de lo que devuelven.
const copyMealPlan = unwrapped( copyMealPlanAction );

// Se piden al abrir el drawer y no se guardan: dependen de lo que tengan
// cargado los demas estudiantes en ese momento.
export function useMealPlanCopySources( studentId: string, enabled: boolean ) {
	return useQuery( {
		...QUERY_VOLATILE_DEFAULTS,
		enabled,
		queryFn: () => unwrapped( getMealPlanCopySourcesAction )( { studentId } ),
		queryKey: [ "meal-plan-copy-sources", studentId ] as const,
		refetchOnWindowFocus: false,
	} );
}

export function useCopyMealPlan() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: copyMealPlan,
		onSuccess: async ( _result, input ) => {
			await queryClient.invalidateQueries( {
				queryKey: mealPlansQueryKey( input.studentId ),
			} );
		},
	} );
}
