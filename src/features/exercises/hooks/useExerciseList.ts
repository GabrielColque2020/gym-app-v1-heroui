"use client";

import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import type { BodyPartFilter } from "@/features/exercises/services/exercise-form";

import { useMemo, useState } from "react";

import { usePagination } from "@/components/common";
import {
	ALL_BODY_PARTS,
	normalizeSearchName,
} from "@/features/exercises/services/exercise-form";

const ITEMS_PER_PAGE = 5;

type UseExerciseListOptions = {
	exercises: ExerciseListItem[];
};

export function useExerciseList( { exercises }: UseExerciseListOptions ) {
	const [ nameFilter, setNameFilter ] = useState( "" );
	const [ bodyPartFilter, setBodyPartFilter ] = useState<BodyPartFilter>( ALL_BODY_PARTS );
	const [ page, setPage ] = useState( 1 );

	const filteredExercises = useMemo(
		() => {
			const normalizedNameFilter = normalizeSearchName( nameFilter );

			return exercises.filter( ( exercise ) => {
				const matchesName = normalizedNameFilter.length === 0
					|| normalizeSearchName( exercise.name ).includes( normalizedNameFilter );
				const matchesBodyPart = bodyPartFilter === ALL_BODY_PARTS || exercise.bodyPart === bodyPartFilter;

				return matchesName && matchesBodyPart;
			} );
		},
		[ bodyPartFilter, exercises, nameFilter ],
	);

	const pagination = usePagination( {
		items: filteredExercises,
		itemsPerPage: ITEMS_PER_PAGE,
		page,
	} );
	const hasFilters = nameFilter.trim().length > 0 || bodyPartFilter !== ALL_BODY_PARTS;

	function updateNameFilter( value: string ) {
		setNameFilter( value );
		setPage( 1 );
	}

	function updateBodyPartFilter( value: BodyPartFilter ) {
		setBodyPartFilter( value );
		setPage( 1 );
	}

	function clearFilters() {
		setNameFilter( "" );
		setBodyPartFilter( ALL_BODY_PARTS );
		setPage( 1 );
	}

	return {
		bodyPartFilter,
		changePage: setPage,
		clearFilters,
		filteredExercises,
		hasFilters,
		nameFilter,
		pagination,
		updateBodyPartFilter,
		updateNameFilter,
	};
}
