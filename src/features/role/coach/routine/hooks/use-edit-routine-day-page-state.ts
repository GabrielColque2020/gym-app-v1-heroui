"use client";

import { useCallback } from "react";

import { buildEditRoutineBreadcrumbs, buildTrainingRoutineHref } from "@/features/role/coach/routine/views/edit-routine-day-page-content.utils";
import { useRoutineDay } from "@/features/routine/hooks/use-routine-day";

type UseEditRoutineDayPageStateParams = {
	month: number | null;
	routineDayId: string | null;
	studentId: string | null;
	year: number | null;
};

export function useEditRoutineDayPageState( {
	month,
	routineDayId,
	studentId,
	year,
}: UseEditRoutineDayPageStateParams ) {
	const backHref = buildTrainingRoutineHref( studentId, month, year );
	const breadcrumbs = buildEditRoutineBreadcrumbs(
		studentId,
		month,
		year,
		"Editar Rutina",
	);
	const routineDayQuery = useRoutineDay( { routineDayId, studentId } );
	const isRefreshing = routineDayQuery.isFetching && !routineDayQuery.isLoading;
	const handleRefreshRoutineDay = useCallback( async () => {
		const refreshed = await routineDayQuery.refetch();

		return refreshed.data ?? null;
	}, [ routineDayQuery ] );

	return {
		backHref,
		breadcrumbs,
		handleRefreshRoutineDay,
		isRefreshing,
		routineDayQuery,
	};
}
