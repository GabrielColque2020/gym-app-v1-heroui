import type { ActionData } from "@/lib/action-result";
import { unwrapped } from "@/lib/action-result";
import { queryOptions } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getTrainingRoutinesByStudentAction } from "@/features/role/student/training-routine/actions/get-training-routines-by-student";
import { studentTrainingRoutinesQueryKey } from "@/features/training-routine/services/training-routines-keys";

export type TrainingRoutinesByStudent = ActionData<typeof getTrainingRoutinesByStudentAction>;

export function trainingRoutinesQueryOptions( month: number, year: number ) {
	return queryOptions( {
		...QUERY_DEFAULTS.student,
		// La lista muestra el estado de cada dia (pendiente, en curso, terminado),
		// que cambia mientras el estudiante entrena.
		refetchOnMount: "always",
		queryFn: () => unwrapped( getTrainingRoutinesByStudentAction )( { month, year } ),
		queryKey: studentTrainingRoutinesQueryKey( month, year ),
	} );
}
