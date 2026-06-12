import { queryOptions } from "@tanstack/react-query";

import { getExercisesAction } from "@/features/admin/exercises/actions/get-exercises";

export const EXERCISES_QUERY_KEY = [ "exercises" ] as const;

export type Exercises = Awaited<ReturnType<typeof getExercisesAction>>;

export async function fetchExercises(): Promise<Exercises> {
	return getExercisesAction();
}

export const exercisesQueryOptions = () => queryOptions( {
	queryKey: EXERCISES_QUERY_KEY,
	queryFn: fetchExercises,
	refetchOnWindowFocus: true,
	staleTime: 60_000,
} );
