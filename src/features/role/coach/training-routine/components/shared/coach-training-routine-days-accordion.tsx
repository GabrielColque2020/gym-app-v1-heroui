"use client";

import type { CoachTrainingRoutineDay } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";

import { Accordion, Card, Chip, Description, Typography } from "@heroui/react";
import { Dot } from "lucide-react";
import { CoachTrainingRoutineDayOptionsMenu } from "@/features/role/coach/training-routine/components/shared/coach-training-routine-day-options-menu";
import { formatExerciseMeta, getDayTitle } from "@/features/role/coach/training-routine/components/shared/coach-training-routine-days-accordion.utils";

type CoachTrainingRoutineDaysAccordionProps = {
	days: CoachTrainingRoutineDay[];
	exerciseGridClassName?: string;
	month: number;
	studentId: string;
	year: number;
};

export function CoachTrainingRoutineDaysAccordion( {
													   days,
													   exerciseGridClassName = "grid gap-2 p-3",
													   month,
													   studentId,
													   year,
												   }: CoachTrainingRoutineDaysAccordionProps ) {
	if (days.length === 0) {
		return (
			<Card className={ "border border-border px-4 py-8 text-center text-sm text-muted" }>
				No hay dias de entrenamiento cargados para esta semana.
			</Card>
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
										<Card className={ "p-3 text-sm text-muted" } variant={ "secondary" }>
											Este dia no tiene ejercicios cargados.
										</Card>
									) : (
										<Card className={ exerciseGridClassName } variant={ "secondary" }>
											{ day.routines.map( ( routine ) => (
												<div key={ routine.id } className={ "grid min-w-0 gap-1 text-sm" }>
													<div className={ "flex min-w-0 items-center gap-2" }>
														<Dot className={ "size-4 shrink-0 text-accent" }/>
														<span className={ "min-w-0 flex-1 truncate font-medium" }>
															{ routine.exercise?.name ?? "Ejercicio sin nombre" }:
															<span className={ "shrink-0 text-muted ml-4" }>
																{ formatExerciseMeta( routine.sets, routine.reps ) }
															</span>
														</span>
													</div>
													{ routine.observation ? (
														<p className={ "pl-4 text-xs text-muted" }>{ routine.observation }</p>
													) : null }
												</div>
											) ) }
										</Card>
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
