"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
	createTrainingRoutineStructureAction,
	deleteTrainingRoutineStructureAction,
	updateTrainingRoutineStructureAction,
} from "@/features/training-routine/actions/routine-structure-mutations";
import { coachTrainingRoutinesQueryKey } from "@/features/training-routine/services/training-routines-keys";
import type {
	RoutineStructureInput,
	RoutineStructureScopeInput,
} from "@/features/training-routine/services/routine-structure";

function invalidateTrainingRoutine(
	queryClient: ReturnType<typeof useQueryClient>,
	input: RoutineStructureInput,
) {
	void queryClient.invalidateQueries( {
		queryKey: coachTrainingRoutinesQueryKey( input.studentId, input.month, input.year ),
	} );
}

export function useDeleteTrainingRoutineStructure() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: deleteTrainingRoutineStructureAction,
		onSuccess: ( _, input: RoutineStructureScopeInput ) => {
			void queryClient.invalidateQueries( {
				queryKey: coachTrainingRoutinesQueryKey( input.studentId, input.month, input.year ),
			} );
		},
	} );
}

export function useCreateTrainingRoutineStructure() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: createTrainingRoutineStructureAction,
		onSuccess: ( _, input ) => invalidateTrainingRoutine( queryClient, input ),
	} );
}

export function useUpdateTrainingRoutineStructure() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: updateTrainingRoutineStructureAction,
		onSuccess: ( _, input ) => invalidateTrainingRoutine( queryClient, input ),
	} );
}
