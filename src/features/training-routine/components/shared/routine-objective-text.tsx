"use client";

import { useState } from "react";

type RoutineObjectiveTextProps = {
	label: string;
	objective: string;
};

// Mas largo que esto, o con varios renglones, se muestra recortado con "Ver más":
// las pautas del mes pueden ser varios parrafos y taparian los dias.
const COLLAPSED_MAX_LENGTH = 160;

// El objetivo del mes con sus renglones, como lo escribio el entrenador
// ("Principio del bloque", calentamiento, como progresar...).
export function RoutineObjectiveText( { label, objective }: RoutineObjectiveTextProps ) {
	const [ isExpanded, setIsExpanded ] = useState( false );
	const text = objective.trim();
	const isLong = text.length > COLLAPSED_MAX_LENGTH || text.includes( "\n" );

	return (
		<div className={ "w-full text-sm text-muted" }>
			<p className={ `whitespace-pre-line ${ isLong && !isExpanded ? "line-clamp-2" : "" }` }>
				<span className={ "font-medium text-foreground" }>{ label }:</span> { text }
			</p>
			{ isLong ? (
				<button
					aria-expanded={ isExpanded }
					className={ "mt-1 cursor-pointer text-sm font-medium text-accent focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent" }
					type={ "button" }
					onClick={ () => setIsExpanded( ( current ) => !current ) }
				>
					{ isExpanded ? "Ver menos" : "Ver más" }
				</button>
			) : null }
		</div>
	);
}
