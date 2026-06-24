"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
	createMealPlanAction,
	deleteMealPlanAction,
	updateMealPlanAction,
} from "@/features/admin/mealPlans/actions/meal-plan-mutations";
import { mealPlansQueryKey } from "@/features/admin/mealPlans/services/meal-plans-query";

export function useCreateMealPlan() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: createMealPlanAction,
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
		mutationFn: updateMealPlanAction,
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
		mutationFn: deleteMealPlanAction,
		onSuccess: async ( _mealPlan, input ) => {
			await queryClient.invalidateQueries( {
				queryKey: mealPlansQueryKey( input.studentId ),
			} );
		},
	} );
}
