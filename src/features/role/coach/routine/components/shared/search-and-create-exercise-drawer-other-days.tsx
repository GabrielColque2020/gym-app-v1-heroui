"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { CalendarRange, ChevronDown } from "lucide-react";

import { RoutineDayChecklist, type RoutineDayChecklistItem } from "@/features/role/coach/routine/components/shared/routine-day-checklist";

type SearchAndCreateExerciseDrawerOtherDaysProps = {
	// El mismo dia en las otras semanas: lo que viene marcado.
	defaultIds: string[];
	// Sin series y repeticiones no se agrega en otros dias (quedarian sin
	// completar), pero los dias se pueden marcar igual.
	hasPrescription: boolean;
	items: RoutineDayChecklistItem[];
	onChangeAction: ( ids: Set<string> ) => void;
	selectedIds: ReadonlySet<string>;
};

function joinWithY( values: string[] ) {
	return values.length <= 1 ? values.join( "" ) : `${ values.slice( 0, -1 ).join( ", " ) } y ${ values.at( -1 ) }`;
}

// Lo marcado, en una linea: "Día 1 de Semana 2, 3 y 4" si es el mismo dia, o
// cuantos dias si son distintos.
function summarize( items: RoutineDayChecklistItem[], selectedIds: ReadonlySet<string> ) {
	const selected = items.filter( ( item ) => selectedIds.has( item.id ) );

	if (selected.length === 0) return "Solo en este día";

	const dayNumbers = new Set( selected.map( ( item ) => item.dayNumber ) );

	if (dayNumbers.size === 1) {
		const weeks = selected.map( ( item ) => String( item.week ) );

		return `Día ${ selected[ 0 ].dayNumber } de Semana ${ joinWithY( weeks ) }`;
	}

	return `${ selected.length } días más`;
}

// "Agregar también en otros días", en la pantalla del ejercicio que se agrega.
// Plegado muestra lo marcado en una linea: si no se toca, se agrega tambien en
// el mismo dia de las otras semanas sin ningun paso extra.
export function SearchAndCreateExerciseDrawerOtherDays( {
	defaultIds,
	hasPrescription,
	items,
	onChangeAction,
	selectedIds,
}: SearchAndCreateExerciseDrawerOtherDaysProps ) {
	const [ isOpen, setIsOpen ] = useState( false );
	const hasSelection = items.some( ( item ) => selectedIds.has( item.id ) );

	function toggle( dayId: string, isSelected: boolean ) {
		const next = new Set( selectedIds );

		if (isSelected) next.add( dayId );
		else next.delete( dayId );

		onChangeAction( next );
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
					<span className={ "block text-sm font-medium text-foreground" }>Agregar también en otros días</span>
					<span className={ hasSelection ? "block text-xs font-medium text-accent" : "block text-xs text-muted" }>
						{ summarize( items, selectedIds ) }
					</span>
					{ /* Solo desplegada: plegada, apenas se elige el ejercicio, parecia un
					     campo obligatorio de esta seccion. Que falten series ya lo marca
					     su campo al tocar "Agregar". */ }
					{ isOpen && hasSelection && !hasPrescription ? (
						<span className={ "block text-xs font-medium text-warning" }>
							Cargá series y repeticiones para agregarlo en esos días.
						</span>
					) : null }
				</span>
				<span className={ "shrink-0 text-xs text-muted" }>Elegir días</span>
				<ChevronDown aria-hidden className={ `size-4 shrink-0 text-muted transition-transform ${ isOpen ? "rotate-180" : "" }` }/>
			</button>

			{ isOpen ? (
				<div className={ "space-y-3 border-t border-border p-3" }>
					<div className={ "flex flex-wrap gap-2" }>
						<Button size={ "sm" } variant={ "secondary" } onPress={ () => onChangeAction( new Set() ) }>
							Solo este día
						</Button>
						{ defaultIds.length > 0 ? (
							<Button size={ "sm" } variant={ "secondary" } onPress={ () => onChangeAction( new Set( defaultIds ) ) }>
								Mismo día en todas las semanas
							</Button>
						) : null }
					</div>
					<RoutineDayChecklist
						items={ items }
						selectedIds={ selectedIds }
						onToggleAction={ toggle }
					/>
				</div>
			) : null }
		</div>
	);
}
