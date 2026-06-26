"use client";

import { Chip } from "@heroui/react";
import { CircleCheck } from "@gravity-ui/icons";

import type { HistoryRoutineWeekGroup } from "@/features/history-routines/services/history-routines-view";

type HistoryRoutineWeeksSelectorProps = {
	weeks: HistoryRoutineWeekGroup[];
	selectedWeeks: number[];
	onWeekToggle: ( week: number ) => void;
};

export function HistoryRoutineWeeksSelector( {
	weeks,
	selectedWeeks,
	onWeekToggle,
}: HistoryRoutineWeeksSelectorProps ) {
	if (weeks.length === 0) return null;

	return (
		<div className={ "flex w-full flex-col gap-2" }>
			<div className={ "flex items-center justify-between gap-3" }>
				<p className={ "text-sm font-semibold text-foreground" }>Semanas</p>
				<Chip size={ "sm" } variant={ "soft" }>
					{ `${ selectedWeeks.length } seleccionadas` }
				</Chip>
			</div>

			<div className={ "flex flex-wrap gap-2" }>
				{ weeks.map( ( weekGroup ) => {
					const isSelected = selectedWeeks.includes( weekGroup.week );

					return (
						<button
							key={ weekGroup.week }
							className={
								`flex min-w-[9rem] flex-1 basis-[10rem] items-center gap-2 rounded-xl border px-3 py-2 text-left transition-colors ${
									isSelected
										? "border-accent bg-accent-soft text-accent"
										: "border-border bg-surface hover:bg-default"
								}`
							}
							type={ "button" }
							onClick={ () => onWeekToggle( weekGroup.week ) }
						>
							<span
								className={
									`flex size-5 shrink-0 items-center justify-center rounded-full border ${
										isSelected ? "border-accent bg-accent text-accent-foreground" : "border-border bg-background"
									}`
								}
							>
								<CircleCheck className={ "size-3" }/>
							</span>
							<span className={ "min-w-0" }>
								<span className={ "block text-sm font-semibold" }>{ `Semana ${ weekGroup.week }` }</span>
								<span className={ "block text-xs text-muted" }>{ `${ weekGroup.days.length } dias` }</span>
							</span>
						</button>
					);
				} ) }
			</div>
		</div>
	);
}
