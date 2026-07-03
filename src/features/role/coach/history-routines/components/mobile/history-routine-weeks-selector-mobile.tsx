"use client";

import { Chip, Typography } from "@heroui/react";

import type { HistoryRoutineWeekGroup } from "@/features/history-routines/services/history-routines-view";
import { HistoryRoutineWeekToggleMobile } from "@/features/role/coach/history-routines/components/mobile/history-routine-week-toggle-mobile";

type HistoryRoutineWeeksSelectorMobileProps = {
	weeks: HistoryRoutineWeekGroup[];
	selectedWeeks: number[];
	onWeekToggle: ( week: number ) => void;
};

export function HistoryRoutineWeeksSelectorMobile( {
	weeks,
	selectedWeeks,
	onWeekToggle,
}: HistoryRoutineWeeksSelectorMobileProps ) {
	if (weeks.length === 0) return null;

	return (
		<div className={ "flex w-full flex-col gap-3" }>
			<div className={ "flex items-center justify-between gap-3" }>
				<Typography className={ "text-sm font-semibold text-foreground" }>Semanas</Typography>
				<Chip size={ "sm" } variant={ "soft" }>
					{ `${ selectedWeeks.length } seleccionadas` }
				</Chip>
			</div>

			<div className={ "flex gap-2 overflow-x-auto pb-1" }>
				{ weeks.map( ( weekGroup ) => {
					const isSelected = selectedWeeks.includes( weekGroup.week );

					return (
						<HistoryRoutineWeekToggleMobile
							key={ weekGroup.week }
							isSelected={ isSelected }
							weekGroup={ weekGroup }
							onToggle={ onWeekToggle }
						/>
					);
				} ) }
			</div>
		</div>
	);
}
