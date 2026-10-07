"use client";

import Link from "next/link";

import { buildEditRoutineDayHref } from "@/features/role/coach/routine/views/edit-routine-day-page-content.utils";
import { useTrainingRoutines } from "@/features/role/coach/training-routine/hooks/use-training-routines";
import { isRoutineDayDraftDirty } from "@/features/routine/services/routine-day-editor";
import { useRoutineDayDraftStore } from "@/features/routine/stores/use-routine-day-draft-store";

type EditRoutineDayNavigationProps = {
	isCurrentDayDirty: boolean;
	month: number;
	routineDayId: string;
	studentId: string;
	year: number;
};

const TAB_CLASS_NAME = "flex shrink-0 flex-col rounded-xl border px-3 py-2 transition-colors";
const ACTIVE_TAB_CLASS_NAME = "border-accent bg-accent-soft/40";
const INACTIVE_TAB_CLASS_NAME = "border-border bg-surface hover:bg-surface-secondary";

function UnsavedDot() {
	return <span aria-label={ "Cambios sin guardar" } className={ "size-2 rounded-full bg-warning" } role={ "img" }/>;
}

// Las semanas del mes y los dias de la semana que se esta editando, para armar
// el mes entero sin volver a la pantalla de la rutina. Los cambios sin guardar de
// cada dia quedan en su borrador, asi que moverse no pierde nada.
export function EditRoutineDayNavigation( {
											 isCurrentDayDirty,
											 month,
											 routineDayId,
											 studentId,
											 year,
										 }: EditRoutineDayNavigationProps ) {
	const trainingRoutinesQuery = useTrainingRoutines( { month, studentId, year } );
	const drafts = useRoutineDayDraftStore( ( state ) => state.drafts );
	const weeks = trainingRoutinesQuery.data?.routineMonth.weeks ?? [];
	const currentWeek = weeks.find( ( week ) => week.routineDays.some( ( day ) => day.id === routineDayId ) );
	const currentDay = currentWeek?.routineDays.find( ( day ) => day.id === routineDayId );

	if (!currentWeek || !currentDay) return null;

	const isDayDirty = ( day: typeof currentDay ) => (
		day.id === routineDayId ? isCurrentDayDirty : isRoutineDayDraftDirty( drafts[ day.id ], day.routines )
	);
	// Con un borrador abierto cuenta lo del borrador; si no, lo guardado.
	const countExercises = ( day: typeof currentDay ) => drafts[ day.id ]?.length ?? day.routines.length;

	return (
		<div className={ "flex flex-col gap-2" }>
			{ weeks.length > 1 ? (
				<nav aria-label={ "Semanas del mes" } className={ "flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" }>
					{ weeks.map( ( week ) => {
						const isCurrent = week.id === currentWeek.id;
						// Al cambiar de semana se mantiene el mismo dia, que es lo que se viene cargando.
						const targetDay = week.routineDays.find( ( day ) => day.dayNumber === currentDay.dayNumber )
							?? week.routineDays[ 0 ];
						const loadedDays = week.routineDays.filter( ( day ) => countExercises( day ) > 0 ).length;
						const hasUnsavedDays = week.routineDays.some( isDayDirty );
						const className = `${ TAB_CLASS_NAME } min-w-28 ${ isCurrent ? ACTIVE_TAB_CLASS_NAME : INACTIVE_TAB_CLASS_NAME }`;
						const content = (
							<>
								<span className={ "flex items-center gap-2 text-sm font-semibold text-foreground" }>
									Semana { week.week }
									{ hasUnsavedDays ? <UnsavedDot/> : null }
								</span>
								<span className={ "text-xs text-muted" }>
									{ loadedDays } de { week.routineDays.length } { week.routineDays.length === 1 ? "día" : "días" }
								</span>
							</>
						);

						return targetDay ? (
							<Link
								key={ week.id }
								aria-current={ isCurrent ? "true" : undefined }
								className={ className }
								href={ buildEditRoutineDayHref( targetDay.id, studentId, month, year ) }
							>
								{ content }
							</Link>
						) : (
							<div key={ week.id } className={ `${ className } opacity-60` }>{ content }</div>
						);
					} ) }
				</nav>
			) : null }

			{ currentWeek.routineDays.length > 1 ? (
				<nav aria-label={ `Días de la semana ${ currentWeek.week }` } className={ "flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" }>
					{ currentWeek.routineDays.map( ( day ) => {
						const isCurrent = day.id === routineDayId;
						const exercisesCount = countExercises( day );

						return (
							<Link
								key={ day.id }
								aria-current={ isCurrent ? "page" : undefined }
								className={ `${ TAB_CLASS_NAME } min-w-24 ${ isCurrent ? ACTIVE_TAB_CLASS_NAME : INACTIVE_TAB_CLASS_NAME }` }
								href={ buildEditRoutineDayHref( day.id, studentId, month, year ) }
							>
								<span className={ "flex items-center gap-2 text-sm font-semibold text-foreground" }>
									Día { day.dayNumber }
									{ isDayDirty( day ) ? <UnsavedDot/> : null }
								</span>
								<span className={ "text-xs text-muted" }>
									{ isCurrent
										? "Editando"
										: `${ exercisesCount } ${ exercisesCount === 1 ? "ejercicio" : "ejercicios" }` }
								</span>
							</Link>
						);
					} ) }
				</nav>
			) : null }
		</div>
	);
}
