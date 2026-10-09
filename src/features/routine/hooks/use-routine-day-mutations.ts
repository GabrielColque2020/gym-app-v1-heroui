"use client";

import { unwrapped } from "@/lib/action-result";
import type { QueryClient } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getRoutineDayAction, type RoutineDayDetailBase } from "@/features/routine/actions/get-routine-day";
import { saveRoutineDayExercisesAction } from "@/features/routine/actions/routine-day-mutations";
import type { SaveRoutineDayExercisesActionInput } from "@/features/routine/actions/routine-day-mutations";
import { applySavedRoutineRows, syncRoutineDayAfterSave } from "@/features/routine/hooks/use-routine-day-mutations.utils";

type UseSaveRoutineDayExercisesOptions = {
	onSuccessAction?: (
		queryClient: QueryClient,
		savedRoutineDay: RoutineDayDetailBase,
		input: SaveRoutineDayExercisesActionInput,
	) => void | Promise<void>;
};

export function useSaveRoutineDayExercises( options?: UseSaveRoutineDayExercisesOptions ) {
	const queryClient = useQueryClient();

	return useMutation( {
		mutationFn: async ( input: SaveRoutineDayExercisesActionInput ): Promise<RoutineDayDetailBase> => {
			const result = await unwrapped( saveRoutineDayExercisesAction )( input );

			if (result.routineDay) return result.routineDay;

			// El servidor solo devolvio las filas que cambiaron: se aplican sobre el
			// dia que ya esta en pantalla. Si no coinciden, se pide el dia entero.
			return applySavedRoutineRows( queryClient, input, result.routines )
				?? await unwrapped( getRoutineDayAction )( { routineDayId: input.routineDayId, studentId: input.studentId, templateId: input.templateId } );
		},
		onSuccess: async ( savedRoutineDay, input ) => {
			await syncRoutineDayAfterSave( queryClient, savedRoutineDay, input );
			await options?.onSuccessAction?.( queryClient, savedRoutineDay, input );
		},
	} );
}
