import { queryOptions } from "@tanstack/react-query";

import { getTrainingRoutinesStudentsAction } from "@/features/admin/trainingRoutinesStudents/actions/get-training-routines-students";

export const TRAINING_ROUTINES_STUDENTS_QUERY_KEY = [ "training-routines-students" ] as const;

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
