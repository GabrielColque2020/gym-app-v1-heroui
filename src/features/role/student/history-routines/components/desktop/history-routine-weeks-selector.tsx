"use client";

import { Chip, Typography } from "@heroui/react";
import { CircleCheck } from "@gravity-ui/icons";

import type { HistoryRoutineWeekGroup } from "@/features/history-routines/services/history-routines-view";

type HistoryRoutineWeeksSelectorProps = {
	weeks: HistoryRoutineWeekGroup[];
	selectedWeeks: number[];
	onWeekToggleAction: ( week: number ) => void;
};

function getWeekExerciseCount( weekGroup: HistoryRoutineWeekGroup ) {
	return weekGroup.days.reduce( ( total, day ) => total + day.exercises.length, 0 );
}

export function HistoryRoutineWeeksSelector( {
	weeks,
	selectedWeeks,
	onWeekToggleAction,
}: HistoryRoutineWeeksSelectorProps ) {
	if (weeks.length === 0) return null;

	return (
		<div className={ "flex w-full flex-col gap-3" }>
			<div className={ "flex items-center justify-between gap-3" }>
				<Typography className={ "text-sm font-semibold text-foreground" }>
					Semanas
				</Typography>
				<Chip size={ "sm" } variant={ "soft" }>
					{ `${ selectedWeeks.length } seleccionadas` }
				</Chip>
			</div>

			<div className={ "grid gap-2 [grid-template-columns:repeat(auto-fit,minmax(10rem,1fr))]" }>
				{ weeks.map( ( weekGroup ) => {
					const isSelected = selectedWeeks.includes( weekGroup.week );

					return (
						<button
							key={ weekGroup.week }
							className={
								`flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left transition-colors ${
									isSelected
										? "border-accent bg-accent-soft text-accent"
										: "border-border bg-surface hover:bg-default"
								}`
							}
							type={ "button" }
							onClick={ () => onWeekToggleAction( weekGroup.week ) }
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
								<span className={ "block text-xs text-muted" }>
									{ `${ weekGroup.days.length } dias | ${ getWeekExerciseCount( weekGroup ) } ejercicios` }
								</span>
							</span>
						</button>
					);
				} ) }
			</div>
		</div>
	);
}
