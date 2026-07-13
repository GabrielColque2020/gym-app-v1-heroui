"use client";

import { EditRoutineDayEmptyState } from "@/features/role/coach/routine/components/shared/edit-routine-day-empty-state";
import { EditRoutineDayErrorState } from "@/features/role/coach/routine/components/shared/edit-routine-day-error-state";
import { EditRoutineDayLoadingState } from "@/features/role/coach/routine/components/shared/edit-routine-day-loading-state";
import { EditRoutineDayLoadedContent } from "@/features/role/coach/routine/components/shared/edit-routine-day-loaded-content";
import { EditRoutineDayStateBlock } from "@/features/role/coach/routine/components/shared/edit-routine-day-state-block";
import { useEditRoutineDayPageState } from "@/features/role/coach/routine/hooks/use-edit-routine-day-page-state";
import React from "react";

type EditRoutineDayPageContentProps = {
	month: number | null;
	routineDayId: string | null;
	studentId: string | null;
	year: number | null;
};

export default function EditRoutineDayPageContent( {
													   month,
													   routineDayId,
													   studentId,
													   year,
												   }: EditRoutineDayPageContentProps ) {
	const {
		backHref,
		breadcrumbs,
		handleRefreshRoutineDay,
		isRefreshing,
		routineDayQuery,
	} = useEditRoutineDayPageState( {
		month,
		routineDayId,
		studentId,
		year,
	} );
	const renderState = ( content: React.ReactNode ) => (
		<EditRoutineDayStateBlock backHref={ backHref } backLabel={ "Volver a rutina" } breadcrumbs={ breadcrumbs }>
			{ content }
		</EditRoutineDayStateBlock>
	);

	if (!routineDayId) {
		return renderState( <EditRoutineDayEmptyState/> );
	}

	if (routineDayQuery.isLoading) {
		return renderState( <EditRoutineDayLoadingState/> );
	}

	if (routineDayQuery.isError) {
		return renderState(
			<EditRoutineDayErrorState message={ routineDayQuery.error?.message ?? "Error al cargar rutina" }/>,
		);
	}

	const data = routineDayQuery.data;

	if (!data) return null;

	const routine = data.trainingRoutine;
	const studentName = routine.student?.name ?? "Estudiante";
	const title = `Editar Rutina - Dia ${ data.dayNumber }`;
	const description = `Semana ${ routine.week } | ${ routine.month }/${ routine.year } | ${ studentName }`;

	return (
		<EditRoutineDayLoadedContent
			data={ data }
			backHref={ backHref }
			breadcrumbs={ breadcrumbs }
			description={ description }
			isRefreshing={ isRefreshing }
			onRefreshRoutineDayAction={ handleRefreshRoutineDay }
			routineDayId={ routineDayId }
			studentId={ studentId }
			title={ title }
		/>
	);
}
