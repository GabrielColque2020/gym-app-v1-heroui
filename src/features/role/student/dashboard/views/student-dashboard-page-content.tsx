"use client";

import { ErrorAlert } from "@/components/common";
import { useCallback, useMemo } from "react";
import {  } from "@heroui/react";

import { DashboardSkeleton } from "@/components/common/skeletons";
import { useIsMounted } from "@/components/layout/use-is-mounted";
import { StudentDashboardActivityCard } from "@/features/role/student/dashboard/components/student-dashboard-activity-card";
import { StudentDashboardHero } from "@/features/role/student/dashboard/components/student-dashboard-hero";
import { StudentDashboardQuickActions } from "@/features/role/student/dashboard/components/student-dashboard-quick-actions";
import { StudentDashboardQuickStats } from "@/features/role/student/dashboard/components/student-dashboard-quick-stats";
import { StudentDashboardTodayCard } from "@/features/role/student/dashboard/components/student-dashboard-today-card";
import { useStudentDashboardSummary } from "@/features/role/student/dashboard/hooks/use-student-dashboard-summary";
import { formatLastProgressLabel } from "@/features/role/student/dashboard/services/student-dashboard-mappers";

export default function StudentDashboardPageContent() {
	const isMounted = useIsMounted();
	const { data, error, isError, isFetching, isLoading, refetch } = useStudentDashboardSummary();
	const isRefreshing = isFetching && !isLoading;
	const handleRefresh = useCallback( () => {
		if (isRefreshing) return;

		void refetch();
	}, [ isRefreshing, refetch ] );
	const quickStats = useMemo( () => data ? [
		{
			description: "Semanas disponibles en tu rutina actual.",
			label: "Rutinas este mes",
			value: data.routine.totalWeeks,
		},
		{
			description: "Cantidad de ejercicios del próximo día.",
			label: "Ejercicios del día",
			value: data.routine.exercisesInNextDay,
		},
		{
			description: "Comidas cargadas en tu plan alimenticio.",
			label: "Comidas del plan",
			value: data.mealPlans.total,
		},
		{
			description: "Último guardado registrado en tu historial.",
			label: "Último progreso",
			value: formatLastProgressLabel( data.history.lastProgressAt ),
		},
	] : [], [ data ] );
	const shouldShowLoading = !isMounted || isLoading || ( !data && ( isFetching || !isError ) );

	if (shouldShowLoading) {
		return (
			<DashboardSkeleton title={ "Cargando tu dashboard" } variant={ "student" }/>
		);
	}

	if (isError || !data) {
		return (
			<ErrorAlert
				isRetrying={ isFetching }
				message={ error?.message ?? "No pudimos cargar tu resumen principal." }
				title={ "No se pudo cargar tu inicio" }
				onRetryAction={ () => void refetch() }
			/>
		);
	}

	return (
		<div className={ "flex flex-col gap-4" }>
			<StudentDashboardHero
				isRefreshing={ isRefreshing }
				studentName={ data.student.name }
				onRefresh={ handleRefresh }
			/>
			{ /* La proxima sesion va primero: es a lo que el estudiante entra, y en el
			     telefono quedaba debajo de cuatro tarjetas de numeros. */ }
			<StudentDashboardTodayCard
				currentMonth={ data.routine.currentMonth }
				currentYear={ data.routine.currentYear }
				exercisesInNextDay={ data.routine.exercisesInNextDay }
				hasCurrentMonthRoutine={ data.routine.hasCurrentMonthRoutine }
				nextRoutineDay={ data.routine.nextRoutineDay }
				totalWeeks={ data.routine.totalWeeks }
			/>
			<StudentDashboardQuickStats items={ quickStats }/>
			<StudentDashboardQuickActions/>
			<StudentDashboardActivityCard
				lastMealPlanUpdatedAt={ data.mealPlans.lastUpdatedAt }
				lastProgressAt={ data.history.lastProgressAt }
				lastRecordedMonthValue={ data.history.lastRecordedMonthValue }
			/>
		</div>
	);
}
