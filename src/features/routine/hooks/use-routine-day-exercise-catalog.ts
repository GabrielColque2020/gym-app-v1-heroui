"use client";

import type { BodyPartFilter } from "@/features/exercises/services/exercise-form";

import { useMemo, useState } from "react";

import { usePagination } from "@/components/common";
import {
	ALL_BODY_PARTS,
	normalizeSearchName,
} from "@/features/exercises/services/exercise-form";
import { useDebouncedValue } from "@/features/shared/hooks/use-debounced-value";
import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import { useCoachExercises } from "@/features/role/coach/exercises/hooks/use-coach-exercises";
import type { CoachExerciseListItem } from "@/features/role/coach/exercises/types/coach-exercise-list-item";

const ITEMS_PER_PAGE = 5;
const SEARCH_DEBOUNCE_MS = 400;

type UseRoutineDayExerciseCatalogOptions = {
	initialSelectedExerciseId?: string | null;
};

export function useRoutineDayExerciseCatalog( { initialSelectedExerciseId }: UseRoutineDayExerciseCatalogOptions = {} ) {
	const [ searchValue, setSearchValue ] = useState( "" );
	const [ bodyPartFilter, setBodyPartFilter ] = useState<BodyPartFilter>( ALL_BODY_PARTS );
	const [ page, setPage ] = useState( 1 );
	const [ selectedExerciseId, setSelectedExerciseId ] = useState( initialSelectedExerciseId ?? null );
	const debouncedSearchValue = useDebouncedValue( searchValue, SEARCH_DEBOUNCE_MS );
	const exercisesQuery = useCoachExercises();

	const exercises = useMemo<ExerciseListItem[]>(
		() => ( exercisesQuery.data ?? [] )
			.filter( ( exercise: CoachExerciseListItem ) => exercise.active )
			.map( ( exercise: CoachExerciseListItem ) => ( {
				active: exercise.active,
				bodyPart: exercise.bodyPart,
				createdAt: exercise.createdAt,
				id: exercise.id,
				imageUrl: exercise.imageUrl,
				name: exercise.name,
				tips: exercise.tips,
				videoUrl: exercise.videoUrl,
			} ) ),
		[ exercisesQuery.data ],
	);

	const filteredExercises = useMemo(
		() => {
			const normalizedNameFilter = normalizeSearchName( debouncedSearchValue );

			return exercises.filter( ( exercise ) => {
				const matchesName = normalizedNameFilter.length === 0
					|| normalizeSearchName( exercise.name ).includes( normalizedNameFilter );
				const matchesBodyPart = bodyPartFilter === ALL_BODY_PARTS || exercise.bodyPart === bodyPartFilter;

				return matchesName && matchesBodyPart;
			} );
		},
		[ bodyPartFilter, debouncedSearchValue, exercises ],
	);

	const pagination = usePagination( {
		items: filteredExercises,
		itemsPerPage: ITEMS_PER_PAGE,
		page,
	} );
	const visibleSelectedExerciseId = filteredExercises.some( ( exercise ) => exercise.id === selectedExerciseId )
		? selectedExerciseId
		: null;

	function selectExercise( exerciseId: string ) {
		setSelectedExerciseId( exerciseId );
	}

	function updateSearchValue( value: string ) {
		setSearchValue( value );
		setPage( 1 );
	}

	function updateBodyPartFilter( value: BodyPartFilter ) {
		setBodyPartFilter( value );
		setPage( 1 );
	}

	function syncCreatedExercise( exercise: ExerciseListItem ) {
		setSearchValue( "" );
		setBodyPartFilter( ALL_BODY_PARTS );
		setPage( 1 );
		setSelectedExerciseId( exercise.id );
	}

	return {
		bodyPartFilter,
		changePage: setPage,
		debouncedSearchValue,
		exercisesQuery,
		filteredExercises,
		pagination,
		searchValue,
		selectExercise,
		selectedExerciseId: visibleSelectedExerciseId,
		syncCreatedExercise,
		updateBodyPartFilter,
		updateSearchValue,
	};
}

export { SEARCH_DEBOUNCE_MS };
