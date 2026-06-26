import { queryOptions } from "@tanstack/react-query";

import { getTrainingRoutinesByStudentBase } from "@/features/trainingRoutine/services/training-routines-by-student";
import { adminTrainingRoutinesQueryKey } from "@/features/trainingRoutine/services/training-routines.keys";

export type TrainingRoutinesByStudent = Awaited<ReturnType<typeof getTrainingRoutinesByStudentBase>>;

export function trainingRoutinesQueryOptions( studentId: string, month: number, year: number ) {
	return queryOptions( {
		queryFn: () => getTrainingRoutinesByStudentBase( { month, studentId, year } ),
		queryKey: adminTrainingRoutinesQueryKey( studentId, month, year ),
		refetchOnWindowFocus: true,
		staleTime: 60_000,
	} );
}
