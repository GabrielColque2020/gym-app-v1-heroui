"use client";

import { Button, Card } from "@heroui/react";
import { FilterSelect, PageHeader } from "@/components/common";
import { RotateCw } from "lucide-react";

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
	onMonthChangeAction: ( month: string ) => void;
	onRefreshAction: () => void;
	onYearChangeAction: ( year: string ) => void;
	userName?: string;
	isRefreshing?: boolean;
};

export function HistoryRoutineMonthFilters( {
												monthOptions,
												yearOptions,
												selectedMonth,
												selectedYear,
												onMonthChangeAction,
												onRefreshAction,
												onYearChangeAction,
												userName,
												isRefreshing = false,
											}: HistoryRoutineMonthFiltersProps ) {
	return (
		<Card className={ "border border-border py-2" } variant={ "default" }>
			<Card.Header className={ "px-3 pt-3" }>
				<div className={ "flex flex-col gap-3 border-b border-border pb-3 sm:flex-row sm:items-end sm:justify-between" }>
					<PageHeader
						description={ `Consulta el progreso mensual del estudiante seleccionado: ${ userName ?? "Sin estudiante seleccionado" }` }
						title={ "Historial de rutinas" }
					/>
				</div>
			</Card.Header>
			<Card.Content className={ "px-3 pb-3" }>
				<div className={ "grid gap-3 pt-3 lg:grid-cols-[1fr_1fr_auto] lg:items-end" }>
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
						className={ "w-full lg:w-auto" }
						isDisabled={ isRefreshing }
						variant={ "secondary" }
						onPress={ onRefreshAction }
					>
						<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
						{ isRefreshing ? "Actualizando..." : "Actualizar" }
					</Button>
				</div>
			</Card.Content>
		</Card>
	);
}
