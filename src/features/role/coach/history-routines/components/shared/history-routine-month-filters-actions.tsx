"use client";

import { Button } from "@heroui/react";
import { RotateCcw, Search } from "lucide-react";

import { FilterSelect } from "@/components/common";

type Option = {
	label: string;
	value: string;
};

type HistoryRoutineMonthFiltersActionsProps = {
	isRefreshing?: boolean;
	monthOptions: Option[];
	onClearAction: () => void;
	onMonthChangeAction: ( month: string ) => void;
	onRefreshAction: () => void;
	onSearchAction: () => void;
	onYearChangeAction: ( year: string ) => void;
	selectedMonth: string;
	selectedYear: string;
	yearOptions: Option[];
};

export function HistoryRoutineMonthFiltersActions( {
	isRefreshing = false,
	monthOptions,
	onClearAction,
	onMonthChangeAction,
	onRefreshAction,
	onSearchAction,
	onYearChangeAction,
	selectedMonth,
	selectedYear,
	yearOptions,
}: HistoryRoutineMonthFiltersActionsProps ) {
	return (
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
				<Search/>
				Buscar
			</Button>
			<Button
				className={ "w-full lg:w-auto" }
				isDisabled={ isRefreshing }
				variant={ "secondary" }
				onPress={ onRefreshAction }
			>
				<RotateCcw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
				{ isRefreshing ? "Actualizando..." : "Actualizar" }
			</Button>
			<Button className={ "w-full lg:w-auto" } variant={ "secondary" } onPress={ onClearAction }>
				Limpiar
			</Button>
		</div>
	);
}
