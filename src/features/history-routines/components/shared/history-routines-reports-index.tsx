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
					{ `${ report.summary.weeks } semanas · ${ report.summary.days } días · ${ report.summary.exercises } ejercicios · ${ report.summary.sets } series` }
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
			<Card.Header className={ "flex flex-col gap-3 border-b border-border p-3 sm:flex-row sm:items-center sm:justify-between" }>
				<div className={ "min-w-0" }>
					<PageHeader
						description={ description }
						title={ title }
					/>
				</div>
				<div className={ "flex w-full flex-col gap-2 md:hidden" }>
					<Button
						className={ "w-full" }
						isDisabled={ isRefreshing }
						variant={ "secondary" }
						onPress={ onRefreshAction }
					>
						<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
						{ isRefreshing ? "Actualizando..." : "Actualizar" }
					</Button>
				</div>
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

						<div className={ "space-y-3 md:hidden" }>
							{ pagination.paginatedItems.map( ( report ) => (
								<Card className={ "border border-divider p-4 shadow-sm" } key={ report.periodKey }>
									<div className={ "flex items-start justify-between gap-3" }>
										<div className={ "space-y-1" }>
											<p className={ "text-base font-semibold text-foreground" }>{ report.monthLabel }</p>
										</div>
										<Chip color={ getStatusColor( report.summary.status ) } size={ "sm" } variant={ "soft" }>
											{ getStatusLabel( report.summary.status ) }
										</Chip>
									</div>

									<div className={ "flex flex-wrap gap-2 text-xs text-muted" }>
										<span className={ "py-1" }>{ `${ report.summary.weeks } semanas` }</span>
										<span className={ "py-1" }>{ `${ report.summary.days } días` }</span>
										<span className={ "py-1" }>{ `${ report.summary.exercises } ejercicios` }</span>
										<span className={ "py-1" }>{ `${ report.summary.sets } series` }</span>
									</div>

									<Button
										className={ "w-full" }
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
										{ isDownloadingPeriodKey === report.periodKey ? "Descargando..." : "Descargar PDF" }
									</Button>
								</Card>
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
