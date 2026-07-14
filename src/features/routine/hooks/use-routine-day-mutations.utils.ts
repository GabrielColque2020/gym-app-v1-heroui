import type { QueryClient } from "@tanstack/react-query";

import type { TrainingRoutinesByStudent } from "@/features/training-routine/services/training-routines-by-student";
import type { SaveRoutineDayExercisesActionInput } from "@/features/routine/actions/routine-day-mutations";
import type { RoutineDayDetailBase } from "@/features/routine/actions/get-routine-day";
import { routineDayQueryKey } from "@/features/routine/services/routine-day-query";
import { useRoutineDayDraftStore } from "@/features/routine/stores/use-routine-day-draft-store";
import { coachTrainingRoutinesQueryKey } from "@/features/training-routine/services/training-routines-keys";

function syncCoachTrainingRoutinesCache(
	queryClient: QueryClient,
	savedRoutineDay: RoutineDayDetailBase,
) {
	const studentId = savedRoutineDay.trainingRoutine.student.id;
	const { month, year } = savedRoutineDay.trainingRoutine;
	const queryKey = coachTrainingRoutinesQueryKey( studentId, month, year );

	queryClient.setQueryData<TrainingRoutinesByStudent>( queryKey, ( currentData ) => {
		if (!currentData) return currentData;

		return {
			...currentData,
			routineMonth: {
				...currentData.routineMonth,
				weeks: currentData.routineMonth.weeks.map( ( week ) => {
					if (week.week !== savedRoutineDay.trainingRoutine.week) return week;

					return {
						...week,
						name: savedRoutineDay.trainingRoutine.name,
						routineDays: week.routineDays.map( ( routineDay ) => {
							if (routineDay.id !== savedRoutineDay.id) return routineDay;

							return {
								...routineDay,
								routines: savedRoutineDay.routines,
							};
						} ),
					};
				} ),
			},
		};
	} );

	void queryClient.invalidateQueries( { queryKey } );
}

export async function syncRoutineDayAfterSave(
	queryClient: QueryClient,
	savedRoutineDay: unknown,
	input: SaveRoutineDayExercisesActionInput,
) {
	const queryKey = routineDayQueryKey( input.routineDayId, input.studentId );
	const routineDayDetail = savedRoutineDay as RoutineDayDetailBase;

	queryClient.setQueryData( queryKey, routineDayDetail );
	syncCoachTrainingRoutinesCache( queryClient, routineDayDetail );

	try {
		await queryClient.invalidateQueries( { queryKey } );
	} finally {
		useRoutineDayDraftStore.getState().clearDraft( input.routineDayId );
	}
}
