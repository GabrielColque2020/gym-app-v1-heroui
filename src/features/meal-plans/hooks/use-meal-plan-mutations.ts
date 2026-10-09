"use client";

import { unwrapped } from "@/lib/action-result";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
	createMealPlanAction,
	deleteMealPlanAction,
	updateMealPlanAction,
} from "@/features/meal-plans/actions/meal-plan-mutations";
import { mealPlansQueryKey } from "@/features/meal-plans/services/meal-plans-query";

// Desenvueltas aca y no dentro de `useMutation`: ahi TypeScript perdia el tipo
// de lo que devuelven.
const createMealPlan = unwrapped( createMealPlanAction );
const updateMealPlan = unwrapped( updateMealPlanAction );
const deleteMealPlan = unwrapped( deleteMealPlanAction );

export function useCreateMealPlan() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: createMealPlan,
		onSuccess: async ( _mealPlan, input ) => {
			await queryClient.invalidateQueries( {
				queryKey: mealPlansQueryKey( input.studentId ),
			} );
		},
	} );
}

export function useUpdateMealPlan() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: updateMealPlan,
		onSuccess: async ( _mealPlan, input ) => {
			await queryClient.invalidateQueries( {
				queryKey: mealPlansQueryKey( input.studentId ),
			} );
		},
	} );
}

export function useDeleteMealPlan() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: deleteMealPlan,
		onSuccess: async ( _mealPlan, input ) => {
			await queryClient.invalidateQueries( {
				queryKey: mealPlansQueryKey( input.studentId ),
			} );
		},
	} );
}
