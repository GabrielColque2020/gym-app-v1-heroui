"use client";

import { useCallback, useState } from "react";

import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import type { RoutineDayDetailBase } from "@/features/routine/actions/get-routine-day";

import { toast } from "@heroui/react";

import { useRoutineDayDraft } from "@/features/routine/hooks/use-routine-day-draft";
import { useSaveRoutineDayExercises } from "@/features/routine/hooks/use-routine-day-mutations";
import { mapDraftToSaveInput } from "@/features/routine/services/routine-day-editor";

type UseEditRoutineDayLoadedStateParams = {
	data: RoutineDayDetailBase;
	isRefreshing: boolean;
	onRefreshRoutineDayAction: () => Promise<RoutineDayDetailBase | null>;
	routineDayId: string;
	studentId: string | null;
};

export function useEditRoutineDayLoadedState( {
	data,
	isRefreshing,
	onRefreshRoutineDayAction,
	routineDayId,
	studentId,
}: UseEditRoutineDayLoadedStateParams ) {
	const [ isRefreshConfirmOpen, setIsRefreshConfirmOpen ] = useState( false );
	const saveRoutineDay = useSaveRoutineDayExercises();
	const {
		addExercise,
		addedExerciseIds,
		deleteExercise,
		draftRoutines,
		getSuggestedOrder,
		hasHydrated,
		isDirty,
		resetDraft,
		updateExerciseField,
		validationError,
	} = useRoutineDayDraft( {
		routineDayId,
		sourceRoutines: data.routines,
	} );
	const routine = data.trainingRoutine;

	function handleAddExercise( exercise: ExerciseListItem, order: number ) {
		const result = addExercise( exercise, order );

		if ("error" in result) {
			toast.danger( "No se pudo agregar el ejercicio", {
				description: result.error,
			} );

			return;
		}

		toast.success( "Ejercicio agregado al borrador", {
			description: `${ exercise.name } quedo pendiente hasta guardar cambios.`,
		} );
	}

	const handleConfirmRefresh = useCallback( async () => {
		setIsRefreshConfirmOpen( false );

		try {
			const refreshedData = await onRefreshRoutineDayAction();

			if (refreshedData) {
				resetDraft( refreshedData.routines );
			}

			toast.success( "Rutina actualizada", {
				description: "Se recargaron los ejercicios del dia seleccionado.",
			} );
		} catch (refreshError) {
			toast.danger( "Error al actualizar", {
				description: refreshError instanceof Error ? refreshError.message : "No se pudo refrescar la rutina.",
			} );
		}
	}, [ onRefreshRoutineDayAction, resetDraft ] );

	const handleRefresh = useCallback( () => {
		if (isRefreshing) return;

		if (isDirty) {
			setIsRefreshConfirmOpen( true );
			return;
		}

		void handleConfirmRefresh();
	}, [ handleConfirmRefresh, isDirty, isRefreshing ] );

	const handleSave = useCallback( async () => {
		if (validationError) {
			toast.danger( "No se puede guardar", {
				description: validationError,
			} );

			return;
		}

		try {
			await saveRoutineDay.mutateAsync( {
				exercises: mapDraftToSaveInput( draftRoutines ),
				routineDayId,
				studentId,
			} );

			toast.success( "Rutina actualizada", {
				description: "Los ejercicios del dia se guardaron correctamente.",
			} );
		} catch {
			toast.danger( "Error al guardar", {
				description: "No se pudieron guardar los cambios del dia.",
			} );
		}
	}, [ draftRoutines, routineDayId, saveRoutineDay, studentId, validationError ] );

	return {
		addedExerciseIds,
		draftRoutines,
		getSuggestedOrder,
		handleAddExercise,
		handleConfirmRefresh,
		handleRefresh,
		handleSave,
		hasHydrated,
		isRefreshConfirmOpen,
		isSaving: saveRoutineDay.isPending,
		resetRefreshConfirmOpen: () => setIsRefreshConfirmOpen( false ),
		routineName: routine.name || `Semana ${ routine.week }`,
		validationError,
		updateExerciseField,
		deleteExercise,
	};
}
