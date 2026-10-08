"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { DataGridColumn } from "@heroui-pro/react";
import { DataGrid } from "@heroui-pro/react";
import { Button, Card, Chip } from "@heroui/react";
import { ChevronRight, Download, RotateCw, TrendingUp } from "lucide-react";

import { ListPagination, PageHeader, usePagination } from "@/components/common";
import type { HistoryRoutineReportRow } from "@/features/history-routines/services/history-routines-reports";

type HistoryRoutinesReportsIndexProps = {
	// Adonde lleva cada mes: la rutina de ese mes, con lo que el estudiante hizo.
	buildMonthHrefAction: ( report: HistoryRoutineReportRow ) => string;
	description: string;
	emptyMessage: string;
	isDownloadingPeriodKey?: string | null;
	isRefreshing?: boolean;
	// Adonde se ve el progreso por ejercicio. Sin valor, no se ofrece.
	progressHref?: string;
	reports: HistoryRoutineReportRow[];
	title: string;
	onDownloadAction: ( report: HistoryRoutineReportRow ) => void;
	onRefreshAction: () => void;
};

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

// Cuanto del mes se hizo, en numeros: "3 de 5 días terminados". Reemplaza a
// "Parcial / Completo", que no decia respecto de que y casi siempre daba
// "Parcial" (pedia seis dias con registro por semana).
function getProgress( report: HistoryRoutineReportRow ) {
	// Sin el dato tambien cae aca: lo que quedo guardado en el navegador de antes
	// de este cambio no lo trae, hasta que la pantalla vuelve a pedirlo.
	if (!report.plannedDays) {
		// El mes tiene registros pero ya no tiene rutina cargada con la cual comparar.
		return { color: "default", label: `${ pluralize( report.summary.days, "día", "días" ) } con registro` } as const;
	}

	return {
		color: report.finishedDays >= report.plannedDays ? "success" : "default",
		label: `${ report.finishedDays } de ${ pluralize( report.plannedDays, "día terminado", "días terminados" ) }`,
	} as const;
}

export function HistoryRoutinesReportsIndex( {
	buildMonthHrefAction,
	description,
	emptyMessage,
	isDownloadingPeriodKey = null,
	isRefreshing = false,
	progressHref,
	reports,
	title,
	onDownloadAction,
	onRefreshAction,
}: HistoryRoutinesReportsIndexProps ) {
	const router = useRouter();
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
				<span className={ "truncate font-medium text-foreground" }>{ report.monthLabel }</span>
			),
			header: "Mes",
			id: "period",
			isRowHeader: true,
			minWidth: 180,
		},
		{
			accessorKey: "summary",
			cell: ( report ) => {
				const progress = getProgress( report );

				return (
					<Chip color={ progress.color } size={ "sm" } variant={ "soft" }>
						{ progress.label }
					</Chip>
				);
			},
			header: "Avance",
			id: "progress",
			minWidth: 200,
		},
		{
			accessorKey: "summary",
			cell: ( report ) => (
				<span className={ "text-sm text-muted" }>
					{ formatSummary( report.summary ) }
				</span>
			),
			header: "Lo registrado",
			id: "summary",
			minWidth: 300,
		},
		{
			align: "end",
			cell: ( report ) => (
				<div className={ "flex items-center justify-end gap-1" }>
					{ /* Boton y no enlace: dentro de la tabla, la fila se queda con el clic
					     de un enlace y no navega. */ }
					<Button
						className={ "text-accent" }
						size={ "sm" }
						variant={ "ghost" }
						onPress={ () => router.push( buildMonthHrefAction( report ) ) }
					>
						Ver el mes
						<ChevronRight className={ "size-4" }/>
					</Button>
					<Button
						isIconOnly
						aria-label={
							isDownloadingPeriodKey === report.periodKey
								? `Descargando el reporte de ${ report.monthLabel }`
								: `Descargar el reporte de ${ report.monthLabel } en PDF`
						}
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
					</Button>
				</div>
			),
			header: "Acciones",
			id: "actions",
			minWidth: 200,
		},
	], [ buildMonthHrefAction, isDownloadingPeriodKey, onDownloadAction, router ] );

	return (
		<Card className={ "border border-border py-2" } variant={ "default" }>
			<Card.Header className={ "flex flex-row items-start justify-between gap-3 border-b border-border p-3 sm:items-center" }>
				<div className={ "min-w-0" }>
					<PageHeader
						description={ description }
						title={ title }
					/>
				</div>
				{ /* En el telefono las acciones van como iconos junto al titulo. */ }
				{ progressHref ? (
					<Button
						isIconOnly
						aria-label={ "Progreso por ejercicio" }
						className={ "shrink-0 md:hidden" }
						variant={ "secondary" }
						onPress={ () => router.push( progressHref ) }
					>
						<TrendingUp className={ "size-4" }/>
					</Button>
				) : null }
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
				<div className={ "hidden gap-2 md:flex" }>
					{ progressHref ? (
						<Button variant={ "secondary" } onPress={ () => router.push( progressHref ) }>
							<TrendingUp className={ "size-4" }/>
							Progreso por ejercicio
						</Button>
					) : null }
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
								aria-label={ "Meses con historial de rutinas" }
								columns={ columns }
								contentClassName={ "min-w-full" }
								data={ pagination.paginatedItems }
								getRowId={ ( item ) => item.periodKey }
							/>
						</div>

						{ /* Una fila por mes. Tocarla abre la rutina de ese mes, que es donde se
						     ve lo que se hizo; el PDF queda como boton aparte. */ }
						<div className={ "space-y-2 md:hidden" }>
							{ pagination.paginatedItems.map( ( report ) => {
								const progress = getProgress( report );

								return (
									<div
										key={ report.periodKey }
										className={ "flex items-center gap-1 rounded-2xl border border-border bg-surface-secondary py-2.5 pl-3 pr-1.5" }
									>
										<Link
											aria-label={ `Ver ${ report.monthLabel }: ${ progress.label }` }
											className={ "flex min-w-0 flex-1 items-center gap-2" }
											href={ buildMonthHrefAction( report ) }
										>
											<div className={ "min-w-0 flex-1" }>
												<p className={ "text-base font-semibold text-foreground" }>{ report.monthLabel }</p>
												<p className={ `text-sm font-medium ${ progress.color === "success" ? "text-success" : "text-foreground" }` }>
													{ progress.label }
												</p>
												<p className={ "mt-0.5 text-xs text-muted" }>{ formatSummary( report.summary ) }</p>
											</div>
											<ChevronRight className={ "size-4 shrink-0 text-muted" }/>
										</Link>
										<Button
											isIconOnly
											aria-label={
												isDownloadingPeriodKey === report.periodKey
													? `Descargando el reporte de ${ report.monthLabel }`
													: `Descargar el reporte de ${ report.monthLabel } en PDF`
											}
											className={ "shrink-0" }
											isDisabled={ isDownloadingPeriodKey === report.periodKey }
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
										</Button>
									</div>
								);
							} ) }
						</div>

						<ListPagination
							currentPage={ pagination.currentPage }
							itemLabel={ "meses" }
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
