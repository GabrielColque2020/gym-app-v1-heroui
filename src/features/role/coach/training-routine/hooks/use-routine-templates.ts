"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { saveRoutineAsTemplateAction } from "@/features/training-routine/actions/routine-templates";

export const coachRoutineTemplatesQueryKey = [ "coach-routine-templates" ] as const;

export function useSaveRoutineAsTemplate() {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: saveRoutineAsTemplateAction,
		onSuccess: ( result ) => {
			if (result.ok) void queryClient.invalidateQueries( { queryKey: coachRoutineTemplatesQueryKey } );
		},
	} );
}
