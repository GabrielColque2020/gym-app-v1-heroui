"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { Alert, Button, Card } from "@heroui/react";
import { ChevronRight, Dumbbell, RotateCw, UserPlus, Users } from "lucide-react";

import { PageHeader } from "@/components/common";
import { DashboardSkeleton } from "@/components/common/skeletons";
import { useIsMounted } from "@/components/layout/use-is-mounted";
import { useAdminDashboardSummary } from "@/features/role/admin/dashboard/hooks/use-admin-dashboard-summary";

export default function AdminDashboardPageContent() {
	const router = useRouter();
	const isMounted = useIsMounted();
	const { data, error, isError, isFetching, isLoading, refetch } = useAdminDashboardSummary();
	const isRefreshing = isFetching && !isLoading;
	const handleRefresh = useCallback( () => {
		if (isRefreshing) return;

		void refetch();
	}, [ isRefreshing, refetch ] );
	const shouldShowLoading = !isMounted || isLoading || ( !data && ( isFetching || !isError ) );

	if (shouldShowLoading) {
		return <DashboardSkeleton title={ "Cargando el inicio" }/>;
	}

	if (isError || !data) {
		return (
			<Card className={ "border border-danger/20 bg-surface" } variant={ "default" }>
				<Card.Content className={ "space-y-3 p-4" }>
					<PageHeader
						description={ error?.message ?? "No pudimos cargar el resumen." }
						title={ "No se pudo cargar el inicio" }
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
						description={ "Cuántas cuentas hay y en qué estado están." }
						title={ "Inicio" }
					/>
					<Button className={ "w-full md:w-auto" } isDisabled={ isRefreshing } variant={ "secondary" } onPress={ handleRefresh }>
						<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
						{ isRefreshing ? "Actualizando..." : "Actualizar" }
					</Button>
				</Card.Content>
			</Card>

			{ /* Lo unico que pide una accion: un estudiante sin entrenador no recibe rutina ni plan. */ }
			{ data.totals.studentsWithoutCoach > 0 ? (
				<Alert className={ "border border-warning/20" } status={ "warning" }>
					<Alert.Indicator/>
					<Alert.Content>
						<Alert.Title>
							{ data.totals.studentsWithoutCoach === 1
								? "Hay 1 estudiante sin entrenador"
								: `Hay ${ data.totals.studentsWithoutCoach } estudiantes sin entrenador` }
						</Alert.Title>
						<Alert.Description>
							No tienen entrenador asignado, o el que tenían está desactivado. Nadie les arma la rutina ni el plan.
						</Alert.Description>
					</Alert.Content>
					<Button size={ "sm" } variant={ "secondary" } onPress={ () => router.push( "/admin/users?sinEntrenador=1" ) }>
						Ver quiénes son
					</Button>
				</Alert>
			) : null }

			{ /* Cada numero lleva a la lista ya filtrada. */ }
			<div className={ "grid grid-cols-2 gap-3 xl:grid-cols-4" }>
				<StatCard
					description={ "Todas las cuentas, de cualquier rol." }
					label={ "Usuarios" }
					value={ data.totals.totalUsers }
					onPressAction={ () => router.push( "/admin/users" ) }
				/>
				<StatCard
					description={ "Entrenadores que pueden entrar a la app." }
					label={ "Entrenadores activos" }
					value={ data.totals.activeCoaches }
					onPressAction={ () => router.push( "/admin/users?rol=entrenador&estado=activos" ) }
				/>
				<StatCard
					description={ "Estudiantes que pueden entrar a la app." }
					label={ "Estudiantes activos" }
					value={ data.totals.activeStudents }
					onPressAction={ () => router.push( "/admin/users?rol=estudiante&estado=activos" ) }
				/>
				<StatCard
					description={ "Cuentas sin acceso a la app." }
					label={ "Inactivos" }
					value={ data.totals.inactiveUsers }
					onPressAction={ () => router.push( "/admin/users?estado=inactivos" ) }
				/>
			</div>

			<Card className={ "border border-border py-2" } variant={ "default" }>
				<Card.Content className={ "flex flex-col gap-3 p-3 xl:flex-row xl:items-center xl:justify-between" }>
					<div className={ "space-y-1" }>
						<p className={ "text-base font-semibold text-foreground" }>Accesos rápidos</p>
						<p className={ "text-sm text-muted" }>Las tareas más comunes.</p>
					</div>
					<div className={ "flex flex-col gap-2 sm:flex-row sm:flex-wrap" }>
						<Button variant={ "secondary" } onPress={ () => router.push( "/admin/users" ) }>
							<Users className={ "size-4" }/>
							Ir a usuarios
						</Button>
						<Button variant={ "secondary" } onPress={ () => router.push( "/admin/exercises" ) }>
							<Dumbbell className={ "size-4" }/>
							Ir a ejercicios globales
						</Button>
						<Button variant={ "secondary" } onPress={ () => router.push( "/admin/users?nuevo=entrenador" ) }>
							<UserPlus className={ "size-4" }/>
							Nuevo entrenador
						</Button>
						<Button onPress={ () => router.push( "/admin/users?nuevo=estudiante" ) }>
							<UserPlus className={ "size-4" }/>
							Nuevo estudiante
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
	onPressAction,
}: {
	description: string;
	label: string;
	onPressAction: () => void;
	value: number;
} ) {
	return (
		<button
			aria-label={ `${ label }: ${ value }. Ver la lista` }
			className={ "rounded-3xl text-left outline-none transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent" }
			type={ "button" }
			onClick={ onPressAction }
		>
			<Card className={ "h-full border border-border" } variant={ "default" }>
				<Card.Content className={ "space-y-2 p-4" }>
					<div className={ "flex items-center justify-between gap-2" }>
						<p className={ "text-sm font-medium text-muted" }>{ label }</p>
						<ChevronRight className={ "size-4 shrink-0 text-muted" }/>
					</div>
					<p className={ "text-3xl font-semibold tabular-nums text-foreground" }>{ value }</p>
					<p className={ "text-xs text-muted" }>{ description }</p>
				</Card.Content>
			</Card>
		</button>
	);
}
