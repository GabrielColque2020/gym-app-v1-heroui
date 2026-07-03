"use client";

import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";

import { Separator } from "@heroui/react";
import { Sheet } from "@heroui-pro/react";

import { ListPagination } from "@/components/common";
import { ExerciseSheet } from "@/features/role/coach/exercises/components/shared/exercise-sheet";
import { useRoutineDayExerciseCatalog } from "@/features/routine/hooks/use-routine-day-exercise-catalog";
import { FeatureSheetLayout } from "@/features/shared/components/feature-sheet-layout";
import { useResponsiveSheetPlacement } from "@/features/shared/hooks/use-responsive-sheet-placement";
import { AddExercisePickerButton } from "@/features/role/coach/routine/components/shared/add-exercise-picker-button";
import { SearchAndCreateExerciseSheetEmptyCta } from "@/features/role/coach/routine/components/shared/search-and-create-exercise-sheet-empty-cta";
import { SearchAndCreateExerciseSheetFilters } from "@/features/role/coach/routine/components/shared/search-and-create-exercise-sheet-filters";
import { SearchAndCreateExerciseSheetHeader } from "@/features/role/coach/routine/components/shared/search-and-create-exercise-sheet-header";
import { useSearchAndCreateExerciseSheetState } from "@/features/role/coach/routine/components/shared/use-search-and-create-exercise-sheet-state";

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
	const {
		handleAddClick,
		handleCreatedExercise,
		handleOpenCreateSheet,
		isCreateSheetOpen,
		isPickerOpen,
		orderValue,
		registerAddButtonRef,
		setIsCreateSheetOpen,
		setIsPickerOpen,
		setOrderValue,
	} = useSearchAndCreateExerciseSheetState( {
		addedExerciseIds,
		currentPage: pagination.currentPage,
		onAddExercise,
		selectedExerciseId,
		suggestedOrder,
		syncCreatedExercise,
	} );
	const isSearching = searchValue !== debouncedSearchValue;

	return (
		<>
			<FeatureSheetLayout
				isOpen={ isPickerOpen }
				placement={ placement }
				trigger={ <AddExercisePickerButton onPress={ () => setOrderValue( String( suggestedOrder ) ) }/> }
				onOpenChange={ setIsPickerOpen }
				rightContentClassName={ "w-[32rem]" }
			>
				<SearchAndCreateExerciseSheetHeader/>

				<Sheet.Body className={ "min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-5" }>
					<SearchAndCreateExerciseSheetFilters
						addedExerciseIds={ addedExerciseIds }
						bodyPartFilter={ bodyPartFilter }
						debouncedSearchValue={ searchValue }
						exercises={ filteredExercises }
						exercisesQuery={ {
							error: exercisesQuery.error ? { message: exercisesQuery.error.message } : null,
							isError: exercisesQuery.isError,
							isLoading: exercisesQuery.isLoading,
						} }
						isSearching={ isSearching }
						onAddExercise={ handleAddClick }
						onBodyPartFilterChange={ updateBodyPartFilter }
						onOrderChange={ setOrderValue }
						onRegisterAddButtonRef={ registerAddButtonRef }
						onSearchValueChange={ updateSearchValue }
						orderValue={ orderValue }
						selectedExerciseId={ selectedExerciseId }
					/>

					{ !exercisesQuery.isLoading && !exercisesQuery.isError && pagination.paginatedItems.length > 0 ? (
						<div className={ "space-y-3" }>
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

					<Separator/>

					<SearchAndCreateExerciseSheetEmptyCta onPress={ handleOpenCreateSheet }/>
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
