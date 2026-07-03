"use client";

import { Chip, Description, Surface, Typography } from "@heroui/react";

type CoachRoutineStructureSummaryProps = {
	selectedDaysCount: number;
	selectedWeeksCount: number;
};

export function CoachRoutineStructureSummary( {
	selectedDaysCount,
	selectedWeeksCount,
}: CoachRoutineStructureSummaryProps ) {
	return (
		<Surface className={ "rounded-xl border border-default-hover bg-surface p-4" }>
			<div className={ "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" }>
				<div>
					<Typography className={ "text-sm font-semibold" }>Resumen</Typography>
					<Description className={ "text-sm" }>La misma cantidad de dias se aplicara a cada semana.</Description>
				</div>
				<div className={ "flex flex-wrap gap-2" }>
					<Chip color={ selectedWeeksCount > 0 ? "accent" : "default" } size={ "sm" } variant={ "soft" }>
						{ selectedWeeksCount } semanas activas
					</Chip>
					<Chip color={ selectedDaysCount > 0 ? "accent" : "default" } size={ "sm" } variant={ "soft" }>
						{ selectedDaysCount } dias por semana
					</Chip>
				</div>
			</div>
		</Surface>
	);
}
