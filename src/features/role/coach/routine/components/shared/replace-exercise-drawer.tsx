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
import { RoutineDayChecklist } from "@/features/role/coach/routine/components/shared/routine-day-checklist";
import { SearchAndCreateExerciseDrawerControls } from "@/features/role/coach/routine/components/shared/search-and-create-exercise-drawer-controls";
import { SearchAndCreateExerciseDrawerResults } from "@/features/role/coach/routine/components/shared/search-and-create-exercise-drawer-results";
import { useRoutineDayExerciseCatalog } from "@/features/routine/hooks/use-routine-day-exercise-catalog";
import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";

// Un dia de la rutina que tiene el ejercicio que se cambia.
export type ReplaceExerciseDay = {
	dayNumber: number;
	id: string;
	// El dia que se esta editando: siempre se cambia.
	isCurrent: boolean;
	// Terminado por el estudiante: no se cambia, queda lo que hizo.
	isFinalized: boolean;
	// Series y repeticiones del ejercicio en ese dia, para reconocerlo.
	prescription: string | null;
	week: number;
};

type ReplaceExerciseDrawerProps = {
	addedExerciseIds: Set<string>;
	// Todos los dias de la rutina con este ejercicio, este incluido.
	days: ReplaceExerciseDay[];
	onOpenChangeAction: ( isOpen: boolean ) => void;
	// Recibe los dias marcados y devuelve si se pudo cambiar, para cerrar el
	// drawer solo en ese caso.
	onReplaceAction: ( exercise: ExerciseListItem, routineDayIds: string[] ) => Promise<boolean>;
	routine: DraftRoutineDayExercise;
	// Las variantes de la fila en este dia: eran del ejercicio anterior.
	variantCount: number;
};

function pluralDays( count: number ) {
	return `${ count } ${ count === 1 ? "día" : "días" }`;
}

function getSelectableDayIds( days: ReplaceExerciseDay[] ) {
	return days.filter( ( day ) => !day.isFinalized ).map( ( day ) => day.id );
}

const NOOP_REGISTER_REF = () => {};

// Para corregir un ejercicio cargado por error: se elige el que va en su lugar
// y se marcan los dias de la rutina donde cambiarlo. Arrancan marcados todos:
// lo comun es que el error este repetido en cada semana. Series, repeticiones,
// descanso, orden y nota quedan como estaban.
export function ReplaceExerciseDrawer( {
	addedExerciseIds,
	days,
	onOpenChangeAction,
	onReplaceAction,
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
	const [ selectedDayIds, setSelectedDayIds ] = useState( () => new Set( getSelectableDayIds( days ) ) );
	const [ isPending, setIsPending ] = useState( false );
	const [ isCreateDrawerOpen, setIsCreateDrawerOpen ] = useState( false );
	const currentName = getExerciseName( routine );
	const selectableDayIds = getSelectableDayIds( days );
	const currentDayId = days.find( ( day ) => day.isCurrent )?.id ?? null;
	const finalizedDayCount = days.filter( ( day ) => day.isFinalized ).length;
	const selectedCount = selectableDayIds.filter( ( id ) => selectedDayIds.has( id ) ).length;
	const areAllSelected = selectedCount === selectableDayIds.length;

	function toggleDay( dayId: string, isSelected: boolean ) {
		setSelectedDayIds( ( current ) => {
			const next = new Set( current );

			if (isSelected) next.add( dayId );
			else next.delete( dayId );

			return next;
		} );
	}

	async function replace() {
		if (!chosenExercise || isPending) return;

		setIsPending( true );

		try {
			const dayIds = selectableDayIds.filter( ( id ) => selectedDayIds.has( id ) );

			if (await onReplaceAction( chosenExercise, dayIds )) onOpenChangeAction( false );
		} finally {
			setIsPending( false );
		}
	}

	return (
		<>
			<FeatureDrawerLayout
				isOpen
				placement={ placement }
				rightContentClassName={ "w-[38rem]" }
				onOpenChangeAction={ ( isOpen ) => {
					if (!isPending) onOpenChangeAction( isOpen );
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

						{ days.length > 1 ? (
							<div className={ "space-y-3" }>
								<div className={ "flex items-start justify-between gap-3" }>
									<div className={ "min-w-0" }>
										<p className={ "text-sm font-medium text-foreground" }>
											{ `Está en ${ pluralDays( days.length ) } de esta rutina` }
										</p>
										<p className={ "text-sm text-muted" }>Marcá en cuáles cambiarlo.</p>
									</div>
									{ selectableDayIds.length > 1 ? (
										<Button
											className={ "shrink-0" }
											isDisabled={ isPending }
											size={ "sm" }
											variant={ "ghost" }
											onPress={ () => setSelectedDayIds( new Set( areAllSelected ? [ currentDayId ?? "" ] : selectableDayIds ) ) }
										>
											{ areAllSelected ? "Solo este día" : "Marcar todos" }
										</Button>
									) : null }
								</div>

								{ /* Este dia siempre cambia: desde aca se pidio el cambio. */ }
								<RoutineDayChecklist
									isDisabled={ isPending }
									items={ days.map( ( day ) => ( {
										dayNumber: day.dayNumber,
										detail: day.isFinalized ? "Terminado: no se cambia" : day.prescription ?? "Sin series cargadas",
										id: day.id,
										isCurrent: day.isCurrent,
										isUnavailable: day.isFinalized,
										week: day.week,
									} ) ) }
									selectedIds={ selectedDayIds }
									onToggleAction={ toggleDay }
								/>

								{ finalizedDayCount > 0 ? (
									<p className={ "text-sm text-muted" }>
										Los días que el estudiante ya terminó quedan como los hizo.
									</p>
								) : null }
							</div>
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
					<Drawer.Footer className={ "border-default-100 flex items-center justify-end gap-2 border-t pt-4" }>
						<Button isDisabled={ isPending } variant={ "ghost" } onPress={ () => setChosenExercise( null ) }>
							Volver
						</Button>
						<Button
							className={ "bg-accent text-accent-foreground" }
							isPending={ isPending }
							onPress={ () => void replace() }
						>
							{ selectedCount <= 1 ? "Cambiar en este día" : `Cambiar en ${ pluralDays( selectedCount ) }` }
						</Button>
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
