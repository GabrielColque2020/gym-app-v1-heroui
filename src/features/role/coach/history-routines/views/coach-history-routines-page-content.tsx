"use client";

import { useState } from "react";
import { Alert } from "@heroui/react";

import { PageBreadcrumbs } from "@/components/common";
import { HistoryRoutinesReportsIndex } from "@/features/history-routines/components/shared/history-routines-reports-index";
import { buildHistoryRoutinesReportPdfUrl } from "@/features/history-routines/services/history-routines-report-pdf-url";
import { CoachHistoryRoutinesErrorState } from "@/features/role/coach/history-routines/components/shared/coach-history-routines-error-state";
import { CoachHistoryRoutinesLoadingState } from "@/features/role/coach/history-routines/components/shared/coach-history-routines-loading-state";
import { CoachHistoryRoutinesMissingStudentState } from "@/features/role/coach/history-routines/components/shared/coach-history-routines-missing-student-state";
import { useHistoryRoutinesReports } from "@/features/role/coach/history-routines/hooks/use-history-routines-reports";
import type { HistoryRoutineReportRow } from "@/features/history-routines/services/history-routines-reports";

type CoachHistoryRoutinesPageContentProps = {
	studentId: string | null;
};

function CoachHistoryRoutinesPageContentLoaded( { studentId }: { studentId: string } ) {
	const [ downloadError, setDownloadError ] = useState<string | null>( null );
	const [ pendingPeriodKey, setPendingPeriodKey ] = useState<string | null>( null );
	const { data, error, isError, isLoading, isFetching, refetch } = useHistoryRoutinesReports( studentId );
	const breadcrumbs = [
		{ href: "/", label: "Inicio" },
		{ href: "/coach/history-routines-students", label: "Historial de rutinas por estudiante" },
		{ label: data?.student.name ?? "Reportes mensuales" },
	];

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

	return (
		<div className={ "mx-auto flex w-full max-w-350 flex-col gap-4" }>
			<PageBreadcrumbs
				backHref={ "/coach/history-routines-students" }
				backLabel={ "Volver a estudiantes" }
				crumbs={ breadcrumbs }
			/>

			{ isLoading ? <CoachHistoryRoutinesLoadingState/> : null }

			{ isError ? (
				<CoachHistoryRoutinesErrorState message={ error?.message ?? "Error al cargar historial" }/>
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
					description={ `Revisa los periodos con registro de ${ data.student.name } y descarga cada reporte mensual en PDF.` }
					emptyMessage={ "Este estudiante todavia no tiene meses con historial de rutinas disponible." }
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
