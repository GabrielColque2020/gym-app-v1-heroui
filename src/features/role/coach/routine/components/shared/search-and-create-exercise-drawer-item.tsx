import { Button, Chip } from "@heroui/react";

import { MediaPreviewThumbnail } from "@/components/common/media-preview-thumbnail";
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
				{ /* La miniatura no alcanza para distinguir el movimiento: al pasarle el
				     mouse o tocarla se ve en grande, sin achicar la lista. */ }
				<MediaPreviewThumbnail imageUrl={ exercise.imageUrl } name={ exercise.name } videoUrl={ exercise.videoUrl }/>
				<div className={ "min-w-0" }>
					<p className={ "line-clamp-4 text-sm font-medium text-foreground" }>{ exercise.name }</p>
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
						: `Elegir ${ exercise.name }`
				}
				className={ "shrink-0 bg-accent text-accent-foreground" }
				isDisabled={ alreadyAdded }
				size={ "sm" }
				onPress={ () => onAddExerciseAction( exercise ) }
			>
				{ /* "Elegir" y no "Agregar": lleva a la pantalla del ejercicio, donde se
				     cargan series, repeticiones y variantes, y recien ahi se agrega. */ }
				{ alreadyAdded ? "Agregado" : "Elegir" }
			</Button>
		</div>
	);
}
