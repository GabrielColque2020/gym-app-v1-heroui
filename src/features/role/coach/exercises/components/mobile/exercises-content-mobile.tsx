"use client";

import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";

import { ListPagination } from "@/components/common";
import { ExerciseMobileCard } from "@/features/role/coach/exercises/components/mobile/exercise-mobile-card";
import { CoachExercisesEmptyState } from "@/features/role/coach/exercises/components/shared/coach-exercises-empty-state";
import { ExerciseFilters } from "@/features/role/coach/exercises/components/shared/exercise-filters";
import { useExerciseList } from "@/features/exercises/hooks/use-exercise-list";

type ExercisesTableMobileProps = {
	exercises: ExerciseListItem[];
};

export function ExercisesContentMobile( { exercises }: ExercisesTableMobileProps ) {
	const {
		bodyPartFilter,
		changePage,
		clearFilters,
		filteredExercises,
		hasFilters,
		nameFilter,
		pagination,
		updateBodyPartFilter,
		updateNameFilter,
	} = useExerciseList( { exercises } );
	const {
		currentPage,
		paginatedItems: paginatedExercises,
		showingFrom,
		showingTo,
		totalItems,
		totalPages,
	} = pagination;

	if (exercises.length === 0) {
		return <CoachExercisesEmptyState message={ "No hay ejercicios cargados" }/>;
	}

	return (
		<div className={ "flex w-full flex-col gap-4" }>
			<ExerciseFilters
				bodyPartFilter={ bodyPartFilter }
				hasFilters={ hasFilters }
				layout={ "mobile" }
				nameFilter={ nameFilter }
				onBodyPartFilterChange={ updateBodyPartFilter }
				onClearFilters={ clearFilters }
				onNameFilterChange={ updateNameFilter }
			/>

			{ filteredExercises.length === 0 ? (
				<CoachExercisesEmptyState message={ "No hay ejercicios que coincidan con los filtros" }/>
			) : (
				<>
					<div className={ "grid gap-3" }>
						{ paginatedExercises.map( ( exercise ) => (
							<ExerciseMobileCard key={ exercise.id } exercise={ exercise }/>
						) ) }
					</div>

					<ListPagination
						currentPage={ currentPage }
						mode={ "compact" }
						showingFrom={ showingFrom }
						showingTo={ showingTo }
						totalItems={ totalItems }
						totalPages={ totalPages }
						onPageChange={ changePage }
					/>
				</>
			) }
		</div>
	);
}
