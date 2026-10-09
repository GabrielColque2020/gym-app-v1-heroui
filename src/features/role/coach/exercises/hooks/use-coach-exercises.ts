"use client";

import { unwrapped } from "@/lib/action-result";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { CoachExercises } from "@/features/role/coach/exercises/services/coach-exercises-query";
import {
	COACH_EXERCISES_QUERY_KEY,
	coachExercisesQueryOptions,
} from "@/features/role/coach/exercises/services/coach-exercises-query";
import { TRAINING_ROUTINES_STUDENTS_QUERY_KEY } from "@/features/role/coach/training-routines-students/services/training-routines-students-query";
import {
	deleteCoachExerciseAction,
	getCoachExerciseDeleteImpactAction,
	saveCoachExerciseAction,
	toggleCoachExerciseStatusAction,
} from "@/features/role/coach/exercises/actions/coach-exercises";

// Desenvueltas aca y no dentro de `useMutation`: ahi TypeScript perdia el tipo
// de lo que devuelven.
const saveCoachExercise = unwrapped( saveCoachExerciseAction );
const toggleCoachExerciseStatus = unwrapped( toggleCoachExerciseStatusAction );
const deleteCoachExercise = unwrapped( deleteCoachExerciseAction );

function invalidateCoachExercises( queryClient: ReturnType<typeof useQueryClient> ) {
	void queryClient.invalidateQueries( { queryKey: COACH_EXERCISES_QUERY_KEY } );
}

function invalidateCoachExerciseRelatedQueries( queryClient: ReturnType<typeof useQueryClient> ) {
	void queryClient.invalidateQueries( { queryKey: [ "coach-training-routines" ] } );
	void queryClient.invalidateQueries( { queryKey: [ "coach-history-routines" ] } );
	void queryClient.invalidateQueries( { queryKey: [ "coach-history-routines-reports" ] } );
	void queryClient.invalidateQueries( { queryKey: [ "routine-day" ] } );
	void queryClient.invalidateQueries( { queryKey: TRAINING_ROUTINES_STUDENTS_QUERY_KEY } );
}

export function useCoachExercises() {
	return useQuery( coachExercisesQueryOptions() );
}

export function useSaveCoachExercise() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: saveCoachExercise,
		onSuccess: () => invalidateCoachExercises( queryClient ),
	} );
}

export function useToggleCoachExerciseStatus() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: toggleCoachExerciseStatus,
		onSuccess: () => invalidateCoachExercises( queryClient ),
	} );
}

export function useDeleteCoachExercise() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: deleteCoachExercise,
		onSuccess: () => {
			invalidateCoachExercises( queryClient );
			invalidateCoachExerciseRelatedQueries( queryClient );
		},
	} );
}

// Lo que se pierde al eliminar el ejercicio. Se pide al abrir la confirmacion y
// siempre de nuevo: un numero viejo es justo lo que no puede mostrarse ahi.
export function useCoachExerciseDeleteImpact( exerciseId: string, isEnabled: boolean ) {
	return useQuery( {
		enabled: isEnabled,
		gcTime: 0,
		queryFn: () => unwrapped( getCoachExerciseDeleteImpactAction )( exerciseId ),
		queryKey: [ "coach-exercise-delete-impact", exerciseId ],
		staleTime: 0,
	} );
}

export type { CoachExercises };
