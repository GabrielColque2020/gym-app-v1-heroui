"use client";

import { Link2 } from "lucide-react";

import { useRoutineDayEditorActions } from "@/features/role/coach/routine/components/shared/routine-day-editor-actions-context";

type RoutineExerciseVariantsButtonProps = {
	clientId: string;
	exerciseName: string;
	// Las elegidas para un ejercicio que todavia no se guardo en el dia.
	pendingCount: number;
	routineId: string | null;
};

// Las variantes a la vista en la fila: antes solo se llegaba por el menu de tres
// puntos y no se sabia que ejercicio ya tenia alguna. Con variantes muestra
// cuantas; sin variantes queda en gris, para no competir con el nombre.
export function RoutineExerciseVariantsButton( { clientId, exerciseName, pendingCount, routineId }: RoutineExerciseVariantsButtonProps ) {
	const { onRequestVariants, variantCountByRoutineId } = useRoutineDayEditorActions();
	const count = routineId ? variantCountByRoutineId.get( routineId ) ?? 0 : pendingCount;
	const label = count === 0 ? "Variantes" : count === 1 ? "1 variante" : `${ count } variantes`;

	return (
		<button
			aria-label={
				count === 0
					? `Agregar variantes a ${ exerciseName }`
					: `Ver las variantes de ${ exerciseName } (${ count })`
			}
			className={
				`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent ${
					count > 0
						? "bg-accent-soft font-medium text-accent hover:bg-accent-soft/70"
						: "border border-dashed border-border text-muted hover:border-accent hover:text-foreground"
				}`
			}
			type={ "button" }
			onClick={ () => onRequestVariants( clientId ) }
		>
			<Link2 aria-hidden className={ "size-3" }/>
			{ label }
		</button>
	);
}
