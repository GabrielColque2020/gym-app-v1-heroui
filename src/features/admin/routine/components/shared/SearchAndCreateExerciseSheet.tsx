"use client";

import type { ExerciseListItem } from "@/features/admin/exercises/actions/get-exercises";

import { useEffect, useRef, useState } from "react";
import { Alert, Button, Description, Input, Label, ListBox, Select, Separator, Spinner, TextField, toast } from "@heroui/react";
import { Sheet } from "@heroui-pro/react";
import { Plus } from "@gravity-ui/icons";

import { ListPagination } from "@/components/common";
import { ExerciseSheet } from "@/features/admin/exercises/components/shared/ExerciseSheet";
import { useRoutineDayExerciseCatalog } from "@/features/admin/routine/hooks/useRoutineDayExerciseCatalog";
import {
	ALL_BODY_PARTS,
	type BodyPartFilter,
	BODY_PART_OPTIONS,
	formatBodyPart,
} from "@/features/admin/exercises/services/exercise-form";
import { FeatureSheetLayout } from "@/features/shared/components/FeatureSheetLayout";
import { useResponsiveSheetPlacement } from "@/features/shared/hooks/useResponsiveSheetPlacement";

type AddExercisePickerButtonProps = {
	onPress: () => void;
};

function AddExercisePickerButton( { onPress }: AddExercisePickerButtonProps ) {
	return (
		<Button
			variant={ "ghost" }
			className={ "h-9 shrink-0 border border-dashed border-accent/50 bg-surface px-3 text-accent" }
			onPress={ onPress }
		>
			<Plus className={ "size-4" }/>
			Agregar ejercicio
		</Button>
	);
}

type AddExercisePickerSheetContentProps = {
	addedExerciseIds: Set<string>;
	onAddExercise: ( exercise: ExerciseListItem, order: number ) => void;
	suggestedOrder: number;
};

export function SearchAndCreateExerciseSheet( {
												  addedExerciseIds,
												  onAddExercise,
												  suggestedOrder,
											  }: AddExercisePickerSheetContentProps ) {
	const placement = useResponsiveSheetPlacement();
	const [ isPickerOpen, setIsPickerOpen ] = useState( false );
	const [ isCreateSheetOpen, setIsCreateSheetOpen ] = useState( false );
	const [ orderValue, setOrderValue ] = useState( String( suggestedOrder ) );
	const {
		bodyPartFilter,
		changePage,
		debouncedSearchValue,
		exercisesQuery,
		filteredExercises,
		pagination,
		searchValue,
		selectedExerciseId,
		syncCreatedExercise,
		updateBodyPartFilter,
		updateSearchValue,
	} = useRoutineDayExerciseCatalog();
	const addButtonRefs = useRef( new Map<string, HTMLButtonElement>() );

	useEffect( () => {
		if (!selectedExerciseId || !isPickerOpen) return;

		const button = addButtonRefs.current.get( selectedExerciseId );

		button?.focus();
	}, [ isPickerOpen, pagination.currentPage, selectedExerciseId ] );

	function registerAddButtonRef( exerciseId: string, element: HTMLButtonElement | null ) {
		if (element) {
			addButtonRefs.current.set( exerciseId, element );

			return;
		}

		addButtonRefs.current.delete( exerciseId );
	}

	function handleCreatedExercise( exercise: ExerciseListItem ) {
		syncCreatedExercise( exercise );
		setOrderValue( String( suggestedOrder ) );
		setIsCreateSheetOpen( false );
		setIsPickerOpen( true );
	}

	function handleOpenCreateSheet() {
		setIsPickerOpen( false );
		setIsCreateSheetOpen( true );
	}

	function handleAddClick( exercise: ExerciseListItem ) {
		const parsedOrder = Number( orderValue );

		if (!Number.isInteger( parsedOrder ) || parsedOrder < 1) {
			toast.danger( "Orden invalido", {
				description: "Ingresa un orden entero mayor o igual a 1.",
			} );

			return;
		}

		if (addedExerciseIds.has( exercise.id )) {
			toast.danger( "Ejercicio duplicado", {
				description: "Ese ejercicio ya esta cargado en el borrador del dia.",
			} );

			return;
		}

		onAddExercise( exercise, parsedOrder );
		setIsPickerOpen( false );
	}

	const isSearching = searchValue !== debouncedSearchValue;

	return (
		<>
			<FeatureSheetLayout
				isOpen={ isPickerOpen }
				placement={ placement }
				trigger={ <AddExercisePickerButton onPress={ () => setOrderValue( String( suggestedOrder ) ) }/> }
				onOpenChange={ setIsPickerOpen }
			>
				<Sheet.Header className={ "border-default-100 relative border-b px-6 pb-5 pt-5" }>
					<div className={ "flex min-w-0 items-start gap-3 pe-10" }>
						<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
							<Plus className={ "size-5" }/>
						</div>
						<div className={ "min-w-0 flex-1" }>
							<Sheet.Heading>Agregar ejercicio</Sheet.Heading>
							<Description className={ "mt-1 text-sm" }>
								Busca en el catalogo activo y agregalo al borrador del dia.
							</Description>
						</div>
					</div>
				</Sheet.Header>

				<Sheet.Body className={ "min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-5" }>
					<TextField name={ "search-exercise" }>
						<Label>Buscar ejercicio</Label>
						<Input
							aria-label={ "Buscar ejercicio" }
							autoComplete={ "off" }
							placeholder={ "Buscar ejercicio..." }
							value={ searchValue }
							onChange={ ( event ) => updateSearchValue( event.target.value ) }
						/>
					</TextField>

					<Select
						name={ "body-part-filter" }
						placeholder={ "Todos los grupos musculares" }
						value={ bodyPartFilter }
						onChange={ ( value ) => updateBodyPartFilter( String( value ?? ALL_BODY_PARTS ) as BodyPartFilter ) }
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

					<TextField name={ "exercise-order" } value={ orderValue } onChange={ setOrderValue }>
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
									<Alert.Description>{ exercisesQuery.error.message }</Alert.Description>
								</Alert.Content>
							</Alert>
						) : null }

						{ !exercisesQuery.isLoading && !exercisesQuery.isError && filteredExercises.length === 0 ? (
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

						{ !exercisesQuery.isLoading && !exercisesQuery.isError && pagination.paginatedItems.length > 0 ? (
							<div className={ "space-y-3" }>
								<div className={ "max-h-96 space-y-2 overflow-y-auto pr-1" }>
									{ pagination.paginatedItems.map( ( exercise ) => {
										const alreadyAdded = addedExerciseIds.has( exercise.id );
										const isSelected = selectedExerciseId === exercise.id;

										return (
											<div
												key={ exercise.id }
												className={
													`flex items-center justify-between gap-3 rounded-xl border p-3 transition-colors ${
														isSelected
															? "border-accent bg-accent-soft/40"
															: "border-border bg-surface-secondary"
													}`
												}
											>
												<div className={ "min-w-0" }>
													<p className={ "truncate text-sm font-medium text-foreground" }>
														{ exercise.name }
													</p>
													<p className={ "text-xs text-muted" }>
														{ formatBodyPart( exercise.bodyPart ) }
													</p>
												</div>
												<Button
													ref={ ( element ) => registerAddButtonRef( exercise.id, element ) }
													aria-label={ alreadyAdded ? `${ exercise.name } ya agregado` : `Agregar ${ exercise.name } al borrador` }
													className={ "shrink-0 bg-accent text-accent-foreground" }
													isDisabled={ alreadyAdded }
													size={ "sm" }
													onPress={ () => handleAddClick( exercise ) }
												>
													{ alreadyAdded ? "Agregado" : "Agregar" }
												</Button>
											</div>
										);
									} ) }
								</div>

								<ListPagination
									currentPage={ pagination.currentPage }
									itemLabel={ "ejercicios" }
									mode={ "compact" }
									onPageChange={ changePage }
									showingFrom={ pagination.showingFrom }
									showingTo={ pagination.showingTo }
									totalItems={ pagination.totalItems }
									totalPages={ pagination.totalPages }
								/>
							</div>
						) : null }
					</div>

					<Separator/>

					<div className={ "rounded-xl border border-dashed border-border bg-surface-secondary px-4 py-4 mb-20 sm:mb-0" }>
						<p className={ "text-sm font-semibold text-foreground" }>No encontras el ejercicio?</p>
						<p className={ "mt-1 text-sm text-muted" }>
							Crea una nueva entrada en el catalogo y vuelve a sumarla al borrador.
						</p>
						<div className={ "pt-3" }>
							<Button
								aria-label={ "Crear nuevo ejercicio" }
								className={ "w-full sm:w-auto" }
								variant={ "secondary" }
								onPress={ handleOpenCreateSheet }
							>
								Crear nuevo ejercicio
							</Button>
						</div>
					</div>
				</Sheet.Body>
			</FeatureSheetLayout>

			<ExerciseSheet
				hideTrigger
				isOpen={ isCreateSheetOpen }
				mode={ "create" }
				onOpenChange={ setIsCreateSheetOpen }
				onSuccess={ handleCreatedExercise }
				placement={ placement }
			/>
		</>
	);
}
