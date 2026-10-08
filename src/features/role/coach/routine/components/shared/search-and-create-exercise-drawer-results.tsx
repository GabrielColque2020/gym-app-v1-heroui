import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import type { RoutineCatalogExercise } from "@/features/routine/hooks/use-routine-day-exercise-catalog";

import { Alert, Button, Spinner } from "@heroui/react";
import { Plus } from "lucide-react";

import { SearchAndCreateExerciseDrawerItem } from "@/features/role/coach/routine/components/shared/search-and-create-exercise-drawer-item";

type SearchAndCreateExerciseDrawerResultsProps = {
	addedExerciseIds: Set<string>;
	exercises: RoutineCatalogExercise[];
	exercisesQuery: {
		error: { message: string } | null;
		isError: boolean;
		isLoading: boolean;
	};
	isSearching: boolean;
	onAddExerciseAction: ( exercise: ExerciseListItem ) => void;
	// Abre el formulario para crear un ejercicio que no esta en el catalogo.
	onCreateExerciseAction: () => void;
	onRegisterAddButtonRef: ( exerciseId: string, element: HTMLButtonElement | null ) => void;
	// Lo que se esta buscando, para nombrarlo cuando no hay resultados.
	searchValue: string;
	selectedExerciseId: string | null;
};

export function SearchAndCreateExerciseDrawerResults( {
	addedExerciseIds,
	exercises,
	exercisesQuery,
	isSearching,
	onAddExerciseAction,
	onCreateExerciseAction,
	onRegisterAddButtonRef,
	selectedExerciseId,
	searchValue,
}: SearchAndCreateExerciseDrawerResultsProps ) {
	const searchedName = searchValue.trim();

	return (
		<div className={ "space-y-2 sm:space-y-3" }>
			<div className={ "flex items-center justify-between gap-3" }>
				<p className={ "text-sm font-medium text-foreground" }>Catálogo activo</p>
				<div className={ "flex items-center gap-2" }>
					{ isSearching ? (
						<div className={ "flex items-center gap-2 text-xs text-muted" } role={ "status" }>
							<Spinner size={ "sm" }/>
							Buscando...
						</div>
					) : null }
					{ /* Siempre a la vista, arriba de la lista: antes la unica forma de
					     crear un ejercicio estaba al final, despues de todos los resultados. */ }
					<Button size={ "sm" } variant={ "secondary" } onPress={ onCreateExerciseAction }>
						<Plus className={ "size-4" }/>
						Crear ejercicio
					</Button>
				</div>
			</div>

			{ exercisesQuery.isLoading ? (
				<div className={ "flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-secondary p-4 text-sm text-muted" }>
					<Spinner size={ "sm" }/>
					Cargando ejercicios
				</div>
			) : null }

			{ exercisesQuery.isError ? (
				<Alert className={ "border border-danger/20" } status={ "danger" }>
					<Alert.Content>
						<Alert.Title>Error al cargar ejercicios</Alert.Title>
						<Alert.Description>{ exercisesQuery.error?.message ?? "Error al cargar ejercicios" }</Alert.Description>
					</Alert.Content>
				</Alert>
			) : null }

			{ !exercisesQuery.isLoading && !exercisesQuery.isError && exercises.length === 0 ? (
				<div
					className={ "rounded-xl border border-dashed border-border bg-surface-secondary px-4 py-8 text-center" }
					role={ "status" }
				>
					<p className={ "text-sm font-medium text-foreground" }>
						{ searchedName ? `No encontramos "${ searchedName }"` : "No encontramos ejercicios" }
					</p>
					<p className={ "mt-1 text-sm text-muted" }>
						Probá con otro nombre o cambiá el grupo muscular. Si no está en el catálogo, podés crearlo ahora.
					</p>
					<Button className={ "mt-3" } onPress={ onCreateExerciseAction }>
						<Plus className={ "size-4" }/>
						Crear nuevo ejercicio
					</Button>
				</div>
			) : null }

			{ !exercisesQuery.isLoading && !exercisesQuery.isError && exercises.length > 0 ? (
				<div className={ "space-y-2" }>
					{ exercises.map( ( exercise ) => (
						<SearchAndCreateExerciseDrawerItem
							key={ exercise.id }
							alreadyAdded={ addedExerciseIds.has( exercise.id ) }
							exercise={ exercise }
							isSelected={ selectedExerciseId === exercise.id }
								onAddExerciseAction={ onAddExerciseAction }
							onRegisterAddButtonRef={ onRegisterAddButtonRef }
						/>
					) ) }
				</div>
			) : null }
		</div>
	);
}
