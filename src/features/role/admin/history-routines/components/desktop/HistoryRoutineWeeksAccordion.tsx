"use client";

import { Accordion, Chip, Typography } from "@heroui/react";

import type { HistoryRoutineWeekGroup } from "@/features/role/admin/history-routines/services/history-routines-view";
import { HistoryRoutineDaysAccordion } from "@/features/role/admin/history-routines/components/desktop/HistoryRoutineDaysAccordion";

type HistoryRoutineWeeksAccordionProps = {
	weeks: HistoryRoutineWeekGroup[];
};

export function HistoryRoutineWeeksAccordion( { weeks }: HistoryRoutineWeeksAccordionProps ) {
	if (weeks.length === 0) {
		return (
			<div className={ "rounded-xl border border-dashed border-border bg-surface-secondary px-4 py-8 text-center text-sm text-muted" }>
				No hay semanas seleccionadas para mostrar.
			</div>
		);
	}

	return (
		<Accordion allowsMultipleExpanded hideSeparator className={ "w-full space-y-2" }>
			{ weeks.map( ( weekGroup ) => (
				<Accordion.Item key={ weekGroup.week }>
					<div className={ "overflow-hidden rounded-xl border border-default bg-surface shadow-sm" }>
						<Accordion.Trigger className={ "group flex w-full items-center justify-between gap-2 px-3 py-2.5" }>
							<div className={ "flex min-w-0 items-center gap-2 ml-4" }>
								<div className={ "min-w-0 text-left" }>
									<Typography className={ "truncate text-sm font-semibold" }>Semana { weekGroup.week }</Typography>
									<Typography className={ "truncate text-xs text-muted" }>{ `${ weekGroup.days.length } dias` }</Typography>
								</div>
							</div>
							<Accordion.Indicator/>
						</Accordion.Trigger>

						<Accordion.Panel>
							<Accordion.Body className={ "px-3 pb-3 pt-0" }>
								<HistoryRoutineDaysAccordion days={ weekGroup.days }/>
							</Accordion.Body>
						</Accordion.Panel>
					</div>
				</Accordion.Item>
			) ) }
		</Accordion>
	);
}
