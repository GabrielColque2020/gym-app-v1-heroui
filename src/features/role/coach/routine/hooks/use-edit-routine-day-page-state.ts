"use client";

import { useCallback } from "react";

import {
	buildEditRoutineBreadcrumbs,
	buildEditTemplateBreadcrumbs,
	buildRoutineTemplateHref,
	buildTrainingRoutineHref,
} from "@/features/role/coach/routine/views/edit-routine-day-page-content.utils";
import { useRoutineDay } from "@/features/routine/hooks/use-routine-day";

type UseEditRoutineDayPageStateParams = {
	month: number | null;
	routineDayId: string | null;
	studentId: string | null;
	// Con valor, el dia es de una plantilla y no de un estudiante.
	templateId: string | null;
	year: number | null;
};

export function useEditRoutineDayPageState( {
	month,
	routineDayId,
	studentId,
	templateId,
	year,
}: UseEditRoutineDayPageStateParams ) {
	const backHref = templateId ? buildRoutineTemplateHref( templateId ) : buildTrainingRoutineHref( studentId, month, year );
	const backLabel = templateId ? "Volver a la plantilla" : "Volver a rutina";
	const breadcrumbs = templateId
		? buildEditTemplateBreadcrumbs( templateId, "Editar día" )
		: buildEditRoutineBreadcrumbs( studentId, month, year, "Editar Rutina" );
	const routineDayQuery = useRoutineDay( { routineDayId, studentId, templateId } );
	const isRefreshing = routineDayQuery.isFetching && !routineDayQuery.isLoading;
	const handleRefreshRoutineDay = useCallback( async () => {
		const refreshed = await routineDayQuery.refetch();

		return refreshed.data ?? null;
	}, [ routineDayQuery ] );

	return {
		backHref,
		backLabel,
		breadcrumbs,
		handleRefreshRoutineDay,
		isRefreshing,
		routineDayQuery,
	};
}
