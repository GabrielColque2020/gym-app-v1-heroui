import type { QueryClient } from "@tanstack/react-query";

import type { RoutineDayDetailBase } from "@/features/routine/actions/get-routine-day";
import {
	coachRoutineTemplateDetailQueryKey,
	coachRoutineTemplatesQueryKey,
} from "@/features/role/coach/training-routine/hooks/use-routine-templates";
import type { RoutineTemplateDetail } from "@/features/training-routine/services/routine-template";
import type { TrainingRoutinesByStudent, TrainingRoutineWeek } from "@/features/training-routine/services/training-routines-by-student";
import { coachTrainingRoutinesQueryKey } from "@/features/training-routine/services/training-routines-keys";

// Pone el dia recien guardado dentro de las semanas que la pantalla ya tiene.
function applySavedDayToWeeks( weeks: TrainingRoutineWeek[], savedRoutineDay: RoutineDayDetailBase ) {
	return weeks.map( ( week ) => {
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
	} );
}

export async function syncCoachTrainingRoutinesAfterSave(
	queryClient: QueryClient,
	savedRoutineDay: RoutineDayDetailBase,
) {
	const { month, student, template, year } = savedRoutineDay.trainingRoutine;

	if (template) {
		queryClient.setQueryData<RoutineTemplateDetail | null>(
			coachRoutineTemplateDetailQueryKey( template.id ),
			( currentData ) => currentData
				? { ...currentData, weeks: applySavedDayToWeeks( currentData.weeks, savedRoutineDay ) }
				: currentData,
		);
		// La lista muestra cuantos ejercicios tiene cada plantilla.
		void queryClient.invalidateQueries( { queryKey: coachRoutineTemplatesQueryKey } );

		return;
	}

	if (!student) return;

	const studentId = student.id;
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
				weeks: applySavedDayToWeeks( currentData.routineMonth.weeks, savedRoutineDay ),
			},
		};
	} );
	// No se vuelve a pedir el mes: lo que cambio ya quedo aplicado arriba. Salvo que
	// se haya descartado un pedido en curso, que traia lo que cargo el estudiante.
	if (wasFetching) void queryClient.invalidateQueries( { queryKey } );
}
