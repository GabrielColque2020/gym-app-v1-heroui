"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { CoachExercises } from "@/features/role/coach/exercises/services/coach-exercises-query";
import {
	COACH_EXERCISES_QUERY_KEY,
	coachExercisesQueryOptions,
} from "@/features/role/coach/exercises/services/coach-exercises-query";
import { HISTORY_ROUTINES_STUDENTS_QUERY_KEY } from "@/features/role/coach/history-routines-students/services/history-routines-students-query";
import { TRAINING_ROUTINES_STUDENTS_QUERY_KEY } from "@/features/role/coach/training-routines-students/services/training-routines-students-query";
import {
	deleteCoachExerciseAction,
	saveCoachExerciseAction,
	toggleCoachExerciseStatusAction,
} from "@/features/role/coach/exercises/actions/coach-exercises";

function invalidateCoachExercises( queryClient: ReturnType<typeof useQueryClient> ) {
	void queryClient.invalidateQueries( { queryKey: COACH_EXERCISES_QUERY_KEY } );
}

function invalidateCoachExerciseRelatedQueries( queryClient: ReturnType<typeof useQueryClient> ) {
	void queryClient.invalidateQueries( { queryKey: [ "coach-training-routines" ] } );
	void queryClient.invalidateQueries( { queryKey: [ "coach-history-routines" ] } );
	void queryClient.invalidateQueries( { queryKey: [ "coach-history-routines-reports" ] } );
	void queryClient.invalidateQueries( { queryKey: [ "routine-day" ] } );
	void queryClient.invalidateQueries( { queryKey: TRAINING_ROUTINES_STUDENTS_QUERY_KEY } );
	void queryClient.invalidateQueries( { queryKey: HISTORY_ROUTINES_STUDENTS_QUERY_KEY } );
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

export function useDeleteCoachExercise() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: deleteCoachExerciseAction,
		onSuccess: () => {
			invalidateCoachExercises( queryClient );
			invalidateCoachExerciseRelatedQueries( queryClient );
		},
	} );
}

export type { CoachExercises };
