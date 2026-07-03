import { Plus } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

import { formatBodyPart } from "@/features/exercises/services/exercise-form";

import type { ExerciseVariantsTarget } from "./exercise-variants-sheet.types";

type ExerciseCandidateRowProps = {
	candidate: ExerciseVariantsTarget;
	isDisabled: boolean;
	onAdd: ( candidate: ExerciseVariantsTarget ) => void;
};

export function ExerciseCandidateRow( {
	candidate,
	isDisabled,
	onAdd,
}: ExerciseCandidateRowProps ) {
	return (
		<div className={ "flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-secondary px-4 py-3" }>
			<div className={ "min-w-0" }>
				<p className={ "truncate text-sm font-medium text-foreground" }>{ candidate.name }</p>
				<p className={ "truncate text-xs text-muted" }>
					{ formatBodyPart( candidate.bodyPart ) }
					{ candidate.active ? " · Activo" : " · Inactivo" }
				</p>
			</div>
			<Button
				isDisabled={ isDisabled }
				size={ "sm" }
				variant={ "secondary" }
				onPress={ () => onAdd( candidate ) }
			>
				<Plus className={ "size-4" }/>
				Agregar
			</Button>
		</div>
	);
}
