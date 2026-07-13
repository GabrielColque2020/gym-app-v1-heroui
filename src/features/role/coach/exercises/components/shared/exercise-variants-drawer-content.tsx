"use client";

import { Alert, Button, Drawer, Separator, Spinner, toast } from "@heroui/react";
import { useMemo, useState } from "react";

import { ALL_BODY_PARTS, type BodyPartFilter, } from "@/features/exercises/services/exercise-form";
import { useExerciseVariantCandidates, useSaveExerciseVariants, } from "@/features/exercises/hooks/use-exercise-variants";
import { useDebouncedValue } from "@/features/shared/hooks/use-debounced-value";

import { ExerciseVariantRow } from "./exercise-variant-row";
import { ExerciseVariantsDrawerSearch } from "./exercise-variants-drawer-search";
import { type DraftVariantItem, EMPTY_ARRAY, type ExerciseVariantsTarget, SEARCH_DEBOUNCE_MS, } from "./exercise-variants-drawer.types";

type ExerciseVariantsDrawerContentProps = {
	exercise: ExerciseVariantsTarget;
	initialVariants: DraftVariantItem[];
	routineId: string;
	onCloseAction: () => void;
};

export function ExerciseVariantsDrawerContent( {
												   exercise,
												   initialVariants,
												   routineId,
												   onCloseAction,
											   }: ExerciseVariantsDrawerContentProps ) {
	const [ searchValue, setSearchValue ] = useState( "" );
	const [ bodyPartFilter, setBodyPartFilter ] = useState<BodyPartFilter>( ALL_BODY_PARTS );
	const [ draftVariants, setDraftVariants ] = useState<DraftVariantItem[]>( initialVariants );
	const [ initialVariantIds ] = useState( () => new Set( initialVariants.map( ( variant ) => variant.exercise.id ) ) );
	const debouncedSearchValue = useDebouncedValue( searchValue, SEARCH_DEBOUNCE_MS );
	const saveVariants = useSaveExerciseVariants( routineId );
	const hasCandidateFilters = debouncedSearchValue.trim().length > 0 || bodyPartFilter !== ALL_BODY_PARTS;
	const isSearching = searchValue !== debouncedSearchValue;
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
				description: "La lista quedó actualizada.",
			} );
			onCloseAction();
		} catch {
			toast.danger( "Error al guardar variantes", {
				description: saveVariants.error?.message ?? "No se pudieron guardar los cambios.",
			} );
		}
	}

	return (
		<>
			<Drawer.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto py-3" }>
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

				<ExerciseVariantsDrawerSearch
					bodyPartFilter={ bodyPartFilter }
					candidateExercises={ candidateExercises }
					hasCandidateFilters={ hasCandidateFilters }
					isLoading={ candidatesQuery.isLoading }
					isPending={ saveVariants.isPending }
					isSearching={ isSearching }
					searchValue={ searchValue }
					onAddVariantAction={ handleAddVariant }
					onBodyPartFilterChangeAction={ setBodyPartFilter }
					onSearchValueChangeAction={ setSearchValue }
				/>
			</Drawer.Body>

			<Drawer.Footer className={ "border-default-100 shrink-0 justify-end gap-2 border-t pt-4" }>
				<Button slot={ "close" } isDisabled={ saveVariants.isPending } variant={ "secondary" }>
					Cerrar
				</Button>
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
			</Drawer.Footer>
		</>
	);
}
