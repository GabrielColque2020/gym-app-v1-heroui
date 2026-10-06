"use client";

import { useCallback, useState } from "react";

import { toast } from "@heroui/react";

import {
	applyLastSessionToExercise,
	updateSessionExerciseSets,
	updateSessionSet,
} from "@/features/role/student/routine/views/routine-page-content.utils";
import type { StudentRoutineSession } from "@/features/routine/services/routine-session";

type UseRoutinePageActionsOptions = {
	activeSession: StudentRoutineSession | null;
	canFinishDay: boolean;
	discardDraftAction: () => void;
	isDirty: boolean;
	isLoading: boolean;
	isRefreshing: boolean;
	refetchAction: () => Promise<unknown>;
	replaceDraftAction: ( nextSession: StudentRoutineSession ) => void;
	routineDayId: string | null;
	saveSessionAction: ( options: { finalize: boolean; silent: boolean } ) => Promise<boolean>;
};

export function useRoutinePageActions( {
	activeSession,
	canFinishDay,
	discardDraftAction,
	isDirty,
	isLoading,
	isRefreshing,
	refetchAction,
	replaceDraftAction,
	routineDayId,
	saveSessionAction,
}: UseRoutinePageActionsOptions ) {
	const [ isFinishDrawerOpen, setIsFinishDrawerOpen ] = useState( false );
	const [ isRefreshConfirmOpen, setIsRefreshConfirmOpen ] = useState( false );

	const handleRefresh = useCallback( () => {
		if (isRefreshing && !isLoading) {
			return;
		}

		if (isDirty) {
			setIsRefreshConfirmOpen( true );
			return;
		}

		void refetchAction();
	}, [ isDirty, isLoading, isRefreshing, refetchAction ] );

	// Actualizar con cambios sin guardar los descarta: vuelve a lo que hay guardado.
	const handleConfirmRefresh = useCallback( () => {
		setIsRefreshConfirmOpen( false );
		discardDraftAction();
		void refetchAction();
	}, [ discardDraftAction, refetchAction ] );

	const handleSetUpdate = useCallback( (
		exerciseId: string,
		setId: string,
		updates: Partial<{ weight: number | null; reps: number | null; notes: string | null }>,
	) => {
		if (!routineDayId || !activeSession) return;

		replaceDraftAction( updateSessionSet( activeSession, exerciseId, setId, updates ) );
	}, [ activeSession, replaceDraftAction, routineDayId ] );

	const handleVariantChange = useCallback( (
		exerciseId: string,
		variantExerciseId: string | null,
	) => {
		if (!activeSession) return;

		const targetExercise = activeSession.exercises.find( ( exercise ) => exercise.id === exerciseId );
		const originalVariantExerciseId = targetExercise?.originalVariantExerciseId ?? null;
		const isOriginalVariant = variantExerciseId === originalVariantExerciseId;

		replaceDraftAction( {
			...activeSession,
			exercises: activeSession.exercises.map( ( exercise ) => (
				exercise.id === exerciseId
					? {
						...exercise,
						variantExerciseId,
						variantSelectionExplicit: !isOriginalVariant,
					}
					: exercise
			) ),
		} );
	}, [ activeSession, replaceDraftAction ] );

	const handleExerciseUpdate = useCallback( (
		exerciseId: string,
		updates: Partial<{ weight: number | null; reps: number | null; notes: string | null }>,
	) => {
		if (!routineDayId || !activeSession) return;

		replaceDraftAction( updateSessionExerciseSets( activeSession, exerciseId, updates ) );
	}, [ activeSession, replaceDraftAction, routineDayId ] );

	// Carga en todas las series lo que el estudiante hizo la ultima vez, serie por
	// serie: es el punto de partida mas comun, y despues ajusta solo lo que cambio.
	const handleRepeatLastSession = useCallback( ( exerciseId: string ) => {
		if (!routineDayId || !activeSession) return;

		replaceDraftAction( applyLastSessionToExercise( activeSession, exerciseId ) );
	}, [ activeSession, replaceDraftAction, routineDayId ] );

	// Las series se guardan solas. Terminar el dia es el unico paso que el
	// estudiante confirma: muestra el resumen y marca el dia como realizado.
	const handleOpenFinishDrawer = useCallback( () => {
		if (!canFinishDay) {
			toast.warning( "No hay ejercicios en este día", {
				description: "Tu entrenador todavía no cargó ejercicios para este día.",
			} );
			return;
		}

		setIsFinishDrawerOpen( true );
	}, [ canFinishDay ] );

	const handleConfirmFinish = useCallback( async () => {
		const isSaved = await saveSessionAction( { finalize: true, silent: false } );

		if (!isSaved) return;

		setIsFinishDrawerOpen( false );
		toast.success( "Día terminado", { description: "Tu entrenador ya puede ver lo que hiciste." } );
	}, [ saveSessionAction ] );

	// Guarda a mano lo que quedo sin guardar de una visita anterior, o reintenta
	// un guardado que fallo.
	const handleSaveNow = useCallback( () => {
		void saveSessionAction( { finalize: false, silent: false } );
	}, [ saveSessionAction ] );

	return {
		handleConfirmFinish,
		handleConfirmRefresh,
		handleExerciseUpdate,
		handleOpenFinishDrawer,
		handleRefresh,
		handleRepeatLastSession,
		handleSaveNow,
		handleSetUpdate,
		handleVariantChange,
		isFinishDrawerOpen,
		isRefreshConfirmOpen,
		setIsFinishDrawerOpen,
		setIsRefreshConfirmOpen,
	};
}

