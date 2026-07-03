"use client";

import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import { Alert, Input, Label, ListBox, Select, Spinner, TextField } from "@heroui/react";

import { ALL_BODY_PARTS, BODY_PART_OPTIONS, type BodyPartFilter } from "@/features/exercises/services/exercise-form";
import { SearchAndCreateExerciseSheetItem } from "@/features/role/coach/routine/components/shared/search-and-create-exercise-sheet-item";

type SearchAndCreateExerciseSheetFiltersProps = {
	addedExerciseIds: Set<string>;
	bodyPartFilter: BodyPartFilter;
	debouncedSearchValue: string;
	exercisesQuery: {
		isError: boolean;
		isLoading: boolean;
		error: { message: string } | null;
	};
	isSearching: boolean;
	onRegisterAddButtonRef: ( exerciseId: string, element: HTMLButtonElement | null ) => void;
	onBodyPartFilterChange: ( value: BodyPartFilter ) => void;
	onOrderChange: ( value: string ) => void;
	onSearchValueChange: ( value: string ) => void;
	orderValue: string;
	selectedExerciseId: string | null;
	onAddExercise: ( exercise: ExerciseListItem ) => void;
	exercises: ExerciseListItem[];
};

export function SearchAndCreateExerciseSheetFilters( {
	addedExerciseIds,
	bodyPartFilter,
	debouncedSearchValue,
	exercisesQuery,
	isSearching,
	onRegisterAddButtonRef,
	onBodyPartFilterChange,
	onOrderChange,
	onSearchValueChange,
	orderValue,
	selectedExerciseId,
	onAddExercise,
	exercises,
}: SearchAndCreateExerciseSheetFiltersProps ) {
	return (
		<>
			<TextField name={ "search-exercise" }>
				<Label>Buscar ejercicio</Label>
				<Input
					aria-label={ "Buscar ejercicio" }
					autoComplete={ "off" }
					placeholder={ "Buscar ejercicio..." }
					value={ debouncedSearchValue }
					onChange={ ( event ) => onSearchValueChange( event.target.value ) }
				/>
			</TextField>

			<Select
				name={ "body-part-filter" }
				placeholder={ "Todos los grupos musculares" }
				value={ bodyPartFilter }
				onChange={ ( value ) => onBodyPartFilterChange( String( value ?? ALL_BODY_PARTS ) as BodyPartFilter ) }
			>
				<Label>Grupo muscular</Label>
				<Select.Trigger aria-label={ "Filtrar por grupo muscular" }>
					<Select.Value/>
					<Select.Indicator/>
				</Select.Trigger>
				<Select.Popover>
					<ListBox>
						<ListBox.Item id={ ALL_BODY_PARTS } textValue={ "Todos" }>
							Todos
							<ListBox.ItemIndicator/>
						</ListBox.Item>
						{ BODY_PART_OPTIONS.map( ( option ) => (
							<ListBox.Item key={ option.value } id={ option.value } textValue={ option.label }>
								{ option.label }
								<ListBox.ItemIndicator/>
							</ListBox.Item>
						) ) }
					</ListBox>
				</Select.Popover>
			</Select>

			<TextField name={ "exercise-order" } value={ orderValue } onChange={ onOrderChange }>
				<Label>Orden</Label>
				<Input
					aria-label={ "Orden del ejercicio en la rutina" }
					inputMode={ "numeric" }
					placeholder={ "1" }
				/>
			</TextField>

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
					<div className={ "space-y-3" }>
						<div className={ "max-h-96 space-y-2 overflow-y-auto pr-1" }>
							{ exercises.map( ( exercise ) => (
								<SearchAndCreateExerciseSheetItem
									key={ exercise.id }
									alreadyAdded={ addedExerciseIds.has( exercise.id ) }
									exercise={ exercise }
									isSelected={ selectedExerciseId === exercise.id }
									onAddExercise={ onAddExercise }
									onRegisterAddButtonRef={ onRegisterAddButtonRef }
								/>
							) ) }
						</div>
					</div>
				) : null }
			</div>
		</>
	);
}
