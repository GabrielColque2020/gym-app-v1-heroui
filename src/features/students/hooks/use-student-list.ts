"use client";

import type { StudentListItem } from "@/features/students/actions/get-students";
import type { StudentStatusFilter } from "@/features/students/services/student-form";

import { useMemo } from "react";

import { usePagination } from "@/components/common";
import {
	ACTIVE_STATUS,
	ALL_STATUSES,
	INACTIVE_STATUS,
	normalizeSearchValue,
} from "@/features/students/services/student-form";
import { useUrlEnum, useUrlPage, useUrlText } from "@/lib/use-url-state";

// Con 5, un entrenador con 40 estudiantes tenia 8 paginas.
const ITEMS_PER_PAGE = 10;
const STATUS_FILTERS = [ ALL_STATUSES, ACTIVE_STATUS, INACTIVE_STATUS ] as const;

type UseStudentListOptions = {
	students: StudentListItem[];
};

export function useStudentList( { students }: UseStudentListOptions ) {
	// En la URL: al abrir un estudiante y volver, la lista sigue como estaba.
	const [ searchFilter, setSearchFilter ] = useUrlText( "buscar" );
	const [ statusFilter, setStatusFilter ] = useUrlEnum<StudentStatusFilter>( "estado", ALL_STATUSES, STATUS_FILTERS );
	const [ page, setPage ] = useUrlPage();

	const filteredStudents = useMemo(
		() => {
			const normalizedSearchFilter = normalizeSearchValue( searchFilter );

			return students.filter( ( student ) => {
				const matchesSearch = normalizedSearchFilter.length === 0
					|| normalizeSearchValue( student.name ).includes( normalizedSearchFilter )
					|| normalizeSearchValue( student.email ).includes( normalizedSearchFilter )
					|| String( student.dni ).includes( normalizedSearchFilter );
				const matchesStatus = statusFilter === ALL_STATUSES
					|| (statusFilter === ACTIVE_STATUS && student.active)
					|| (statusFilter === INACTIVE_STATUS && !student.active);

				return matchesSearch && matchesStatus;
			} );
		},
		[ searchFilter, statusFilter, students ],
	);

	const pagination = usePagination( {
		items: filteredStudents,
		itemsPerPage: ITEMS_PER_PAGE,
		page,
	} );
	const hasFilters = searchFilter.trim().length > 0 || statusFilter !== ALL_STATUSES;

	function updateSearchFilter( value: string ) {
		setSearchFilter( value );
		setPage( 1 );
	}

	function updateStatusFilter( value: StudentStatusFilter ) {
		setStatusFilter( value );
		setPage( 1 );
	}

	function clearFilters() {
		setSearchFilter( "" );
		setStatusFilter( ALL_STATUSES );
		setPage( 1 );
	}

	return {
		changePage: setPage,
		clearFilters,
		filteredStudents,
		hasFilters,
		pagination,
		searchFilter,
		statusFilter,
		updateSearchFilter,
		updateStatusFilter,
	};
}
