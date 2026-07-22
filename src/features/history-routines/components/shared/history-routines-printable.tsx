"use client";

import type { RefObject } from "react";

import type { HistoryRoutineMonthSummary, HistoryRoutineWeekGroup } from "@/features/history-routines/services/history-routines-view";
import { formatHistoryDate } from "@/features/history-routines/services/history-routines-form";

type HistoryRoutinesPrintableProps = {
	contentRef: RefObject<HTMLDivElement | null>;
	monthLabel: string;
	studentName: string;
	summary: HistoryRoutineMonthSummary;
	weekGroups: HistoryRoutineWeekGroup[];
	objective?: string | null;
};

function getSummaryStatusLabel( status: HistoryRoutineMonthSummary["status"] ) {
	switch (status) {
		case "complete":
			return "Completo";
		case "partial":
			return "Parcial";
		default:
			return "Sin datos";
	}
}

function getSetStatusLabel( completed: boolean, planned: boolean ) {
	if (completed) return "\u2713 Completado";
	if (planned) return "\u2014 Pendiente";

	return "+ Extra";
}

export function HistoryRoutinesPrintable( {
	contentRef,
	monthLabel,
	studentName,
	summary,
	weekGroups,
	objective,
}: HistoryRoutinesPrintableProps ) {
	const resolvedObjective = objective?.trim() || "Sin objetivo definido";

	return (
		<div ref={ contentRef } className={ "hidden print:block" }>
			<div className={ "min-h-screen bg-white px-2 py-2 text-[8px] leading-tight text-slate-900 print:px-0 print:py-0" }>
				<header className={ "mb-2 border-b-2 border-sky-700 pb-1.5" }>
					<div className={ "flex items-end justify-between gap-3" }>
						<div className={ "min-w-0" }>
							<h1 className={ "text-[11px] font-extrabold uppercase tracking-[0.16em] text-sky-800" }>
								Reporte de historial de rutina
							</h1>
							<p className={ "mt-0.5 text-[9px] font-semibold text-slate-800" }>
								Estudiante: <span className={ "text-sky-800" }>{ studentName }</span>
							</p>
							<p className={ "text-[7px] text-slate-600" }>
								Periodo: <span className={ "font-medium text-slate-800" }>{ monthLabel }</span>
								{ " | " }
								Objetivo: <span className={ "font-medium text-slate-800" }>{ resolvedObjective }</span>
							</p>
						</div>
						<div className={ "flex shrink-0 items-center gap-1.5 text-[7px]" }>
							<span className={ "rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 font-medium text-sky-800" }>
								{ `${ summary.weeks } semanas` }
							</span>
							<span className={ "rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 font-medium text-sky-800" }>
								{ `${ summary.days } dias` }
							</span>
						</div>
					</div>
				</header>

				<section className={ "mb-2 border border-sky-200 bg-sky-50 px-2 py-1.5 text-[7px] text-slate-700" }>
					<span className={ "font-semibold text-sky-900" }>{ getSummaryStatusLabel( summary.status ) }</span>
					{ " \u00B7 " }
					<span>{ `${ summary.weeks } semanas` }</span>
					{ " \u00B7 " }
					<span>{ `${ summary.days } dias` }</span>
					{ " \u00B7 " }
					<span>{ `${ summary.exercises } ejercicios` }</span>
					{ " \u00B7 " }
					<span>{ `${ summary.sets } series` }</span>
				</section>

				<div className={ "space-y-2" }>
					{ weekGroups.map( ( weekGroup ) => (
						<section key={ weekGroup.week } className={ "break-inside-avoid" }>
							<h2 className={ "mb-1 border-b border-sky-200 bg-sky-50 px-1.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-sky-800" }>
								{ `Semana ${ weekGroup.week } (${ weekGroup.days.length } dias)` }
							</h2>

							<div className={ "space-y-1.5" }>
								{ weekGroup.days.map( ( day ) => (
									<section key={ day.id }>
										<div className={ "mb-0.5 border-l-2 border-sky-700 bg-slate-50 px-2 py-0.5 text-[8px] font-semibold text-slate-800" }>
											{ `Dia ${ day.dayNumber } \u00B7 ${ formatHistoryDate( day.date ) }` }
										</div>

										<table className={ "w-full table-fixed border-collapse text-left text-[7px]" }>
											<thead>
												<tr className={ "bg-sky-700 text-white" }>
													<th className={ "w-[40%] px-1.5 py-0.75 font-semibold uppercase tracking-wide" }>Ejercicio</th>
													<th className={ "w-[8%] px-1 py-0.75 font-semibold uppercase tracking-wide" }>Serie</th>
													<th className={ "w-[16%] px-1 py-0.75 font-semibold uppercase tracking-wide" }>Plan</th>
													<th className={ "w-[16%] px-1 py-0.75 font-semibold uppercase tracking-wide" }>Real</th>
													<th className={ "w-[10%] px-1 py-0.75 font-semibold uppercase tracking-wide" }>Peso</th>
													<th className={ "w-[10%] px-1 py-0.75 font-semibold uppercase tracking-wide" }>Estado</th>
												</tr>
											</thead>
											{ day.exercises.map( ( exercise ) => (
												<tbody key={ exercise.id } className={ "break-inside-avoid" }>
													{ exercise.sets.map( ( set, setIndex ) => (
														<tr className={ "border-b border-sky-100 align-top odd:bg-sky-50/60" } key={ set.id }>
															<td className={ "px-1.5 py-0.75" }>
																{ setIndex === 0 ? (
																	<p className={ "font-medium text-slate-900" }>{ exercise.name }</p>
																) : null }
															</td>
															<td className={ "px-1 py-0.75 text-slate-700" }>{ set.setNumber }</td>
															<td className={ "px-1 py-0.75 text-slate-700" }>{ `${ set.plannedReps } reps` }</td>
															<td className={ "px-1 py-0.75 text-slate-700" }>{ `${ set.repsCompleted ?? "-" } reps` }</td>
															<td className={ "px-1 py-0.75 text-slate-700" }>{ `${ set.weightUsed ?? "-" } kg` }</td>
															<td className={ `px-1 py-0.75 text-center font-semibold ${ set.completed ? "text-emerald-700" : set.planned ? "text-amber-700" : "text-sky-700" }` }>
																{ getSetStatusLabel( set.completed, set.planned ) }
															</td>
														</tr>
													) ) }
												</tbody>
											) ) }
										</table>
									</section>
								) ) }
							</div>
						</section>
					) ) }
				</div>
			</div>
		</div>
	);
}
