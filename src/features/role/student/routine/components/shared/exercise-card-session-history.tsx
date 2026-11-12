import { Chip } from "@heroui/react";

import type { ExerciseSessionHistory } from "@/features/routine/types/routine-exercise.types";

type ExerciseCardSessionHistoryProps = {
	history: ExerciseSessionHistory | null;
	isHighlighted?: boolean;
	isCompact?: boolean;
};

function formatSessionDateLabel( date: Date ) {
	return new Intl.DateTimeFormat( "es-AR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	} ).format( date );
}

// Coma decimal, igual que la muestra el campo de peso. Una serie sin peso es un
// ejercicio con el peso del cuerpo: no se muestra "0 kg".
function formatWeightLabel( weight: number | null ) {
	return weight === null ? "sin peso" : `${ weight.toLocaleString( "es-AR" ) } kg`;
}

// De que semana y dia viene la referencia. Se muestra siempre, en blanco, para
// que el estudiante sepa con que sesion se esta comparando.
function formatSessionOriginLabel( history: ExerciseSessionHistory ) {
	return `Semana ${ history.week } · Día ${ history.dayNumber }`;
}

// Cuando la referencia vino de otro dia se aclara aparte: el mismo ejercicio
// puede ir con otra carga en cada dia de la semana.
function SessionOriginLabel( { history }: { history: ExerciseSessionHistory } ) {
	return (
		<span className={ "text-xs font-medium text-foreground" }>
			{ formatSessionOriginLabel( history ) }
			{ history.isFromOtherDay ? <span className={ "text-warning" }>{ " · otro día" }</span> : null }
		</span>
	);
}

export function ExerciseCardSessionHistory( {
												history,
												isHighlighted = false,
												isCompact = false,
											}: ExerciseCardSessionHistoryProps ) {
	if (!history?.sets.length) {
		return (
			<Chip color={ "warning" } size={ "sm" } variant={ "soft" }>
				<Chip.Label>Sin registro anterior</Chip.Label>
			</Chip>
		);
	}

	// En el telefono va en una linea: una etiqueta por serie ocupaba media pantalla.
	if (isCompact) {
		const sets = history.sets.map( ( set ) => ( { reps: set.repsCompleted ?? 0, weight: set.weightUsed } ) );
		const isUniform = sets.every( ( set ) => set.reps === sets[ 0 ].reps && set.weight === sets[ 0 ].weight );
		const summary = isUniform
			? `${ sets.length } × ${ sets[ 0 ].reps } reps · ${ formatWeightLabel( sets[ 0 ].weight ) }`
			: sets.map( ( set ) => `${ set.reps }×${ formatWeightLabel( set.weight ) }` ).join( " · " );

		return (
			<p className={ `text-sm font-normal ${ isHighlighted ? "text-warning" : "text-muted" }` }>
				<span className={ "font-medium text-foreground" }>{ summary }</span>
				{ ` · ${ formatSessionDateLabel( history.date ) }` }
				<span className={ "block" }>
					<SessionOriginLabel history={ history } />
				</span>
			</p>
		);
	}

	const containerClassName = isCompact
		? "flex flex-wrap items-center gap-2"
		: "flex flex-wrap items-center gap-2";
	const chipClassName = isCompact ? undefined : "max-w-full";
	const chipColor = isHighlighted ? "warning" : "default";

	return (
		<div className={ containerClassName }>
			<SessionOriginLabel history={ history } />
			<Chip className={ chipClassName } color={ chipColor } size={ "sm" } variant={ "soft" }>
				<Chip.Label>{ formatSessionDateLabel( history.date ) }</Chip.Label>
			</Chip>
			{ history.sets.map( ( set, index ) => (
				<Chip
					key={ `${ history.date.toISOString() }-${ set.setNumber }-${ index }` }
					className={ chipClassName }
					color={ chipColor }
					size={ "sm" }
					variant={ "soft" }
				>
					<Chip.Label>{ `Serie ${ set.setNumber }: ${ set.repsCompleted ?? 0 } reps · ${ formatWeightLabel( set.weightUsed ) }` }</Chip.Label>
				</Chip>
			) ) }
		</div>
	);
}
