"use client";

import { Button } from "@heroui/react";
import { Trash2 } from "lucide-react";

type RoutineExerciseActionsProps = {
	exerciseName: string;
	onDeleteAction: () => void;
};

// Un boton directo y no un menu: desde que las variantes tienen su propio boton
// en la fila, el menu de tres puntos tenia una sola opcion. Quitar es de un
// toque porque se puede deshacer desde el aviso que aparece.
export function RoutineExerciseActions( { exerciseName, onDeleteAction }: RoutineExerciseActionsProps ) {
	return (
		<Button
			isIconOnly
			aria-label={ `Quitar ${ exerciseName } del día` }
			className={ "size-8 shrink-0 text-danger" }
			variant={ "ghost" }
			onPress={ onDeleteAction }
		>
			<Trash2 className={ "size-4" }/>
		</Button>
	);
}
