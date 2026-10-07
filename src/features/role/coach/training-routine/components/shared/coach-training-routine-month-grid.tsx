"use client";

import type {
	CoachTrainingRoutine,
	CoachTrainingRoutineDay,
} from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";

import type { ReactNode } from "react";

import Link from "next/link";
import { Card } from "@heroui/react";
import { CheckCircle2, Pencil, Plus } from "lucide-react";

import { isRoutineDayDraftDirty } from "@/features/routine/services/routine-day-editor";
import { useRoutineDayDraftStore } from "@/features/routine/stores/use-routine-day-draft-store";
import { getTrainingRoutineDayTitle } from "@/features/training-routine/services/training-routine-day-formatters";

type CoachTrainingRoutineMonthGridProps = {
	// Arma el enlace al editor de un dia.
	buildDayHrefAction: ( routineDayId: string ) => string;
	// Accion del encabezado de cada semana (por ejemplo, repetirla en las demas).
	renderWeekAction?: ( routineWeek: CoachTrainingRoutine ) => ReactNode;
	routineWeeks: CoachTrainingRoutine[];
};

type DayCellProps = {
	day: CoachTrainingRoutineDay;
	hasUnsavedChanges: boolean;
	href: string;
};

// Cuantos ejercicios se listan en cada celda antes de resumir el resto.
const VISIBLE_EXERCISES = 4;

function formatPrescription( sets: string, reps: string ) {
	return [ sets.trim(), reps.trim() ].filter( Boolean ).join( "×" );
}

function DayCell( { day, hasUnsavedChanges, href }: DayCellProps ) {
	const isEmpty = day.routines.length === 0;
	const hiddenCount = day.routines.length - VISIBLE_EXERCISES;

	return (
		<Link
			aria-label={ isEmpty ? `Cargar ejercicios del día ${ day.dayNumber }` : `Editar día ${ day.dayNumber }` }
			className={
				`flex min-h-28 flex-col gap-1.5 rounded-xl border p-3 transition-colors hover:border-accent ${
					isEmpty ? "border-dashed border-border bg-transparent" : "border-border bg-surface-secondary"
				}`
			}
			href={ href }
		>
			<div className={ "flex items-center justify-between gap-2" }>
				<span className={ "text-sm font-bold text-foreground" }>Día { day.dayNumber }</span>
				<span className={ "flex items-center gap-1.5" }>
					{ hasUnsavedChanges ? (
						<span className={ "rounded-full bg-warning/15 px-2 py-0.5 text-[11px] font-medium text-warning" }>
							Sin guardar
						</span>
					) : null }
					{ /* El estudiante ya termino este dia, o lo empezo y todavia no lo cerro. */ }
					{ day.isFinalized ? (
						<CheckCircle2 aria-label={ "Realizado por el estudiante" } className={ "size-4 text-success" }/>
					) : day.loadedSetCount > 0 ? (
						<span className={ "rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium text-accent" }>
							En curso
						</span>
					) : null }
				</span>
			</div>

			{ isEmpty ? (
				<div className={ "flex flex-1 flex-col justify-between gap-2" }>
					<p className={ "text-xs text-muted" }>Sin ejercicios</p>
					<p className={ "flex items-center gap-1 text-sm font-medium text-accent" }>
						<Plus className={ "size-4" }/>
						Cargar
					</p>
				</div>
			) : (
				<>
					<p className={ "truncate text-xs font-medium text-accent" }>{ getTrainingRoutineDayTitle( day ) }</p>
					<ul className={ "space-y-0.5" }>
						{ day.routines.slice( 0, VISIBLE_EXERCISES ).map( ( routine ) => (
							<li key={ routine.id } className={ "flex gap-1.5 text-xs text-muted" }>
								<span className={ "shrink-0 font-medium text-foreground" }>
									{ formatPrescription( routine.sets, routine.reps ) }
								</span>
								<span className={ "truncate" }>{ routine.exercise?.name ?? "Ejercicio sin nombre" }</span>
							</li>
						) ) }
					</ul>
					{ hiddenCount > 0 ? (
						<p className={ "text-xs text-muted" }>+{ hiddenCount } más</p>
					) : null }
					{ /* La accion a la vista, igual que "Cargar" en un dia vacio: sin esto no
					     se nota que la celda entera abre el editor. */ }
					<p className={ "mt-auto flex items-center gap-1 pt-1 text-sm font-medium text-accent" }>
						<Pencil className={ "size-3.5" }/>
						Editar
					</p>
				</>
			) }
		</Link>
	);
}

// La rutina entera a la vista: una fila por semana y una celda por dia, con lo que
// tiene cargado. Cada celda abre el editor de ese dia. Sirve para el mes de un
// estudiante y para una plantilla.
export function CoachTrainingRoutineMonthGrid( {
												  buildDayHrefAction,
												  renderWeekAction,
												  routineWeeks,
											  }: CoachTrainingRoutineMonthGridProps ) {
	// Los borradores viven en este navegador: un dia editado y no guardado se avisa aca.
	const drafts = useRoutineDayDraftStore( ( state ) => state.drafts );

	return (
		<div className={ "flex flex-col gap-3" }>
			{ routineWeeks.map( ( routineWeek ) => {
				const loadedDays = routineWeek.routineDays.filter( ( day ) => day.routines.length > 0 ).length;
				const exerciseCount = routineWeek.routineDays.reduce( ( count, day ) => count + day.routines.length, 0 );

				return (
					<Card key={ routineWeek.id } className={ "border border-border" } variant={ "default" }>
						<Card.Header className={ "flex flex-row flex-wrap items-center justify-between gap-2 px-3 pt-3" }>
							<div className={ "min-w-0" }>
								<p className={ "text-base font-semibold text-foreground" }>Semana { routineWeek.week }</p>
								<p className={ "text-xs text-muted" }>
									{ loadedDays } de { routineWeek.routineDays.length } días cargados
									{ exerciseCount > 0 ? ` · ${ exerciseCount } ${ exerciseCount === 1 ? "ejercicio" : "ejercicios" }` : "" }
								</p>
							</div>
							{ renderWeekAction?.( routineWeek ) }
						</Card.Header>
						<Card.Content className={ "px-3 pb-3" }>
							{ routineWeek.routineDays.length === 0 ? (
								<p className={ "py-4 text-center text-sm text-muted" }>Esta semana no tiene días de entrenamiento.</p>
							) : (
								<div className={ "grid grid-cols-[repeat(auto-fill,minmax(9.5rem,1fr))] gap-2" }>
									{ routineWeek.routineDays.map( ( day ) => (
										<DayCell
											key={ day.id }
											day={ day }
											hasUnsavedChanges={ isRoutineDayDraftDirty( drafts[ day.id ], day.routines ) }
											href={ buildDayHrefAction( day.id ) }
										/>
									) ) }
								</div>
							) }
						</Card.Content>
					</Card>
				);
			} ) }
		</div>
	);
}
