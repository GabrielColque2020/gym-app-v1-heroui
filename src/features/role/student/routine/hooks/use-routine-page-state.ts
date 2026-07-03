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
		handleOpenSaveSheet,
		handleRefresh,
		handleSetUpdate,
		handleVariantChange,
		isRefreshConfirmOpen,
		isSaveSheetOpen,
		setIsRefreshConfirmOpen,
		setIsSaveSheetOpen,
	} = useRoutinePageActions( {
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
	} );

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
