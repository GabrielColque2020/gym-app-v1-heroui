"use client";

import { useCallback } from "react";

import { CoachDashboardErrorState } from "@/features/role/coach/dashboard/components/coach-dashboard-error-state";
import { CoachDashboardHero } from "@/features/role/coach/dashboard/components/coach-dashboard-hero";
import { CoachDashboardQuickActions } from "@/features/role/coach/dashboard/components/coach-dashboard-quick-actions";
import { CoachDashboardQuickStats } from "@/features/role/coach/dashboard/components/coach-dashboard-quick-stats";
import { CoachDashboardStudentsTable } from "@/features/role/coach/dashboard/components/coach-dashboard-students-table";
import { useCoachDashboardSummary } from "@/features/role/coach/dashboard/hooks/use-coach-dashboard-summary";
import { buildCoachDashboardQuickStats } from "@/features/role/coach/dashboard/services/coach-dashboard-summary-cards";
import { AdminExercisesLoadingState } from "@/features/role/admin/exercises/components/shared/admin-exercises-loading-state";

export default function CoachDashboardPageContent() {
	const { data, error, isError, isFetching, isLoading, refetch } = useCoachDashboardSummary();
	const isRefreshing = isFetching && !isLoading;
	const handleRefresh = useCallback( () => {
		if (isRefreshing) return;

		void refetch();
	}, [ isRefreshing, refetch ] );
	const shouldShowLoading = isLoading || ( !data && ( isFetching || !isError ) );

	if (shouldShowLoading) {
		return (
			<AdminExercisesLoadingState
				description={ "Consultando estudiantes, rutinas, planes y actividad reciente." }
				title={ "Cargando dashboard coach" }
			/>
		);
	}

	if (isError || !data) {
		return <CoachDashboardErrorState message={ error?.message ?? "No pudimos cargar el resumen operativo del coach." }/>;
	}

	return (
		<div className={ "flex flex-col gap-4" }>
			<CoachDashboardHero
				currentPeriodLabel={ data.currentPeriod.label }
				isRefreshing={ isRefreshing }
				onRefresh={ handleRefresh }
			/>
			<CoachDashboardQuickStats items={ buildCoachDashboardQuickStats( data ) }/>
			<CoachDashboardQuickActions/>
			<CoachDashboardStudentsTable
				currentPeriodLabel={ data.currentPeriod.label }
				students={ data.students }
			/>
		</div>
	);
}
