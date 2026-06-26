import { queryOptions } from "@tanstack/react-query";

import { TEMP_COACH_ID } from "@/features/shared/temp-coach";
import { getTrainingRoutinesStudentsAction } from "@/features/role/admin/training-routines-students/actions/get-training-routines-students";

export const TRAINING_ROUTINES_STUDENTS_QUERY_KEY = [ "training-routines-students", TEMP_COACH_ID ] as const;

export type TrainingRoutinesStudents = Awaited<ReturnType<typeof getTrainingRoutinesStudentsAction>>;

export async function fetchTrainingRoutinesStudents(): Promise<TrainingRoutinesStudents> {
	return getTrainingRoutinesStudentsAction();
}

export const trainingRoutinesStudentsQueryOptions = () => queryOptions( {
	queryFn: fetchTrainingRoutinesStudents,
	queryKey: TRAINING_ROUTINES_STUDENTS_QUERY_KEY,
	refetchOnWindowFocus: true,
	staleTime: 60_000,
} );
