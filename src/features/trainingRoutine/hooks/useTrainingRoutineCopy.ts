"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
	copyTrainingRoutineMonthAction,
	copyTrainingRoutineWeeksAction,
} from "@/features/trainingRoutine/actions/copy-training-routine";
import { adminTrainingRoutinesQueryKey } from "@/features/trainingRoutine/services/training-routines.keys";
import type {
	CopyTrainingRoutineMonthInput,
	CopyTrainingRoutineWeeksInput,
} from "@/features/trainingRoutine/services/training-routine-copy";

export function useCopyTrainingRoutineMonth() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: copyTrainingRoutineMonthAction,
		onSuccess: ( _, input: CopyTrainingRoutineMonthInput ) => {
			void queryClient.invalidateQueries( {
				queryKey: adminTrainingRoutinesQueryKey( input.studentId, input.destinationMonth, input.destinationYear ),
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
				queryKey: adminTrainingRoutinesQueryKey( input.studentId, input.destinationMonth, input.destinationYear ),
			} );
		},
	} );
}
