"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { PageBreadcrumbs } from "@/components/common";
import { useReactToPrint } from "react-to-print";

import { HistoryRoutinesPrintable } from "@/features/history-routines/components/shared/history-routines-printable";
import { HistoryRoutinesReportsIndex } from "@/features/history-routines/components/shared/history-routines-reports-index";
import { buildHistoryRoutineMonthSummary, groupHistoryRoutinesByWeek } from "@/features/history-routines/services/history-routines-view";
import { CoachHistoryRoutinesErrorState } from "@/features/role/coach/history-routines/components/shared/coach-history-routines-error-state";
import { CoachHistoryRoutinesLoadingState } from "@/features/role/coach/history-routines/components/shared/coach-history-routines-loading-state";
import { CoachHistoryRoutinesMissingStudentState } from "@/features/role/coach/history-routines/components/shared/coach-history-routines-missing-student-state";
import { useHistoryRoutinesReports } from "@/features/role/coach/history-routines/hooks/use-history-routines-reports";
import { historyRoutinesQueryOptions, type HistoryRoutinesByStudent } from "@/features/role/coach/history-routines/services/history-routines-query";
import type { HistoryRoutineReportRow } from "@/features/history-routines/services/history-routines-reports";
import { Alert } from "@heroui/react";

type CoachHistoryRoutinesPageContentProps = {
	studentId: string | null;
};

function CoachHistoryRoutinesPageContentLoaded( { studentId }: { studentId: string } ) {
	const queryClient = useQueryClient();
	const printRef = useRef<HTMLDivElement | null>( null );
	const [ downloadError, setDownloadError ] = useState<string | null>( null );
	const [ printableReport, setPrintableReport ] = useState<HistoryRoutinesByStudent | null>( null );
	const [ pendingPeriodKey, setPendingPeriodKey ] = useState<string | null>( null );
	const { data, error, isError, isLoading, isFetching, refetch } = useHistoryRoutinesReports( studentId );
	const printableWeekGroups = useMemo(
		() => groupHistoryRoutinesByWeek( printableReport?.historyRoutines ?? [] ),
		[ printableReport?.historyRoutines ],
	);
	const printableSummary = useMemo(
		() => buildHistoryRoutineMonthSummary( printableWeekGroups ),
		[ printableWeekGroups ],
	);
	const printableMonthLabel = printableReport
		? `${ String( printableReport.month ).padStart( 2, "0" ) }/${ printableReport.year }`
		: "";
	const breadcrumbs = [
		{ href: "/", label: "Inicio" },
		{ href: "/coach/history-routines-students", label: "Historial de rutinas por estudiante" },
		{ label: data?.student.name ?? "Reportes mensuales" },
	];
	const handlePrint = useReactToPrint( {
		contentRef: printRef,
		documentTitle: printableReport
			? `historial-rutinas-${ studentId }-${ printableReport.year }-${ String( printableReport.month ).padStart( 2, "0" ) }`
			: "historial-rutinas",
		pageStyle: `
			@page {
				size: A4 portrait;
				margin: 6mm;
			}
			body {
				-webkit-print-color-adjust: exact;
				print-color-adjust: exact;
			}
		`,
		onAfterPrint: () => {
			setPendingPeriodKey( null );
		},
	} );

	useEffect( () => {
		if (!printableReport || !pendingPeriodKey) {
			return;
		}

		const frameId = window.requestAnimationFrame( () => {
			void handlePrint();
		} );

		return () => {
			window.cancelAnimationFrame( frameId );
		};
	}, [ handlePrint, pendingPeriodKey, printableReport ] );

	async function handleDownloadReport( report: HistoryRoutineReportRow ) {
		setDownloadError( null );
		setPendingPeriodKey( report.periodKey );

		try {
			const nextReport = await queryClient.fetchQuery(
				historyRoutinesQueryOptions( studentId, report.month, report.year ),
			);

			setPrintableReport( nextReport );
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

			{ isLoading ? (
				<CoachHistoryRoutinesLoadingState/>
			) : null }

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

			{ printableReport ? (
				<HistoryRoutinesPrintable
					contentRef={ printRef }
					monthLabel={ printableMonthLabel }
					objective={ printableReport.student.DescriptionStudent?.objective }
					summary={ printableSummary }
					studentName={ printableReport.student.name }
					weekGroups={ printableWeekGroups }
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
