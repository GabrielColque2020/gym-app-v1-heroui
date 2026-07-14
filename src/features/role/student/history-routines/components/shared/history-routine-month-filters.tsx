"use client";

import { Button, Card } from "@heroui/react";
import { RotateCw } from "lucide-react";

import { FilterSelect, PageHeader } from "@/components/common";

type HistoryRoutineMonthFiltersProps = {
	isRefreshing?: boolean;
	monthOptions: Array<{
		label: string;
		value: string;
	}>;
	onMonthChangeAction: ( month: string ) => void;
	onRefreshAction: () => void;
	onYearChangeAction: ( year: string ) => void;
	selectedMonth: string;
	selectedYear: string;
	yearOptions: Array<{
		label: string;
		value: string;
	}>;
};

export function HistoryRoutineMonthFilters( {
	isRefreshing = false,
	monthOptions,
	onMonthChangeAction,
	onRefreshAction,
	onYearChangeAction,
	selectedMonth,
	selectedYear,
	yearOptions,
}: HistoryRoutineMonthFiltersProps ) {
	return (
		<Card className={ "border border-border py-2" } variant={ "default" }>
			<Card.Content className={ "p-3" }>
				<div className={ "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between" }>
					<PageHeader
						description={ "Consulta tu progreso mensual" }
						title={ "Mi historial de rutinas" }
					/>
				</div>
				<div className={ "grid gap-3 lg:grid-cols-[1fr_1fr_auto] lg:items-end" }>
					<FilterSelect
						label={ "Año" }
						name={ "history-routines-year-filter" }
						options={ yearOptions }
						placeholder={ "Seleccioná un año" }
						value={ selectedYear }
						onSelectionChange={ onYearChangeAction }
					/>
					<FilterSelect
						label={ "Mes" }
						name={ "history-routines-month-filter" }
						options={ monthOptions }
						placeholder={ "Seleccioná un mes" }
						value={ selectedMonth }
						onSelectionChange={ onMonthChangeAction }
					/>
					<Button
						className={ "w-full shadow-sm lg:w-auto" }
						isDisabled={ isRefreshing }
						variant={ "secondary" }
						onPress={ onRefreshAction }
					>
						<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
						{ isRefreshing ? "Actualizando" : "Actualizar" }
					</Button>
				</div>
			</Card.Content>
		</Card>
	);
}
