import type { ActionData } from "@/lib/action-result";
import { unwrapped } from "@/lib/action-result";
import { queryOptions } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getCoachExercisesAction } from "@/features/role/coach/exercises/actions/coach-exercises";

export const COACH_EXERCISES_QUERY_KEY = [ "coach-exercises" ] as const;

export type CoachExercises = ActionData<typeof getCoachExercisesAction>;

export async function fetchCoachExercises(): Promise<CoachExercises> {
	return unwrapped( getCoachExercisesAction )();
}

export const coachExercisesQueryOptions = () => queryOptions( {
	...QUERY_DEFAULTS.coach,
	queryKey: COACH_EXERCISES_QUERY_KEY,
	queryFn: fetchCoachExercises,
} );
