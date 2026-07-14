"use client";

import type { QueryClient } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { RoutineDayDetailBase } from "@/features/routine/actions/get-routine-day";
import { saveRoutineDayExercisesAction } from "@/features/routine/actions/routine-day-mutations";
import type { SaveRoutineDayExercisesActionInput } from "@/features/routine/actions/routine-day-mutations";
import { syncRoutineDayAfterSave } from "@/features/routine/hooks/use-routine-day-mutations.utils";

type UseSaveRoutineDayExercisesOptions = {
	onSuccessAction?: (
		queryClient: QueryClient,
		savedRoutineDay: RoutineDayDetailBase,
		input: SaveRoutineDayExercisesActionInput,
	) => void | Promise<void>;
};

export function useSaveRoutineDayExercises( options?: UseSaveRoutineDayExercisesOptions ) {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: saveRoutineDayExercisesAction,
		onSuccess: async ( savedRoutineDay, input ) => {
			await syncRoutineDayAfterSave( queryClient, savedRoutineDay, input );
			await options?.onSuccessAction?.( queryClient, savedRoutineDay as RoutineDayDetailBase, input );
		},
	} );
}
