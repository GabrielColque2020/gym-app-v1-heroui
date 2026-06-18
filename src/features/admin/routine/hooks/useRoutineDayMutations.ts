"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { saveRoutineDayExercisesAction } from "@/features/admin/routine/actions/routine-day-mutations";
import { routineDayQueryKey } from "@/features/admin/routine/services/routine-day-query";
import { useRoutineDayDraftStore } from "@/features/admin/routine/stores/useRoutineDayDraftStore";

export function useSaveRoutineDayExercises() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: saveRoutineDayExercisesAction,
		onSuccess: async ( savedRoutineDay, input ) => {
			queryClient.setQueryData(
				routineDayQueryKey( input.routineDayId, input.studentId ),
				savedRoutineDay,
			);

			try {
				await queryClient.invalidateQueries( {
					queryKey: routineDayQueryKey( input.routineDayId, input.studentId ),
				} );
			} finally {
				useRoutineDayDraftStore.getState().clearDraft( input.routineDayId );
			}
		},
	} );
}
