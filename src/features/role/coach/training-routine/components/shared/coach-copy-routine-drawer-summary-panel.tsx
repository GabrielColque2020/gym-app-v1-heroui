"use client";

import { Description, Separator, Surface, Typography } from "@heroui/react";

import { CoachCopyRoutineSummaryRow } from "@/features/role/coach/training-routine/components/shared/coach-copy-routine-drawer-elements";

type CoachCopyRoutineDrawerSummaryPanelProps = {
	destLabel: string;
	destinationAffectedLabel: string;
	mode: "month" | "weeks";
	selectedSourceRoutineStats: {
		dayCount: number;
		exerciseCount: number;
	};
	selectedSourceWeeksLabel: string;
	sourceLabel: string;
};

export function CoachCopyRoutineDrawerSummaryPanel( {
	destLabel,
	destinationAffectedLabel,
	mode,
	selectedSourceRoutineStats,
	selectedSourceWeeksLabel,
	sourceLabel,
}: CoachCopyRoutineDrawerSummaryPanelProps ) {
	return (
		<Surface className={ "min-w-0 rounded-xl border border-default-hover bg-surface p-4" }>
			<div className={ "grid gap-1" }>
				<Typography className={ "text-sm font-semibold" }>Resumen</Typography>
				{ /* El origen puede ser un mes ("Enero 2027") o una plantilla ("la plantilla ..."). */ }
				<Description className={ "min-w-0 truncate text-sm" }>De { sourceLabel } a { destLabel }</Description>
			</div>
			<Separator className={ "my-3" }/>
			<div className={ "grid gap-4" }>
				<CoachCopyRoutineSummaryRow label={ "Modo" } value={ mode === "month" ? "Mes completo" : "Semanas" }/>
				<CoachCopyRoutineSummaryRow label={ "Origen" } value={ sourceLabel.charAt( 0 ).toLocaleUpperCase( "es" ) + sourceLabel.slice( 1 ) }/>
				<CoachCopyRoutineSummaryRow label={ "Semanas origen" } value={ selectedSourceWeeksLabel }/>
				<CoachCopyRoutineSummaryRow label={ "Días origen" } value={ selectedSourceRoutineStats.dayCount || "-" }/>
				<CoachCopyRoutineSummaryRow label={ "Ejercicios" } value={ selectedSourceRoutineStats.exerciseCount || "-" }/>
				<CoachCopyRoutineSummaryRow label={ "Destinos afectados" } value={ destinationAffectedLabel }/>
			</div>
		</Surface>
	);
}

