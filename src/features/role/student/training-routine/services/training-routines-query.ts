import { queryOptions } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getTrainingRoutinesByStudentAction } from "@/features/role/student/training-routine/actions/get-training-routines-by-student";
import { studentTrainingRoutinesQueryKey } from "@/features/trainingRoutine/services/training-routines.keys";

export type TrainingRoutinesByStudent = Awaited<ReturnType<typeof getTrainingRoutinesByStudentAction>>;

export function trainingRoutinesQueryOptions( month: number, year: number ) {
	return queryOptions( {
		...QUERY_DEFAULTS.student,
		queryFn: () => getTrainingRoutinesByStudentAction( { month, year } ),
		queryKey: studentTrainingRoutinesQueryKey( month, year ),
	} );
}
