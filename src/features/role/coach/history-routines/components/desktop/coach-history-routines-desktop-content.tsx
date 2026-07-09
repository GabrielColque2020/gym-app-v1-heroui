"use client";

import { Card } from "@heroui/react";

import type { HistoryRoutineMonthSummary, HistoryRoutineWeekGroup } from "@/features/history-routines/services/history-routines-view";
import { HistoryRoutineWeeksAccordion } from "@/features/role/coach/history-routines/components/desktop/history-routine-weeks-accordion";
import { HistoryRoutineWeeksSelector } from "@/features/role/coach/history-routines/components/desktop/history-routine-weeks-selector";
import { CoachHistoryRoutinesOverviewCards } from "@/features/role/coach/history-routines/components/desktop/coach-history-routines-overview-cards";

type CoachHistoryRoutinesDesktopContentProps = {
	monthLabel: string;
	summary: HistoryRoutineMonthSummary;
	selectedWeekGroups: HistoryRoutineWeekGroup[];
	selectedWeeks: number[];
	weekGroups: HistoryRoutineWeekGroup[];
	onWeekToggleAction: ( week: number ) => void;
};

export function CoachHistoryRoutinesDesktopContent( {
														monthLabel,
														summary,
														selectedWeekGroups,
														selectedWeeks,
														weekGroups,
														onWeekToggleAction,
													}: CoachHistoryRoutinesDesktopContentProps ) {
	return (
		<div className={ "flex flex-col gap-4" }>
			<CoachHistoryRoutinesOverviewCards monthLabel={ monthLabel } summary={ summary }/>

			<Card className={ "border border-border py-2" } variant={ "default" }>
				<Card.Content className={ "p-3" }>
					<HistoryRoutineWeeksSelector
						weeks={ weekGroups }
						selectedWeeks={ selectedWeeks }
						onWeekToggleAction={ onWeekToggleAction }
					/>
				</Card.Content>
			</Card>

			<HistoryRoutineWeeksAccordion weeks={ selectedWeekGroups }/>
		</div>
	);
}
