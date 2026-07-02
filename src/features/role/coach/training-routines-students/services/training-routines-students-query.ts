import { queryOptions } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getTrainingRoutinesStudentsAction } from "@/features/role/coach/training-routines-students/actions/get-training-routines-students";

export const TRAINING_ROUTINES_STUDENTS_QUERY_KEY = [ "training-routines-students" ] as const;

export type TrainingRoutinesStudents = Awaited<ReturnType<typeof getTrainingRoutinesStudentsAction>>;

export async function fetchTrainingRoutinesStudents(): Promise<TrainingRoutinesStudents> {
	return getTrainingRoutinesStudentsAction();
}

export const trainingRoutinesStudentsQueryOptions = () => queryOptions( {
	...QUERY_DEFAULTS.coach,
	queryFn: fetchTrainingRoutinesStudents,
	queryKey: TRAINING_ROUTINES_STUDENTS_QUERY_KEY,
} );
