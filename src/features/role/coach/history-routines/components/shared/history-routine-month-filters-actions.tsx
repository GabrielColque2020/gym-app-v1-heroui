"use client";

import { Button } from "@heroui/react";
import { ArrowsRotateLeft, Magnifier } from "@gravity-ui/icons";

import { FilterSelect } from "@/components/common";

type Option = {
	label: string;
	value: string;
};

type HistoryRoutineMonthFiltersActionsProps = {
	isRefreshing?: boolean;
	monthOptions: Option[];
	onClear: () => void;
	onMonthChange: ( month: string ) => void;
	onRefresh: () => void;
	onSearch: () => void;
	onYearChange: ( year: string ) => void;
	selectedMonth: string;
	selectedYear: string;
	yearOptions: Option[];
};

export function HistoryRoutineMonthFiltersActions( {
	isRefreshing = false,
	monthOptions,
	onClear,
	onMonthChange,
	onRefresh,
	onSearch,
	onYearChange,
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
				onSelectionChange={ onMonthChange }
			/>
			<FilterSelect
				label={ "Anio" }
				name={ "history-routines-year-filter" }
				options={ yearOptions }
				placeholder={ "Selecciona un anio" }
				value={ selectedYear }
				onSelectionChange={ onYearChange }
			/>
			<Button className={ "w-full shadow-sm lg:w-auto" } onPress={ onSearch }>
				<Magnifier/>
				Buscar
			</Button>
			<Button
				className={ "w-full lg:w-auto" }
				isDisabled={ isRefreshing }
				variant={ "secondary" }
				onPress={ onRefresh }
			>
				<ArrowsRotateLeft className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
				{ isRefreshing ? "Actualizando..." : "Actualizar" }
			</Button>
			<Button className={ "w-full lg:w-auto" } variant={ "secondary" } onPress={ onClear }>
				Limpiar
			</Button>
		</div>
	);
}
