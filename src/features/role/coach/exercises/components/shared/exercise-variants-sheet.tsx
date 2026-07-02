"use client";

import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";

import { Sheet } from "@heroui-pro/react";
import {
	Alert,
	Button,
	Chip,
	Description,
	Input,
	Label,
	ListBox,
	Select,
	Separator,
	Spinner,
	TextField,
	toast,
} from "@heroui/react";
import { CircleLink, Plus, TrashBin } from "@gravity-ui/icons";
import { useEffect, useMemo, useState } from "react";

import { formatBodyPart, ALL_BODY_PARTS, type BodyPartFilter, BODY_PART_OPTIONS } from "@/features/exercises/services/exercise-form";
import {
	useExerciseVariantCandidates,
	useExerciseVariants,
	useSaveExerciseVariants,
} from "@/features/exercises/hooks/use-exercise-variants";
import { FeatureSheetLayout } from "@/features/shared/components/feature-sheet-layout";
import { useResponsiveSheetPlacement } from "@/features/shared/hooks/use-responsive-sheet-placement";

type ExerciseVariantsTarget = {
	active: boolean;
	bodyPart: ExerciseListItem["bodyPart"];
	id: string;
	name: string;
};

type ExerciseVariantsSheetProps = {
	exercise: ExerciseVariantsTarget;
	routineId: string | null;
	hideTrigger?: boolean;
	isOpen?: boolean;
	onOpenChange?: ( isOpen: boolean ) => void;
	placement?: "bottom" | "right";
	triggerClassName?: string;
	triggerVariant?: "button" | "icon";
};

type DraftVariantItem = {
	exercise: ExerciseVariantsTarget;
	relationId: string | null;
};


// Retrasa la actualización de un valor para evitar consultas en cada pulsación.
function useDebouncedValue<TValue>( value: TValue, delayMs: number ) {
	const [ debouncedValue, setDebouncedValue ] = useState( value );

	useEffect( () => {
		const timeoutId = window.setTimeout( () => {
			setDebouncedValue( value );
		}, delayMs );

		return () => window.clearTimeout( timeoutId );
	}, [ delayMs, value ] );

	return debouncedValue;
}

const SEARCH_DEBOUNCE_MS = 300;
const EMPTY_ARRAY: never[] = [];

// Renderiza el botón disparador que abre el panel de variantes.
function ExerciseVariantsTrigger( {
									  exercise,
									  isDisabled,
									  onPress,
									  showLabel,
									  className,
								  }: {
	className?: string;
	exercise: ExerciseVariantsTarget;
	isDisabled?: boolean;
	onPress: () => void;
	showLabel: boolean;
} ) {
	return (
		<Button
			isIconOnly={ !showLabel }
			aria-label={ `Gestionar variantes de ${ exercise.name }` }
			className={ className }
			isDisabled={ isDisabled }
			size={ "sm" }
			variant={ "ghost" }
			onPress={ onPress }
		>
			<CircleLink className={ "size-4" }/>
			{ showLabel ? "Variantes" : null }
		</Button>
	);
}

// Contiene el formulario y la lógica de edición de variantes dentro del Sheet.
function ExerciseVariantsSheetContent( {
										   exercise,
										   routineId,
										   initialVariants,
										   onClose,
									   }: {
	exercise: ExerciseVariantsTarget;
	initialVariants: DraftVariantItem[];
	routineId: string;
	onClose: () => void;
} ) {
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

	// Agrega un ejercicio al borrador de variantes, evitando duplicados.
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

	// Elimina una variante del borrador usando su identificador de ejercicio.
	function handleRemoveVariant( variantExerciseId: string ) {
		setDraftVariants( ( current ) => current.filter( ( variant ) => variant.exercise.id !== variantExerciseId ) );
	}

	// Persiste la lista final de variantes y cierra el panel si el guardado sale bien.
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
								<div
									key={ variant.exercise.id }
									className={ "flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-secondary px-4 py-3" }
								>
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
										isDisabled={ saveVariants.isPending }
										size={ "sm" }
										variant={ "ghost" }
										onPress={ () => handleRemoveVariant( variant.exercise.id ) }
									>
										<TrashBin className={ "size-4 text-danger" }/>
									</Button>
								</div>
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
									<div
										key={ candidate.id }
										className={ "flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-secondary px-4 py-3" }
									>
										<div className={ "min-w-0" }>
											<p className={ "truncate text-sm font-medium text-foreground" }>{ candidate.name }</p>
											<p className={ "truncate text-xs text-muted" }>
												{ formatBodyPart( candidate.bodyPart ) }
												{ candidate.active ? " · Activo" : " · Inactivo" }
											</p>
										</div>
										<Button
											isDisabled={ saveVariants.isPending }
											size={ "sm" }
											variant={ "secondary" }
											onPress={ () => handleAddVariant( candidate ) }
										>
											<Plus className={ "size-4" }/>
											Agregar
										</Button>
									</div>
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

// Coordina la apertura del Sheet, la carga inicial de variantes y el estado externo/interno.
export function ExerciseVariantsSheet( props: ExerciseVariantsSheetProps ) {
	const [ internalIsOpen, setInternalIsOpen ] = useState( false );
	const responsivePlacement = useResponsiveSheetPlacement();
	const placement = props.placement ?? responsivePlacement;
	const isOpen = props.isOpen ?? internalIsOpen;
	const setIsOpen = props.onOpenChange ?? setInternalIsOpen;
	const showTriggerLabel = props.triggerVariant === "button";
	const variantsQuery = useExerciseVariants( props.routineId ?? "", isOpen && Boolean( props.routineId ) );

	function openSheet() {
		if (!props.routineId) return;

		setIsOpen( true );
	}

	function handleOpenChange( nextIsOpen: boolean ) {
		setIsOpen( nextIsOpen );
	}

	return (
		<>
			{ props.hideTrigger ? null : (
				<ExerciseVariantsTrigger
					className={ props.triggerClassName }
					exercise={ props.exercise }
					isDisabled={ !props.routineId }
					showLabel={ showTriggerLabel }
					onPress={ openSheet }
				/>
			) }

			<FeatureSheetLayout isOpen={ isOpen } placement={ placement } onOpenChange={ handleOpenChange }>
				<Sheet.Header className={ "border-default-100 relative border-b pb-4" }>
					<div className={ "flex gap-3" }>
						<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
							<CircleLink className={ "size-5" }/>
						</div>
						<div className={ "min-w-0" }>
							<Sheet.Heading>{ props.exercise.name }</Sheet.Heading>
							<Description className={ "mt-1 text-sm" }>
								Gestiona las variantes asociadas y guarda la lista cuando termines de editar.
							</Description>
							<Chip className={ "mt-2" } color={ "accent" } size={ "sm" } variant={ "soft" }>
								{ formatBodyPart( props.exercise.bodyPart ) }
							</Chip>
						</div>
					</div>
				</Sheet.Header>

				{ variantsQuery.isError ? (
					<Sheet.Body className={ "min-h-0 flex-1 px-6 py-5" }>
						<Alert className={ "border border-danger/20" } status={ "danger" }>
							<Alert.Content>
								<Alert.Title>Error al cargar variantes</Alert.Title>
								<Alert.Description>{ variantsQuery.error.message }</Alert.Description>
							</Alert.Content>
						</Alert>
					</Sheet.Body>
				) : variantsQuery.isLoading ? (
					<Sheet.Body className={ "min-h-0 flex-1 px-6 py-5" }>
						<div className={ "flex min-h-56 flex-col items-center justify-center gap-3 text-center" }>
							<Spinner size={ "lg" }/>
							<div className={ "space-y-1" }>
								<p className={ "text-base font-semibold text-foreground" }>Cargando variantes</p>
								<p className={ "text-sm text-muted" }>Consultando las relaciones asociadas al ejercicio.</p>
							</div>
						</div>
					</Sheet.Body>
				) : !props.routineId ? (
					<Sheet.Body className={ "min-h-0 flex-1 px-6 py-5" }>
						<Alert className={ "border border-warning/20" } status={ "warning" }>
							<Alert.Content>
								<Alert.Title>Guarda la rutina primero</Alert.Title>
								<Alert.Description>
									Las variantes ahora se guardan por rutina. Necesitas guardar el ejercicio antes de poder asociarle variantes.
								</Alert.Description>
							</Alert.Content>
						</Alert>
					</Sheet.Body>
				) : (
					<ExerciseVariantsSheetContent
						exercise={ props.exercise }
						routineId={ props.routineId }
						initialVariants={
							( variantsQuery.data ?? EMPTY_ARRAY ).map( ( relation ) => ( {
								exercise: {
									active: relation.variantExercise.active,
									bodyPart: relation.variantExercise.bodyPart,
									id: relation.variantExercise.id,
									name: relation.variantExercise.name,
								},
								relationId: relation.id,
							} ) )
						}
						onClose={ () => setIsOpen( false ) }
					/>
				) }
			</FeatureSheetLayout>
		</>
	);
}
