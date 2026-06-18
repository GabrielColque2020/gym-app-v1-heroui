"use client";

import type { ExerciseListItem } from "@/features/admin/exercises/actions/get-exercises";
import type { BodyPartFilter } from "@/features/admin/exercises/services/exercise-form";

import { useEffect, useMemo, useState } from "react";

import { usePagination } from "@/components/common";
import { useExercises } from "@/features/admin/exercises/hooks/useExercises";
import {
	ALL_BODY_PARTS,
	normalizeSearchName,
} from "@/features/admin/exercises/services/exercise-form";

const ITEMS_PER_PAGE = 8;
const SEARCH_DEBOUNCE_MS = 400;

function useDebouncedValue<TValue>( value: TValue, delayMs: number ) {
	const [ debouncedValue, setDebouncedValue ] = useState( value );

	useEffect( () => {
		const timeoutId = window.setTimeout( () => {
			setDebouncedValue( value );
		}, delayMs );

		return () => window.clearTimeout( timeoutId );
	}, [ delayMs, value ] );

	return debouncedValue;
}

type UseRoutineDayExerciseCatalogOptions = {
	initialSelectedExerciseId?: string | null;
};

export function useRoutineDayExerciseCatalog( { initialSelectedExerciseId }: UseRoutineDayExerciseCatalogOptions = {} ) {
	const [ searchValue, setSearchValue ] = useState( "" );
	const [ bodyPartFilter, setBodyPartFilter ] = useState<BodyPartFilter>( ALL_BODY_PARTS );
	const [ page, setPage ] = useState( 1 );
	const [ selectedExerciseId, setSelectedExerciseId ] = useState( initialSelectedExerciseId ?? null );
	const debouncedSearchValue = useDebouncedValue( searchValue, SEARCH_DEBOUNCE_MS );
	const exercisesQuery = useExercises();

	const filteredExercises = useMemo(
		() => {
			const exercises = exercisesQuery.data ?? [];
			const normalizedNameFilter = normalizeSearchName( debouncedSearchValue );

			return exercises.filter( ( exercise ) => {
				if (!exercise.active) return false;

				const matchesName = normalizedNameFilter.length === 0
					|| normalizeSearchName( exercise.name ).includes( normalizedNameFilter );
				const matchesBodyPart = bodyPartFilter === ALL_BODY_PARTS || exercise.bodyPart === bodyPartFilter;

				return matchesName && matchesBodyPart;
			} );
		},
		[ bodyPartFilter, debouncedSearchValue, exercisesQuery.data ],
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
		// Reset filters so the newly created catalog entry is immediately reachable from the picker.
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
