"use client";

import { Accordion, Chip, Typography } from "@heroui/react";

import type { AdminHistoryRoutine } from "@/features/role/admin/history-routines/actions/get-history-routines-by-student";
import { formatHistoryDate } from "@/features/role/admin/history-routines/services/history-routines-form";
import { getHistoryRoutineDayStatus } from "@/features/role/admin/history-routines/services/history-routines-view";
import { HistoryRoutineExerciseCarousel } from "@/features/role/admin/history-routines/components/shared/HistoryRoutineExerciseCarousel";

type HistoryRoutineDaysAccordionProps = {
	days: AdminHistoryRoutine[];
};

function getDayExerciseCount( day: AdminHistoryRoutine ) {
	return day.exercises.length;
}

function getDaySetCount( day: AdminHistoryRoutine ) {
	return day.exercises.reduce( ( total, exercise ) => total + exercise.sets.length, 0 );
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
		<Accordion allowsMultipleExpanded hideSeparator className={ "w-full space-y-2" }>
			{ days.map( ( day ) => (
				<Accordion.Item key={ day.id }>
					<div className={ "overflow-hidden rounded-xl border border-border bg-surface" }>
						<Accordion.Trigger className={ "group flex w-full flex-col items-start gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between" }>
							<div className={ "min-w-0 text-left" }>
								<Typography className={ "text-sm font-semibold leading-5" }>
									{ `Dia ${ day.dayNumber }` }
								</Typography>
								<Typography className={ "text-xs text-muted" }>
									{ day.description }
								</Typography>
							</div>

							<div className={ "flex w-full shrink-0 flex-wrap items-center justify-start gap-2 sm:w-auto sm:justify-end" }>
								<Chip
									color={
										getHistoryRoutineDayStatus( day ) === "complete"
											? "success"
											: getHistoryRoutineDayStatus( day ) === "partial"
												? "warning"
												: "default"
									}
									size={ "sm" }
									variant={ "soft" }
								>
									{ getHistoryRoutineDayStatus( day ) === "complete"
										? "Completo"
										: getHistoryRoutineDayStatus( day ) === "partial"
											? "Parcial"
											: "Vacio" }
								</Chip>
								<Chip color={ "accent" } size={ "sm" } variant={ "soft" }>
									{ `${ getDayExerciseCount( day ) } ejercicios` }
								</Chip>
								<Chip size={ "sm" } variant={ "soft" }>
									{ `${ getDaySetCount( day ) } series` }
								</Chip>
								<Chip color={ "success" } size={ "sm" } variant={ "soft" }>
									{ formatHistoryDate( day.date ) }
								</Chip>
								<Accordion.Indicator className={ "ml-auto sm:ml-0" }/>
							</div>
						</Accordion.Trigger>

						<Accordion.Panel>
							<Accordion.Body className={ "px-4 pb-4 pt-0" }>
								<HistoryRoutineExerciseCarousel exercises={ day.exercises }/>
							</Accordion.Body>
						</Accordion.Panel>
					</div>
				</Accordion.Item>
			) ) }
		</Accordion>
	);
}
