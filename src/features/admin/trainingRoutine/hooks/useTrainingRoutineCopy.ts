"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
	copyTrainingRoutineMonthAction,
	copyTrainingRoutineWeeksAction,
} from "@/features/admin/trainingRoutine/actions/copy-training-routine";
import { trainingRoutinesQueryKey } from "@/features/admin/trainingRoutine/services/training-routines-query";
import type {
	CopyTrainingRoutineMonthInput,
	CopyTrainingRoutineWeeksInput,
} from "@/features/admin/trainingRoutine/services/training-routine-copy";

export function useCopyTrainingRoutineMonth() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: copyTrainingRoutineMonthAction,
		onSuccess: ( _, input: CopyTrainingRoutineMonthInput ) => {
			void queryClient.invalidateQueries( {
				queryKey: trainingRoutinesQueryKey( input.studentId, input.destinationMonth, input.destinationYear ),
			} );
		},
	} );
}

export function useCopyTrainingRoutineWeeks() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: copyTrainingRoutineWeeksAction,
		onSuccess: ( _, input: CopyTrainingRoutineWeeksInput ) => {
			void queryClient.invalidateQueries( {
				queryKey: trainingRoutinesQueryKey( input.studentId, input.destinationMonth, input.destinationYear ),
			} );
		},
	} );
}
