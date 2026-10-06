"use client";

import { useMemo, useState } from "react";

import { useRoutinePageActions } from "@/features/role/student/routine/hooks/use-routine-page-actions";
import { buildRoutinePageDerivedState } from "@/features/role/student/routine/hooks/use-routine-page-state.utils";
import { useRoutineSession } from "@/features/role/student/routine/hooks/use-routine-session";
import { useRoutineSessionAutosave } from "@/features/role/student/routine/hooks/use-routine-session-autosave";
import { useSaveStudentRoutineSession } from "@/features/role/student/routine/hooks/use-routine-session-mutations";
import { useStudentRoutineSession } from "@/features/role/student/routine/hooks/use-student-routine-session";

type UseRoutinePageStateOptions = {
	routineDayId: string | null;
	studentId: string | null;
};

export function useRoutinePageState( {
	routineDayId,
	studentId,
}: UseRoutinePageStateOptions ) {
	const { data, error, isError, isFetching, isLoading, refetch } = useStudentRoutineSession( {
		routineDayId,
		studentId,
	} );
	const saveRoutineSession = useSaveStudentRoutineSession();
	const {
		activeSession,
		clearDraft,
		hasSessionEdits,
		isDirty,
		replaceDraft,
		sourceSession,
		validationError,
	} = useRoutineSession( {
		isSaving: saveRoutineSession.isPending,
		routineDayId: routineDayId ?? "",
		sourceDetail: data ?? null,
	} );
	const { saveSession, saveStatus } = useRoutineSessionAutosave( {
		activeSession,
		hasSessionEdits,
		routineDayId,
		saveRoutineSession,
		sourceSession,
		studentId,
		validationError,
	} );
	const isRefreshing = isFetching && !isLoading;
	const {
		backHref,
		canFinishDay,
		dayDoneDate,
		halfLoadedSetCount,
		isDayFinished,
		routineStatusDescription,
		saveSummary,
	} = useMemo(
		() => buildRoutinePageDerivedState( {
			activeSession,
			data,
			isSavePending: saveRoutineSession.isPending,
		} ),
		[ activeSession, data, saveRoutineSession.isPending ],
	);
	// Un dia terminado queda bloqueado hasta que el estudiante pide corregirlo. Se
	// recuerda por dia: al pasar a otro dia terminado, ese tambien abre bloqueado.
	const [ unlockedDayId, setUnlockedDayId ] = useState<string | null>( null );
	const isSessionLocked = isDayFinished && unlockedDayId !== routineDayId;
	const {
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
	} = useRoutinePageActions( {
		activeSession,
		backHref,
		canFinishDay,
		discardDraftAction: clearDraft,
		isDirty,
		isLoading,
		isRefreshing,
		refetchAction: refetch,
		replaceDraftAction: replaceDraft,
		routineDayId,
		saveSessionAction: saveSession,
	} );

	return {
		activeSession,
		backHref,
		canFinishDay,
		data,
		dayDoneDate,
		error,
		halfLoadedSetCount,
		handleConfirmFinish,
		handleConfirmRefresh,
		handleExerciseUpdate,
		handleOpenFinishDrawer,
		handleRefresh,
		handleRepeatLastSession,
		handleSaveNow,
		handleSetUpdate,
		handleUnlockSession: () => setUnlockedDayId( routineDayId ),
		handleVariantChange,
		isDayFinished,
		isError,
		isFetching,
		isFinishDrawerOpen,
		isLoading,
		isRefreshConfirmOpen,
		isRefreshing,
		isSessionLocked,
		routineStatusDescription,
		saveRoutineSession,
		saveStatus,
		saveSummary,
		setIsFinishDrawerOpen,
		setIsRefreshConfirmOpen,
		validationError,
	};
}

