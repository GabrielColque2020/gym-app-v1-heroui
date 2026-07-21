"use client";

import { useMemo } from "react";

import { useRoutinePageActions } from "@/features/role/student/routine/hooks/use-routine-page-actions";
import { buildRoutinePageDerivedState } from "@/features/role/student/routine/hooks/use-routine-page-state.utils";
import { useRoutineSession } from "@/features/role/student/routine/hooks/use-routine-session";
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
	const { activeSession, validationError, replaceDraft, isDirty } = useRoutineSession( {
		routineDayId: routineDayId ?? "",
		sourceDetail: data ?? null,
	} );
	const saveRoutineSession = useSaveStudentRoutineSession();
	const isRefreshing = isFetching && !isLoading;
	const {
		backHref,
		canSaveProgress,
		latestProgressDate,
		routineObservation,
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
		handleConfirmRefresh,
		handleConfirmSave,
		handleOpenSaveDrawer,
		handleRefresh,
		handleSetUpdate,
		handleVariantChange,
		isRefreshConfirmOpen,
		isSaveDrawerOpen,
		setIsRefreshConfirmOpen,
		setIsSaveDrawerOpen,
	} = useRoutinePageActions( {
		activeSession,
		canSaveProgress,
		isDirty,
		isLoading,
		isRefreshing,
		refetchAction: refetch,
		replaceDraftAction: replaceDraft,
		routineDayId,
		saveRoutineSession,
		studentId,
		validationError,
	} );

	return {
		activeSession,
		backHref,
		canSaveProgress,
		data,
		error,
		handleConfirmRefresh,
		handleConfirmSave,
		handleOpenSaveDrawer,
		handleRefresh,
		handleSetUpdate,
		handleVariantChange,
		isError,
		isFetching,
		isLoading,
		isRefreshConfirmOpen,
		isRefreshing,
		isSaveDrawerOpen,
		latestProgressDate,
		routineObservation,
		routineStatusDescription,
		saveRoutineSession,
		saveSummary,
		setIsRefreshConfirmOpen,
		setIsSaveDrawerOpen,
		validationError,
	};
}

