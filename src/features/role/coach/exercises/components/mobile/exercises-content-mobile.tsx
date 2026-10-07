"use client";

import { useRef } from "react";

import { ListPagination } from "@/components/common";
import { CoachExercisesEmptyState } from "@/features/role/coach/exercises/components/shared/coach-exercises-empty-state";
import { ExerciseFilters } from "@/features/role/coach/exercises/components/shared/exercise-filters";
import { useCoachExerciseList } from "@/features/role/coach/exercises/hooks/use-coach-exercise-list";
import type { CoachExerciseListItem } from "@/features/role/coach/exercises/types/coach-exercise-list-item";
import { ExerciseMobileCard } from "@/features/role/coach/exercises/components/mobile/exercise-mobile-card";

type ExercisesContentMobileProps = {
	exercises: CoachExerciseListItem[];
};

export function ExercisesContentMobile( { exercises }: ExercisesContentMobileProps ) {
	const {
		bodyParts,
		bodyPartFilter,
		changePage,
		clearFilters,
		filteredExercises,
		hasFilters,
		nameFilter,
		pagination,
		sourceFilter,
		updateBodyPartFilter,
		updateNameFilter,
		updateSourceFilter,
	} = useCoachExerciseList( { exercises } );
	const {
		currentPage,
		paginatedItems: paginatedExercises,
		showingFrom,
		showingTo,
		totalItems,
		totalPages,
	} = pagination;

	const listRef = useRef<HTMLDivElement | null>( null );

	// Los botones de pagina estan al final: al cambiar, se vuelve al principio de
	// la lista para no quedar mirando el fondo de la pagina nueva.
	function handlePageChange( nextPage: number ) {
		changePage( nextPage );
		listRef.current?.scrollIntoView( { block: "start" } );
	}

	if (exercises.length === 0) {
		return <CoachExercisesEmptyState message={ "No hay ejercicios cargados" }/>;
	}

	return (
		<div className={ "flex w-full flex-col gap-3" }>
			<ExerciseFilters
				bodyParts={ bodyParts }
				bodyPartFilter={ bodyPartFilter }
				hasFilters={ hasFilters }
				layout={ "mobile" }
				nameFilter={ nameFilter }
				onBodyPartFilterChangeAction={ updateBodyPartFilter }
				onClearFiltersAction={ clearFilters }
				onNameFilterChangeAction={ updateNameFilter }
				onSourceFilterChangeAction={ updateSourceFilter }
				sourceFilter={ sourceFilter }
			/>

			{ filteredExercises.length === 0 ? (
				<CoachExercisesEmptyState message={ "No hay ejercicios que coincidan con los filtros" }/>
			) : (
				<>
					<div ref={ listRef } className={ "grid scroll-mt-20 gap-2" }>
						{ paginatedExercises.map( ( exercise ) => (
							<ExerciseMobileCard key={ exercise.id } exercise={ exercise }/>
						) ) }
					</div>

					<ListPagination
						currentPage={ currentPage }
						itemLabel={ "ejercicios" }
						showingFrom={ showingFrom }
						showingTo={ showingTo }
						totalItems={ totalItems }
						totalPages={ totalPages }
						onPageChangeAction={ handlePageChange }
					/>
				</>
			) }
		</div>
	);
}
