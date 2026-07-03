"use client";

import { useCallback, useMemo, useState } from "react";

import { toast } from "@heroui/react";

import { useRoutineSession } from "@/features/role/student/routine/hooks/use-routine-session";
import { useSaveStudentRoutineSession } from "@/features/role/student/routine/hooks/use-routine-session-mutations";
import { useStudentRoutineSession } from "@/features/role/student/routine/hooks/use-student-routine-session";
import { mapStudentRoutineSessionToSaveInput } from "@/features/routine/services/routine-session";
import { buildRoutineSaveSummary, updateSessionSet } from "@/features/role/student/routine/views/routine-page-content.utils";

type UseRoutinePageStateOptions = {
	routineDayId: string | null;
	studentId: string | null;
};

export function useRoutinePageState( {
	routineDayId,
	studentId,
}: UseRoutinePageStateOptions ) {
	const [ isSaveSheetOpen, setIsSaveSheetOpen ] = useState( false );
	const [ isRefreshConfirmOpen, setIsRefreshConfirmOpen ] = useState( false );
	const { data, error, isError, isFetching, isLoading, refetch } = useStudentRoutineSession( {
		routineDayId,
		studentId,
	} );
	const { activeSession, validationError, replaceDraft, isDirty } = useRoutineSession( {
		routineDayId: routineDayId ?? "",
		sourceDetail: data ?? null,
	} );
	const saveRoutineSession = useSaveStudentRoutineSession();
	const isRefreshing = isFetching && !isLoading;
	const exerciseCount = activeSession?.exercises.length ?? 0;
	const hasExercises = exerciseCount > 0;
	const canSaveProgress = hasExercises && !saveRoutineSession.isPending;
	const completedExercises = activeSession?.exercises.filter( ( exercise ) =>
		exercise.sets.length > 0
		&& exercise.sets.every( ( set ) => set.completed && set.currentReps !== null && set.currentWeight !== null ),
	).length ?? 0;
	const latestProgressDate = data?.progressEntries[ 0 ]?.date ? new Date( data.progressEntries[ 0 ].date ) : null;
	const routineStatusDescription = activeSession
		? hasExercises
			? `${ completedExercises } de ${ exerciseCount } ejercicios completos`
			: "No hay ejercicios cargados para este dia"
		: "Sin ejercicios cargados";
	const saveSummary = useMemo( () => ( activeSession ? buildRoutineSaveSummary( activeSession ) : [] ), [ activeSession ] );
	const backHref = `/student/training-routine?month=${ data?.trainingRoutine.month ?? "" }&year=${ data?.trainingRoutine.year ?? "" }`;

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
		activeSession,
		backHref,
		canSaveProgress,
		data,
		error,
		handleConfirmRefresh,
		handleConfirmSave,
		handleOpenSaveSheet,
		handleRefresh,
		handleSetUpdate,
		handleVariantChange,
		isError,
		isFetching,
		isLoading,
		isRefreshConfirmOpen,
		isRefreshing,
		isSaveSheetOpen,
		latestProgressDate,
		routineStatusDescription,
		saveRoutineSession,
		saveSummary,
		setIsRefreshConfirmOpen,
		setIsSaveSheetOpen,
		validationError,
	};
}
