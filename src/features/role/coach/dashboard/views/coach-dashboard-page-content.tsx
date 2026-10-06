"use client";

import { useCallback } from "react";

import { useIsMounted } from "@/components/layout/use-is-mounted";
import { DashboardSkeleton } from "@/components/common/skeletons";
import { CoachDashboardErrorState } from "@/features/role/coach/dashboard/components/coach-dashboard-error-state";
import { CoachDashboardHero } from "@/features/role/coach/dashboard/components/coach-dashboard-hero";
import { CoachDashboardPendingRoutines } from "@/features/role/coach/dashboard/components/coach-dashboard-pending-routines";
import { buildMonthYearLabel } from "@/features/role/coach/dashboard/services/coach-dashboard-mappers";
import { CoachDashboardQuickStats } from "@/features/role/coach/dashboard/components/coach-dashboard-quick-stats";
import { CoachDashboardStudentsTable } from "@/features/role/coach/dashboard/components/coach-dashboard-students-table";
import { useCoachDashboardSummary } from "@/features/role/coach/dashboard/hooks/use-coach-dashboard-summary";
import { buildCoachDashboardQuickStats } from "@/features/role/coach/dashboard/services/coach-dashboard-summary-cards";

export default function CoachDashboardPageContent() {
	const isMounted = useIsMounted();
	const { data, error, isError, isFetching, isLoading, refetch } = useCoachDashboardSummary();
	const isRefreshing = isFetching && !isLoading;
	const handleRefresh = useCallback( () => {
		if (isRefreshing) return;

		void refetch();
	}, [ isRefreshing, refetch ] );
	const shouldShowLoading = !isMounted || isLoading || ( !data && ( isFetching || !isError ) );

	if (shouldShowLoading) {
		return (
			<DashboardSkeleton title={ "Cargando dashboard coach" } variant={ "coach" }/>
		);
	}

	if (isError || !data) {
		return <CoachDashboardErrorState message={ error?.message ?? "No pudimos cargar el resumen operativo del coach." }/>;
	}

	return (
		<div className={ "flex flex-col gap-4" }>
			<CoachDashboardHero
				isRefreshing={ isRefreshing }
				onRefresh={ handleRefresh }
			/>
			{ /* Primero lo pendiente, despues el detalle por estudiante y al final los numeros. */ }
			<CoachDashboardPendingRoutines
				periodLabel={ buildMonthYearLabel( data.currentPeriod.month, data.currentPeriod.year ) }
				students={ data.students }
			/>
			<CoachDashboardStudentsTable
				currentPeriodLabel={ data.currentPeriod.label }
				students={ data.students }
			/>
			<CoachDashboardQuickStats items={ buildCoachDashboardQuickStats( data ) }/>
		</div>
	);
}
