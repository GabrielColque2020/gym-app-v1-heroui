import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";

import { Alert, Spinner } from "@heroui/react";

import { SearchAndCreateExerciseSheetItem } from "@/features/role/coach/routine/components/shared/search-and-create-exercise-sheet-item";

type SearchAndCreateExerciseSheetResultsProps = {
	addedExerciseIds: Set<string>;
	exercises: ExerciseListItem[];
	exercisesQuery: {
		error: { message: string } | null;
		isError: boolean;
		isLoading: boolean;
	};
	isSearching: boolean;
	onAddExerciseAction: ( exercise: ExerciseListItem ) => void;
	onRegisterAddButtonRef: ( exerciseId: string, element: HTMLButtonElement | null ) => void;
	selectedExerciseId: string | null;
};

export function SearchAndCreateExerciseSheetResults( {
	addedExerciseIds,
	exercises,
	exercisesQuery,
	isSearching,
	onAddExerciseAction,
	onRegisterAddButtonRef,
	selectedExerciseId,
}: SearchAndCreateExerciseSheetResultsProps ) {
	return (
		<div className={ "space-y-3" }>
			<div className={ "flex items-center justify-between gap-3" }>
				<p className={ "text-sm font-medium text-foreground" }>Catalogo activo</p>
				{ isSearching ? (
					<div className={ "flex items-center gap-2 text-xs text-muted" } role={ "status" }>
						<Spinner size={ "sm" }/>
						Buscando...
					</div>
				) : null }
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
					<p className={ "text-sm font-medium text-foreground" }>No encontramos ejercicios</p>
					<p className={ "mt-1 text-sm text-muted" }>
						Prueba con otro nombre o cambia el grupo muscular.
					</p>
				</div>
			) : null }

			{ !exercisesQuery.isLoading && !exercisesQuery.isError && exercises.length > 0 ? (
				<div className={ "max-h-96 space-y-2 overflow-y-auto pr-1" }>
					{ exercises.map( ( exercise ) => (
						<SearchAndCreateExerciseSheetItem
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
