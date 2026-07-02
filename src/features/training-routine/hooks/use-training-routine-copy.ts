"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
	copyTrainingRoutineMonthAction,
	copyTrainingRoutineWeeksAction,
} from "@/features/training-routine/actions/copy-training-routine";
import { trainingRoutineCopySourceQueryKey } from "@/features/training-routine/services/training-routine-copy";
import { coachTrainingRoutinesQueryKey } from "@/features/training-routine/services/training-routines-keys";
import type {
	CopyTrainingRoutineMonthInput,
	CopyTrainingRoutineWeeksInput,
} from "@/features/training-routine/services/training-routine-copy";

function invalidateTrainingRoutineCopyQueries(
	queryClient: ReturnType<typeof useQueryClient>,
	input: CopyTrainingRoutineMonthInput | CopyTrainingRoutineWeeksInput,
) {
	void queryClient.invalidateQueries( {
		queryKey: coachTrainingRoutinesQueryKey( input.studentId, input.destinationMonth, input.destinationYear ),
	} );
	void queryClient.invalidateQueries( {
		queryKey: trainingRoutineCopySourceQueryKey( input.studentId, input.sourceMonth, input.sourceYear ),
	} );
}

export function useCopyTrainingRoutineMonth() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: copyTrainingRoutineMonthAction,
		onSuccess: ( _, input: CopyTrainingRoutineMonthInput ) => {
			invalidateTrainingRoutineCopyQueries( queryClient, input );
		},
	} );
}

export function useCopyTrainingRoutineWeeks() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: copyTrainingRoutineWeeksAction,
		onSuccess: ( _, input: CopyTrainingRoutineWeeksInput ) => {
			invalidateTrainingRoutineCopyQueries( queryClient, input );
		},
	} );
}
