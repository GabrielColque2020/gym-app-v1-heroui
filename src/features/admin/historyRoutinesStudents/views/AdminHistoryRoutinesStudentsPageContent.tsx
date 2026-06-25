"use client";

import { Alert, Card, Spinner } from "@heroui/react";

import { PageBreadcrumbs, PageHeader } from "@/components/common";
import { HistoryRoutinesStudentsContentDesktop } from "@/features/admin/historyRoutinesStudents/components/desktop/HistoryRoutinesStudentsContentDesktop";
import { HistoryRoutinesStudentsContentMobile } from "@/features/admin/historyRoutinesStudents/components/mobile/HistoryRoutinesStudentsContentMobile";
import { useHistoryRoutinesStudents } from "@/features/admin/historyRoutinesStudents/hooks/useHistoryRoutinesStudents";

export default function AdminHistoryRoutinesStudentsPageContent() {
	const { data: students = [], error, isError, isLoading } = useHistoryRoutinesStudents();
	const breadcrumbs = [
		{ href: "/", label: "Inicio" },
		{ label: "Historial de rutinas por estudiante" },
	];

	if (isLoading) {
		return (
			<>
				<div className={ "mb-0" }>
					<PageBreadcrumbs
						backHref={ "/" }
						backLabel={ "Volver al inicio" }
						crumbs={ breadcrumbs }
					/>
				</div>
				<Card className={ "border border-border bg-surface" } variant={ "default" }>
					<Card.Content className={ "flex min-h-56 flex-col items-center justify-center gap-3 py-10 text-center" }>
						<Spinner size={ "lg" }/>
						<div className={ "space-y-1" }>
							<p className={ "text-base font-semibold text-foreground" }>Cargando estudiantes activos</p>
							<p className={ "text-sm text-muted" }>Consultando estudiantes disponibles para historial.</p>
						</div>
					</Card.Content>
				</Card>
			</>
		);
	}

	if (isError) {
		return (
			<>
				<div className={ "mb-0" }>
					<PageBreadcrumbs
						backHref={ "/" }
						backLabel={ "Volver al inicio" }
						crumbs={ breadcrumbs }
					/>
				</div>
				<Alert className={ "border border-danger/20" } status={ "danger" }>
					<Alert.Content>
						<Alert.Title>Error al cargar estudiantes activos</Alert.Title>
						<Alert.Description>{ error.message }</Alert.Description>
					</Alert.Content>
				</Alert>
			</>
		);
	}

	return (
		<>
			<div className={ "mb-0" }>
				<PageBreadcrumbs
					backHref={ "/" }
					backLabel={ "Volver al inicio" }
					crumbs={ breadcrumbs }
				/>
			</div>
			<Card className={ "border border-border bg-surface" } variant={ "default" }>
				<Card.Header className={ "flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6" }>
					<PageHeader
						description={ "Selecciona un estudiante activo para consultar su historial de rutinas mensual." }
						title={ "Historial de rutinas por estudiante" }
					/>
				</Card.Header>
				<Card.Content className={ "px-5 py-4 sm:px-6" }>
					<div className={ "hidden w-full md:flex" }>
						<HistoryRoutinesStudentsContentDesktop students={ students }/>
					</div>
					<div className={ "w-full md:hidden" }>
						<HistoryRoutinesStudentsContentMobile students={ students }/>
					</div>
				</Card.Content>
				<Card.Footer className={ "border-t border-border px-5 py-4 sm:px-6" }>
					<div className={ "text-sm text-muted" }>
						Solo se muestran estudiantes activos.
					</div>
				</Card.Footer>
			</Card>
		</>
	);
}
