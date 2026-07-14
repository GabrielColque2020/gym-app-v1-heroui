import type { QueryClient } from "@tanstack/react-query";

import type { RoutineDayDetailBase } from "@/features/routine/actions/get-routine-day";
import type { TrainingRoutinesByStudent } from "@/features/training-routine/services/training-routines-by-student";
import { coachTrainingRoutinesQueryKey } from "@/features/training-routine/services/training-routines-keys";

export function syncCoachTrainingRoutinesAfterSave(
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
