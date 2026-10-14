"use client";

import { useState } from "react";
import { Alert } from "@heroui/react";

import { PageBreadcrumbs } from "@/components/common";
import { HistoryRoutinesReportsIndex } from "@/features/history-routines/components/shared/history-routines-reports-index";
import { buildHistoryRoutinesReportPdfUrl } from "@/features/history-routines/services/history-routines-report-pdf-url";
import { CoachHistoryRoutinesErrorState } from "@/features/role/coach/history-routines/components/shared/coach-history-routines-error-state";
import { CoachHistoryRoutinesLoadingState } from "@/features/role/coach/history-routines/components/shared/coach-history-routines-loading-state";
import { CoachHistoryRoutinesMissingStudentState } from "@/features/role/coach/history-routines/components/shared/coach-history-routines-missing-student-state";
import { CoachStudentTabs } from "@/features/role/coach/students/components/coach-student-tabs";
import { useHistoryRoutinesReports } from "@/features/role/coach/history-routines/hooks/use-history-routines-reports";
import type { HistoryRoutineReportRow } from "@/features/history-routines/services/history-routines-reports";
import { downloadFile } from "@/features/shared/services/download-file";
import { getErrorMessage } from "@/lib/action-result";

type CoachHistoryRoutinesPageContentProps = {
	studentId: string | null;
};

function CoachHistoryRoutinesPageContentLoaded( { studentId }: { studentId: string } ) {
	const [ downloadError, setDownloadError ] = useState<string | null>( null );
	const [ pendingPeriodKey, setPendingPeriodKey ] = useState<string | null>( null );
	const { data, error, isError, isLoading, isFetching, refetch } = useHistoryRoutinesReports( studentId );
	const breadcrumbs = [
		{ href: "/", label: "Inicio" },
		{ href: "/coach/student", label: "Estudiantes" },
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
			// Se pide y se mira la respuesta: si el servidor no puede armar el
			// reporte, se avisa aca en vez de bajar un archivo con el error adentro.
			await downloadFile( reportUrl, "historial.pdf" );
		} catch ( downloadReportError ) {
			setDownloadError( getErrorMessage( downloadReportError, "No se pudo generar el reporte del periodo seleccionado." ) );
		} finally {
			setPendingPeriodKey( ( current ) => current === report.periodKey ? null : current );
		}
	}

	return (
		<div className={ "mx-auto flex w-full max-w-350 flex-col gap-4" }>
			<PageBreadcrumbs
				backHref={ "/coach/student" }
				backLabel={ "Volver a estudiantes" }
				crumbs={ breadcrumbs }
			/>

			<CoachStudentTabs active={ "history" } studentId={ studentId }/>

			{ isLoading ? <CoachHistoryRoutinesLoadingState/> : null }

			{ isError ? (
				<CoachHistoryRoutinesErrorState isRetrying={ isFetching } message={ error?.message ?? "Error al cargar historial" } onRetryAction={ () => void refetch() }/>
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
					buildMonthHrefAction={ ( report ) => `/coach/training-routine?studentId=${ studentId }&month=${ report.month }&year=${ report.year }` }
					description={ `Los meses en los que ${ data.student.name } entrenó. Abrí uno para ver su rutina o descargá el reporte.` }
					emptyMessage={ "Este estudiante todavía no tiene meses con historial de rutinas disponible." }
					isDownloadingPeriodKey={ pendingPeriodKey }
					isRefreshing={ isFetching && !isLoading }
					reports={ data.reports }
					title={ "Historial" }
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
			{ href: "/coach/student", label: "Estudiantes" },
		];

		return (
			<>
				<div className={ "mb-4" }>
					<PageBreadcrumbs
						backHref={ "/coach/student" }
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
