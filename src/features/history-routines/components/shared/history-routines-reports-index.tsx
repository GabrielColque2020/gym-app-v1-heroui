"use client";

import { useMemo, useState } from "react";
import type { DataGridColumn } from "@heroui-pro/react";
import { DataGrid } from "@heroui-pro/react";
import { Button, Card, Chip } from "@heroui/react";
import { Download, RotateCw } from "lucide-react";

import { ListPagination, PageHeader, usePagination } from "@/components/common";
import type { HistoryRoutineReportRow } from "@/features/history-routines/services/history-routines-reports";

type HistoryRoutinesReportsIndexProps = {
	description: string;
	emptyMessage: string;
	isDownloadingPeriodKey?: string | null;
	isRefreshing?: boolean;
	reports: HistoryRoutineReportRow[];
	title: string;
	onDownloadAction: ( report: HistoryRoutineReportRow ) => void;
	onRefreshAction: () => void;
};

function getStatusColor( status: HistoryRoutineReportRow["summary"]["status"] ) {
	switch (status) {
		case "complete":
			return "success";
		case "partial":
			return "warning";
		default:
			return "default";
	}
}

function getStatusLabel( status: HistoryRoutineReportRow["summary"]["status"] ) {
	switch (status) {
		case "complete":
			return "Completo";
		case "partial":
			return "Parcial";
		default:
			return "Sin datos";
	}
}

function pluralize( count: number, singular: string, plural: string ) {
	return `${ count } ${ count === 1 ? singular : plural }`;
}

// "1 semana · 1 día · 1 ejercicio · 4 series": cada numero con su singular o plural.
function formatSummary( summary: HistoryRoutineReportRow["summary"] ) {
	return [
		pluralize( summary.weeks, "semana", "semanas" ),
		pluralize( summary.days, "día", "días" ),
		pluralize( summary.exercises, "ejercicio", "ejercicios" ),
		pluralize( summary.sets, "serie", "series" ),
	].join( " · " );
}

export function HistoryRoutinesReportsIndex( {
	description,
	emptyMessage,
	isDownloadingPeriodKey = null,
	isRefreshing = false,
	reports,
	title,
	onDownloadAction,
	onRefreshAction,
}: HistoryRoutinesReportsIndexProps ) {
	const [ page, setPage ] = useState( 1 );
	const pagination = usePagination( {
		items: reports,
		itemsPerPage: 8,
		page,
	} );

	const columns = useMemo<DataGridColumn<HistoryRoutineReportRow>[]>( () => [
		{
			accessorKey: "monthLabel",
			cell: ( report ) => (
				<div className={ "flex min-w-0 flex-col text-muted" }>
					<span className={ "truncate font-medium" }>{ report.monthLabel }</span>
				</div>
			),
			header: "Periodo",
			id: "period",
			isRowHeader: true,
			minWidth: 180,
		},
		{
			accessorKey: "summary",
			cell: ( report ) => (
				<Chip color={ getStatusColor( report.summary.status ) } size={ "sm" } variant={ "soft" }>
					{ getStatusLabel( report.summary.status ) }
				</Chip>
			),
			header: "Estado",
			id: "status",
			minWidth: 140,
		},
		{
			accessorKey: "summary",
			cell: ( report ) => (
				<span className={ "text-sm text-muted" }>
					{ formatSummary( report.summary ) }
				</span>
			),
			header: "Resumen",
			id: "summary",
			minWidth: 320,
		},
		{
			align: "end",
			cell: ( report ) => (
				<Button
					className={ "text-accent-soft-foreground" }
					isDisabled={ isDownloadingPeriodKey === report.periodKey }
					size={ "sm" }
					variant={ "ghost" }
					onPress={ () => {
						onDownloadAction( report );
					} }
				>
					{ isDownloadingPeriodKey === report.periodKey ? (
						<RotateCw className={ "size-4 animate-spin" }/>
					) : (
						<Download className={ "size-4" }/>
					) }
					{ isDownloadingPeriodKey === report.periodKey ? "Descargando..." : "Descargar PDF" }
				</Button>
			),
			header: "Acciones",
			id: "actions",
			minWidth: 220,
		},
	], [ isDownloadingPeriodKey, onDownloadAction ] );

	return (
		<Card className={ "border border-border py-2" } variant={ "default" }>
			<Card.Header className={ "flex flex-row items-start justify-between gap-3 border-b border-border p-3 sm:items-center" }>
				<div className={ "min-w-0" }>
					<PageHeader
						description={ description }
						title={ title }
					/>
				</div>
				{ /* En el telefono "Actualizar" va como icono junto al titulo. */ }
				<Button
					isIconOnly
					aria-label={ isRefreshing ? "Actualizando" : "Actualizar" }
					className={ "shrink-0 md:hidden" }
					isDisabled={ isRefreshing }
					variant={ "secondary" }
					onPress={ onRefreshAction }
				>
					<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
				</Button>
				<div className={ "hidden md:flex" }>
					<Button
						isDisabled={ isRefreshing }
						variant={ "secondary" }
						onPress={ onRefreshAction }
					>
						<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
						{ isRefreshing ? "Actualizando..." : "Actualizar" }
					</Button>
				</div>
			</Card.Header>
			<Card.Content className={ "p-3" }>
				{ reports.length === 0 ? (
					<div className={ "rounded-2xl border border-dashed border-divider px-4 py-10 text-center text-sm text-default-600" }>
						{ emptyMessage }
					</div>
				) : (
					<>
						<div className={ "hidden md:block" }>
							<DataGrid
								aria-label={ "Reportes mensuales de historial de rutinas" }
								columns={ columns }
								contentClassName={ "min-w-full" }
								data={ pagination.paginatedItems }
								getRowId={ ( item ) => item.periodKey }
							/>
						</div>

						{ /* Una fila por mes: con un boton a todo el ancho cada mes ocupaba una
						     tarjeta entera. */ }
						<div className={ "space-y-2 md:hidden" }>
							{ pagination.paginatedItems.map( ( report ) => (
								<div
									key={ report.periodKey }
									className={ "flex items-center gap-3 rounded-2xl border border-border bg-surface-secondary px-3 py-2.5" }
								>
									<div className={ "min-w-0 flex-1" }>
										<p className={ "flex flex-wrap items-center gap-2 text-base font-semibold text-foreground" }>
											{ report.monthLabel }
											<Chip color={ getStatusColor( report.summary.status ) } size={ "sm" } variant={ "soft" }>
												{ getStatusLabel( report.summary.status ) }
											</Chip>
										</p>
										<p className={ "mt-0.5 text-xs text-muted" }>{ formatSummary( report.summary ) }</p>
									</div>
									<Button
										isIconOnly
										aria-label={
											isDownloadingPeriodKey === report.periodKey
												? `Descargando el reporte de ${ report.monthLabel }`
												: `Descargar el reporte de ${ report.monthLabel } en PDF`
										}
										className={ "shrink-0" }
										isDisabled={ isDownloadingPeriodKey === report.periodKey }
										variant={ "secondary" }
										onPress={ () => {
											onDownloadAction( report );
										} }
									>
										{ isDownloadingPeriodKey === report.periodKey ? (
											<RotateCw className={ "size-4 animate-spin" }/>
										) : (
											<Download className={ "size-4" }/>
										) }
									</Button>
								</div>
							) ) }
						</div>

						<ListPagination
							currentPage={ pagination.currentPage }
							itemLabel={ "reportes" }
							onPageChangeAction={ setPage }
							showingFrom={ pagination.showingFrom }
							showingTo={ pagination.showingTo }
							totalItems={ pagination.totalItems }
							totalPages={ pagination.totalPages }
						/>
					</>
				) }
			</Card.Content>
		</Card>
	);
}
