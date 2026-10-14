"use client";

import type {
	CoachTrainingRoutine,
	CoachTrainingRoutineDay,
} from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";

import type { ReactNode } from "react";
import { useMemo } from "react";

import Link from "next/link";
import { Card } from "@heroui/react";
import { CheckCircle2, Pencil, Plus } from "lucide-react";

import { isRoutineDayDraftDirty } from "@/features/routine/services/routine-day-editor";
import { useRoutineDayDraftStore } from "@/features/routine/stores/use-routine-day-draft-store";
import { summarizeRoutineMonth } from "@/features/training-routine/services/next-routine-day";
import { getTrainingRoutineDayTitle } from "@/features/training-routine/services/training-routine-day-formatters";

type CoachTrainingRoutineMonthGridProps = {
	// Arma el enlace al editor de un dia.
	buildDayHrefAction: ( routineDayId: string ) => string;
	// Accion del encabezado de cada semana (por ejemplo, repetirla en las demas).
	renderWeekAction?: ( routineWeek: CoachTrainingRoutine ) => ReactNode;
	routineWeeks: CoachTrainingRoutine[];
	// El mes de un estudiante (no una plantilla): resume cuanto cumplio y marca
	// los dias que salteo o dejo a medias.
	showStudentProgress?: boolean;
};

// Como va el estudiante con este dia, mirado desde el dia mas avanzado que entreno.
type DayProgress = "skipped" | "unfinished" | null;

type DayCellProps = {
	day: CoachTrainingRoutineDay;
	hasUnsavedChanges: boolean;
	href: string;
	progress: DayProgress;
};

function DayCell( { day, hasUnsavedChanges, href, progress }: DayCellProps ) {
	const isEmpty = day.routines.length === 0;

	return (
		<Link
			aria-label={ isEmpty ? `Cargar ejercicios del día ${ day.dayNumber }` : `Editar día ${ day.dayNumber }` }
			className={
				`flex min-h-24 flex-col gap-1.5 rounded-xl border p-3 transition-colors hover:border-accent ${
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
					{ /* El estudiante ya termino este dia, lo salteo, lo dejo a medias (y ya
					     siguio con otro) o lo esta haciendo. */ }
					{ day.isFinalized ? (
						<CheckCircle2 aria-label={ "Realizado por el estudiante" } className={ "size-4 text-success" }/>
					) : progress === "skipped" ? (
						<span className={ "rounded-full bg-warning/15 px-2 py-0.5 text-[11px] font-medium text-warning" }>
							Salteado
						</span>
					) : progress === "unfinished" ? (
						<span className={ "rounded-full bg-warning/15 px-2 py-0.5 text-[11px] font-medium text-warning" }>
							Sin terminar
						</span>
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
					{ /* Solo el total: el detalle de cada ejercicio hacia la tarjeta larga y
					     se cortaba igual. Para verlo esta el editor del dia. */ }
					<p className={ "text-xs text-muted" }>
						{ day.routines.length } { day.routines.length === 1 ? "ejercicio" : "ejercicios" }
					</p>
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
												  showStudentProgress = false,
											  }: CoachTrainingRoutineMonthGridProps ) {
	// Los borradores viven en este navegador: un dia editado y no guardado se avisa aca.
	const drafts = useRoutineDayDraftStore( ( state ) => state.drafts );
	// Con el mismo criterio que la proxima sesion del estudiante: lo que esta
	// adelante del dia mas avanzado todavia no le toca.
	const monthProgress = useMemo( () => {
		if (!showStudentProgress) return null;

		const days = routineWeeks.flatMap( ( week ) => week.routineDays );
		const summary = summarizeRoutineMonth( days.map( ( day ) => ( {
			exerciseCount: day.routines.length,
			hasProgress: day.loadedSetCount > 0,
			isFinalized: day.isFinalized,
		} ) ) );
		const progressByDayId = new Map<string, DayProgress>();

		days.forEach( ( day, index ) => {
			if (summary.skippedIndexes.has( index )) progressByDayId.set( day.id, "skipped" );
			if (summary.unfinishedIndexes.has( index )) progressByDayId.set( day.id, "unfinished" );
		} );

		return { progressByDayId, summary };
	}, [ routineWeeks, showStudentProgress ] );
	const skippedCount = monthProgress?.summary.skippedIndexes.size ?? 0;
	const unfinishedCount = monthProgress?.summary.unfinishedIndexes.size ?? 0;
	const hasAlerts = skippedCount > 0 || unfinishedCount > 0;
	const summaryLabel = monthProgress && monthProgress.summary.totalCount > 0
		? [
			`${ monthProgress.summary.doneCount } de ${ monthProgress.summary.totalCount } ${ monthProgress.summary.totalCount === 1 ? "día hecho" : "días hechos" }`,
			skippedCount > 0 ? `${ skippedCount } ${ skippedCount === 1 ? "salteado" : "salteados" }` : null,
			unfinishedCount > 0 ? `${ unfinishedCount } sin terminar` : null,
		].filter( Boolean ).join( " · " )
		: null;

	return (
		<div className={ "flex flex-col gap-3" }>
			{ summaryLabel ? (
				<p className={ `rounded-xl border px-3 py-2 text-sm font-medium text-foreground ${ hasAlerts ? "border-warning/20 bg-warning/10" : "border-border bg-surface" }` } role={ "status" }>
					{ summaryLabel }
				</p>
			) : null }
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
											progress={ monthProgress?.progressByDayId.get( day.id ) ?? null }
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
