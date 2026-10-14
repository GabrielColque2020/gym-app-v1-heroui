"use client";

import { useMemo } from "react";

import { usePagination } from "@/components/common";
import {
	ALL_BODY_PARTS,
	BODY_PART_OPTIONS,
	normalizeSearchName,
	type BodyPartFilter,
} from "@/features/exercises/services/exercise-form";
import type { CoachExerciseListItem } from "@/features/role/coach/exercises/types/coach-exercise-list-item";
import { useUrlEnum, useUrlPage, useUrlText } from "@/lib/use-url-state";

export const ALL_COACH_EXERCISE_SOURCES = "ALL";
export type CoachExerciseSourceFilter = typeof ALL_COACH_EXERCISE_SOURCES | "GLOBAL" | "COACH" | "OVERRIDE";
const SOURCE_FILTERS: readonly CoachExerciseSourceFilter[] = [ ALL_COACH_EXERCISE_SOURCES, "GLOBAL", "COACH", "OVERRIDE" ];
const BODY_PART_FILTERS: readonly BodyPartFilter[] = [ ALL_BODY_PARTS, ...BODY_PART_OPTIONS.map( ( option ) => option.value ) ];

type UseCoachExerciseListOptions = {
	exercises: CoachExerciseListItem[];
};

const ITEMS_PER_PAGE = 8;
// En el telefono las filas son compactas: con 4 por pagina el catalogo eran mas de 300 paginas.
const MOBILE_ITEMS_PER_PAGE = 10;

export function useCoachExerciseList( { exercises }: UseCoachExerciseListOptions ) {
	// En la URL: al abrir un ejercicio o volver de otra pantalla, la lista sigue como estaba.
	const [ nameFilter, setNameFilter ] = useUrlText( "buscar" );
	const [ bodyPartFilter, setBodyPartFilter ] = useUrlEnum<BodyPartFilter>( "grupo", ALL_BODY_PARTS, BODY_PART_FILTERS );
	const [ sourceFilter, setSourceFilter ] = useUrlEnum<CoachExerciseSourceFilter>( "origen", ALL_COACH_EXERCISE_SOURCES, SOURCE_FILTERS );
	const [ page, setPage ] = useUrlPage();

	const bodyParts = useMemo(
		() => BODY_PART_OPTIONS.map( ( option ) => option ),
		[],
	);

	const filteredExercises = useMemo(
		() => {
			// Se busca por palabras sueltas: "prensa trineo" encuentra "prensa de
			// piernas con trineo". Las instrucciones quedan afuera porque, palabra
			// por palabra, traian ejercicios que no tenian nada que ver.
			const searchWords = normalizeSearchName( nameFilter ).split( " " ).filter( Boolean );

			return exercises.filter( ( exercise ) => {
				const searchableText = searchWords.length === 0
					? ""
					: normalizeSearchName( [
						exercise.name,
						exercise.category,
						exercise.equipment,
						exercise.target,
						exercise.muscleGroup,
					].join( " " ) );
				const matchesName = searchWords.every( ( word ) => searchableText.includes( word ) );
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
		mobileItemsPerPage: MOBILE_ITEMS_PER_PAGE,
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
