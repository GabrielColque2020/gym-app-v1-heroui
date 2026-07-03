"use client";

import { Plus, TrashBin } from "@gravity-ui/icons";
import {
	Alert,
	Button,
	Input,
	Label,
	ListBox,
	Select,
	Separator,
	Spinner,
	TextField,
	toast,
} from "@heroui/react";
import { Sheet } from "@heroui-pro/react";
import { useMemo, useState } from "react";

import { formatBodyPart, ALL_BODY_PARTS, type BodyPartFilter, BODY_PART_OPTIONS } from "@/features/exercises/services/exercise-form";
import {
	useExerciseVariantCandidates,
	useSaveExerciseVariants,
} from "@/features/exercises/hooks/use-exercise-variants";
import { useDebouncedValue } from "@/features/shared/hooks/use-debounced-value";
import { EMPTY_ARRAY, SEARCH_DEBOUNCE_MS, type DraftVariantItem, type ExerciseVariantsTarget } from "./exercise-variants-sheet.types";

type ExerciseVariantsSheetContentProps = {
	exercise: ExerciseVariantsTarget;
	initialVariants: DraftVariantItem[];
	routineId: string;
	onClose: () => void;
};

function ExerciseVariantRow( {
	isRemoveDisabled,
	onRemove,
	variant,
}: {
	isRemoveDisabled: boolean;
	onRemove: ( variantExerciseId: string ) => void;
	variant: DraftVariantItem;
} ) {
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
				<TrashBin className={ "size-4 text-danger" }/>
			</Button>
		</div>
	);
}

function ExerciseCandidateRow( {
	candidate,
	isDisabled,
	onAdd,
}: {
	candidate: ExerciseVariantsTarget;
	isDisabled: boolean;
	onAdd: ( candidate: ExerciseVariantsTarget ) => void;
} ) {
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

// Contiene el formulario y la logica de edicion de variantes dentro del Sheet.
export function ExerciseVariantsSheetContent( {
	exercise,
	initialVariants,
	routineId,
	onClose,
}: ExerciseVariantsSheetContentProps ) {
	const [ searchValue, setSearchValue ] = useState( "" );
	const [ bodyPartFilter, setBodyPartFilter ] = useState<BodyPartFilter>( ALL_BODY_PARTS );
	const [ draftVariants, setDraftVariants ] = useState<DraftVariantItem[]>( initialVariants );
	const [ initialVariantIds ] = useState( () => new Set( initialVariants.map( ( variant ) => variant.exercise.id ) ) );
	const debouncedSearchValue = useDebouncedValue( searchValue, SEARCH_DEBOUNCE_MS );
	const saveVariants = useSaveExerciseVariants( routineId );
	const hasCandidateFilters = debouncedSearchValue.trim().length > 0 || bodyPartFilter !== ALL_BODY_PARTS;
	const candidatesQuery = useExerciseVariantCandidates(
		exercise.id,
		debouncedSearchValue,
		bodyPartFilter,
		hasCandidateFilters,
	);

	const draftVariantIdSet = useMemo(
		() => new Set( draftVariants.map( ( variant ) => variant.exercise.id ) ),
		[ draftVariants ],
	);
	const candidateExercises = useMemo(
		() => ( candidatesQuery.data ?? EMPTY_ARRAY ).filter( ( candidate ) => !draftVariantIdSet.has( candidate.id ) ),
		[ candidatesQuery.data, draftVariantIdSet ],
	);
	const isDirty = useMemo( () => {
		if (draftVariantIdSet.size !== initialVariantIds.size) return true;

		for (const variantId of draftVariantIdSet) {
			if (!initialVariantIds.has( variantId )) return true;
		}

		return false;
	}, [ draftVariantIdSet, initialVariantIds ] );

	function handleAddVariant( candidate: ExerciseVariantsTarget ) {
		if (draftVariantIdSet.has( candidate.id )) return;

		setDraftVariants( ( current ) => [
			...current,
			{
				exercise: candidate,
				relationId: null,
			},
		] );
	}

	function handleRemoveVariant( variantExerciseId: string ) {
		setDraftVariants( ( current ) => current.filter( ( variant ) => variant.exercise.id !== variantExerciseId ) );
	}

	async function handleSaveVariants() {
		try {
			await saveVariants.mutateAsync( {
				routineId,
				variantExerciseIds: draftVariants.map( ( variant ) => variant.exercise.id ),
			} );

			toast.success( "Variantes guardadas", {
				description: "La lista quedó actualizada sin recargar la página.",
			} );
			onClose();
		} catch {
			toast.danger( "Error al guardar variantes", {
				description: saveVariants.error?.message ?? "No se pudieron guardar los cambios.",
			} );
		}
	}

	return (
		<>
			<Sheet.Body className={ "min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-5" }>
				{ candidatesQuery.isError ? (
					<Alert className={ "border border-danger/20" } status={ "danger" }>
						<Alert.Content>
							<Alert.Title>Error al buscar ejercicios</Alert.Title>
							<Alert.Description>{ candidatesQuery.error.message }</Alert.Description>
						</Alert.Content>
					</Alert>
				) : null }

				{ saveVariants.isError ? (
					<Alert className={ "border border-danger/20" } status={ "danger" }>
						<Alert.Content>
							<Alert.Title>Error al guardar variantes</Alert.Title>
							<Alert.Description>{ saveVariants.error.message }</Alert.Description>
						</Alert.Content>
					</Alert>
				) : null }

				<section className={ "space-y-3" }>
					<div className={ "flex items-center justify-between gap-3" }>
						<div>
							<h3 className={ "text-sm font-semibold text-foreground" }>Variantes asociadas</h3>
							<p className={ "text-sm text-muted" }>{ draftVariants.length } variantes en el borrador.</p>
						</div>
						{ saveVariants.isPending ? (
							<div className={ "flex items-center gap-2 text-xs text-muted" } role={ "status" }>
								<Spinner size={ "sm" }/>
								Guardando...
							</div>
						) : null }
					</div>

					{ draftVariants.length === 0 ? (
						<div className={ "rounded-xl border border-dashed border-border bg-surface-secondary px-4 py-6 text-sm text-muted" }>
							Aun no hay variantes en el borrador.
						</div>
					) : (
						<div className={ "space-y-2" }>
							{ draftVariants.map( ( variant ) => (
								<ExerciseVariantRow
									key={ variant.exercise.id }
									isRemoveDisabled={ saveVariants.isPending }
									variant={ variant }
									onRemove={ handleRemoveVariant }
								/>
							) ) }
						</div>
					) }
				</section>

				<Separator/>

				<section className={ "space-y-4" }>
					<div>
						<h3 className={ "text-sm font-semibold text-foreground" }>Buscar ejercicio</h3>
						<p className={ "text-sm text-muted" }>Localiza un ejercicio existente para sumarlo al borrador.</p>
					</div>

					<TextField name={ "variant-search" }>
						<Label>Buscar por nombre</Label>
						<Input
							aria-label={ "Buscar ejercicio" }
							autoComplete={ "off" }
							placeholder={ "Ej: press inclinado" }
							value={ searchValue }
							onChange={ ( event ) => setSearchValue( event.target.value ) }
						/>
					</TextField>

					<Select
						name={ "variant-body-part-filter" }
						placeholder={ "Todas las partes del cuerpo" }
						value={ bodyPartFilter }
						onChange={ ( value ) => {
							if (value) {
								setBodyPartFilter( value as BodyPartFilter );
							}
						} }
					>
						<Label>Parte del cuerpo</Label>
						<Select.Trigger aria-label={ "Filtrar por parte del cuerpo" }>
							<Select.Value/>
							<Select.Indicator/>
						</Select.Trigger>
						<Select.Popover>
							<ListBox>
								<ListBox.Item id={ ALL_BODY_PARTS } textValue={ "Todas" }>
									Todas
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

					<div className={ "space-y-3" }>
						<div className={ "flex items-center justify-between gap-3" }>
							<p className={ "text-sm font-medium text-foreground" }>Resultados</p>
							{ candidatesQuery.isFetching ? (
								<div className={ "flex items-center gap-2 text-xs text-muted" } role={ "status" }>
									<Spinner size={ "sm" }/>
									Buscando...
								</div>
							) : null }
						</div>

						{ !hasCandidateFilters ? (
							<div className={ "rounded-xl border border-dashed border-border bg-surface-secondary px-4 py-6 text-sm text-muted" }>
								Empieza a escribir un nombre o ajusta el filtro de parte del cuerpo para ver sugerencias.
							</div>
						) : candidatesQuery.isLoading ? (
							<div className={ "flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-secondary p-4 text-sm text-muted" }>
								<Spinner size={ "sm" }/>
								Cargando catalogo
							</div>
						) : candidateExercises.length === 0 ? (
							<div className={ "rounded-xl border border-dashed border-border bg-surface-secondary px-4 py-6 text-sm text-muted" }>
								No hay ejercicios disponibles para asociar con estos filtros.
							</div>
						) : (
							<div className={ "space-y-2" }>
								{ candidateExercises.map( ( candidate ) => (
									<ExerciseCandidateRow
										key={ candidate.id }
										candidate={ candidate }
										isDisabled={ saveVariants.isPending }
										onAdd={ handleAddVariant }
									/>
								) ) }
							</div>
						) }
					</div>
				</section>
			</Sheet.Body>

			<Sheet.Footer className={ "border-default-100 bg-background flex shrink-0 justify-end gap-2 border-t px-6 py-4" }>
				<Sheet.Close>
					<Button isDisabled={ saveVariants.isPending } variant={ "secondary" }>
						Cerrar
					</Button>
				</Sheet.Close>
				<Button
					isDisabled={ !isDirty || saveVariants.isPending }
					isPending={ saveVariants.isPending }
					onPress={ handleSaveVariants }
				>
					{ ( { isPending } ) => (
						<>
							{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : null }
							Guardar variantes
						</>
					) }
				</Button>
			</Sheet.Footer>
		</>
	);
}
