import { Button } from "@heroui/react";

import { formatBodyPart } from "@/features/exercises/services/exercise-form";
import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";

type SearchAndCreateExerciseSheetItemProps = {
	exercise: ExerciseListItem;
	alreadyAdded: boolean;
	isSelected: boolean;
	onAddExerciseAction: ( exercise: ExerciseListItem ) => void;
	onRegisterAddButtonRef: ( exerciseId: string, element: HTMLButtonElement | null ) => void;
};

export function SearchAndCreateExerciseSheetItem( {
	exercise,
	alreadyAdded,
	isSelected,
	onAddExerciseAction,
	onRegisterAddButtonRef,
}: SearchAndCreateExerciseSheetItemProps ) {
	return (
		<div
			className={
				`flex items-center justify-between gap-3 rounded-xl border p-3 transition-colors ${
					isSelected ? "border-accent bg-accent-soft/40" : "border-border bg-surface-secondary"
				}`
			}
		>
			<div className={ "min-w-0" }>
				<p className={ "truncate text-sm font-medium text-foreground" }>{ exercise.name }</p>
				<p className={ "text-xs text-muted" }>{ formatBodyPart( exercise.bodyPart ) }</p>
			</div>
			<Button
				ref={ ( element ) => onRegisterAddButtonRef( exercise.id, element ) }
				aria-label={
					alreadyAdded
						? `${ exercise.name } ya agregado`
						: `Agregar ${ exercise.name } al borrador`
				}
				className={ "shrink-0 bg-accent text-accent-foreground" }
				isDisabled={ alreadyAdded }
				size={ "sm" }
				onPress={ () => onAddExerciseAction( exercise ) }
			>
				{ alreadyAdded ? "Agregado" : "Agregar" }
			</Button>
		</div>
	);
}
