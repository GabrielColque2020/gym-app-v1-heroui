"use client";

import type { MealPlansStudentListItem } from "@/features/role/coach/meal-plans-students/actions/get-meal-plans-students";

import { useMemo, useState } from "react";

import { usePagination } from "@/components/common";
import { normalizeSearchValue } from "@/features/students/services/student-form";

const ITEMS_PER_PAGE = 5;

type UseMealPlansStudentsListOptions = {
	students: MealPlansStudentListItem[];
};

export function useMealPlansStudentsList( { students }: UseMealPlansStudentsListOptions ) {
	const [ searchFilter, setSearchFilter ] = useState( "" );
	const [ page, setPage ] = useState( 1 );

	const filteredStudents = useMemo(
		() => {
			const normalizedSearchFilter = normalizeSearchValue( searchFilter );

			return students.filter( ( student ) =>
				normalizedSearchFilter.length === 0
				|| normalizeSearchValue( student.name ).includes( normalizedSearchFilter )
				|| normalizeSearchValue( student.email ).includes( normalizedSearchFilter )
				|| String( student.dni ).includes( normalizedSearchFilter )
			);
		},
		[ searchFilter, students ],
	);

	const pagination = usePagination( {
		items: filteredStudents,
		itemsPerPage: ITEMS_PER_PAGE,
		page,
	} );
	const hasFilters = searchFilter.trim().length > 0;

	function updateSearchFilter( value: string ) {
		setSearchFilter( value );
		setPage( 1 );
	}

	function clearFilters() {
		setSearchFilter( "" );
		setPage( 1 );
	}

	return {
		changePage: setPage,
		clearFilters,
		filteredStudents,
		hasFilters,
		pagination,
		searchFilter,
		updateSearchFilter,
	};
}
