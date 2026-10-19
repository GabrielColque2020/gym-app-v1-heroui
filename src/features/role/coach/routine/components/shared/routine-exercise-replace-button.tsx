"use client";

import { ArrowLeftRight } from "lucide-react";

import { useRoutineDayEditorActions } from "@/features/role/coach/routine/components/shared/routine-day-editor-actions-context";

type RoutineExerciseReplaceButtonProps = {
	clientId: string;
	exerciseName: string;
};

// Para corregir un ejercicio cargado por error sin quitarlo y volver a cargar
// series y repeticiones, y sin repetirlo dia por dia en toda la rutina.
export function RoutineExerciseReplaceButton( { clientId, exerciseName }: RoutineExerciseReplaceButtonProps ) {
	const { onRequestReplace } = useRoutineDayEditorActions();

	return (
		<button
			aria-label={ `Cambiar ${ exerciseName } por otro ejercicio` }
			className={ "inline-flex shrink-0 items-center gap-1 rounded-full border border-dashed border-border px-2 py-0.5 text-xs text-muted transition-colors hover:border-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent" }
			type={ "button" }
			onClick={ () => onRequestReplace( clientId ) }
		>
			<ArrowLeftRight aria-hidden className={ "size-3" }/>
			Cambiar
		</button>
	);
}
