import { Button } from "@heroui/react";
import { Trash2 } from "lucide-react";

import { formatBodyPart } from "@/features/exercises/services/exercise-form";

import type { DraftVariantItem } from "./exercise-variants-sheet.types";

type ExerciseVariantRowProps = {
	isRemoveDisabled: boolean;
	onRemove: ( variantExerciseId: string ) => void;
	variant: DraftVariantItem;
};

export function ExerciseVariantRow( {
	isRemoveDisabled,
	onRemove,
	variant,
}: ExerciseVariantRowProps ) {
	return (
		<div className={ "flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-secondary px-4 py-3" }>
			<div className={ "min-w-0" }>
				<p className={ "truncate text-sm font-medium text-foreground" }>{ variant.exercise.name }</p>
				<p className={ "truncate text-xs text-muted" }>
					{ formatBodyPart( variant.exercise.bodyPart ) }
					{ variant.exercise.active ? " · Activo" : " · Inactivo" }
				</p>
			</div>
			<Button
				isIconOnly
				aria-label={ `Eliminar variante ${ variant.exercise.name }` }
				isDisabled={ isRemoveDisabled }
				size={ "sm" }
				variant={ "ghost" }
				onPress={ () => onRemove( variant.exercise.id ) }
			>
				<Trash2 className={ "size-4 text-danger" }/>
			</Button>
		</div>
	);
}
