import { queryOptions } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getCoachExercisesAction } from "@/features/role/coach/exercises/actions/coach-exercises";

export const COACH_EXERCISES_QUERY_KEY = [ "coach-exercises" ] as const;

export type CoachExercises = Awaited<ReturnType<typeof getCoachExercisesAction>>;

export async function fetchCoachExercises(): Promise<CoachExercises> {
	return getCoachExercisesAction();
}

export const coachExercisesQueryOptions = () => queryOptions( {
	...QUERY_DEFAULTS.coach,
	queryKey: COACH_EXERCISES_QUERY_KEY,
	queryFn: fetchCoachExercises,
} );
