import type { ActionData } from "@/lib/action-result";
import { unwrapped } from "@/lib/action-result";
import { queryOptions } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getExercisesAction } from "@/features/exercises/actions/get-exercises";

export const EXERCISES_QUERY_KEY = [ "exercises" ] as const;

export type Exercises = ActionData<typeof getExercisesAction>;

export async function fetchExercises(): Promise<Exercises> {
	return unwrapped( getExercisesAction )();
}

export const exercisesQueryOptions = () => queryOptions( {
	...QUERY_DEFAULTS.coach,
	queryKey: EXERCISES_QUERY_KEY,
	queryFn: fetchExercises,
} );
