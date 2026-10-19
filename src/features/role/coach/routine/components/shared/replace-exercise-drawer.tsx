"use client";

import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import type { DraftRoutineDayExercise } from "@/features/routine/services/routine-day-editor";

import { useState } from "react";
import { Button, Description, Drawer } from "@heroui/react";
import { ArrowDown, ArrowLeftRight } from "lucide-react";

import { ListPagination } from "@/components/common";
import { MediaPreviewThumbnail } from "@/components/common/media-preview-thumbnail";
import { ExerciseDrawer } from "@/features/role/coach/exercises/components/shared/exercise-drawer";
import { getExerciseName } from "@/features/role/coach/routine/components/shared/routine-day-exercise-editor.utils";
import { SearchAndCreateExerciseDrawerControls } from "@/features/role/coach/routine/components/shared/search-and-create-exercise-drawer-controls";
import { SearchAndCreateExerciseDrawerResults } from "@/features/role/coach/routine/components/shared/search-and-create-exercise-drawer-results";
import { useRoutineDayExerciseCatalog } from "@/features/routine/hooks/use-routine-day-exercise-catalog";
import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";

export type ReplaceExerciseScope = "day" | "routine";

type ReplaceExerciseDrawerProps = {
	addedExerciseIds: Set<string>;
	// Dias que el estudiante ya termino con este ejercicio: no se cambian.
	finalizedDayCount: number;
	onOpenChangeAction: ( isOpen: boolean ) => void;
	// Devuelve si se pudo cambiar, para cerrar el drawer solo en ese caso.
	onReplaceAction: ( exercise: ExerciseListItem, scope: ReplaceExerciseScope ) => Promise<boolean>;
	// Otros dias de la rutina, sin terminar, que tienen el mismo ejercicio.
	otherDayCount: number;
	routine: DraftRoutineDayExercise;
	// Las variantes de la fila en este dia: eran del ejercicio anterior.
	variantCount: number;
};

function pluralDays( count: number ) {
	return `${ count } ${ count === 1 ? "día" : "días" }`;
}

const NOOP_REGISTER_REF = () => {};

// Para corregir un ejercicio cargado por error: se elige el que va en su lugar
// y se decide si cambia solo en este dia o en todos los de la rutina donde esta.
// Series, repeticiones, descanso, orden y nota quedan como estaban.
export function ReplaceExerciseDrawer( {
	addedExerciseIds,
	finalizedDayCount,
	onOpenChangeAction,
	onReplaceAction,
	otherDayCount,
	routine,
	variantCount,
}: ReplaceExerciseDrawerProps ) {
	const placement = useResponsiveDrawerPlacement();
	const {
		bodyPartFilter,
		changePage,
		debouncedSearchValue,
		exercisesQuery,
		pagination,
		searchValue,
		selectedExerciseId,
		syncCreatedExercise,
		updateBodyPartFilter,
		updateSearchValue,
	} = useRoutineDayExerciseCatalog();
	const [ chosenExercise, setChosenExercise ] = useState<ExerciseListItem | null>( null );
	const [ pendingScope, setPendingScope ] = useState<ReplaceExerciseScope | null>( null );
	const [ isCreateDrawerOpen, setIsCreateDrawerOpen ] = useState( false );
	const currentName = getExerciseName( routine );

	async function replace( scope: ReplaceExerciseScope ) {
		if (!chosenExercise || pendingScope) return;

		setPendingScope( scope );

		try {
			if (await onReplaceAction( chosenExercise, scope )) onOpenChangeAction( false );
		} finally {
			setPendingScope( null );
		}
	}

	return (
		<>
			<FeatureDrawerLayout
				isOpen
				placement={ placement }
				rightContentClassName={ "w-[38rem]" }
				onOpenChangeAction={ ( isOpen ) => {
					if (!pendingScope) onOpenChangeAction( isOpen );
				} }
			>
				<Drawer.Header className={ "border-default-100 relative border-b pb-4" }>
					<div className={ "flex min-w-0 items-start gap-3 pe-10" }>
						<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
							<ArrowLeftRight className={ "size-5" }/>
						</div>
						<div className={ "min-w-0 flex-1" }>
							<Drawer.Heading>Cambiar ejercicio</Drawer.Heading>
							<Description className={ "mt-1 text-sm" }>
								{ chosenExercise
									? "Series, repeticiones, descanso y nota quedan como estaban."
									: <>Elegí el que va en lugar de <span className={ "font-medium text-foreground" }>{ currentName }</span>.</> }
							</Description>
						</div>
					</div>
				</Drawer.Header>

				{ chosenExercise ? (
					<Drawer.Body key={ "confirm" } className={ "min-h-0 flex-1 space-y-4 overflow-y-auto py-3" }>
						<div className={ "space-y-2" }>
							<div className={ "flex items-center gap-3 rounded-xl border border-border bg-surface-secondary p-3 opacity-70" }>
								<MediaPreviewThumbnail imageUrl={ routine.exercise?.imageUrl } name={ currentName } videoUrl={ routine.exercise?.videoUrl }/>
								<p className={ "min-w-0 text-sm text-muted line-through" }>{ currentName }</p>
							</div>
							<ArrowDown aria-hidden className={ "mx-auto size-4 text-muted" }/>
							<div className={ "flex items-center gap-3 rounded-xl border border-accent bg-accent-soft/40 p-3" }>
								<MediaPreviewThumbnail imageUrl={ chosenExercise.imageUrl } name={ chosenExercise.name } videoUrl={ chosenExercise.videoUrl }/>
								<p className={ "min-w-0 text-sm font-medium text-foreground" }>{ chosenExercise.name }</p>
							</div>
						</div>

						{ otherDayCount > 0 ? (
							<p className={ "text-sm text-foreground" }>
								{ currentName } también está en otros { pluralDays( otherDayCount ) } de esta rutina.
								Podés cambiarlo en todos de una vez.
							</p>
						) : null }
						{ finalizedDayCount > 0 ? (
							<p className={ "text-sm text-muted" }>
								{ finalizedDayCount === 1 ? "Un día que el estudiante ya terminó no se cambia" : `${ pluralDays( finalizedDayCount ) } que el estudiante ya terminó no se cambian` }:
								queda lo que hizo.
							</p>
						) : null }
						{ variantCount > 0 ? (
							<p className={ "text-sm text-muted" }>
								{ variantCount === 1 ? "Su variante era" : `Sus ${ variantCount } variantes eran` } del ejercicio anterior y se { variantCount === 1 ? "quita" : "quitan" }.
							</p>
						) : null }
					</Drawer.Body>
				) : (
					<Drawer.Body key={ "list" } className={ "min-h-0 flex-1 space-y-3 overflow-y-auto py-3 sm:space-y-6" }>
						<SearchAndCreateExerciseDrawerControls
							bodyPartFilter={ bodyPartFilter }
							searchValue={ searchValue }
							onBodyPartFilterChangeAction={ updateBodyPartFilter }
							onSearchValueChangeAction={ updateSearchValue }
						/>
						<SearchAndCreateExerciseDrawerResults
							addedExerciseIds={ addedExerciseIds }
							exercises={ pagination.paginatedItems }
							exercisesQuery={ {
								error: exercisesQuery.error ? { message: exercisesQuery.error.message } : null,
								isError: exercisesQuery.isError,
								isLoading: exercisesQuery.isLoading,
							} }
							isSearching={ searchValue !== debouncedSearchValue }
							searchValue={ searchValue }
							selectedExerciseId={ selectedExerciseId }
							onAddExerciseAction={ setChosenExercise }
							onCreateExerciseAction={ () => setIsCreateDrawerOpen( true ) }
							onRegisterAddButtonRef={ NOOP_REGISTER_REF }
						/>
						{ !exercisesQuery.isLoading && !exercisesQuery.isError && pagination.totalItems > 0 ? (
							<ListPagination
								currentPage={ pagination.currentPage }
								itemLabel={ "ejercicios" }
								onPageChangeAction={ changePage }
								showingFrom={ pagination.showingFrom }
								showingTo={ pagination.showingTo }
								totalItems={ pagination.totalItems }
								totalPages={ pagination.totalPages }
							/>
						) : null }
					</Drawer.Body>
				) }

				{ chosenExercise ? (
					<Drawer.Footer className={ "border-default-100 flex flex-wrap items-center justify-end gap-2 border-t pt-4" }>
						<Button isDisabled={ Boolean( pendingScope ) } variant={ "ghost" } onPress={ () => setChosenExercise( null ) }>
							Volver
						</Button>
						<Button
							className={ otherDayCount > 0 ? undefined : "bg-accent text-accent-foreground" }
							isPending={ pendingScope === "day" }
							isDisabled={ pendingScope === "routine" }
							variant={ otherDayCount > 0 ? "secondary" : "primary" }
							onPress={ () => void replace( "day" ) }
						>
							{ otherDayCount > 0 ? "Solo en este día" : "Cambiar" }
						</Button>
						{ otherDayCount > 0 ? (
							<Button
								className={ "bg-accent text-accent-foreground" }
								isPending={ pendingScope === "routine" }
								isDisabled={ pendingScope === "day" }
								onPress={ () => void replace( "routine" ) }
							>
								{ `En los ${ pluralDays( otherDayCount + 1 ) }` }
							</Button>
						) : null }
					</Drawer.Footer>
				) : null }
			</FeatureDrawerLayout>

			<ExerciseDrawer
				hideTrigger
				initialName={ searchValue }
				isOpen={ isCreateDrawerOpen }
				mode={ "create" }
				placement={ placement }
				onOpenChangeAction={ setIsCreateDrawerOpen }
				onSuccessAction={ ( exercise ) => {
					syncCreatedExercise( exercise );
					setIsCreateDrawerOpen( false );
					setChosenExercise( exercise );
				} }
			/>
		</>
	);
}
