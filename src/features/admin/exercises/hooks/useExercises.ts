"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { Exercises } from "@/features/admin/exercises/services/exercises-query";

import {
	createExerciseAction,
	deactivateExerciseAction,
	restoreExerciseAction,
	updateExerciseAction,
} from "@/features/admin/exercises/actions/exercise-mutations";
import { exercisesQueryOptions } from "@/features/admin/exercises/services/exercises-query";
import { EXERCISES_QUERY_KEY } from "@/features/admin/exercises/services/exercises-query";

export function useExercises() {
	return useQuery( exercisesQueryOptions() );
}

function refetchExercisesInBackground( queryClient: ReturnType<typeof useQueryClient> ) {
	void queryClient.invalidateQueries( { queryKey: EXERCISES_QUERY_KEY } );
}

function replaceExerciseInCache( queryClient: ReturnType<typeof useQueryClient>, updatedExercise: Exercises[ number ] ) {
	queryClient.setQueryData<Exercises>( EXERCISES_QUERY_KEY, ( currentExercises ) => {
		if (!currentExercises) return currentExercises;

		return currentExercises.map( ( exercise ) =>
			exercise.id === updatedExercise.id ? updatedExercise : exercise
		);
	} );
}

export function useCreateExercise() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: createExerciseAction,
		onSuccess: ( exercise ) => {
			queryClient.setQueryData<Exercises>( EXERCISES_QUERY_KEY, ( currentExercises ) => {
				if (!currentExercises) return [ exercise ];

				return [ exercise, ...currentExercises ];
			} );
			refetchExercisesInBackground( queryClient );
		},
	} );
}

export function useUpdateExercise() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: updateExerciseAction,
		onSuccess: ( updatedExercise ) => {
			replaceExerciseInCache( queryClient, updatedExercise );
			refetchExercisesInBackground( queryClient );
		},
	} );
}

export function useDeactivateExercise() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: deactivateExerciseAction,
		onSuccess: ( updatedExercise ) => {
			replaceExerciseInCache( queryClient, updatedExercise );
			refetchExercisesInBackground( queryClient );
		},
	} );
}

export function useRestoreExercise() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: restoreExerciseAction,
		onSuccess: ( updatedExercise ) => {
			replaceExerciseInCache( queryClient, updatedExercise );
			refetchExercisesInBackground( queryClient );
		},
	} );
}
