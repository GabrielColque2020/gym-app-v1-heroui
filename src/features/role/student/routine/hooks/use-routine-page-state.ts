"use client";

import { useMemo } from "react";

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
		handleVariantChange,
		isDayFinished,
		isError,
		isFetching,
		isFinishDrawerOpen,
		isLoading,
		isRefreshConfirmOpen,
		isRefreshing,
		routineStatusDescription,
		saveRoutineSession,
		saveStatus,
		saveSummary,
		setIsFinishDrawerOpen,
		setIsRefreshConfirmOpen,
		validationError,
	};
}

