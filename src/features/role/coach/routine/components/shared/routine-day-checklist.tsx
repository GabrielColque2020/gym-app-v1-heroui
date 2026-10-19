"use client";

import { Checkbox } from "@heroui/react";

export type RoutineDayChecklistItem = {
	dayNumber: number;
	// Lo que se ve debajo del dia: series y repeticiones, o por que no se puede marcar.
	detail: string | null;
	id: string;
	// Marcado y sin poder cambiarse: el dia desde el que se hace el cambio.
	isCurrent?: boolean;
	// Sin marcar y sin poder cambiarse (ya lo tiene, o lo termino el estudiante).
	isUnavailable?: boolean;
	week: number;
};

type RoutineDayChecklistProps = {
	isDisabled?: boolean;
	items: RoutineDayChecklistItem[];
	onToggleAction: ( dayId: string, isSelected: boolean ) => void;
	selectedIds: ReadonlySet<string>;
};

function groupByWeek( items: RoutineDayChecklistItem[] ) {
	const weeks = new Map<number, RoutineDayChecklistItem[]>();

	for (const item of [ ...items ].sort( ( left, right ) => left.week - right.week || left.dayNumber - right.dayNumber )) {
		weeks.set( item.week, [ ...( weeks.get( item.week ) ?? [] ), item ] );
	}

	return [ ...weeks.entries() ];
}

// Los dias de la rutina agrupados por semana, para elegir en cuales aplicar un
// cambio. La usan "Cambiar" y "Agregar ejercicio".
export function RoutineDayChecklist( { isDisabled = false, items, onToggleAction, selectedIds }: RoutineDayChecklistProps ) {
	return (
		<div className={ "space-y-3" }>
			{ groupByWeek( items ).map( ( [ week, weekItems ] ) => (
				<div key={ week } className={ "space-y-1.5" }>
					<p className={ "text-xs font-semibold uppercase tracking-wide text-muted" }>Semana { week }</p>
					<div className={ "grid grid-cols-1 gap-2 sm:grid-cols-2" }>
						{ weekItems.map( ( item ) => (
							<Checkbox
								key={ item.id }
								aria-label={ `Semana ${ item.week }, Día ${ item.dayNumber }` }
								className={ "w-full" }
								isDisabled={ isDisabled || item.isUnavailable || item.isCurrent }
								isSelected={ item.isCurrent || ( !item.isUnavailable && selectedIds.has( item.id ) ) }
								onChange={ ( isSelected ) => onToggleAction( item.id, isSelected ) }
							>
								{ /* La casilla va adentro de Content, que es la zona que se toca:
								     afuera se veia pero no respondia. */ }
								<Checkbox.Content className={ "flex w-full cursor-pointer items-center gap-3 rounded-xl border border-border bg-surface-secondary px-3 py-2" }>
									<Checkbox.Control>
										<Checkbox.Indicator/>
									</Checkbox.Control>
									<span className={ "min-w-0 flex-1" }>
										<span className={ "block text-sm font-medium text-foreground" }>
											Día { item.dayNumber }{ item.isCurrent ? " · este" : "" }
										</span>
										{ item.detail ? <span className={ "block text-xs text-muted" }>{ item.detail }</span> : null }
									</span>
								</Checkbox.Content>
							</Checkbox>
						) ) }
					</div>
				</div>
			) ) }
		</div>
	);
}
