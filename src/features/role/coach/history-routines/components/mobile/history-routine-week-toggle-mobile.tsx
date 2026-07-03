"use client";

import { Chip } from "@heroui/react";
import { CheckCircle2 } from "lucide-react";

import type { HistoryRoutineWeekGroup } from "@/features/history-routines/services/history-routines-view";
import { getWeekExerciseCount } from "@/features/role/coach/history-routines/components/shared/history-routine-week-metrics";
import { getHistoryRoutineWeekStatus } from "@/features/role/coach/history-routines/services/history-routines-view";

type HistoryRoutineWeekToggleMobileProps = {
	isSelected: boolean;
	weekGroup: HistoryRoutineWeekGroup;
	onToggleAction: ( week: number ) => void;
};

function getStatusLabel( status: ReturnType<typeof getHistoryRoutineWeekStatus> ) {
	switch (status) {
		case "complete":
			return "Completa";
		case "partial":
			return "Parcial";
		default:
			return "Vacia";
	}
}

export function HistoryRoutineWeekToggleMobile( {
													isSelected,
													weekGroup,
	onToggleAction,
												}: HistoryRoutineWeekToggleMobileProps ) {
	const status = getHistoryRoutineWeekStatus( weekGroup );

	return (
		<button
			className={
				`flex min-w-[14rem] shrink-0 flex-col gap-2 rounded-xl border px-3 py-3 text-left transition-colors ${
					isSelected
						? "border-accent bg-accent-soft text-accent"
						: "border-border bg-surface hover:bg-default"
				}`
			}
			type={ "button" }
			onClick={ () => onToggleAction( weekGroup.week ) }
		>
			<div className={ "flex items-start justify-between gap-2" }>
				<div className={ "min-w-0" }>
					<span className={ "block text-sm font-semibold" }>{ `Semana ${ weekGroup.week }` }</span>
					<span className={ "block text-xs text-muted" }>
						{ `${ weekGroup.days.length } dias | ${ getWeekExerciseCount( weekGroup ) } ejercicios` }
					</span>
				</div>
				<span
					className={
						`flex size-5 shrink-0 items-center justify-center rounded-full border ${
							isSelected ? "border-accent bg-accent text-accent-foreground" : "border-border bg-background"
						}`
					}
				>
					<CheckCircle2 className={ "size-3" }/>
				</span>
			</div>

			<div className={ "flex flex-wrap gap-2" }>
				<Chip
					color={ status === "complete" ? "success" : status === "partial" ? "warning" : "default" }
					size={ "sm" }
					variant={ "soft" }
				>
					{ getStatusLabel( status ) }
				</Chip>
			</div>
		</button>
	);
}
