"use client";

import Link from "next/link";

import { useTrainingRoutines } from "@/features/role/coach/training-routine/hooks/use-training-routines";
import { buildEditRoutineDayHref } from "@/features/role/coach/routine/views/edit-routine-day-page-content.utils";
import { isRoutineDayDraftDirty } from "@/features/routine/services/routine-day-editor";
import { useRoutineDayDraftStore } from "@/features/routine/stores/use-routine-day-draft-store";

type EditRoutineDayNavigationProps = {
	isCurrentDayDirty: boolean;
	month: number;
	routineDayId: string;
	studentId: string;
	year: number;
};

// Los dias de la semana que se esta editando, para pasar de uno a otro sin
// volver a la pantalla de la rutina. Los cambios sin guardar de cada dia quedan
// en su borrador, asi que cambiar de dia no pierde nada.
export function EditRoutineDayNavigation( {
											 isCurrentDayDirty,
											 month,
											 routineDayId,
											 studentId,
											 year,
										 }: EditRoutineDayNavigationProps ) {
	const trainingRoutinesQuery = useTrainingRoutines( { month, studentId, year } );
	const drafts = useRoutineDayDraftStore( ( state ) => state.drafts );
	const week = trainingRoutinesQuery.data?.routineMonth.weeks.find(
		( candidate ) => candidate.routineDays.some( ( day ) => day.id === routineDayId ),
	);

	if (!week || week.routineDays.length < 2) return null;

	return (
		<nav aria-label={ `Días de ${ week.name }` } className={ "flex gap-2 overflow-x-auto pb-1" }>
			{ week.routineDays.map( ( day ) => {
				const isCurrent = day.id === routineDayId;
				const draft = drafts[ day.id ];
				const isDirty = isCurrent
					? isCurrentDayDirty
					: isRoutineDayDraftDirty( draft, day.routines );
				const exercisesCount = isCurrent || !draft ? day.routines.length : draft.length;

				return (
					<Link
						key={ day.id }
						aria-current={ isCurrent ? "page" : undefined }
						className={
							`flex min-w-24 shrink-0 flex-col rounded-xl border px-3 py-2 transition-colors ${
								isCurrent
									? "border-accent bg-accent-soft/40"
									: "border-border bg-surface hover:bg-surface-secondary"
							}`
						}
						href={ buildEditRoutineDayHref( day.id, studentId, month, year ) }
					>
						<span className={ "flex items-center gap-2 text-sm font-semibold text-foreground" }>
							Día { day.dayNumber }
							{ isDirty ? (
								<span aria-label={ "Cambios sin guardar" } className={ "size-2 rounded-full bg-warning" } role={ "img" }/>
							) : null }
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
	);
}
