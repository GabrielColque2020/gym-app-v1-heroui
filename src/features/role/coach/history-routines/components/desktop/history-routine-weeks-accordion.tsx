"use client";

import { Accordion, Card, Chip, Typography } from "@heroui/react";

import type { HistoryRoutineWeekGroup } from "@/features/history-routines/services/history-routines-view";
import { HistoryRoutineDaysAccordion } from "@/features/role/coach/history-routines/components/desktop/history-routine-days-accordion";
import { getWeekExerciseCount } from "@/features/role/coach/history-routines/components/shared/history-routine-week-metrics";
import { getHistoryRoutineWeekStatus } from "@/features/role/coach/history-routines/services/history-routines-view";

type HistoryRoutineWeeksAccordionProps = {
	weeks: HistoryRoutineWeekGroup[];
};

function getWeekSetCount( weekGroup: HistoryRoutineWeekGroup ) {
	return weekGroup.days.reduce(
		( total, day ) => total + day.exercises.reduce( ( exerciseTotal, exercise ) => exerciseTotal + exercise.sets.length, 0 ),
		0,
	);
}

export function HistoryRoutineWeeksAccordion( { weeks }: HistoryRoutineWeeksAccordionProps ) {
	if (weeks.length === 0) {
		return (
			<div className={ "rounded-xl border border-dashed border-border bg-surface-secondary px-4 py-8 text-center text-sm text-muted" }>
				No hay semanas seleccionadas para mostrar.
			</div>
		);
	}

	return (
		<Accordion allowsMultipleExpanded hideSeparator className={ "w-full" }>
			{ weeks.map( ( weekGroup ) => (
				<Accordion.Item key={ weekGroup.week }>
					<Card className={ "overflow-hidden  border border-border  shadow-sm" }>
						<Accordion.Trigger className={ "group flex w-full flex-col py-2 items-start sm:flex-row sm:items-center sm:justify-between" }>
							<div className={ "min-w-0 text-left" }>
								<Typography className={ "text-sm font-semibold leading-5" }>
									{ `Semana ${ weekGroup.week }` }
								</Typography>
								<Typography className={ "text-xs text-muted" }>
									{ `${ weekGroup.days.length } dias con registro` }
								</Typography>
							</div>

							<div className={ "flex w-full shrink-0 flex-wrap items-center justify-start sm:w-auto sm:justify-end" }>
								<Chip
									color={
										getHistoryRoutineWeekStatus( weekGroup ) === "complete"
											? "success"
											: getHistoryRoutineWeekStatus( weekGroup ) === "partial"
												? "warning"
												: "default"
									}
									size={ "sm" }
									variant={ "soft" }
								>
									{ getHistoryRoutineWeekStatus( weekGroup ) === "complete"
										? "Completa"
										: getHistoryRoutineWeekStatus( weekGroup ) === "partial"
											? "Parcial"
											: "Vacia" }
								</Chip>
								<Chip color={ "accent" } size={ "sm" } variant={ "soft" }>
									{ `${ getWeekExerciseCount( weekGroup ) } ejercicios` }
								</Chip>
								<Chip size={ "sm" } variant={ "soft" }>
									{ `${ getWeekSetCount( weekGroup ) } series` }
								</Chip>
								<Accordion.Indicator className={ "ml-auto sm:ml-0" }/>
							</div>
						</Accordion.Trigger>

						<Accordion.Panel>
							<Accordion.Body className={ "py-2" }>
								<HistoryRoutineDaysAccordion days={ weekGroup.days }/>
							</Accordion.Body>
						</Accordion.Panel>
					</Card>
				</Accordion.Item>
			) ) }
		</Accordion>
	);
}
