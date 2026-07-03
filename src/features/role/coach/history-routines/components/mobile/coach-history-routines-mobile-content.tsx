"use client";

import { Card, Typography } from "@heroui/react";

import type { HistoryRoutineMonthSummary, HistoryRoutineWeekGroup } from "@/features/history-routines/services/history-routines-view";
import { HistoryRoutineMonthSummary as HistoryRoutineMonthSummaryCard } from "@/features/role/coach/history-routines/components/shared/history-routine-month-summary";
import { HistoryRoutineWeeksAccordion } from "@/features/role/coach/history-routines/components/desktop/history-routine-weeks-accordion";
import { HistoryRoutineWeeksSelectorMobile } from "@/features/role/coach/history-routines/components/mobile/history-routine-weeks-selector-mobile";

type CoachHistoryRoutinesMobileContentProps = {
	monthLabel: string;
	summary: HistoryRoutineMonthSummary;
	selectedWeekGroups: HistoryRoutineWeekGroup[];
	selectedWeeks: number[];
	weekGroups: HistoryRoutineWeekGroup[];
	onWeekToggleAction: ( week: number ) => void;
};

export function CoachHistoryRoutinesMobileContent( {
	monthLabel,
	summary,
	selectedWeekGroups,
	selectedWeeks,
	weekGroups,
	onWeekToggleAction,
}: CoachHistoryRoutinesMobileContentProps ) {
	return (
		<div className={ "flex flex-col gap-4" }>
			<Card className={ "border border-border bg-surface" } variant={ "default" }>
				<Card.Content className={ "p-4" }>
					<div className={ "space-y-1" }>
						<Typography className={ "text-sm font-semibold text-foreground" }>
							Detalle mensual
						</Typography>
						<Typography className={ "text-sm text-muted" }>
							{ `Resumen compacto del mes ${ monthLabel }. Abre una semana y luego un dia para ver el detalle.` }
						</Typography>
					</div>
				</Card.Content>
			</Card>

			<HistoryRoutineMonthSummaryCard summary={ summary }/>

			<Card className={ "border border-border bg-surface" } variant={ "default" }>
				<Card.Content className={ "p-4" }>
					<HistoryRoutineWeeksSelectorMobile
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
