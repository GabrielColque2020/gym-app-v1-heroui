"use client";

import { Button, Card } from "@heroui/react";
import { ArrowsRotateLeft, Magnifier } from "@gravity-ui/icons";

import { FilterSelect, PageHeader } from "@/components/common";

type HistoryRoutineMonthFiltersProps = {
	monthOptions: Array<{
		label: string;
		value: string;
	}>;
	yearOptions: Array<{
		label: string;
		value: string;
	}>;
	selectedMonth: string;
	selectedYear: string;
	onSearchAction: () => void;
	onRefreshAction: () => void;
	onClearAction: () => void;
	onMonthChangeAction: ( month: string ) => void;
	onYearChangeAction: ( year: string ) => void;
	isRefreshing?: boolean;
};

export function HistoryRoutineMonthFilters( {
												monthOptions,
												yearOptions,
												selectedMonth,
												selectedYear,
	onSearchAction,
	onRefreshAction,
	onClearAction,
	onMonthChangeAction,
	onYearChangeAction,
												isRefreshing = false,
											}: HistoryRoutineMonthFiltersProps ) {
	return (
		<Card className={ "border border-border bg-surface" } variant={ "default" }>
			<Card.Content className={ "p-3" }>
				<div className={ "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between" }>
					<PageHeader
						description={ `Consulta tu progreso mensual` }
						title={ "Mi historial de rutinas" }
						showSeparator
					/>
				</div>
				<div className={ "grid gap-3 lg:grid-cols-[1fr_1fr_auto_auto_auto] lg:items-end" }>
					<FilterSelect
						label={ "Mes" }
						name={ "history-routines-month-filter" }
						options={ monthOptions }
						placeholder={ "Selecciona un mes" }
						value={ selectedMonth }
						onSelectionChange={ onMonthChangeAction }
					/>
					<FilterSelect
						label={ "Anio" }
						name={ "history-routines-year-filter" }
						options={ yearOptions }
						placeholder={ "Selecciona un anio" }
						value={ selectedYear }
						onSelectionChange={ onYearChangeAction }
					/>
					<Button className={ "w-full shadow-sm lg:w-auto" } onPress={ onSearchAction }>
						<Magnifier/>
						Buscar
					</Button>
					<Button
						className={ "w-full shadow-sm lg:w-auto" }
						isDisabled={ isRefreshing }
						onPress={ onRefreshAction }
						variant={ "secondary" }
					>
						<ArrowsRotateLeft className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
						{ isRefreshing ? "Actualizando" : "Actualizar" }
					</Button>
					<Button className={ "w-full lg:w-auto" } variant={ "secondary" } onPress={ onClearAction }>
						Limpiar
					</Button>
				</div>
			</Card.Content>
		</Card>
	);
}
