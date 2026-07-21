"use client";

import { useMemo, useState } from "react";

import { Alert, Button, Drawer, Separator, Spinner, toast } from "@heroui/react";

import { ListPagination, usePagination } from "@/components/common";
import { ALL_BODY_PARTS, type BodyPartFilter, normalizeSearchName } from "@/features/exercises/services/exercise-form";
import { useDebouncedValue } from "@/features/shared/hooks/use-debounced-value";
import { useCoachExercises, useSaveCoachExercise } from "@/features/role/coach/exercises/hooks/use-coach-exercises";
import type { CoachExerciseListItem } from "@/features/role/coach/exercises/types/coach-exercise-list-item";
import { useSaveExerciseVariants } from "@/features/exercises/hooks/use-exercise-variants";

import { ExerciseVariantRow } from "./exercise-variant-row";
import { ExerciseVariantsDrawerSearch } from "./exercise-variants-drawer-search";
import { type DraftVariantItem, EMPTY_ARRAY, type ExerciseVariantsTarget, SEARCH_DEBOUNCE_MS } from "./exercise-variants-drawer.types";

const ITEMS_PER_PAGE = 8;

type ExerciseVariantsDrawerContentProps = {
	exercise: ExerciseVariantsTarget;
	initialVariants: DraftVariantItem[];
	routineId: string;
	onCloseAction: () => void;
};

function mapSavedExerciseToVariantTarget( exercise: {
	active: boolean;
	bodyPart: CoachExerciseListItem["bodyPart"];
	category: string | null;
	coachId?: string | null;
	equipment: string | null;
	externalId: string | null;
	globalExerciseId: string | null;
	id: string;
	imageUrl: string | null;
	instructions: string | null;
	isOverride: boolean;
	muscleGroup: string | null;
	name: string;
	searchName: string | null;
	target: string | null;
	tips?: string | null;
	videoUrl: string | null;
} ): ExerciseVariantsTarget {
	return {
		active: exercise.active,
		bodyPart: exercise.bodyPart,
		category: exercise.category ?? "",
		coachExerciseId: exercise.id,
		equipment: exercise.equipment ?? "",
		externalId: exercise.externalId,
		globalExerciseId: exercise.globalExerciseId,
		id: exercise.id,
		imageUrl: exercise.imageUrl,
		instructions: exercise.instructions,
		isOverride: exercise.isOverride,
		muscleGroup: exercise.muscleGroup ?? "",
		name: exercise.name,
		searchName: exercise.searchName ?? normalizeSearchName( exercise.name ),
		sourceType: "coach",
		target: exercise.target ?? "",
		tips: exercise.tips ?? exercise.instructions,
		videoUrl: exercise.videoUrl,
	};
}

function mapCoachExerciseToVariantTarget( exercise: CoachExerciseListItem ): ExerciseVariantsTarget {
	return {
		active: exercise.active,
		bodyPart: exercise.bodyPart,
		category: exercise.category,
		coachExerciseId: exercise.coachExerciseId ?? exercise.id,
		equipment: exercise.equipment,
		externalId: exercise.externalId,
		globalExerciseId: exercise.globalExerciseId,
		id: exercise.id,
		imageUrl: exercise.imageUrl,
		instructions: exercise.instructions,
		isOverride: exercise.isOverride,
		muscleGroup: exercise.muscleGroup,
		name: exercise.name,
		searchName: exercise.searchName,
		sourceType: exercise.sourceType,
		target: exercise.target,
		tips: exercise.tips,
		videoUrl: exercise.videoUrl,
	};
}

export function ExerciseVariantsDrawerContent( {
	exercise,
	initialVariants,
	routineId,
	onCloseAction,
}: ExerciseVariantsDrawerContentProps ) {
	const [ searchValue, setSearchValue ] = useState( "" );
	const [ bodyPartFilter, setBodyPartFilter ] = useState<BodyPartFilter>( ALL_BODY_PARTS );
	const [ page, setPage ] = useState( 1 );
	const [ draftVariants, setDraftVariants ] = useState<DraftVariantItem[]>( initialVariants );
	const [ initialVariantIds ] = useState( () => new Set( initialVariants.map( ( variant ) => variant.exercise.id ) ) );
	const debouncedSearchValue = useDebouncedValue( searchValue, SEARCH_DEBOUNCE_MS );
	const coachExercisesQuery = useCoachExercises();
	const saveCoachExercise = useSaveCoachExercise();
	const saveVariants = useSaveExerciseVariants( routineId );
	const isSearching = searchValue !== debouncedSearchValue;

	const draftVariantIdSet = useMemo(
		() => new Set( draftVariants.map( ( variant ) => variant.exercise.id ) ),
		[ draftVariants ],
	);
	const draftVariantGlobalIdSet = useMemo(
		() => new Set(
			draftVariants
				.map( ( variant ) => variant.exercise.globalExerciseId )
				.filter( ( globalExerciseId ): globalExerciseId is string => Boolean( globalExerciseId ) ),
		),
		[ draftVariants ],
	);
	const mainExerciseIds = useMemo(
		() => new Set(
			[
				exercise.id,
				exercise.globalExerciseId ?? null,
			].filter( ( value ): value is string => Boolean( value ) ),
		),
		[ exercise.globalExerciseId, exercise.id ],
	);
	const filteredExercises = useMemo(
		() => {
			const normalizedSearch = normalizeSearchName( debouncedSearchValue );

			return ( coachExercisesQuery.data ?? EMPTY_ARRAY ).filter( ( candidate ) => {
				if (!candidate.active) return false;
				if (mainExerciseIds.has( candidate.id )) return false;

				const matchesName =
					normalizedSearch.length === 0
					|| normalizeSearchName( candidate.name ).includes( normalizedSearch )
					|| normalizeSearchName( candidate.searchName ?? "" ).includes( normalizedSearch );
				const matchesBodyPart = bodyPartFilter === ALL_BODY_PARTS || candidate.bodyPart === bodyPartFilter;

				return matchesName && matchesBodyPart;
			} );
		},
		[ bodyPartFilter, coachExercisesQuery.data, debouncedSearchValue, mainExerciseIds ],
	);
	const availableExercises = useMemo(
		() => filteredExercises.filter( ( candidate ) => {
			if (draftVariantIdSet.has( candidate.id )) return false;

			return !(candidate.globalExerciseId && draftVariantGlobalIdSet.has( candidate.globalExerciseId ));
		} ),
		[ draftVariantGlobalIdSet, draftVariantIdSet, filteredExercises ],
	);
	const pagination = usePagination( {
		items: availableExercises,
		itemsPerPage: ITEMS_PER_PAGE,
		page,
	} );
	const candidateExercises = useMemo(
		() => pagination.paginatedItems.map( mapCoachExerciseToVariantTarget ),
		[ pagination.paginatedItems ],
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
		if (candidate.globalExerciseId && draftVariantGlobalIdSet.has( candidate.globalExerciseId )) return;

		setDraftVariants( ( current ) => [
			...current,
			{
				exercise: candidate,
				relationId: null,
			},
		] );
	}

	async function handleAddCandidate( candidate: ExerciseVariantsTarget ) {
		if (candidate.sourceType !== "global" || !candidate.globalExerciseId) {
			handleAddVariant( candidate );
			return;
		}

		try {
			const savedExercise = await saveCoachExercise.mutateAsync( {
				active: candidate.active,
				bodyPart: candidate.bodyPart,
				category: candidate.category ?? "",
				coachExerciseId: candidate.coachExerciseId ?? null,
				equipment: candidate.equipment ?? "",
				externalId: candidate.externalId ?? null,
				globalExerciseId: candidate.globalExerciseId,
				imageUrl: candidate.imageUrl ?? "",
				instructions: candidate.instructions ?? "",
				muscleGroup: candidate.muscleGroup ?? "",
				name: candidate.name,
				sourceType: "global",
				target: candidate.target ?? "",
				videoUrl: candidate.videoUrl ?? "",
			} );

			const resolvedExercise = mapSavedExerciseToVariantTarget( savedExercise as Parameters<typeof mapSavedExerciseToVariantTarget>[0] );
			handleAddVariant( resolvedExercise );
		} catch {
			toast.danger( "No se pudo agregar el ejercicio", {
				description: saveCoachExercise.error?.message ?? "No pudimos materializar el ejercicio global para esta rutina.",
			} );
		}
	}

	function handleSearchValueChange( value: string ) {
		setSearchValue( value );
		setPage( 1 );
	}

	function handleBodyPartFilterChange( value: BodyPartFilter ) {
		setBodyPartFilter( value );
		setPage( 1 );
	}

	async function handleSaveVariants() {
		try {
			await saveVariants.mutateAsync( {
				routineId,
				variantExerciseIds: draftVariants.map( ( variant ) => variant.exercise.id ),
			} );

			toast.success( "Variantes guardadas", {
				description: "La lista quedo actualizada.",
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
				{ coachExercisesQuery.isError ? (
					<Alert className={ "border border-danger/20" } status={ "danger" }>
						<Alert.Content>
							<Alert.Title>Error al cargar el catalogo</Alert.Title>
							<Alert.Description>{ coachExercisesQuery.error.message }</Alert.Description>
						</Alert.Content>
					</Alert>
				) : null }

				{ saveCoachExercise.isError ? (
					<Alert className={ "border border-danger/20" } status={ "danger" }>
						<Alert.Content>
							<Alert.Title>Error al guardar ejercicio global</Alert.Title>
							<Alert.Description>{ saveCoachExercise.error?.message }</Alert.Description>
						</Alert.Content>
					</Alert>
				) : null }

				{ saveVariants.isError ? (
					<Alert className={ "border border-danger/20" } status={ "danger" }>
						<Alert.Content>
							<Alert.Title>Error al guardar variantes</Alert.Title>
							<Alert.Description>{ saveVariants.error?.message }</Alert.Description>
						</Alert.Content>
					</Alert>
				) : null }

				<section className={ "space-y-3" }>
					<div className={ "flex items-center justify-between gap-3" }>
						<div>
							<h3 className={ "text-sm font-semibold text-foreground" }>Variantes asociadas</h3>
							<p className={ "text-sm text-muted" }>{ draftVariants.length } variantes en el borrador.</p>
						</div>
						{ saveVariants.isPending || saveCoachExercise.isPending ? (
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
									isRemoveDisabled={ saveVariants.isPending || saveCoachExercise.isPending }
									variant={ variant }
									onRemove={ ( variantExerciseId ) => {
										setDraftVariants( ( current ) =>
											current.filter( ( currentVariant ) => currentVariant.exercise.id !== variantExerciseId )
										);
									} }
								/>
							) ) }
						</div>
					) }
				</section>

				<Separator/>

				<ExerciseVariantsDrawerSearch
					bodyPartFilter={ bodyPartFilter }
					candidateExercises={ candidateExercises }
					isLoading={ coachExercisesQuery.isLoading }
					isPending={ saveVariants.isPending || saveCoachExercise.isPending }
					isSearching={ isSearching }
					searchValue={ searchValue }
					onAddVariantAction={ handleAddCandidate }
					onBodyPartFilterChangeAction={ handleBodyPartFilterChange }
					onSearchValueChangeAction={ handleSearchValueChange }
				/>

				{ pagination.totalPages > 1 ? (
					<ListPagination
						currentPage={ pagination.currentPage }
						itemLabel={ "ejercicios" }
						onPageChangeAction={ setPage }
						showingFrom={ pagination.showingFrom }
						showingTo={ pagination.showingTo }
						totalItems={ pagination.totalItems }
						totalPages={ pagination.totalPages }
					/>
				) : null }
			</Drawer.Body>

			<Drawer.Footer className={ "border-default-100 shrink-0 justify-end gap-2 border-t pt-4" }>
				<Button slot={ "close" } isDisabled={ saveVariants.isPending || saveCoachExercise.isPending } variant={ "secondary" }>
					Cerrar
				</Button>
				<Button
					isDisabled={ !isDirty || saveVariants.isPending || saveCoachExercise.isPending }
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
