"use client";

import type { BodyPartFilter } from "@/features/exercises/services/exercise-form";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getRecentRoutineExerciseIdsAction } from "@/features/routine/actions/get-recent-routine-exercises";

import { usePagination } from "@/components/common";
import {
	ALL_BODY_PARTS,
	normalizeSearchName,
} from "@/features/exercises/services/exercise-form";
import { useDebouncedValue } from "@/features/shared/hooks/use-debounced-value";
import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import { useCoachExercises } from "@/features/role/coach/exercises/hooks/use-coach-exercises";
import type { CoachExerciseListItem } from "@/features/role/coach/exercises/types/coach-exercise-list-item";

const ITEMS_PER_PAGE = 10;
const SEARCH_DEBOUNCE_MS = 250;

export const RECENT_ROUTINE_EXERCISES_QUERY_KEY = [ "coach-recent-routine-exercises" ] as const;

export type RoutineCatalogExercise = ExerciseListItem & {
	// Codigo del catalogo: lo unico que distingue a dos ejercicios de igual nombre.
	catalogCode: string | null;
	equipment: string;
	// Posicion entre los usados recientemente, o `null` si no esta entre ellos.
	recentRank: number | null;
	// Cuantos ejercicios del catalogo comparten este nombre, contando este.
	sameNameCount: number;
};

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
	const recentExerciseIdsQuery = useQuery( {
		queryFn: getRecentRoutineExerciseIdsAction,
		queryKey: RECENT_ROUTINE_EXERCISES_QUERY_KEY,
		staleTime: 60 * 1000,
	} );

	const exercises = useMemo<RoutineCatalogExercise[]>(
		() => {
			// Posicion de cada ejercicio entre los recientes: 0 es el ultimo que se uso.
			const recentRankById = new Map(
				( recentExerciseIdsQuery.data ?? [] ).map( ( exerciseId, index ) => [ exerciseId, index ] ),
			);

			const activeExercises = ( exercisesQuery.data ?? [] )
				.filter( ( exercise: CoachExerciseListItem ) => exercise.active );
			// El catalogo trae ejercicios distintos con el mismo nombre: se cuentan
			// para avisarle al coach, que si no los ve como uno solo repetido.
			const countByName = new Map<string, number>();

			for (const exercise of activeExercises) {
				const nameKey = normalizeSearchName( exercise.name );

				countByName.set( nameKey, ( countByName.get( nameKey ) ?? 0 ) + 1 );
			}

			return activeExercises
				.map( ( exercise: CoachExerciseListItem ) => ( {
					active: exercise.active,
					bodyPart: exercise.bodyPart,
					catalogCode: exercise.externalId?.trim() || null,
					createdAt: exercise.createdAt,
					equipment: exercise.equipment,
					id: exercise.id,
					imageUrl: exercise.imageUrl,
					name: exercise.name,
					recentRank: recentRankById.get( exercise.coachExerciseId ?? exercise.id ) ?? null,
					sameNameCount: countByName.get( normalizeSearchName( exercise.name ) ) ?? 1,
					tips: exercise.tips,
					videoUrl: exercise.videoUrl,
				} ) );
		},
		[ exercisesQuery.data, recentExerciseIdsQuery.data ],
	);

	const filteredExercises = useMemo(
		() => {
			// Cada palabra tiene que estar, en cualquier orden: "prensa trineo" encuentra
			// "45° prensa de piernas con trineo".
			const searchWords = normalizeSearchName( debouncedSearchValue ).split( " " ).filter( Boolean );

			const matches = exercises.filter( ( exercise ) => {
				const searchableText = normalizeSearchName( `${ exercise.name } ${ exercise.equipment }` );
				const matchesName = searchWords.every( ( word ) => searchableText.includes( word ) );
				const matchesBodyPart = bodyPartFilter === ALL_BODY_PARTS || exercise.bodyPart === bodyPartFilter;

				return matchesName && matchesBodyPart;
			} );

			// Primero los usados recientemente; el resto conserva el orden alfabetico.
			return matches
				.map( ( exercise, index ) => ( { exercise, index } ) )
				.sort( ( left, right ) => {
					const leftRank = left.exercise.recentRank ?? Number.POSITIVE_INFINITY;
					const rightRank = right.exercise.recentRank ?? Number.POSITIVE_INFINITY;

					return leftRank === rightRank ? left.index - right.index : leftRank - rightRank;
				} )
				.map( ( { exercise } ) => exercise );
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
