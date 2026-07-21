"use client";

import { useCallback, useMemo } from "react";
import { Alert } from "@heroui/react";

import { StudentDashboardActivityCard } from "@/features/role/student/dashboard/components/student-dashboard-activity-card";
import { StudentDashboardHero } from "@/features/role/student/dashboard/components/student-dashboard-hero";
import { StudentDashboardQuickActions } from "@/features/role/student/dashboard/components/student-dashboard-quick-actions";
import { StudentDashboardQuickStats } from "@/features/role/student/dashboard/components/student-dashboard-quick-stats";
import { StudentDashboardTodayCard } from "@/features/role/student/dashboard/components/student-dashboard-today-card";
import { useStudentDashboardSummary } from "@/features/role/student/dashboard/hooks/use-student-dashboard-summary";
import { formatLastProgressLabel } from "@/features/role/student/dashboard/services/student-dashboard-mappers";
import { AdminExercisesLoadingState } from "@/features/role/admin/exercises/components/shared/admin-exercises-loading-state";

export default function StudentDashboardPageContent() {
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
			description: "Cantidad de ejercicios del proximo dia.",
			label: "Ejercicios del dia",
			value: data.routine.exercisesInNextDay,
		},
		{
			description: "Planes alimenticios cargados para tu cuenta.",
			label: "Planes alimenticios",
			value: data.mealPlans.total,
		},
		{
			description: "Ultimo guardado registrado en tu historial.",
			label: "Ultimo progreso",
			value: formatLastProgressLabel( data.history.lastProgressAt ),
		},
	] : [], [ data ] );
	const shouldShowLoading = isLoading || ( !data && ( isFetching || !isError ) );

	if (shouldShowLoading) {
		return (
			<AdminExercisesLoadingState
				description={ "Consultando rutina, planes alimenticios y actividad reciente." }
				title={ "Cargando tu dashboard" }
			/>
		);
	}

	if (isError || !data) {
		return (
			<Alert className={ "border border-danger/20" } status={ "danger" }>
				<Alert.Content>
					<Alert.Title>Error al cargar tu dashboard</Alert.Title>
					<Alert.Description>{ error?.message ?? "No pudimos cargar tu resumen principal." }</Alert.Description>
				</Alert.Content>
			</Alert>
		);
	}

	return (
		<div className={ "flex flex-col gap-4" }>
			<StudentDashboardHero
				isRefreshing={ isRefreshing }
				studentName={ data.student.name }
				onRefresh={ handleRefresh }
			/>
			<StudentDashboardQuickStats items={ quickStats }/>
			<StudentDashboardTodayCard
				currentMonth={ data.routine.currentMonth }
				currentYear={ data.routine.currentYear }
				exercisesInNextDay={ data.routine.exercisesInNextDay }
				hasCurrentMonthRoutine={ data.routine.hasCurrentMonthRoutine }
				nextRoutineDay={ data.routine.nextRoutineDay }
				totalWeeks={ data.routine.totalWeeks }
			/>
			<StudentDashboardQuickActions/>
			<StudentDashboardActivityCard
				lastMealPlanUpdatedAt={ data.mealPlans.lastUpdatedAt }
				lastProgressAt={ data.history.lastProgressAt }
				lastRecordedMonthValue={ data.history.lastRecordedMonthValue }
			/>
		</div>
	);
}
