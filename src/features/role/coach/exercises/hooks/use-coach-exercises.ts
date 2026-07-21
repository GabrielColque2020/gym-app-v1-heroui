"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { CoachExercises } from "@/features/role/coach/exercises/services/coach-exercises-query";
import {
	COACH_EXERCISES_QUERY_KEY,
	coachExercisesQueryOptions,
} from "@/features/role/coach/exercises/services/coach-exercises-query";
import {
	saveCoachExerciseAction,
	toggleCoachExerciseStatusAction,
} from "@/features/role/coach/exercises/actions/coach-exercises";

function invalidateCoachExercises( queryClient: ReturnType<typeof useQueryClient> ) {
	void queryClient.invalidateQueries( { queryKey: COACH_EXERCISES_QUERY_KEY } );
}

export function useCoachExercises() {
	return useQuery( coachExercisesQueryOptions() );
}

export function useSaveCoachExercise() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: saveCoachExerciseAction,
		onSuccess: () => invalidateCoachExercises( queryClient ),
	} );
}

export function useToggleCoachExerciseStatus() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: toggleCoachExerciseStatusAction,
		onSuccess: () => invalidateCoachExercises( queryClient ),
	} );
}

export type { CoachExercises };
