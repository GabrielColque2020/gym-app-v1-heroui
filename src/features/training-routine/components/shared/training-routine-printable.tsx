"use client";

import type { RefObject } from "react";

import { Chip } from "@heroui/react";

import { getDayTitle } from "@/features/role/coach/training-routine/components/shared/coach-training-routine-days-accordion.utils";
import type { TrainingRoutineWeek } from "@/features/training-routine/services/training-routines-by-student";

type TrainingRoutinePrintableProps = {
	contentRef: RefObject<HTMLDivElement | null>;
	month: number;
	routineObjective: string | null;
	routineWeeks: TrainingRoutineWeek[];
	studentName: string;
	year: number;
};

type PrintableWeekCell = {
	notes: string;
	reps: string;
	sets: string;
};

type PrintableWeekRow = {
	exerciseName: string;
	cells: Array<PrintableWeekCell | null>;
};

function formatNotes( observation: string | null | undefined, tips: string | null | undefined ) {
	const parts = [
		observation?.trim() ? `Obs: ${ observation.trim() }` : null,
		tips?.trim() ? `Tips: ${ tips.trim() }` : null,
	].filter( Boolean );

	return parts.length > 0 ? parts.join( " | " ) : "Sin notas";
}

function getDayRows( dayNumber: number, routineWeeks: TrainingRoutineWeek[] ): PrintableWeekRow[] {
	const referenceDay = routineWeeks[ 0 ]?.routineDays.find( ( day ) => day.dayNumber === dayNumber );

	if (!referenceDay) return [];

	return referenceDay.routines.map( ( baseExercise, index ) => ( {
		exerciseName: baseExercise.exercise?.name ?? "Ejercicio sin nombre",
		cells: routineWeeks.map( ( routineWeek ) => {
			const weekDay = routineWeek.routineDays.find( ( day ) => day.dayNumber === dayNumber );
			const exercise = weekDay?.routines.find( ( item ) => item.exerciseId === baseExercise.exerciseId )
				?? weekDay?.routines[ index ]
				?? null;

			if (!exercise) return null;

			return {
				notes: formatNotes( exercise.observation, exercise.exercise?.tips ),
				reps: exercise.reps,
				sets: exercise.sets,
			};
		} ),
	} ) );
}

export function TrainingRoutinePrintable( {
	contentRef,
	month,
	routineObjective,
	routineWeeks,
	studentName,
	year,
}: TrainingRoutinePrintableProps ) {
	const referenceDays = routineWeeks[ 0 ]?.routineDays ?? [];
	const objective = routineObjective?.trim() || "Sin objetivo definido";

	return (
		<div ref={ contentRef } className={ "hidden print:block" }>
			<div className={ "min-h-screen bg-white px-4 py-4 text-[11px] text-slate-900 print:px-0 print:py-0" }>
				<div className={ "mb-3 flex items-start justify-between gap-3 border-b-2 border-sky-700 pb-2" }>
					<div className={ "min-w-0" }>
						<h1 className={ "text-base font-extrabold uppercase tracking-[0.2em] text-sky-800" }>
							Planificacion de rutina
						</h1>
						<p className={ "mt-1 text-[11px] font-semibold text-slate-800" }>
							Estudiante: <span className={ "text-sky-800" }>{ studentName }</span>
						</p>
						<p className={ "text-[10px] text-slate-600" }>
							Objetivo del mes: <span className={ "font-medium text-slate-800" }>{ objective }</span>
						</p>
						<p className={ "text-[10px] text-slate-500" }>
							Resumen por dia con semanas, ejercicios, series, repeticiones y observaciones.
						</p>
					</div>
					<div className={ "flex shrink-0 items-center gap-1.5" }>
						<Chip className={ "border border-sky-200 bg-sky-50 text-sky-800" } size={ "sm" } variant={ "soft" }>
							Mes { month } / { year }
						</Chip>
						<Chip className={ "border border-sky-200 bg-sky-50 text-sky-800" } size={ "sm" } variant={ "soft" }>
							{ routineWeeks.length } semanas
						</Chip>
					</div>
				</div>

				<div className={ "space-y-3" } style={ { pageBreakInside: "avoid" } }>
					{ referenceDays.map( ( day ) => {
						const rows = getDayRows( day.dayNumber, routineWeeks );

						return (
							<section key={ day.id } className={ "break-inside-avoid overflow-hidden rounded-lg border border-sky-200 bg-white" }>
								<div className={ "flex items-center justify-between gap-3 border-b border-sky-200 bg-sky-50 px-3 py-2" }>
									<div className={ "flex min-w-0 items-center gap-2" }>
										<div className={ "flex size-6 shrink-0 items-center justify-center rounded-full bg-sky-700 text-[10px] font-bold text-white" }>
											{ day.dayNumber }
										</div>
										<div className={ "min-w-0" }>
											<p className={ "text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-800" }>
												Dia { day.dayNumber }
											</p>
											<p className={ "truncate text-[9px] text-slate-500" }>{ getDayTitle( day ) }</p>
										</div>
									</div>
									<p className={ "text-[9px] font-medium text-slate-500" }>{ day.routines.length } ejercicios</p>
								</div>

								<div className={ "overflow-hidden" }>
									<table className={ "w-full table-fixed border-separate border-spacing-0 text-left text-[8px]" }>
										<thead className={ "bg-sky-700 text-white" }>
											<tr>
												<th className={ "w-[36%] border-r border-sky-600 px-2 py-1.5 font-semibold uppercase tracking-wide" }>
													Ejercicio
												</th>
												{ routineWeeks.map( ( week ) => (
													<th
														key={ week.id }
														className={ "border-r border-sky-600 px-1 py-1.5 text-center font-semibold uppercase tracking-wide last:border-r-0" }
													>
														Sem { week.week }
													</th>
												) ) }
											</tr>
										</thead>
										<tbody>
											{ rows.length === 0 ? (
												<tr>
													<td className={ "border-t border-sky-100 px-2 py-2.5 text-slate-500" } colSpan={ Math.max( routineWeeks.length + 1, 2 ) }>
														No hay ejercicios cargados para este dia.
													</td>
												</tr>
											) : (
												rows.map( ( row ) => (
													<tr key={ row.exerciseName } className={ "align-top odd:bg-sky-50/70" }>
														<td className={ "border-r border-b border-sky-100 px-2 py-2" }>
															<span className={ "font-medium text-slate-900" }>{ row.exerciseName }</span>
														</td>
														{ row.cells.map( ( cell, index ) => (
															<td
																key={ `${ row.exerciseName }-${ routineWeeks[ index ]?.id ?? index }` }
																className={ "border-r border-b border-sky-100 px-1 py-2 text-center align-top last:border-r-0" }
															>
																{ cell ? (
																	<div className={ "space-y-0.5" }>
																		<p className={ "font-semibold text-sky-900" }>
																			{ cell.sets } x { cell.reps }
																		</p>
																		<p className={ "leading-tight text-slate-600" }>{ cell.notes }</p>
																	</div>
																) : (
																	<span className={ "text-slate-400" }>--</span>
																) }
															</td>
														) ) }
													</tr>
												) )
											) }
										</tbody>
									</table>
								</div>
							</section>
						);
					} ) }
				</div>
			</div>
		</div>
	);
}
