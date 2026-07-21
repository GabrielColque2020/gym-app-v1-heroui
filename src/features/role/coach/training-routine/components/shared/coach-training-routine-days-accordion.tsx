"use client";

import type {
    CoachTrainingRoutineDay
} from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";

import { AsyncMedia } from "@/components/common";
import { Accordion, Card, Chip, Description, Typography } from "@heroui/react";
import { CalendarDays, StickyNote } from "lucide-react";
import {
    CoachTrainingRoutineDayOptionsMenu
} from "@/features/role/coach/training-routine/components/shared/coach-training-routine-day-options-menu";
import {
    formatExerciseMeta,
    getDayTitle
} from "@/features/role/coach/training-routine/components/shared/coach-training-routine-days-accordion.utils";

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
                                                       year
                                                   }: CoachTrainingRoutineDaysAccordionProps ) {
    if (days.length === 0) {
        return (
            <Card className={"border border-border px-4 py-8 text-center text-sm text-muted"}>
                No hay dias de entrenamiento cargados para esta semana.
            </Card>
        );
    }

    return (
        <Accordion allowsMultipleExpanded hideSeparator className={"w-full space-y-2"}>
            {days.map( ( day ) => (
                <Accordion.Item key={day.id}>
                    <div className={"overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"}>
                        <Accordion.Trigger
                            className={"group flex w-full items-start justify-between gap-3 px-3 py-3 text-left"}
                        >
                            <div className={"flex min-w-0 items-start gap-3"}>
                                <div
                                    className={"flex size-2 shrink-0 items-end justify-center rounded-full bg-accent mt-2"}
                                >
                                </div>
                                <div className={"min-w-0 space-y-1"}>

                                    <Typography
                                        className={"truncate text-base font-semibold text-foreground"}
                                    >Dia {day.dayNumber}</Typography>
                                    <Description className={"truncate text-xs"}>{getDayTitle( day )}</Description>
                                    <div className={"flex flex-wrap gap-2"}>
                                        <Chip size={"sm"} variant={"soft"}>
                                            <CalendarDays className={"size-3.5"}/>
                                            {day.routines.length} ejercicios
                                        </Chip>
                                        <Chip color={day.isFinalized ? "success" : "accent"} size={"sm"}
                                              variant={"soft"}
                                        >
                                            {day.isFinalized ? "Finalizado" : "En edición"}
                                        </Chip>
                                    </div>
                                </div>
                            </div>
                            <div className={"flex shrink-0 items-center gap-2 pt-1"}>
                                <Accordion.Indicator/>
                            </div>
                        </Accordion.Trigger>
                        <Accordion.Panel>
                            <Accordion.Body className={"px-3 pb-3 pt-1"}>
                                <div className={"grid gap-3"}>
                                    {day.routines.length === 0 ? (
                                        <Card
                                            className={"rounded-xl border border-dashed border-border p-4 text-center text-sm text-muted"}
                                            variant={"secondary"}
                                        >
                                            Este dia no tiene ejercicios cargados.
                                        </Card>
                                    ) : (
                                        <Card
                                            className={`${exerciseGridClassName} rounded-xl border border-border bg-surface-secondary`}
                                            variant={"secondary"}
                                        >
                                            {day.routines.map( ( routine ) => (
                                                <div key={routine.id}
                                                     className={"grid min-w-0 gap-2 rounded-xl border border-border bg-surface px-3 py-3 text-sm shadow-sm"}
                                                >
                                                    <div className={"flex min-w-0 items-start gap-3"}>
                                                        <AsyncMedia
                                                            alt={`Imagen de ${routine.exercise?.name ?? "ejercicio"}`}
                                                            className={"size-10 shrink-0 rounded-lg border border-border"}
                                                            emptyLabel={"Sin imagen"}
                                                            spinnerLabel={`Cargando imagen de ${routine.exercise?.name ?? "ejercicio"}`}
                                                            src={routine.exercise?.imageUrl}
                                                        />
                                                        <div className={"min-w-0 flex-1 space-y-1"}>
                                                            <p className={"wrap-break-word font-semibold text-foreground"}>
                                                                {routine.exercise?.name ?? "Ejercicio sin nombre"}
                                                            </p>
                                                            <div className={"flex flex-wrap gap-2"}>
                                                                <Chip size={"sm"}
                                                                      variant={"soft"}
                                                                >{routine.sets} series</Chip>
                                                                <Chip size={"sm"}
                                                                      variant={"soft"}
                                                                >{routine.reps} reps</Chip>
                                                                <Chip color={"accent"} size={"sm"} variant={"soft"}>
                                                                    {formatExerciseMeta( routine.sets, routine.reps )}
                                                                </Chip>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {routine.observation ? (
                                                        <div
                                                            className={"flex gap-2 rounded-lg border border-border bg-surface-secondary px-3 py-2 text-xs text-muted"}
                                                        >
                                                            <StickyNote
                                                                className={"mt-0.5 size-3.5 shrink-0 text-accent"}
                                                            />
                                                            <p className={"wrap-break-word"}>{routine.observation}</p>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            ) )}
                                        </Card>
                                    )}
                                    <div className={"flex justify-end"}>
                                        <CoachTrainingRoutineDayOptionsMenu
                                            month={month}
                                            routineDayId={day.id}
                                            studentId={studentId}
                                            year={year}
                                        />
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Panel>

                    </div>
                </Accordion.Item>
            ) )}
        </Accordion>
    );
}
