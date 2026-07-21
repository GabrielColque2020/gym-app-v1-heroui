"use client";

import type {ExerciseListItem} from "@/features/exercises/types/exercise-list-item";

import {Description, Drawer, Separator} from "@heroui/react";

import {ListPagination} from "@/components/common";
import {ExerciseDrawer} from "@/features/role/coach/exercises/components/shared/exercise-drawer";
import {useRoutineDayExerciseCatalog} from "@/features/routine/hooks/use-routine-day-exercise-catalog";
import {FeatureDrawerLayout} from "@/features/shared/components/feature-drawer-layout";
import {useResponsiveDrawerPlacement} from "@/features/shared/hooks/use-responsive-drawer-placement";
import {AddExercisePickerButton} from "@/features/role/coach/routine/components/shared/add-exercise-picker-button";
import {
    SearchAndCreateExerciseDrawerEmptyCta
} from "@/features/role/coach/routine/components/shared/search-and-create-exercise-drawer-empty-cta";
import {
    SearchAndCreateExerciseDrawerFilters
} from "@/features/role/coach/routine/components/shared/search-and-create-exercise-drawer-filters";
import {
    useSearchAndCreateExerciseDrawerState
} from "@/features/role/coach/routine/components/shared/use-search-and-create-exercise-drawer-state";
import {Plus} from "lucide-react";

type AddExercisePickerDrawerContentProps = {
    addedExerciseIds: Set<string>;
    onAddExerciseAction: (exercise: ExerciseListItem, order: number) => void;
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
    const {
        handleAddClick,
        handleCreatedExercise,
        handleOpenCreateDrawer,
        isCreateDrawerOpen,
        isPickerOpen,
        orderValue,
        registerAddButtonRef,
        setIsCreateDrawerOpen,
        setIsPickerOpen,
        setOrderValue,
    } = useSearchAndCreateExerciseDrawerState({
        addedExerciseIds,
        currentPage: pagination.currentPage,
        onAddExerciseAction,
        selectedExerciseId,
        suggestedOrder,
        syncCreatedExerciseAction: syncCreatedExercise,
    });
    const isSearching = searchValue !== debouncedSearchValue;

    return (
        <>
            <FeatureDrawerLayout
                isOpen={isPickerOpen}
                placement={placement}
                trigger={<AddExercisePickerButton onPress={() => setOrderValue(String(suggestedOrder))}/>}
                onOpenChangeAction={setIsPickerOpen}
                rightContentClassName={"w-[38rem]"}
            >
                <Drawer.Header className={"border-default-100 relative border-b pb-4"}>
                    <div className={"flex min-w-0 items-start gap-3 pe-10"}>
                        <div
                            className={"flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent"}>
                            <Plus className={"size-5"}/>
                        </div>
                        <div className={"min-w-0 flex-1"}>
                            <Drawer.Heading>Agregar ejercicio</Drawer.Heading>
                            <Description className={"mt-1 text-sm"}>
                                Busca en el catalogo activo y agregalo al borrador del dia.
                            </Description>
                        </div>
                    </div>
                </Drawer.Header>

                <Drawer.Body className={"min-h-0 flex-1 space-y-6 overflow-y-auto py-3"}>
                    <SearchAndCreateExerciseDrawerFilters
                        addedExerciseIds={addedExerciseIds}
                        bodyPartFilter={bodyPartFilter}
                        exercises={pagination.paginatedItems}
                        exercisesQuery={{
                            error: exercisesQuery.error ? {message: exercisesQuery.error.message} : null,
                            isError: exercisesQuery.isError,
                            isLoading: exercisesQuery.isLoading,
                        }}
                        isSearching={isSearching}
                        onAddExerciseAction={handleAddClick}
                        onBodyPartFilterChangeAction={updateBodyPartFilter}
                        onOrderChange={setOrderValue}
                        onRegisterAddButtonRef={registerAddButtonRef}
                        onSearchValueChangeAction={updateSearchValue}
                        orderValue={orderValue}
                        searchValue={searchValue}
                        selectedExerciseId={selectedExerciseId}
                    />

                    {!exercisesQuery.isLoading && !exercisesQuery.isError && pagination.totalItems > 0 ? (
                        <div className={"space-y-3"}>
                            <ListPagination
                                currentPage={pagination.currentPage}
                                itemLabel={"ejercicios"}
                                onPageChangeAction={changePage}
                                showingFrom={pagination.showingFrom}
                                showingTo={pagination.showingTo}
                                totalItems={pagination.totalItems}
                                totalPages={pagination.totalPages}
                            />
                        </div>
                    ) : null}

                    <Separator/>

                    <SearchAndCreateExerciseDrawerEmptyCta onPress={handleOpenCreateDrawer}/>
                </Drawer.Body>
            </FeatureDrawerLayout>

            <ExerciseDrawer
                hideTrigger
                isOpen={isCreateDrawerOpen}
                mode={"create"}
                onOpenChangeAction={setIsCreateDrawerOpen}
                onSuccessAction={handleCreatedExercise}
                placement={placement}
            />
        </>
    );
}
