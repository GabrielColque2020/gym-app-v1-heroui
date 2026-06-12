"use client";

import type { StudentListItem } from "@/features/admin/user/student/actions/get-students";
import type { StudentStatusFilter } from "@/features/admin/user/student/services/student-form";

import { useMemo, useState } from "react";

import { usePagination } from "@/components/common";
import {
	ACTIVE_STATUS,
	ALL_STATUSES,
	INACTIVE_STATUS,
	normalizeSearchValue,
} from "@/features/admin/user/student/services/student-form";

const ITEMS_PER_PAGE = 5;

type UseStudentListOptions = {
	students: StudentListItem[];
};

export function useStudentList( { students }: UseStudentListOptions ) {
	const [ searchFilter, setSearchFilter ] = useState( "" );
	const [ statusFilter, setStatusFilter ] = useState<StudentStatusFilter>( ALL_STATUSES );
	const [ page, setPage ] = useState( 1 );

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
