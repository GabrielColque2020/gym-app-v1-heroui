"use client";

import { useEffect, useRef } from "react";

import { Check } from "lucide-react";

import type { Exercise } from "@/features/routine/types/routine-exercise.types";

type RoutineExerciseStripProps = {
	// Posicion del ejercicio a la vista, empezando en 1.
	activeExerciseIndex: number;
	exercises: Exercise[];
	onSelectAction: ( index: number ) => void;
};

function getExerciseName( exercise: Exercise ) {
	return exercise.variantOptions.find( ( variant ) => variant.id === exercise.variantExerciseId )?.name ?? exercise.name;
}

// Todos los ejercicios del dia de un vistazo: cuales ya estan hechos, en cual
// esta el estudiante y un toque para saltar a cualquiera sin pasar uno por uno.
export function RoutineExerciseStrip( {
	activeExerciseIndex,
	exercises,
	onSelectAction,
}: RoutineExerciseStripProps ) {
	const activeRef = useRef<HTMLButtonElement | null>( null );

	// Con muchos ejercicios la tira se desplaza: el actual queda siempre a la vista.
	useEffect( () => {
		activeRef.current?.scrollIntoView( { behavior: "smooth", block: "nearest", inline: "center" } );
	}, [ activeExerciseIndex ] );

	if (exercises.length < 2) return null;

	return (
		<nav aria-label={ "Ejercicios del día" } className={ "-mx-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" }>
			<ol className={ "flex w-max gap-2" }>
				{ exercises.map( ( exercise, index ) => {
					const completedSets = exercise.sets.filter( ( set ) => set.completed ).length;
					const isDone = exercise.sets.length > 0 && completedSets === exercise.sets.length;
					const isActive = index + 1 === activeExerciseIndex;
					const name = getExerciseName( exercise );
					const statusLabel = isDone
						? "hecho"
						: completedSets > 0 ? `${ completedSets } de ${ exercise.sets.length } series` : "sin empezar";

					return (
						<li key={ exercise.id }>
							<button
								ref={ isActive ? activeRef : undefined }
								aria-current={ isActive ? "step" : undefined }
								aria-label={ `Ejercicio ${ index + 1 }: ${ name }, ${ statusLabel }` }
								className={
									`flex max-w-44 items-center gap-2 rounded-full border px-2.5 py-1.5 text-left text-sm transition-colors ${
										isActive
											? "border-accent bg-accent/10 text-foreground"
											: "border-border bg-surface text-muted hover:border-accent"
									}`
								}
								type={ "button" }
								onClick={ () => onSelectAction( index ) }
							>
								<span
									className={
										`flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
											isDone
												? "bg-success text-success-foreground"
												: completedSets > 0
													? "border border-warning text-warning"
													: "border border-border text-muted"
										}`
									}
								>
									{ isDone ? <Check className={ "size-3" }/> : index + 1 }
								</span>
								<span className={ "truncate font-medium" }>{ name }</span>
							</button>
						</li>
					);
				} ) }
			</ol>
		</nav>
	);
}
