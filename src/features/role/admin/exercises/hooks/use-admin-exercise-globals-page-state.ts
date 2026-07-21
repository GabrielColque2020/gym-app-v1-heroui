"use client";

import { useMemo, useState } from "react";

import { usePagination } from "@/components/common";
import { normalizeSearchName } from "@/features/exercises/services/exercise-form";
import type { AdminExerciseGlobalListItem } from "@/features/role/admin/exercises/types/admin-exercise-global-list-item";
import { ADMIN_EXERCISE_GLOBAL_PAGE_SIZE, type AdminExerciseGlobalStatusFilter } from "@/features/role/admin/exercises/services/admin-exercise-global-query";

export const ADMIN_EXERCISE_GLOBAL_STATUS_FILTERS = [ "ALL", "ACTIVE", "INACTIVE" ] as const;

type UseAdminExerciseGlobalsPageStateOptions = {
	exercises: AdminExerciseGlobalListItem[];
};

export function useAdminExerciseGlobalsPageState( { exercises }: UseAdminExerciseGlobalsPageStateOptions ) {
	const [ search, setSearch ] = useState( "" );
	const [ statusFilter, setStatusFilter ] = useState<AdminExerciseGlobalStatusFilter>( "ALL" );
	const [ categoryFilter, setCategoryFilter ] = useState( "ALL" );
	const [ page, setPage ] = useState( 1 );

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

			return exercises.filter( ( exercise ) => {
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

				return matchesSearch && matchesStatus && matchesCategory;
			} );
		},
		[ categoryFilter, exercises, search, statusFilter ],
	);

	const pagination = usePagination( {
		items: filteredExercises,
		itemsPerPage: ADMIN_EXERCISE_GLOBAL_PAGE_SIZE,
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

	return {
		categories,
		categoryFilter,
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
