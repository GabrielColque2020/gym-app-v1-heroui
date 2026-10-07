"use client";

import { useCallback } from "react";

import { PageBreadcrumbs } from "@/components/common";
import { buildEditRoutineDayHref } from "@/features/role/coach/routine/views/edit-routine-day-page-content.utils";
import { CoachRepeatWeekAction } from "@/features/role/coach/training-routine/components/shared/coach-repeat-week-action";
import { CoachTrainingRoutineFilter } from "@/features/role/coach/training-routine/components/shared";
import { CoachTrainingRoutineMonthGrid } from "@/features/role/coach/training-routine/components/shared/coach-training-routine-month-grid";
import { CoachTrainingRoutinesEmptyState } from "@/features/role/coach/training-routine/components/shared/coach-training-routines-empty-state";
import { CoachTrainingRoutinesErrorState } from "@/features/role/coach/training-routine/components/shared/coach-training-routines-error-state";
import { CoachTrainingRoutinesLoadingState } from "@/features/role/coach/training-routine/components/shared/coach-training-routines-loading-state";
import { CoachTrainingRoutinesMissingStudentState } from "@/features/role/coach/training-routine/components/shared/coach-training-routines-missing-student-state";
import { CoachStudentTabs } from "@/features/role/coach/students/components/coach-student-tabs";
import { useTrainingRoutines } from "@/features/role/coach/training-routine/hooks/use-training-routines";

type CoachTrainingRoutinesPageContentProps = {
	month: number;
	studentId: string | null;
	year: number;
};

export default function CoachTrainingRoutinesPageContent( {
															  month,
															  studentId,
															  year,
														  }: CoachTrainingRoutinesPageContentProps ) {
	const { data, error, isError, isFetching, isLoading, refetch } = useTrainingRoutines( { alwaysFresh: true, month, studentId, year } );
	const breadcrumbs = studentId ? [
		{ href: "/coach/dashboard", label: "Inicio" },
		{ href: "/coach/student", label: "Estudiantes" },
		{ label: data?.student.name ?? "Rutinas del estudiante" },
	] : [
		{ href: "/coach/dashboard", label: "Inicio" },
		{ href: "/coach/student", label: "Estudiantes" },
	];
	const isRefreshing = isFetching && !isLoading;
	const handleRefresh = useCallback( () => {
		if (isRefreshing) return;

		void refetch();
	}, [ isRefreshing, refetch ] );

	if (!studentId) {
		return (
			<>
				<div className={ "mb-4" }>
					<PageBreadcrumbs
						backHref={ "/coach/student" }
						backLabel={ "Volver a estudiantes" }
						crumbs={ breadcrumbs }
					/>
				</div>
				<CoachTrainingRoutinesMissingStudentState/>
			</>
		);
	}

	if (isLoading) {
		return (
			<>
				<div className={ "mb-4" }>
					<PageBreadcrumbs
						backHref={ "/coach/student" }
						backLabel={ "Volver a estudiantes" }
						crumbs={ breadcrumbs }
					/>
				</div>
				<CoachTrainingRoutinesLoadingState/>
			</>
		);
	}

	if (isError) {
		return (
			<>
				<div className={ "mb-4" }>
					<PageBreadcrumbs
						backHref={ "/coach/student" }
						backLabel={ "Volver a estudiantes" }
						crumbs={ breadcrumbs }
					/>
				</div>
				<CoachTrainingRoutinesErrorState message={ error.message }/>
			</>
		);
	}

	if (!data) return null;

	const routineWeeks = data.routineMonth.weeks;

	return (
		<div className={ "flex flex-col gap-4" }>
			<PageBreadcrumbs
				backHref={ "/coach/student" }
				backLabel={ "Volver a estudiantes" }
				crumbs={ breadcrumbs }
			/>

			<CoachStudentTabs active={ "routine" } studentId={ studentId }/>

			<CoachTrainingRoutineFilter
				month={ month }
				isRefreshing={ isRefreshing }
				routineCount={ routineWeeks.length }
				routineObjective={ data.routineMonth.objective }
				onRefreshAction={ handleRefresh }
				routineWeeks={ routineWeeks }
				studentId={ studentId }
				studentName={ data.student.name }
				year={ year }
			/>

			{ routineWeeks.length === 0 ? (
				<CoachTrainingRoutinesEmptyState
					month={ month }
					studentId={ studentId }
					studentName={ data.student.name }
					year={ year }
				/>
			) : (
				<CoachTrainingRoutineMonthGrid
					buildDayHrefAction={ ( routineDayId ) => buildEditRoutineDayHref( routineDayId, studentId, month, year ) }
					renderWeekAction={ ( routineWeek ) => (
						<CoachRepeatWeekAction
							month={ month }
							routineWeeks={ routineWeeks }
							selectedRoutine={ routineWeek }
							studentId={ studentId }
							year={ year }
						/>
					) }
					routineWeeks={ routineWeeks }
				/>
			) }
		</div>
	);
}
