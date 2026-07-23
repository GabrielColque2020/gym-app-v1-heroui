import { Button } from "@heroui/react";

import { AsyncMedia } from "@/components/common";
import { formatBodyPart } from "@/features/exercises/services/exercise-form";
import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";

type SearchAndCreateExerciseDrawerItemProps = {
	exercise: ExerciseListItem;
	alreadyAdded: boolean;
	isSelected: boolean;
	onAddExerciseAction: ( exercise: ExerciseListItem ) => void;
	onRegisterAddButtonRef: ( exerciseId: string, element: HTMLButtonElement | null ) => void;
};

export function SearchAndCreateExerciseDrawerItem( {
	exercise,
	alreadyAdded,
	isSelected,
	onAddExerciseAction,
	onRegisterAddButtonRef,
}: SearchAndCreateExerciseDrawerItemProps ) {
	return (
		<div
			className={
				`flex items-center justify-between gap-3 rounded-xl border p-3 transition-colors ${
					isSelected ? "border-accent bg-accent-soft/40" : "border-border bg-surface-secondary"
				}`
			}
		>
			<div className={ "flex min-w-0 items-center gap-3" }>
				<AsyncMedia
					alt={ `Imagen de ${ exercise.name }` }
					className={ "h-14 w-14 shrink-0 rounded-xl border border-border object-cover" }
					emptyLabel={ "Sin imagen" }
					spinnerLabel={ `Cargando imagen de ${ exercise.name }` }
					src={ exercise.imageUrl }
				/>
				<div className={ "min-w-0" }>
					<p className={ "truncate text-sm font-medium text-foreground" }>{ exercise.name }</p>
					<p className={ "truncate text-xs text-muted" }>{ formatBodyPart( exercise.bodyPart ) }</p>
				</div>
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
