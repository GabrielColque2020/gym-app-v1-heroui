import { Button, Chip } from "@heroui/react";

import { AsyncMedia } from "@/components/common";
import { formatBodyPart } from "@/features/exercises/services/exercise-form";
import type { RoutineCatalogExercise } from "@/features/routine/hooks/use-routine-day-exercise-catalog";

type SearchAndCreateExerciseDrawerItemProps = {
	exercise: RoutineCatalogExercise;
	alreadyAdded: boolean;
	isSelected: boolean;
	onAddExerciseAction: ( exercise: RoutineCatalogExercise ) => void;
	onRegisterAddButtonRef: ( exerciseId: string, element: HTMLButtonElement | null ) => void;
};

export function SearchAndCreateExerciseDrawerItem( {
	exercise,
	alreadyAdded,
	isSelected,
	onAddExerciseAction,
	onRegisterAddButtonRef,
}: SearchAndCreateExerciseDrawerItemProps ) {
	// El equipo ayuda a distinguir ejercicios de nombre parecido.
	const details = [ formatBodyPart( exercise.bodyPart ), exercise.equipment ].filter( Boolean ).join( " · " );
	// Hay ejercicios distintos con el mismo nombre: se avisa y se muestra el codigo
	// del catalogo, que junto con la imagen es lo que permite elegir el correcto.
	const duplicateNote = exercise.sameNameCount > 1
		? [
			`Hay ${ exercise.sameNameCount } con este nombre`,
			exercise.catalogCode ? `cód. ${ exercise.catalogCode }` : null,
		].filter( Boolean ).join( " · " )
		: null;

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
					<p className={ "line-clamp-2 text-sm font-medium text-foreground" }>{ exercise.name }</p>
					<div className={ "mt-0.5 flex min-w-0 items-center gap-2" }>
						<p className={ "truncate text-xs text-muted" }>{ details }</p>
						{ exercise.recentRank !== null ? (
							<Chip className={ "shrink-0" } color={ "accent" } size={ "sm" } variant={ "soft" }>
								Reciente
							</Chip>
						) : null }
					</div>
					{ duplicateNote ? (
						<p className={ "mt-0.5 text-xs font-medium text-warning" }>{ duplicateNote }</p>
					) : null }
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
