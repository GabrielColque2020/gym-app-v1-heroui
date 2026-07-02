"use client";

import { useCallback, useMemo } from "react";
import { Alert, Card, Spinner } from "@heroui/react";

import { CoachDashboardHero } from "@/features/role/coach/dashboard/components/CoachDashboardHero";
import { CoachDashboardQuickActions } from "@/features/role/coach/dashboard/components/CoachDashboardQuickActions";
import { CoachDashboardQuickStats } from "@/features/role/coach/dashboard/components/CoachDashboardQuickStats";
import { CoachDashboardStudentsTable } from "@/features/role/coach/dashboard/components/CoachDashboardStudentsTable";
import { useCoachDashboardSummary } from "@/features/role/coach/dashboard/hooks/useCoachDashboardSummary";

export default function CoachDashboardPageContent() {
	const { data, error, isError, isFetching, isLoading, refetch } = useCoachDashboardSummary();
	const isRefreshing = isFetching && !isLoading;
	const handleRefresh = useCallback( () => {
		if (isRefreshing) return;

		void refetch();
	}, [ isRefreshing, refetch ] );
	const quickStats = useMemo( () => data ? [
		{
			description: "Alumnos activos vinculados al coach.",
			label: "Estudiantes activos",
			value: data.totals.activeStudents,
		},
		{
			description: "Catalogo disponible para armar rutinas.",
			label: "Ejercicios activos",
			value: data.totals.activeExercises,
		},
		{
			description: "Estudiantes activos con rutina cargada este mes.",
			label: "Rutinas del mes",
			value: data.totals.studentsWithRoutineThisMonth,
		},
		{
			description: "Estudiantes activos con plan alimenticio registrado.",
			label: "Planes alimenticios",
			value: data.totals.studentsWithMealPlan,
		},
	] : [], [ data ] );

	if (isLoading) {
		return (
			<Card className={ "border border-border bg-surface" } variant={ "default" }>
				<Card.Content className={ "flex min-h-72 flex-col items-center justify-center gap-3 py-10 text-center" }>
					<Spinner size={ "lg" }/>
					<div className={ "space-y-1" }>
						<p className={ "text-base font-semibold text-foreground" }>Cargando dashboard coach</p>
						<p className={ "text-sm text-muted" }>Consultando estudiantes, rutinas, planes y actividad reciente.</p>
					</div>
				</Card.Content>
			</Card>
		);
	}

	if (isError || !data) {
		return (
			<Alert className={ "border border-danger/20" } status={ "danger" }>
				<Alert.Content>
					<Alert.Title>Error al cargar el dashboard coach</Alert.Title>
					<Alert.Description>{ error?.message ?? "No pudimos cargar el resumen operativo del coach." }</Alert.Description>
				</Alert.Content>
			</Alert>
		);
	}

	return (
		<div className={ "flex flex-col gap-4" }>
			<CoachDashboardHero
				currentPeriodLabel={ data.currentPeriod.label }
				isRefreshing={ isRefreshing }
				onRefresh={ handleRefresh }
			/>
			<CoachDashboardQuickStats items={ quickStats }/>
			<CoachDashboardQuickActions/>
			<CoachDashboardStudentsTable
				currentPeriodLabel={ data.currentPeriod.label }
				students={ data.students }
			/>
		</div>
	);
}
