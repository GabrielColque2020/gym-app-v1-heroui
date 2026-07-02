"use client";

import { Card, Typography } from "@heroui/react";

import type { HistoryRoutineMonthSummary, HistoryRoutineWeekGroup } from "@/features/history-routines/services/history-routines-view";
import { HistoryRoutineMonthSummary as HistoryRoutineMonthSummaryCard } from "@/features/role/student/history-routines/components/shared/history-routine-month-summary";
import { HistoryRoutineWeeksAccordion } from "@/features/role/student/history-routines/components/desktop/history-routine-weeks-accordion";
import { HistoryRoutineWeeksSelectorMobile } from "@/features/role/student/history-routines/components/mobile/history-routine-weeks-selector-mobile";

type StudentHistoryRoutinesMobileContentProps = {
	monthLabel: string;
	summary: HistoryRoutineMonthSummary;
	selectedWeekGroups: HistoryRoutineWeekGroup[];
	selectedWeeks: number[];
	weekGroups: HistoryRoutineWeekGroup[];
	onWeekToggle: ( week: number ) => void;
};

export function StudentHistoryRoutinesMobileContent( {
	monthLabel,
	summary,
	selectedWeekGroups,
	selectedWeeks,
	weekGroups,
	onWeekToggle,
}: StudentHistoryRoutinesMobileContentProps ) {
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
						onWeekToggle={ onWeekToggle }
					/>
				</Card.Content>
			</Card>

			<HistoryRoutineWeeksAccordion weeks={ selectedWeekGroups }/>
		</div>
	);
}
