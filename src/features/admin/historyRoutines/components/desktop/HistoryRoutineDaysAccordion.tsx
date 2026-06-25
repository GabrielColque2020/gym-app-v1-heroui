"use client";

import { Card, Chip, ScrollShadow, Typography } from "@heroui/react";
import { CircleFill } from "@gravity-ui/icons";

import type { AdminHistoryRoutine } from "@/features/admin/historyRoutines/actions/get-history-routines-by-student";
import { formatHistoryDate } from "@/features/admin/historyRoutines/services/history-routines-form";
import { HistoryRoutineExerciseCard } from "@/features/admin/historyRoutines/components/desktop/HistoryRoutineExerciseCard";

type HistoryRoutineDaysAccordionProps = {
	days: AdminHistoryRoutine[];
};

function getDaySubtitle( day: AdminHistoryRoutine ) {
	const exerciseCount = day.exercises.length;

	return exerciseCount === 0
		? "Sin ejercicios cargados"
		: `${ exerciseCount } ejercicio${ exerciseCount === 1 ? "" : "s" }`;
}

export function HistoryRoutineDaysAccordion( { days }: HistoryRoutineDaysAccordionProps ) {
	if (days.length === 0) {
		return (
			<div className={ "rounded-xl border border-dashed border-border bg-surface-secondary px-4 py-8 text-center text-sm text-muted" }>
				No hay dias de entrenamiento cargados para esta semana.
			</div>
		);
	}

	return (
		<div className={ "grid gap-3 md:grid-cols-2 xl:grid-cols-3" }>
			{ days.map( ( day ) => (
				<Card key={ day.id } className={ "overflow-hidden border border-default bg-surface shadow-sm" } variant={ "default" }>
					<Card.Header className={ "border-b border-border px-3 py-2.5" }>
						<div className={ "flex items-center justify-between gap-2" }>
							<div className={ "flex min-w-0 items-center gap-2" }>
								<div className={ "min-w-0 text-left" }>
									<Typography className={ "truncate text-sm font-semibold" }>Dia { day.dayNumber }</Typography>
									<Typography className={ "truncate text-xs text-muted" }>{ getDaySubtitle( day ) }</Typography>
								</div>
							</div>
							<Chip color={ "accent" } size={ "sm" } variant={ "soft" }>
								{ formatHistoryDate( day.date ) }
							</Chip>
						</div>
					</Card.Header>

					<Card.Content className={ "px-3 py-3" }>
						<div className={ "grid gap-2" }>
							<ScrollShadow className={ "max-h-88 pr-1" }>
								<div className={ "grid gap-2" }>
									{ day.exercises.map( ( exercise ) => (
										<HistoryRoutineExerciseCard key={ exercise.id } exercise={ exercise }/>
									) ) }
								</div>
							</ScrollShadow>
						</div>
					</Card.Content>
				</Card>
			) ) }
		</div>
	);
}
