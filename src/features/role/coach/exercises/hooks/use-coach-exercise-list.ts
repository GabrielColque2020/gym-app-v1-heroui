"use client";

import { useMemo, useState } from "react";

import { usePagination } from "@/components/common";
import {
	ALL_BODY_PARTS,
	BODY_PART_OPTIONS,
	normalizeSearchName,
	type BodyPartFilter,
} from "@/features/exercises/services/exercise-form";
import type { CoachExerciseListItem } from "@/features/role/coach/exercises/types/coach-exercise-list-item";

export const ALL_COACH_EXERCISE_SOURCES = "ALL";
export type CoachExerciseSourceFilter = typeof ALL_COACH_EXERCISE_SOURCES | "GLOBAL" | "COACH" | "OVERRIDE";

type UseCoachExerciseListOptions = {
	exercises: CoachExerciseListItem[];
};

const ITEMS_PER_PAGE = 8;

export function useCoachExerciseList( { exercises }: UseCoachExerciseListOptions ) {
	const [ nameFilter, setNameFilter ] = useState( "" );
	const [ bodyPartFilter, setBodyPartFilter ] = useState<BodyPartFilter>( ALL_BODY_PARTS );
	const [ sourceFilter, setSourceFilter ] = useState<CoachExerciseSourceFilter>( ALL_COACH_EXERCISE_SOURCES );
	const [ page, setPage ] = useState( 1 );

	const bodyParts = useMemo(
		() => BODY_PART_OPTIONS.map( ( option ) => option ),
		[],
	);

	const filteredExercises = useMemo(
		() => {
			const normalizedNameFilter = normalizeSearchName( nameFilter );

			return exercises.filter( ( exercise ) => {
				const matchesName = normalizedNameFilter.length === 0
					|| normalizeSearchName( [
						exercise.name,
						exercise.category,
						exercise.equipment,
						exercise.target,
						exercise.muscleGroup,
						exercise.instructions ?? "",
					].join( " " ) ).includes( normalizedNameFilter );
				const matchesBodyPart = bodyPartFilter === ALL_BODY_PARTS || exercise.bodyPart === bodyPartFilter;
				const matchesSource =
					sourceFilter === ALL_COACH_EXERCISE_SOURCES
					|| ( sourceFilter === "GLOBAL" && exercise.sourceType === "global" )
					|| ( sourceFilter === "COACH" && exercise.sourceType === "coach" && !exercise.isOverride )
					|| ( sourceFilter === "OVERRIDE" && exercise.sourceType === "coach" && exercise.isOverride );

				return matchesName && matchesBodyPart && matchesSource;
			} );
		},
		[ bodyPartFilter, exercises, nameFilter, sourceFilter ],
	);

	const pagination = usePagination( {
		items: filteredExercises,
		itemsPerPage: ITEMS_PER_PAGE,
		page,
	} );
	const hasFilters = nameFilter.trim().length > 0 || bodyPartFilter !== ALL_BODY_PARTS || sourceFilter !== ALL_COACH_EXERCISE_SOURCES;

	function updateNameFilter( value: string ) {
		setNameFilter( value );
		setPage( 1 );
	}

	function updateBodyPartFilter( value: BodyPartFilter ) {
		setBodyPartFilter( value );
		setPage( 1 );
	}

	function updateSourceFilter( value: CoachExerciseSourceFilter ) {
		setSourceFilter( value );
		setPage( 1 );
	}

	function clearFilters() {
		setNameFilter( "" );
		setBodyPartFilter( ALL_BODY_PARTS );
		setSourceFilter( ALL_COACH_EXERCISE_SOURCES );
		setPage( 1 );
	}

	return {
		bodyParts,
		bodyPartFilter,
		changePage: setPage,
		clearFilters,
		filteredExercises,
		hasFilters,
		nameFilter,
		pagination,
		sourceFilter,
		updateBodyPartFilter,
		updateNameFilter,
		updateSourceFilter,
	};
}
