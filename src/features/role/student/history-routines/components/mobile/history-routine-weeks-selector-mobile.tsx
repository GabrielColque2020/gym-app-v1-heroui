"use client";

import { Chip, Typography } from "@heroui/react";
import { CheckCircle2 } from "lucide-react";

import type { HistoryRoutineWeekGroup } from "@/features/history-routines/services/history-routines-view";
import { getHistoryRoutineWeekStatus } from "@/features/history-routines/services/history-routines-view";

type HistoryRoutineWeeksSelectorMobileProps = {
	weeks: HistoryRoutineWeekGroup[];
	selectedWeeks: number[];
	onWeekToggleAction: ( week: number ) => void;
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

export function HistoryRoutineWeeksSelectorMobile( {
	weeks,
	selectedWeeks,
	onWeekToggleAction,
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
					const status = getHistoryRoutineWeekStatus( weekGroup );

					return (
						<button
							key={ weekGroup.week }
							className={
								`flex min-w-[14rem] shrink-0 flex-col gap-2 rounded-xl border px-3 py-3 text-left transition-colors ${
									isSelected
										? "border-accent bg-accent-soft text-accent"
										: "border-border bg-surface hover:bg-default"
								}`
							}
							type={ "button" }
							onClick={ () => onWeekToggleAction( weekGroup.week ) }
						>
							<div className={ "flex items-start justify-between gap-2" }>
								<div className={ "min-w-0" }>
									<span className={ "block text-sm font-semibold" }>{ `Semana ${ weekGroup.week }` }</span>
									<span className={ "block text-xs text-muted" }>
										{ `${ weekGroup.days.length } dias | ${ weekGroup.days.reduce( ( total, day ) => total + day.exercises.length, 0 ) } ejercicios` }
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
								<Chip color={ status === "complete" ? "success" : status === "partial" ? "warning" : "default" } size={ "sm" } variant={ "soft" }>
									{ getStatusLabel( status ) }
								</Chip>
							</div>
						</button>
					);
				} ) }
			</div>
		</div>
	);
}
