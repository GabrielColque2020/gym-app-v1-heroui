"use client";

import { Button } from "@heroui/react";
import { ArrowDown, ArrowUp } from "lucide-react";

import { useRoutineDayEditorActions } from "@/features/role/coach/routine/components/shared/routine-day-editor-actions-context";

type RoutineDayExerciseMoveButtonsProps = {
	clientId: string;
	exerciseName: string;
	isFirst: boolean;
	isLast: boolean;
	position: number;
};

// El orden del ejercicio en el dia: su numero, con una flecha arriba y otra
// abajo para moverlo un lugar. Las flechas van pegadas al numero para que se
// entienda que lo cambian; sueltas junto a series y repeticiones parecian
// subir y bajar esos valores.
export function RoutineDayExerciseMoveButtons( {
												   clientId,
												   exerciseName,
												   isFirst,
												   isLast,
												   position,
											   }: RoutineDayExerciseMoveButtonsProps ) {
	const { onMoveExercise } = useRoutineDayEditorActions();

	const positionLabel = (
		<span className={ "w-7 text-center text-sm font-semibold leading-4 text-muted" }>{ position }</span>
	);

	// Con un solo ejercicio no hay nada que reordenar: queda solo el numero.
	if (isFirst && isLast) return positionLabel;

	return (
		<div className={ "flex shrink-0 flex-col items-center" }>
			<Button
				isIconOnly
				aria-label={ `Subir ${ exerciseName } un lugar` }
				className={ "h-6 min-h-6 w-7 min-w-7" }
				isDisabled={ isFirst }
				variant={ "ghost" }
				onPress={ () => onMoveExercise( clientId, -1 ) }
			>
				<ArrowUp className={ "size-3.5" }/>
			</Button>
			{ positionLabel }
			<Button
				isIconOnly
				aria-label={ `Bajar ${ exerciseName } un lugar` }
				className={ "h-6 min-h-6 w-7 min-w-7" }
				isDisabled={ isLast }
				variant={ "ghost" }
				onPress={ () => onMoveExercise( clientId, 1 ) }
			>
				<ArrowDown className={ "size-3.5" }/>
			</Button>
		</div>
	);
}
