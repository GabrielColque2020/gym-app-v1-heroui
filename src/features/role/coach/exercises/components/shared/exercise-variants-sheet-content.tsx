"use client";

import { Alert, Button, Separator, Spinner, toast } from "@heroui/react";
import { Sheet } from "@heroui-pro/react";
import { useMemo, useState } from "react";

import {
	ALL_BODY_PARTS,
	type BodyPartFilter,
} from "@/features/exercises/services/exercise-form";
import {
	useExerciseVariantCandidates,
	useSaveExerciseVariants,
} from "@/features/exercises/hooks/use-exercise-variants";
import { useDebouncedValue } from "@/features/shared/hooks/use-debounced-value";

import { ExerciseVariantRow } from "./exercise-variant-row";
import { ExerciseVariantsSheetSearch } from "./exercise-variants-sheet-search";
import {
	EMPTY_ARRAY,
	SEARCH_DEBOUNCE_MS,
	type DraftVariantItem,
	type ExerciseVariantsTarget,
} from "./exercise-variants-sheet.types";

type ExerciseVariantsSheetContentProps = {
	exercise: ExerciseVariantsTarget;
	initialVariants: DraftVariantItem[];
	routineId: string;
	onClose: () => void;
};

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

				<ExerciseVariantsSheetSearch
					bodyPartFilter={ bodyPartFilter }
					candidateExercises={ candidateExercises }
					hasCandidateFilters={ hasCandidateFilters }
					isLoading={ candidatesQuery.isLoading }
					isPending={ saveVariants.isPending }
					isSearching={ isSearching }
					searchValue={ searchValue }
					onAddVariant={ handleAddVariant }
					onBodyPartFilterChange={ setBodyPartFilter }
					onSearchValueChange={ setSearchValue }
				/>
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
