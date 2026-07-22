"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Alert, Card, Spinner } from "@heroui/react";
import { useReactToPrint } from "react-to-print";

import { PageBreadcrumbs } from "@/components/common";
import { HistoryRoutinesPrintable } from "@/features/history-routines/components/shared/history-routines-printable";
import {
	HistoryRoutinesReportsIndex
} from "@/features/history-routines/components/shared/history-routines-reports-index";
import {
	buildHistoryRoutineMonthSummary,
	groupHistoryRoutinesByWeek
} from "@/features/history-routines/services/history-routines-view";
import type { HistoryRoutineReportRow } from "@/features/history-routines/services/history-routines-reports";
import { useHistoryRoutinesReports } from "@/features/role/student/history-routines/hooks/use-history-routines-reports";
import {
	type HistoryRoutinesByStudent,
	historyRoutinesQueryOptions
} from "@/features/role/student/history-routines/services/history-routines-query";

type StudentHistoryRoutinesPageContentProps = {
	studentId: string | null;
};

function StudentHistoryRoutinesPageContentLoaded( { studentId }: { studentId: string } ) {
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
	const handlePrint = useReactToPrint( {
		contentRef: printRef,
		documentTitle: printableReport
			? `historial-rutinas-${ printableReport.year }-${ String( printableReport.month ).padStart( 2, "0" ) }`
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
					description={ "Consulta los meses con registro y descarga el reporte completo de cada periodo." }
					emptyMessage={ "Todavía no hay meses con historial de rutinas disponible." }
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

export default function StudentHistoryRoutinesPageContent( { studentId }: StudentHistoryRoutinesPageContentProps ) {
	if (!studentId) {
		return (
			<Alert className={ "border border-warning/20" } status={ "warning" }>
				<Alert.Content>
					<Alert.Title>Debes iniciar sesión</Alert.Title>
					<Alert.Description>
						No se pudo identificar tu cuenta para mostrar tu historial de rutinas.
					</Alert.Description>
				</Alert.Content>
			</Alert>
		);
	}

	return <StudentHistoryRoutinesPageContentLoaded studentId={ studentId }/>;
}
