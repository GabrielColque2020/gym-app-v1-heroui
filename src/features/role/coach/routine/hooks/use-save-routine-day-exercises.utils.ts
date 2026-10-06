import type { QueryClient } from "@tanstack/react-query";

import type { RoutineDayDetailBase } from "@/features/routine/actions/get-routine-day";
import type { TrainingRoutinesByStudent } from "@/features/training-routine/services/training-routines-by-student";
import { coachTrainingRoutinesQueryKey } from "@/features/training-routine/services/training-routines-keys";

export async function syncCoachTrainingRoutinesAfterSave(
	queryClient: QueryClient,
	savedRoutineDay: RoutineDayDetailBase,
) {
	const studentId = savedRoutineDay.trainingRoutine.student.id;
	const { month, year } = savedRoutineDay.trainingRoutine;
	const queryKey = coachTrainingRoutinesQueryKey( studentId, month, year );

	// Si justo se estaba pidiendo el mes (al volver del editor a la pantalla del
	// mes, mientras sale el ultimo guardado), ese pedido puede haber leido la base
	// antes de este guardado: se descarta y se vuelve a pedir despues.
	const wasFetching = queryClient.isFetching( { queryKey } ) > 0;

	if (wasFetching) await queryClient.cancelQueries( { queryKey } );

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
	// No se vuelve a pedir el mes: lo que cambio ya quedo aplicado arriba. Salvo que
	// se haya descartado un pedido en curso, que traia lo que cargo el estudiante.
	if (wasFetching) void queryClient.invalidateQueries( { queryKey } );
}
