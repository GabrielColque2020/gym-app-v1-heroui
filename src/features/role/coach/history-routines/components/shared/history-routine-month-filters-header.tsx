"use client";

import { PageHeader } from "@/components/common";

type HistoryRoutineMonthFiltersHeaderProps = {
	userName?: string;
};

export function HistoryRoutineMonthFiltersHeader( {
													  userName,
												  }: HistoryRoutineMonthFiltersHeaderProps ) {
	return (
		<div className={ "flex flex-col gap-3 border-b border-border pb-3 sm:flex-row sm:items-end sm:justify-between" }>
			<PageHeader
				description={ `Consulta el progreso mensual del estudiante seleccionado: ${ userName ?? "Sin estudiante seleccionado" }` }
				title={ "Historial de rutinas" }
			/>
		</div>
	);
}
