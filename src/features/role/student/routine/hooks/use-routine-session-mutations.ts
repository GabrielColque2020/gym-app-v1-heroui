"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { saveStudentRoutineSessionAction } from "@/features/role/student/routine/actions/save-routine-session";
import { studentRoutineSessionQueryKey } from "@/features/role/student/routine/hooks/use-student-routine-session";
import { useRoutineSessionStore } from "@/features/routine/stores/use-routine-session-store";
import { studentTrainingRoutinesQueryKey } from "@/features/training-routine/services/training-routines-keys";
import type { StudentRoutineSessionSaveInput } from "@/features/routine/services/routine-session";

type SaveStudentRoutineSessionMutationInput = StudentRoutineSessionSaveInput & {
	studentId: string | null;
};

export function useSaveStudentRoutineSession() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: saveStudentRoutineSessionAction,
		onSuccess: async ( savedSession, input ) => {
			const studentId = input.studentId ?? null;

			queryClient.setQueryData(
				studentRoutineSessionQueryKey( input.routineDayId, studentId ),
				savedSession,
			);

			try {
				await queryClient.invalidateQueries( {
					queryKey: studentRoutineSessionQueryKey( input.routineDayId, studentId ),
				} );
				await queryClient.invalidateQueries( {
					queryKey: studentTrainingRoutinesQueryKey(
						savedSession.trainingRoutine.month,
						savedSession.trainingRoutine.year,
					),
				} );
			} finally {
				useRoutineSessionStore.getState().clearDraft( input.routineDayId );
			}
		},
	} );
}

export type { SaveStudentRoutineSessionMutationInput };

