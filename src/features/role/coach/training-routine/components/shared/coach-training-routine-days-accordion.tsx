"use client";

import type { CoachTrainingRoutineDay } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";

import { Accordion, Chip, Description, Typography } from "@heroui/react";
import { Dot } from "lucide-react";

type CoachTrainingRoutineDaysAccordionProps = {
	days: CoachTrainingRoutineDay[];
	exerciseGridClassName?: string;
	month: number;
	studentId: string;
	year: number;
};

import { CoachTrainingRoutineDayOptionsMenu } from "@/features/role/coach/training-routine/components/shared/coach-training-routine-day-options-menu";
import { formatExerciseMeta, getDayTitle } from "@/features/role/coach/training-routine/components/shared/coach-training-routine-days-accordion.utils";

export function CoachTrainingRoutineDaysAccordion( {
													   days,
													   exerciseGridClassName = "grid gap-2 rounded-xl bg-default/40 p-3",
													   month,
													   studentId,
													   year,
												   }: CoachTrainingRoutineDaysAccordionProps ) {
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
					<div className={ "overflow-hidden rounded-xl border border-default bg-surface shadow-sm" }>
						<Accordion.Trigger className={ "group flex w-full items-center justify-between gap-2 px-3 py-2.5" }>
							<div className={ "flex min-w-0 items-center gap-2" }>
								<div className={ "flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground" }>
									{ day.dayNumber }
								</div>
								<div className={ "min-w-0" }>
									<Typography className={ "truncate text-sm font-semibold" }>Dia { day.dayNumber }</Typography>
									<Description className={ "truncate text-xs" }>{ getDayTitle( day ) }</Description>
								</div>
							</div>
							<div className={ "flex shrink-0 items-center gap-1.5" }>
								<Chip color={ day.isFinalized ? "success" : "accent" } size={ "sm" } variant={ "soft" }>
									{ day.isFinalized ? "Finalizado" : day.routines.length }
								</Chip>
								<Accordion.Indicator/>
							</div>
						</Accordion.Trigger>
						<Accordion.Panel>
							<Accordion.Body className={ "px-3 pb-3 pt-0" }>
								<div className={ "grid gap-2" }>
									{ day.routines.length === 0 ? (
										<div className={ "rounded-xl bg-default/40 p-3 text-sm text-muted" }>
											Este dia no tiene ejercicios cargados.
										</div>
									) : (
										<div className={ exerciseGridClassName }>
											{ day.routines.map( ( routine ) => (
												<div key={ routine.id } className={ "grid min-w-0 gap-1 text-sm" }>
													<div className={ "flex min-w-0 items-center gap-2" }>
														<Dot className={ "size-4 shrink-0 text-accent" }/>
														<span className={ "min-w-0 flex-1 truncate font-medium" }>
															{ routine.exercise?.name ?? "Ejercicio sin nombre" }
														</span>
														<span className={ "shrink-0 text-muted" }>
															{ formatExerciseMeta( routine.sets, routine.reps ) }
														</span>
													</div>
													{ routine.observation ? (
														<p className={ "pl-4 text-xs text-muted" }>{ routine.observation }</p>
													) : null }
												</div>
											) ) }
										</div>
									) }
									<div className={ "flex justify-end" }>
										<CoachTrainingRoutineDayOptionsMenu
											month={ month }
											routineDayId={ day.id }
											studentId={ studentId }
											year={ year }
										/>
									</div>
								</div>
							</Accordion.Body>
						</Accordion.Panel>
					</div>
				</Accordion.Item>
			) ) }
		</Accordion>
	);
}
