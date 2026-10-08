"use client";

import type {ExerciseListItem} from "@/features/exercises/types/exercise-list-item";

import {Button, Description, Drawer} from "@heroui/react";

import {ListPagination} from "@/components/common";
import {ExerciseDrawer} from "@/features/role/coach/exercises/components/shared/exercise-drawer";
import {useRoutineDayExerciseCatalog} from "@/features/routine/hooks/use-routine-day-exercise-catalog";
import {FeatureDrawerLayout} from "@/features/shared/components/feature-drawer-layout";
import {useResponsiveDrawerPlacement} from "@/features/shared/hooks/use-responsive-drawer-placement";
import {AddExercisePickerButton} from "@/features/role/coach/routine/components/shared/add-exercise-picker-button";
import {
    SearchAndCreateExerciseDrawerFilters
} from "@/features/role/coach/routine/components/shared/search-and-create-exercise-drawer-filters";
import {
    SearchAndCreateExerciseDrawerPrescription
} from "@/features/role/coach/routine/components/shared/search-and-create-exercise-drawer-prescription";
import {
    type ExercisePrescription,
    useSearchAndCreateExerciseDrawerState
} from "@/features/role/coach/routine/components/shared/use-search-and-create-exercise-drawer-state";
import {Plus} from "lucide-react";

type AddExercisePickerDrawerContentProps = {
    addedExerciseIds: Set<string>;
    onAddExerciseAction: (exercise: ExerciseListItem, order: number, prescription: ExercisePrescription) => void;
    suggestedOrder: number;
};

export function SearchAndCreateExerciseDrawer({
                                                  addedExerciseIds,
                                                  onAddExerciseAction,
                                                  suggestedOrder,
                                              }: AddExercisePickerDrawerContentProps) {
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
    // Despues de agregar un ejercicio la busqueda vuelve a quedar vacia.
    const clearSearch = () => updateSearchValue( "" );
    const {
        addedCount,
        handleAddClick,
        handlePickerOpenChange,
        handleCreatedExercise,
        handleOpenCreateDrawer,
        isCreateDrawerOpen,
        isPickerOpen,
        orderValue,
        registerAddButtonRef,
        repsValue,
        setIsCreateDrawerOpen,
        setOrderValue,
        setRepsValue,
        restValue,
        setRestValue,
        setSetsValue,
        setsValue,
    } = useSearchAndCreateExerciseDrawerState({
        addedExerciseIds,
        currentPage: pagination.currentPage,
        onAddedAction: clearSearch,
        onAddExerciseAction,
        selectedExerciseId,
        suggestedOrder,
        syncCreatedExerciseAction: syncCreatedExercise,
    });
    const isSearching = searchValue !== debouncedSearchValue;

    return (
        <>
            <FeatureDrawerLayout
                isOpen={ isPickerOpen }
                placement={ placement }
                trigger={ <AddExercisePickerButton onPress={ () => setOrderValue(String(suggestedOrder)) }/> }
                onOpenChangeAction={ handlePickerOpenChange }
                rightContentClassName={ "w-[38rem]" }
            >
                <Drawer.Header className={ "border-default-100 relative border-b pb-4" }>
                    <div className={ "flex min-w-0 items-start gap-3 pe-10" }>
                        <div
                            className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
                            <Plus className={ "size-5" }/>
                        </div>
                        <div className={ "min-w-0 flex-1" }>
                            <Drawer.Heading>Agregar ejercicio</Drawer.Heading>
                            <Description className={ "mt-1 hidden text-sm sm:block" }>
                                Buscá en tu catálogo y sumá todos los ejercicios del día sin cerrar.
                            </Description>
                        </div>
                    </div>
                </Drawer.Header>

                <Drawer.Body className={ "min-h-0 flex-1 space-y-3 overflow-y-auto py-3 sm:space-y-6" }>
                    <SearchAndCreateExerciseDrawerPrescription
                        repsValue={ repsValue }
                        setsValue={ setsValue }
                        onRepsChange={ setRepsValue }
                        restValue={ restValue }
                        onRestChange={ setRestValue }
                        onSetsChange={ setSetsValue }
                    />

                    <SearchAndCreateExerciseDrawerFilters
                        addedExerciseIds={ addedExerciseIds }
                        bodyPartFilter={ bodyPartFilter }
                        exercises={ pagination.paginatedItems }
                        exercisesQuery={ {
                            error: exercisesQuery.error ? {message: exercisesQuery.error.message} : null,
                            isError: exercisesQuery.isError,
                            isLoading: exercisesQuery.isLoading,
                        } }
                        isSearching={ isSearching }
                        onAddExerciseAction={ handleAddClick }
                        onCreateExerciseAction={ handleOpenCreateDrawer }
                        onBodyPartFilterChangeAction={ updateBodyPartFilter }
                        onOrderChange={ setOrderValue }
                        onRegisterAddButtonRef={ registerAddButtonRef }
                        onSearchValueChangeAction={ updateSearchValue }
                        orderValue={ orderValue }
                        searchValue={ searchValue }
                        selectedExerciseId={ selectedExerciseId }
                    />

                    { !exercisesQuery.isLoading && !exercisesQuery.isError && pagination.totalItems > 0 ? (
                        <div className={ "space-y-3" }>
                            <ListPagination
                                currentPage={ pagination.currentPage }
                                itemLabel={ "ejercicios" }
                                onPageChangeAction={ changePage }
                                showingFrom={ pagination.showingFrom }
                                showingTo={ pagination.showingTo }
                                totalItems={ pagination.totalItems }
                                totalPages={ pagination.totalPages }
                            />
                        </div>
                    ) : null }
                </Drawer.Body>

                <Drawer.Footer className={ "border-default-100 flex items-center justify-between gap-3 border-t pt-4" }>
                    <p className={ "text-sm text-muted" } role={ "status" }>
                        { addedCount === 0
                            ? "Todavía no agregaste ejercicios"
                            : `${addedCount} ${addedCount === 1 ? "ejercicio agregado" : "ejercicios agregados"}` }
                    </p>
                    <Button className={ "bg-accent text-accent-foreground" } onPress={ () => handlePickerOpenChange(false) }>
                        Listo
                    </Button>
                </Drawer.Footer>
            </FeatureDrawerLayout>

            <ExerciseDrawer
                hideTrigger
                isOpen={ isCreateDrawerOpen }
                mode={ "create" }
                onOpenChangeAction={ setIsCreateDrawerOpen }
                onSuccessAction={ handleCreatedExercise }
                placement={ placement }
            />
        </>
    );
}
