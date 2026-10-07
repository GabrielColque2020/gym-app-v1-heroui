"use client";

import { useMemo, useState } from "react";

import { usePagination } from "@/components/common";
import { normalizeSearchName } from "@/features/exercises/services/exercise-form";
import type { AdminExerciseGlobalListItem } from "@/features/role/admin/exercises/types/admin-exercise-global-list-item";
import { ADMIN_EXERCISE_GLOBAL_MOBILE_PAGE_SIZE, ADMIN_EXERCISE_GLOBAL_PAGE_SIZE, type AdminExerciseGlobalStatusFilter } from "@/features/role/admin/exercises/services/admin-exercise-global-query";

export const ADMIN_EXERCISE_GLOBAL_STATUS_FILTERS = [ "ALL", "ACTIVE", "INACTIVE" ] as const;

// El ejercicio con cuantos del catalogo comparten su nombre (1 si es unico).
export type AdminExerciseGlobalRow = AdminExerciseGlobalListItem & {
	sameNameCount: number;
};

// El codigo es lo unico que distingue a dos ejercicios con el mismo nombre.
export function formatAdminExerciseCode( exercise: AdminExerciseGlobalListItem ) {
	const code = exercise.externalId?.trim();

	return code ? `cód. ${ code }` : "sin código";
}

type UseAdminExerciseGlobalsPageStateOptions = {
	exercises: AdminExerciseGlobalListItem[];
};

export function useAdminExerciseGlobalsPageState( { exercises }: UseAdminExerciseGlobalsPageStateOptions ) {
	const [ search, setSearch ] = useState( "" );
	const [ statusFilter, setStatusFilter ] = useState<AdminExerciseGlobalStatusFilter>( "ALL" );
	const [ categoryFilter, setCategoryFilter ] = useState( "ALL" );
	const [ page, setPage ] = useState( 1 );
	const [ onlyDuplicates, setOnlyDuplicates ] = useState( false );
	const rows = useMemo<AdminExerciseGlobalRow[]>( () => {
		const countByName = new Map<string, number>();

		for (const exercise of exercises) {
			const key = normalizeSearchName( exercise.name );
			countByName.set( key, ( countByName.get( key ) ?? 0 ) + 1 );
		}

		return exercises.map( ( exercise ) => ( {
			...exercise,
			sameNameCount: countByName.get( normalizeSearchName( exercise.name ) ) ?? 1,
		} ) );
	}, [ exercises ] );
	const duplicateCount = useMemo( () => rows.filter( ( row ) => row.sameNameCount > 1 ).length, [ rows ] );

	const categories = useMemo(
		() => {
			const uniqueCategories = new Set( exercises.map( ( exercise ) => exercise.category ) );

			return Array.from( uniqueCategories ).sort( ( left, right ) => left.localeCompare( right, "es" ) );
		},
		[ exercises ],
	);

	const filteredExercises = useMemo(
		() => {
			const normalizedSearch = normalizeSearchName( search );

			const matchingRows = rows.filter( ( exercise ) => {
				const matchesSearch =
					normalizedSearch.length === 0
					|| normalizeSearchName( [
						exercise.id,
						exercise.externalId ?? "",
						exercise.name,
						exercise.category,
						exercise.target,
						exercise.muscleGroup,
						exercise.equipment,
						exercise.instructions ?? "",
						exercise.searchName ?? "",
					].join( " " ) ).includes( normalizedSearch );
				const matchesStatus =
					statusFilter === "ALL"
					|| ( statusFilter === "ACTIVE" && exercise.active )
					|| ( statusFilter === "INACTIVE" && !exercise.active );
				const matchesCategory = categoryFilter === "ALL" || exercise.category === categoryFilter;

				return matchesSearch && matchesStatus && matchesCategory && ( !onlyDuplicates || exercise.sameNameCount > 1 );
			} );

			// Al revisar repetidos se ordena por nombre, para que queden uno al lado del otro.
			return onlyDuplicates
				? [ ...matchingRows ].sort( ( left, right ) => left.name.localeCompare( right.name, "es" ) )
				: matchingRows;
		},
		[ categoryFilter, onlyDuplicates, rows, search, statusFilter ],
	);

	const pagination = usePagination( {
		items: filteredExercises,
		itemsPerPage: ADMIN_EXERCISE_GLOBAL_PAGE_SIZE,
		mobileItemsPerPage: ADMIN_EXERCISE_GLOBAL_MOBILE_PAGE_SIZE,
		page,
	} );

	function updateNameFilter( value: string ) {
		setSearch( value );
		setPage( 1 );
	}

	function updateStatusFilter( value: AdminExerciseGlobalStatusFilter | null ) {
		if (value === null) {
			return;
		}

		setStatusFilter( value );
		setPage( 1 );
	}

	function updateCategoryFilter( value: string | null ) {
		if (value === null) {
			return;
		}

		setCategoryFilter( value );
		setPage( 1 );
	}

	function toggleOnlyDuplicates() {
		setOnlyDuplicates( ( current ) => !current );
		setPage( 1 );
	}

	return {
		categories,
		categoryFilter,
		duplicateCount,
		onlyDuplicates,
		toggleOnlyDuplicates,
		filteredExercises,
		page,
		pagination,
		search,
		setPage,
		statusFilter,
		updateCategoryFilter,
		updateNameFilter,
		updateStatusFilter,
	};
}
