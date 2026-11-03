"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { CalendarRange, ChevronDown } from "lucide-react";

import { RoutineDayChecklist, type RoutineDayChecklistItem } from "@/features/role/coach/routine/components/shared/routine-day-checklist";

type ExerciseVariantsOtherDaysProps = {
	isDisabled: boolean;
	// Los otros dias de la rutina con el mismo ejercicio.
	items: RoutineDayChecklistItem[];
	// Devuelve si se pudo, para dejar la seccion plegada solo en ese caso.
	onApplyAction: ( dayIds: string[] ) => Promise<boolean>;
};

function pluralDays( count: number ) {
	return `${ count } ${ count === 1 ? "día" : "días" }`;
}

function getSelectableIds( items: RoutineDayChecklistItem[] ) {
	return items.filter( ( item ) => !item.isUnavailable ).map( ( item ) => item.id );
}

// "Aplicar también en otros días", debajo de las variantes: deja estas mismas
// en el ejercicio de los dias marcados. No va solo con cada cambio, como las de
// este dia: los otros pueden tener variantes distintas a proposito, y se pisan
// recien cuando el coach lo pide. Vienen marcados todos: lo comun es que el
// ejercicio se repita igual en cada semana.
export function ExerciseVariantsOtherDays( { isDisabled, items, onApplyAction }: ExerciseVariantsOtherDaysProps ) {
	const [ isOpen, setIsOpen ] = useState( false );
	const [ selectedIds, setSelectedIds ] = useState( () => new Set( getSelectableIds( items ) ) );
	const [ isPending, setIsPending ] = useState( false );
	const selectableIds = getSelectableIds( items );
	const selectedCount = selectableIds.filter( ( id ) => selectedIds.has( id ) ).length;
	const areAllSelected = selectedCount === selectableIds.length;

	function toggle( dayId: string, isSelected: boolean ) {
		setSelectedIds( ( current ) => {
			const next = new Set( current );

			if (isSelected) next.add( dayId );
			else next.delete( dayId );

			return next;
		} );
	}

	async function apply() {
		if (selectedCount === 0 || isPending) return;

		setIsPending( true );

		try {
			if (await onApplyAction( selectableIds.filter( ( id ) => selectedIds.has( id ) ) )) setIsOpen( false );
		} finally {
			setIsPending( false );
		}
	}

	return (
		<div className={ "rounded-xl border border-border bg-surface-secondary" }>
			<button
				aria-expanded={ isOpen }
				className={ "flex w-full cursor-pointer items-center gap-3 rounded-xl p-3 text-start focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent" }
				type={ "button" }
				onClick={ () => setIsOpen( ( current ) => !current ) }
			>
				<CalendarRange aria-hidden className={ "size-4 shrink-0 text-muted" }/>
				<span className={ "min-w-0 flex-1" }>
					<span className={ "block text-sm font-medium text-foreground" }>Aplicar también en otros días</span>
					<span className={ "block text-xs text-muted" }>
						{ `Este ejercicio está en ${ pluralDays( items.length ) } más de la rutina` }
					</span>
				</span>
				<ChevronDown aria-hidden className={ `size-4 shrink-0 text-muted transition-transform ${ isOpen ? "rotate-180" : "" }` }/>
			</button>

			{ isOpen ? (
				<div className={ "space-y-3 border-t border-border p-3" }>
					<div className={ "flex items-start justify-between gap-3" }>
						<p className={ "min-w-0 text-sm text-muted" }>
							Quedan las mismas variantes que acá, en lugar de las que tenga cada día.
						</p>
						{ selectableIds.length > 1 ? (
							<Button
								className={ "shrink-0" }
								isDisabled={ isPending }
								size={ "sm" }
								variant={ "ghost" }
								onPress={ () => setSelectedIds( new Set( areAllSelected ? [] : selectableIds ) ) }
							>
								{ areAllSelected ? "Desmarcar todos" : "Marcar todos" }
							</Button>
						) : null }
					</div>
					<RoutineDayChecklist
						isDisabled={ isPending }
						items={ items }
						selectedIds={ selectedIds }
						onToggleAction={ toggle }
					/>
					<Button
						className={ "w-full bg-accent text-accent-foreground" }
						isDisabled={ isDisabled || selectedCount === 0 }
						isPending={ isPending }
						onPress={ () => void apply() }
					>
						{ selectedCount === 0 ? "Marcá al menos un día" : `Aplicar en ${ pluralDays( selectedCount ) } más` }
					</Button>
				</div>
			) : null }
		</div>
	);
}
