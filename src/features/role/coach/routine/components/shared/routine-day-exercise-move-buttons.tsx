"use client";

import { Button } from "@heroui/react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { useRoutineDayEditorActions } from "@/features/role/coach/routine/components/shared/routine-day-editor-actions-context";

type RoutineDayExerciseMoveButtonsProps = {
	clientId: string;
	exerciseName: string;
	isFirst: boolean;
	isLast: boolean;
};

// Subir o bajar un ejercicio sin tener que renumerar a mano.
export function RoutineDayExerciseMoveButtons( {
												   clientId,
												   exerciseName,
												   isFirst,
												   isLast,
											   }: RoutineDayExerciseMoveButtonsProps ) {
	const { onMoveExercise } = useRoutineDayEditorActions();

	return (
		<div className={ "flex shrink-0 items-center" }>
			<Button
				isIconOnly
				aria-label={ `Subir ${ exerciseName }` }
				className={ "size-8" }
				isDisabled={ isFirst }
				variant={ "ghost" }
				onPress={ () => onMoveExercise( clientId, -1 ) }
			>
				<ChevronUp className={ "size-4" }/>
			</Button>
			<Button
				isIconOnly
				aria-label={ `Bajar ${ exerciseName }` }
				className={ "size-8" }
				isDisabled={ isLast }
				variant={ "ghost" }
				onPress={ () => onMoveExercise( clientId, 1 ) }
			>
				<ChevronDown className={ "size-4" }/>
			</Button>
		</div>
	);
}
