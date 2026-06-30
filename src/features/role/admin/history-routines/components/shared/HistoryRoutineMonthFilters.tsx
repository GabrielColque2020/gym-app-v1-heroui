"use client";

import { Button, Card } from "@heroui/react";
import { Magnifier } from "@gravity-ui/icons";

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
	onSearch: () => void;
	onClear: () => void;
	onMonthChange: ( month: string ) => void;
	onYearChange: ( year: string ) => void;
	userName?: string;
};

export function HistoryRoutineMonthFilters( {
												monthOptions,
												yearOptions,
												selectedMonth,
												selectedYear,
												onSearch,
												onClear,
												onMonthChange,
												onYearChange,
												userName
											}: HistoryRoutineMonthFiltersProps ) {
	return (
		<Card className={ "border border-border bg-surface" } variant={ "default" }>
			<Card.Content className={ "p-3" }>
				<div className={ "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between" }>
					<PageHeader
						description={ `Consulta el progreso mensual del estudiante seleccionado: ${ userName ?? "Sin estudiante seleccionado" }` }
						title={ "Historial de rutinas" }
						showSeparator
					/>
				</div>
				<div className={ "grid gap-3 lg:grid-cols-[1fr_1fr_auto_auto] lg:items-end" }>
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
					<Button className={ "w-full lg:w-auto" } variant={ "secondary" } onPress={ onClear }>
						Limpiar
					</Button>
				</div>
			</Card.Content>
		</Card>
	);
}
