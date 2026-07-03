"use client";

import { PageBreadcrumbs } from "@/components/common";
import { HistoryRoutineMonthFilters } from "@/features/role/coach/history-routines/components/shared/history-routine-month-filters";
import { CoachHistoryRoutinesEmptyState } from "@/features/role/coach/history-routines/components/shared/coach-history-routines-empty-state";
import { CoachHistoryRoutinesErrorState } from "@/features/role/coach/history-routines/components/shared/coach-history-routines-error-state";
import { CoachHistoryRoutinesLoadingState } from "@/features/role/coach/history-routines/components/shared/coach-history-routines-loading-state";
import { CoachHistoryRoutinesMissingStudentState } from "@/features/role/coach/history-routines/components/shared/coach-history-routines-missing-student-state";
import { CoachHistoryRoutinesDesktopContent } from "@/features/role/coach/history-routines/components/desktop/coach-history-routines-desktop-content";
import { CoachHistoryRoutinesMobileContent } from "@/features/role/coach/history-routines/components/mobile/coach-history-routines-mobile-content";
import { useCoachHistoryRoutinesPageState } from "@/features/role/coach/history-routines/hooks/use-coach-history-routines-page-state";

type CoachHistoryRoutinesPageContentProps = {
	studentId: string | null;
};

function CoachHistoryRoutinesPageContentLoaded( { studentId }: { studentId: string } ) {
	const {
		breadcrumbs,
		data,
		desktopSummary,
		error,
		handleClear,
		handleRefresh,
		handleSearch,
		handleWeekToggle,
		isError,
		isLoading,
		isRefreshing,
		monthLabel,
		mobileSummary,
		onMonthChange,
		onYearChange,
		selectedMonth,
		selectedWeeks,
		selectedWeekGroups,
		selectedYear,
		weekGroups,
		yearOptions,
		monthOptions,
	} = useCoachHistoryRoutinesPageState( studentId );

	return (
		<div className={ "mx-auto flex w-full max-w-350 flex-col gap-4" }>
			<PageBreadcrumbs
				backHref={ "/coach/history-routines-students" }
				backLabel={ "Volver a estudiantes" }
				crumbs={ breadcrumbs }
			/>

			<HistoryRoutineMonthFilters
				isRefreshing={ isRefreshing }
				monthOptions={ monthOptions }
				onClear={ handleClear }
				onMonthChange={ onMonthChange }
				onRefresh={ handleRefresh }
				onSearch={ handleSearch }
				onYearChange={ onYearChange }
				selectedMonth={ selectedMonth }
				selectedYear={ selectedYear }
				yearOptions={ yearOptions }
				userName={ data?.student.name }
			/>

			{ isLoading ? (
				<CoachHistoryRoutinesLoadingState/>
			) : null }

			{ isError ? (
				<CoachHistoryRoutinesErrorState message={ error?.message ?? "Error al cargar historial" }/>
			) : null }

			{ !isLoading && !isError && data ? (
				data.historyRoutines.length === 0 ? (
					<CoachHistoryRoutinesEmptyState monthLabel={ monthLabel }/>
				) : (
					<>
						<div className={ "hidden md:block" }>
							<CoachHistoryRoutinesDesktopContent
								monthLabel={ monthLabel }
								selectedWeekGroups={ selectedWeekGroups }
								selectedWeeks={ selectedWeeks }
								summary={ desktopSummary }
								weekGroups={ weekGroups }
								onWeekToggle={ handleWeekToggle }
							/>
						</div>
						<div className={ "md:hidden" }>
							<CoachHistoryRoutinesMobileContent
								monthLabel={ monthLabel }
								selectedWeekGroups={ selectedWeekGroups }
								selectedWeeks={ selectedWeeks }
								summary={ mobileSummary }
								weekGroups={ weekGroups }
								onWeekToggle={ handleWeekToggle }
							/>
						</div>
					</>
				)
			) : null }
		</div>
	);
}

export default function CoachHistoryRoutinesPageContent( { studentId }: CoachHistoryRoutinesPageContentProps ) {
	if (!studentId) {
		const breadcrumbs = [
			{ href: "/", label: "Inicio" },
			{ href: "/coach/history-routines-students", label: "Historial de rutinas por estudiante" },
		];

		return (
			<>
				<div className={ "mb-4" }>
					<PageBreadcrumbs
						backHref={ "/coach/history-routines-students" }
						backLabel={ "Volver a estudiantes" }
						crumbs={ breadcrumbs }
					/>
				</div>
				<CoachHistoryRoutinesMissingStudentState/>
			</>
		);
	}

	return <CoachHistoryRoutinesPageContentLoaded studentId={ studentId }/>;
}
