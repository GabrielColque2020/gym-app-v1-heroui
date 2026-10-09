"use client";

import { useMemo, useState } from "react";

import { Alert, Separator, Spinner, toast } from "@heroui/react";

import { ListPagination, usePagination } from "@/components/common";
import { ALL_BODY_PARTS, type BodyPartFilter, normalizeSearchName } from "@/features/exercises/services/exercise-form";
import { useDebouncedValue } from "@/features/shared/hooks/use-debounced-value";
import { useCoachExercises, useSaveCoachExercise } from "@/features/role/coach/exercises/hooks/use-coach-exercises";
import type { CoachExerciseListItem } from "@/features/role/coach/exercises/types/coach-exercise-list-item";

import { ExerciseVariantRow } from "./exercise-variant-row";
import { ExerciseVariantsDrawerSearch } from "./exercise-variants-drawer-search";
import { type DraftVariantItem, EMPTY_ARRAY, type ExerciseVariantsTarget, SEARCH_DEBOUNCE_MS } from "./exercise-variants-drawer.types";

// De a cinco, y primero los que trabajan el mismo musculo: para elegir una o
// dos variantes alcanza con la primera pagina, sin una lista larga que recorrer.
const ITEMS_PER_PAGE = 5;

type ExerciseVariantsPickerProps = {
	exercise: ExerciseVariantsTarget;
	// Se esta guardando un cambio: no se aceptan otros hasta que termine.
	isSaving?: boolean;
	// Dentro de otra pantalla: mientras no hay variantes elegidas no se muestra
	// el bloque vacio de "0 variantes", que ahi solo suma ruido.
	hideEmptySelection?: boolean;
	variants: DraftVariantItem[];
	onChangeAction: ( variants: DraftVariantItem[] ) => void;
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

export function mapCoachExerciseToVariantTarget( exercise: CoachExerciseListItem ): ExerciseVariantsTarget {
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

// Elegir las variantes de un ejercicio: las que ya tiene, unas pocas sugeridas
// y, a pedido, el catalogo completo. No guarda nada: avisa cada cambio a quien lo
// usa, que decide si va a la base (ejercicio ya guardado) o espera con el dia
// (ejercicio que se esta agregando).
export function ExerciseVariantsPicker( {
	exercise,
	isSaving = false,
	hideEmptySelection = false,
	variants: draftVariants,
	onChangeAction,
}: ExerciseVariantsPickerProps ) {
	const [ searchValue, setSearchValue ] = useState( "" );
	// Arranca en el grupo del ejercicio: una variante casi siempre trabaja lo
	// mismo, y asi no hay que recorrer el catalogo entero para encontrarla.
	const [ bodyPartFilter, setBodyPartFilter ] = useState<BodyPartFilter>( exercise.bodyPart );
	const [ page, setPage ] = useState( 1 );
	const debouncedSearchValue = useDebouncedValue( searchValue, SEARCH_DEBOUNCE_MS );
	const coachExercisesQuery = useCoachExercises();
	const saveCoachExercise = useSaveCoachExercise();
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
	// El musculo objetivo del ejercicio principal, para poner primero los que
	// trabajan lo mismo. Se busca en el catalogo porque el editor no siempre lo trae.
	const mainTarget = useMemo(
		() => {
			const mainExercise = ( coachExercisesQuery.data ?? EMPTY_ARRAY ).find( ( candidate ) => mainExerciseIds.has( candidate.id ) );

			return normalizeSearchName( mainExercise?.target ?? exercise.target ?? "" );
		},
		[ coachExercisesQuery.data, exercise.target, mainExerciseIds ],
	);
	// El catalogo trae ejercicios distintos con el mismo nombre: se cuentan para
	// poder distinguirlos en la lista.
	const sameNameCountByName = useMemo(
		() => {
			const countByName = new Map<string, number>();

			for (const candidate of coachExercisesQuery.data ?? EMPTY_ARRAY) {
				if (!candidate.active) continue;

				const nameKey = normalizeSearchName( candidate.name );

				countByName.set( nameKey, ( countByName.get( nameKey ) ?? 0 ) + 1 );
			}

			return countByName;
		},
		[ coachExercisesQuery.data ],
	);
	const filteredExercises = useMemo(
		() => {
			// Cada palabra tiene que estar, en cualquier orden.
			const searchWords = normalizeSearchName( debouncedSearchValue ).split( " " ).filter( Boolean );

			const matches = ( coachExercisesQuery.data ?? EMPTY_ARRAY ).filter( ( candidate ) => {
				if (!candidate.active) return false;
				if (mainExerciseIds.has( candidate.id )) return false;

				const searchableText = searchWords.length === 0
					? ""
					: normalizeSearchName( `${ candidate.name } ${ candidate.equipment } ${ candidate.target }` );
				const matchesName = searchWords.every( ( word ) => searchableText.includes( word ) );
				const matchesBodyPart = bodyPartFilter === ALL_BODY_PARTS || candidate.bodyPart === bodyPartFilter;

				return matchesName && matchesBodyPart;
			} );

			if (!mainTarget) return matches;

			// Primero los del mismo musculo objetivo; el resto conserva el orden alfabetico.
			return [
				...matches.filter( ( candidate ) => normalizeSearchName( candidate.target ) === mainTarget ),
				...matches.filter( ( candidate ) => normalizeSearchName( candidate.target ) !== mainTarget ),
			];
		},
		[ bodyPartFilter, coachExercisesQuery.data, debouncedSearchValue, mainExerciseIds, mainTarget ],
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
		mobileItemsPerPage: ITEMS_PER_PAGE,
		page,
	} );
	const candidateExercises = useMemo(
		() => pagination.paginatedItems.map( ( candidate ) => ( {
			...mapCoachExerciseToVariantTarget( candidate ),
			sameNameCount: sameNameCountByName.get( normalizeSearchName( candidate.name ) ) ?? 1,
		} ) ),
		[ pagination.paginatedItems, sameNameCountByName ],
	);
	const isBusy = isSaving || saveCoachExercise.isPending;
	const showSelection = !hideEmptySelection || draftVariants.length > 0;

	function handleAddVariant( candidate: ExerciseVariantsTarget ) {
		if (draftVariantIdSet.has( candidate.id )) return;
		if (candidate.globalExerciseId && draftVariantGlobalIdSet.has( candidate.globalExerciseId )) return;

		onChangeAction( [
			...draftVariants,
			{
				exercise: candidate,
				relationId: null,
			},
		] );
	}

	function handleRemoveVariant( variantExerciseId: string ) {
		onChangeAction( draftVariants.filter( ( variant ) => variant.exercise.id !== variantExerciseId ) );
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
				description: "No se pudo traer ese ejercicio del catálogo. Probá de nuevo.",
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

	return (
		<div className={ "space-y-4" }>
			{ coachExercisesQuery.isError ? (
				<Alert className={ "border border-danger/20" } status={ "danger" }>
					<Alert.Content>
						<Alert.Title>Error al cargar el catálogo</Alert.Title>
						<Alert.Description>{ coachExercisesQuery.error.message }</Alert.Description>
					</Alert.Content>
				</Alert>
			) : null }

			{ saveCoachExercise.isError ? (
				<Alert className={ "border border-danger/20" } status={ "danger" }>
					<Alert.Content>
						<Alert.Title>No se pudo traer el ejercicio del catálogo</Alert.Title>
						<Alert.Description>{ saveCoachExercise.error?.message }</Alert.Description>
					</Alert.Content>
				</Alert>
			) : null }

			{ showSelection ? (
			<section className={ "space-y-3" }>
				<div className={ "flex items-center justify-between gap-3" }>
					<div>
						<h3 className={ "text-sm font-semibold text-foreground" }>
							{ draftVariants.length === 1 ? "1 variante" : `${ draftVariants.length } variantes` }
						</h3>
					</div>
					{ isBusy ? (
						<div className={ "flex items-center gap-2 text-xs text-muted" } role={ "status" }>
							<Spinner size={ "sm" }/>
							Guardando...
						</div>
					) : null }
				</div>

				{ draftVariants.length === 0 ? (
					<div className={ "rounded-xl border border-dashed border-border bg-surface-secondary px-4 py-3 text-sm text-muted" }>
						Todavía no tiene variantes. Agregá una de la lista de abajo.
					</div>
				) : (
					<div className={ "space-y-2" }>
						{ draftVariants.map( ( variant ) => (
							<ExerciseVariantRow
								key={ variant.exercise.id }
								isRemoveDisabled={ isBusy }
								variant={ variant }
								onRemove={ handleRemoveVariant }
							/>
						) ) }
					</div>
				) }
			</section>
			) : null }

			{ showSelection ? <Separator/> : null }

			<ExerciseVariantsDrawerSearch
				bodyPartFilter={ bodyPartFilter }
				candidateExercises={ candidateExercises }
				isLoading={ coachExercisesQuery.isLoading }
				isPending={ isBusy }
				isSearching={ isSearching }
				totalCount={ pagination.totalItems }
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
		</div>
	);
}
