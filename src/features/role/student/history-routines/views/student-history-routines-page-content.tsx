"use client";

import { useState } from "react";
import { Alert, Card, Spinner } from "@heroui/react";

import { PageBreadcrumbs } from "@/components/common";
import { HistoryRoutinesReportsIndex } from "@/features/history-routines/components/shared/history-routines-reports-index";
import { buildHistoryRoutinesReportPdfUrl } from "@/features/history-routines/services/history-routines-report-pdf-url";
import type { HistoryRoutineReportRow } from "@/features/history-routines/services/history-routines-reports";
import { useHistoryRoutinesReports } from "@/features/role/student/history-routines/hooks/use-history-routines-reports";

type StudentHistoryRoutinesPageContentProps = {
	studentId: string | null;
};

function StudentHistoryRoutinesPageContentLoaded( { studentId }: { studentId: string } ) {
	const [ downloadError, setDownloadError ] = useState<string | null>( null );
	const [ pendingPeriodKey, setPendingPeriodKey ] = useState<string | null>( null );

	const { data, error, isError, isLoading, isFetching, refetch } = useHistoryRoutinesReports( studentId );

	async function handleDownloadReport( report: HistoryRoutineReportRow ) {
		setDownloadError( null );
		setPendingPeriodKey( report.periodKey );

		try {
			const reportUrl = buildHistoryRoutinesReportPdfUrl( {
				disposition: "attachment",
				month: report.month,
				studentId,
				year: report.year,
			} );
			const downloadLink = document.createElement( "a" );
			downloadLink.download = "";
			downloadLink.href = reportUrl;
			downloadLink.rel = "noopener";
			downloadLink.style.display = "none";
			document.body.append( downloadLink );
			downloadLink.click();
			downloadLink.remove();

			window.setTimeout( () => {
				setPendingPeriodKey( ( current ) => current === report.periodKey ? null : current );
			}, 1200 );
		} catch ( downloadReportError ) {
			setPendingPeriodKey( null );
			setDownloadError(
				downloadReportError instanceof Error
					? downloadReportError.message
					: "No se pudo generar el reporte del periodo seleccionado.",
			);
		}
	}

	const breadcrumbs = [
		{ href: "/student/dashboard", label: "Inicio" },
		{ label: "Mi historial de rutinas" },
	];

	return (
		<div className={ "flex flex-col gap-4" }>
			<PageBreadcrumbs
				backHref={ "/student/dashboard" }
				backLabel={ "Volver al inicio" }
				crumbs={ breadcrumbs }
			/>

			{ isLoading ? (
				<Card className={ "border border-border py-2" } variant={ "default" }>
					<Card.Content className={ "flex min-h-56 flex-col items-center justify-center gap-3 p-3 text-center" }>
						<Spinner size={ "lg" }/>
						<div className={ "space-y-1" }>
							<p className={ "text-base font-semibold text-foreground" }>Cargando reportes mensuales</p>
							<p className={ "text-sm text-muted" }>Consultando los periodos disponibles.</p>
						</div>
					</Card.Content>
				</Card>
			) : null }

			{ isError ? (
				<Alert className={ "border border-danger/20" } status={ "danger" }>
					<Alert.Content>
						<Alert.Title>Error al cargar historial</Alert.Title>
						<Alert.Description>{ error.message }</Alert.Description>
					</Alert.Content>
				</Alert>
			) : null }

			{ downloadError ? (
				<Alert className={ "border border-danger/20" } status={ "danger" }>
					<Alert.Content>
						<Alert.Title>Error al generar el reporte</Alert.Title>
						<Alert.Description>{ downloadError }</Alert.Description>
					</Alert.Content>
				</Alert>
			) : null }

			{ !isLoading && !isError && data ? (
				<HistoryRoutinesReportsIndex
					description={ "Consulta los meses con registro y descarga el reporte PDF completo de cada periodo." }
					emptyMessage={ "Todavia no hay meses con historial de rutinas disponible." }
					isDownloadingPeriodKey={ pendingPeriodKey }
					isRefreshing={ isFetching && !isLoading }
					reports={ data.reports }
					title={ "Reportes mensuales" }
					onDownloadAction={ handleDownloadReport }
					onRefreshAction={ () => {
						void refetch();
					} }
				/>
			) : null }
		</div>
	);
}

export default function StudentHistoryRoutinesPageContent( { studentId }: StudentHistoryRoutinesPageContentProps ) {
	if (!studentId) {
		return (
			<Alert className={ "border border-warning/20" } status={ "warning" }>
				<Alert.Content>
					<Alert.Title>Debes iniciar sesion</Alert.Title>
					<Alert.Description>
						No se pudo identificar tu cuenta para mostrar tu historial de rutinas.
					</Alert.Description>
				</Alert.Content>
			</Alert>
		);
	}

	return <StudentHistoryRoutinesPageContentLoaded studentId={ studentId }/>;
}
