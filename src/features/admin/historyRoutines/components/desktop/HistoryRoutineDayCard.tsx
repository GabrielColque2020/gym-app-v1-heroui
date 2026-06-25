"use client";

import { Card, Chip, ScrollShadow, Typography } from "@heroui/react";

import type { AdminHistoryRoutine } from "@/features/admin/historyRoutines/actions/get-history-routines-by-student";
import { formatHistoryDate } from "@/features/admin/historyRoutines/services/history-routines-form";
import { HistoryRoutineExerciseCard } from "@/features/admin/historyRoutines/components/desktop/HistoryRoutineExerciseCard";

type HistoryRoutineDayCardProps = {
	historyRoutine: AdminHistoryRoutine;
};

export function HistoryRoutineDayCard( { historyRoutine }: HistoryRoutineDayCardProps ) {
	return (
		<Card className={ "overflow-hidden border border-border/70 shadow-sm" } variant={ "default" }>
			<Card.Header className={ "border-b border-border px-3 py-3" }>
				<div className={ "flex flex-col gap-2" }>
					<div className={ "flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between" }>
						<div className={ "min-w-0" }>
							<p className={ "truncate text-sm font-semibold text-foreground" }>{ historyRoutine.title }</p>
							<Typography className={ "mt-1 text-xs text-muted" }>
								{ historyRoutine.description }
							</Typography>
						</div>
						<div className={ "flex shrink-0 gap-2" }>
							<Chip color={ "success" } size={ "sm" } variant={ "soft" }>
								{ `Semana ${ historyRoutine.week }` }
							</Chip>
							<Chip color={ "accent" } size={ "sm" } variant={ "soft" }>
								{ `Dia ${ historyRoutine.dayNumber }` }
							</Chip>
						</div>
					</div>
					<div className={ "flex flex-wrap gap-2" }>
						<Chip size={ "sm" } variant={ "soft" }>
							{ formatHistoryDate( historyRoutine.date ) }
						</Chip>
					</div>
				</div>
			</Card.Header>

			<Card.Content className={ "px-3 py-3" }>
				<ScrollShadow className={ "max-h-[24rem] pr-2" }>
					<div className={ "grid gap-2" }>
						{ historyRoutine.exercises.map( ( exercise ) => (
							<HistoryRoutineExerciseCard key={ exercise.id } exercise={ exercise }/>
						) ) }
					</div>
				</ScrollShadow>
			</Card.Content>
		</Card>
	);
}
