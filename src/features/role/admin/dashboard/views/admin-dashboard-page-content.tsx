"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { Button, Card } from "@heroui/react";
import { Dumbbell, RotateCw, UserPlus, Users } from "lucide-react";

import { PageHeader } from "@/components/common";
import { useAdminDashboardSummary } from "@/features/role/admin/dashboard/hooks/use-admin-dashboard-summary";
import { AdminExercisesLoadingState } from "@/features/role/admin/exercises/components/shared/admin-exercises-loading-state";

export default function AdminDashboardPageContent() {
	const router = useRouter();
	const { data, error, isError, isFetching, isLoading, refetch } = useAdminDashboardSummary();
	const isRefreshing = isFetching && !isLoading;
	const handleRefresh = useCallback( () => {
		if (isRefreshing) return;

		void refetch();
	}, [ isRefreshing, refetch ] );
	const shouldShowLoading = isLoading || ( !data && ( isFetching || !isError ) );

	if (shouldShowLoading) {
		return (
			<AdminExercisesLoadingState
				description={ "Consultando métricas, accesos rápidos y estado general del sistema." }
				title={ "Cargando dashboard admin" }
			/>
		);
	}

	if (isError || !data) {
		return (
			<Card className={ "border border-danger/20 bg-surface" } variant={ "default" }>
				<Card.Content className={ "space-y-3 p-4" }>
					<PageHeader
						description={ error?.message ?? "No pudimos cargar el resumen admin." }
						title={ "Error al cargar el dashboard admin" }
					/>
				</Card.Content>
			</Card>
		);
	}

	return (
		<div className={ "flex flex-col gap-4" }>
			<Card className={ "border border-border py-2" } variant={ "default" }>
				<Card.Content className={ "flex flex-col gap-3 p-3 md:flex-row md:items-end md:justify-between" }>
					<PageHeader
						description={ "Resumen global para cuentas, roles y estado general del sistema." }
						title={ "Dashboard admin" }
					/>
					<Button className={ "w-full md:w-auto" } isDisabled={ isRefreshing } variant={ "secondary" } onPress={ handleRefresh }>
						<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
						{ isRefreshing ? "Actualizando..." : "Actualizar" }
					</Button>
				</Card.Content>
			</Card>

			<div className={ "grid gap-3 md:grid-cols-2 xl:grid-cols-4" }>
				<StatCard description={ "Usuarios registrados en el sistema." } label={ "Total usuarios" } value={ data.totals.totalUsers }/>
				<StatCard description={ "Coaches activos disponibles." } label={ "Coaches activos" } value={ data.totals.activeCoaches }/>
				<StatCard description={ "Estudiantes activos con acceso." } label={ "Estudiantes activos" } value={ data.totals.activeStudents }/>
				<StatCard description={ "Usuarios inactivos." } label={ "Inactivos" } value={ data.totals.inactiveUsers }/>
			</div>

			<Card className={ "border border-border py-2" } variant={ "default" }>
				<Card.Content className={ "flex flex-col gap-3 p-3 md:flex-row md:items-center md:justify-between" }>
					<div className={ "space-y-1" }>
						<p className={ "text-base font-semibold text-foreground" }>Accesos rapidos</p>
						<p className={ "text-sm text-muted" }>Saltos directos a las tareas mas usadas por administracion.</p>
					</div>
					<div className={ "flex flex-col gap-2 sm:flex-row" }>
						<Button variant={ "secondary" } onPress={ () => router.push( "/admin/users" ) }>
							<Users className={ "size-4" }/>
							Ir a usuarios
						</Button>
						<Button variant={ "secondary" } onPress={ () => router.push( "/admin/exercises" ) }>
							<Dumbbell className={ "size-4" }/>
							Ir a ejercicios globales
						</Button>
						<Button onPress={ () => router.push( "/admin/users" ) }>
							<UserPlus className={ "size-4" }/>
							Crear coach
						</Button>
					</div>
				</Card.Content>
			</Card>
		</div>
	);
}

function StatCard( {
	label,
	value,
	description,
}: {
	description: string;
	label: string;
	value: number;
} ) {
	return (
		<Card className={ "border border-border" } variant={ "default" }>
			<Card.Content className={ "space-y-2 p-4" }>
				<p className={ "text-sm font-medium text-muted" }>{ label }</p>
				<p className={ "text-3xl font-semibold tabular-nums text-foreground" }>{ value }</p>
				<p className={ "text-xs text-muted" }>{ description }</p>
			</Card.Content>
		</Card>
	);
}
