import { queryOptions } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getExercisesAction } from "@/features/exercises/actions/get-exercises";

export const EXERCISES_QUERY_KEY = [ "exercises" ] as const;

export type Exercises = Awaited<ReturnType<typeof getExercisesAction>>;

export async function fetchExercises(): Promise<Exercises> {
	return getExercisesAction();
}

export const exercisesQueryOptions = () => queryOptions( {
	...QUERY_DEFAULTS.admin,
	queryKey: EXERCISES_QUERY_KEY,
	queryFn: fetchExercises,
} );
