import { queryOptions } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getTrainingRoutinesByStudentBase } from "@/features/trainingRoutine/services/training-routines-by-student";
import { coachTrainingRoutinesQueryKey } from "@/features/trainingRoutine/services/training-routines.keys";

export type TrainingRoutinesByStudent = Awaited<ReturnType<typeof getTrainingRoutinesByStudentBase>>;

export function trainingRoutinesQueryOptions( studentId: string, month: number, year: number ) {
	return queryOptions( {
		...QUERY_DEFAULTS.coach,
		queryFn: () => getTrainingRoutinesByStudentBase( { month, studentId, year } ),
		queryKey: coachTrainingRoutinesQueryKey( studentId, month, year ),
	} );
}
