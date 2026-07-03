"use client";

import { useCallback, useState } from "react";

import { toast } from "@heroui/react";

import type { useSaveStudentRoutineSession } from "@/features/role/student/routine/hooks/use-routine-session-mutations";
import { updateSessionSet } from "@/features/role/student/routine/views/routine-page-content.utils";
import {
	mapStudentRoutineSessionToSaveInput,
	type StudentRoutineSession,
} from "@/features/routine/services/routine-session";

type UseRoutinePageActionsOptions = {
	activeSession: StudentRoutineSession | null;
	canSaveProgress: boolean;
	isDirty: boolean;
	isLoading: boolean;
	isRefreshing: boolean;
	refetch: () => Promise<unknown>;
	replaceDraft: ( nextSession: StudentRoutineSession ) => void;
	routineDayId: string | null;
	saveRoutineSession: ReturnType<typeof useSaveStudentRoutineSession>;
	studentId: string | null;
	validationError: string | null;
};

export function useRoutinePageActions( {
	activeSession,
	canSaveProgress,
	isDirty,
	isLoading,
	isRefreshing,
	refetch,
	replaceDraft,
	routineDayId,
	saveRoutineSession,
	studentId,
	validationError,
}: UseRoutinePageActionsOptions ) {
	const [ isSaveSheetOpen, setIsSaveSheetOpen ] = useState( false );
	const [ isRefreshConfirmOpen, setIsRefreshConfirmOpen ] = useState( false );

	const handleRefresh = useCallback( () => {
		if (isRefreshing && !isLoading) {
			return;
		}

		if (isDirty) {
			setIsRefreshConfirmOpen( true );
			return;
		}

		void refetch();
	}, [ isDirty, isLoading, isRefreshing, refetch ] );

	const handleConfirmRefresh = useCallback( () => {
		setIsRefreshConfirmOpen( false );
		void refetch();
	}, [ refetch ] );

	const handleSetUpdate = useCallback( (
		exerciseId: string,
		setId: string,
		updates: Partial<{ weight: number | null; reps: number | null; notes: string | null }>,
	) => {
		if (!routineDayId || !activeSession) return;

		replaceDraft( updateSessionSet( activeSession, exerciseId, setId, updates ) );
	}, [ activeSession, replaceDraft, routineDayId ] );

	const handleVariantChange = useCallback( (
		exerciseId: string,
		variantExerciseId: string | null,
	) => {
		if (!activeSession) return;

		replaceDraft( {
			...activeSession,
			exercises: activeSession.exercises.map( ( exercise ) => (
				exercise.id === exerciseId
					? {
						...exercise,
						variantExerciseId,
						variantSelectionExplicit: true,
					}
					: exercise
			) ),
		} );
	}, [ activeSession, replaceDraft ] );

	const handleOpenSaveSheet = useCallback( () => {
		if (!canSaveProgress) {
			toast.warning( "No hay ejercicios para guardar", {
				description: "Primero debe haber ejercicios cargados para ese dia.",
			} );
			return;
		}

		setIsSaveSheetOpen( true );
	}, [ canSaveProgress ] );

	const handleConfirmSave = useCallback( async () => {
		if (!activeSession || !routineDayId || !studentId) {
			toast.danger( "No se puede guardar", { description: "Faltan datos para persistir la sesion." } );
			return;
		}

		if (validationError) {
			toast.danger( "No se puede guardar", { description: validationError } );
			return;
		}

		try {
			await saveRoutineSession.mutateAsync( {
				...mapStudentRoutineSessionToSaveInput( activeSession ),
				studentId,
			} );
			setIsSaveSheetOpen( false );
			toast.success( "Rutina actualizada", { description: "Los cambios se guardaron correctamente." } );
		} catch (saveError) {
			toast.danger( "Error al guardar", {
				description: saveError instanceof Error ? saveError.message : "No se pudieron guardar los cambios.",
			} );
		}
	}, [ activeSession, routineDayId, saveRoutineSession, studentId, validationError ] );

	return {
		handleConfirmRefresh,
		handleConfirmSave,
		handleOpenSaveSheet,
		handleRefresh,
		handleSetUpdate,
		handleVariantChange,
		isRefreshConfirmOpen,
		isSaveSheetOpen,
		setIsRefreshConfirmOpen,
		setIsSaveSheetOpen,
	};
}
