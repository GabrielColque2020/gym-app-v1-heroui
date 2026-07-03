"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { saveRoutineDayExercisesAction } from "@/features/routine/actions/routine-day-mutations";
import { syncRoutineDayAfterSave } from "@/features/routine/hooks/use-routine-day-mutations.utils";

export function useSaveRoutineDayExercises() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: saveRoutineDayExercisesAction,
		onSuccess: async ( savedRoutineDay, input ) => {
			await syncRoutineDayAfterSave( queryClient, savedRoutineDay, input );
		},
	} );
}
