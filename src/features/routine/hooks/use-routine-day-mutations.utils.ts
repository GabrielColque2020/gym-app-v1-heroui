import type { QueryClient } from "@tanstack/react-query";

import type { SaveRoutineDayExercisesActionInput } from "@/features/routine/actions/routine-day-mutations";
import { routineDayQueryKey } from "@/features/routine/services/routine-day-query";
import { useRoutineDayDraftStore } from "@/features/routine/stores/use-routine-day-draft-store";

export async function syncRoutineDayAfterSave(
	queryClient: QueryClient,
	savedRoutineDay: unknown,
	input: SaveRoutineDayExercisesActionInput,
) {
	const queryKey = routineDayQueryKey( input.routineDayId, input.studentId );

	queryClient.setQueryData( queryKey, savedRoutineDay );

	try {
		await queryClient.invalidateQueries( { queryKey } );
	} finally {
		useRoutineDayDraftStore.getState().clearDraft( input.routineDayId );
	}
}
