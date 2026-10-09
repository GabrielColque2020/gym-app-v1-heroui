"use client";

import { unwrapped } from "@/lib/action-result";
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

// Desenvueltas aca y no dentro de `useMutation`: ahi TypeScript perdia el tipo
// de lo que devuelven.
const deleteTrainingRoutineStructure = unwrapped( deleteTrainingRoutineStructureAction );
const createTrainingRoutineStructure = unwrapped( createTrainingRoutineStructureAction );
const updateTrainingRoutineStructure = unwrapped( updateTrainingRoutineStructureAction );

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
		mutationFn: deleteTrainingRoutineStructure,
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
		mutationFn: createTrainingRoutineStructure,
		onSuccess: ( _, input ) => invalidateTrainingRoutine( queryClient, input ),
	} );
}

export function useUpdateTrainingRoutineStructure() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: updateTrainingRoutineStructure,
		onSuccess: ( _, input ) => invalidateTrainingRoutine( queryClient, input ),
	} );
}
