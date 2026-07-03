"use client";

import type { StudentListItem } from "@/features/students/actions/get-students";

import { ListPagination } from "@/components/common";
import { StudentMobileCard } from "@/features/students/components/mobile/student-mobile-card";
import { StudentFilters } from "@/features/students/components/shared/student-filters";
import { StudentsEmptyState } from "@/features/students/components/shared/students-empty-state";
import { useStudentList } from "@/features/students/hooks/use-student-list";

type StudentsContentMobileProps = {
	students: StudentListItem[];
};

export function StudentsContentMobile( { students }: StudentsContentMobileProps ) {
	const {
		changePage,
		clearFilters,
		filteredStudents,
		hasFilters,
		pagination,
		searchFilter,
		statusFilter,
		updateSearchFilter,
		updateStatusFilter,
	} = useStudentList( { students } );
	const {
		currentPage,
		paginatedItems: paginatedStudents,
		showingFrom,
		showingTo,
		totalItems,
		totalPages,
	} = pagination;

	if (students.length === 0) {
		return <StudentsEmptyState message={ "No hay estudiantes cargados" }/>;
	}

	return (
		<div className={ "flex w-full flex-col gap-4" }>
			<StudentFilters
				hasFilters={ hasFilters }
				layout={ "mobile" }
				searchFilter={ searchFilter }
				statusFilter={ statusFilter }
				onClearFilters={ clearFilters }
				onSearchFilterChange={ updateSearchFilter }
				onStatusFilterChange={ updateStatusFilter }
			/>

			{ filteredStudents.length === 0 ? (
				<StudentsEmptyState message={ "No hay estudiantes que coincidan con los filtros" }/>
			) : (
				<>
					<div className={ "grid gap-3" }>
						{ paginatedStudents.map( ( student ) => (
							<StudentMobileCard key={ student.id } student={ student }/>
						) ) }
					</div>

					<ListPagination
						currentPage={ currentPage }
						mode={ "compact" }
						showingFrom={ showingFrom }
						showingTo={ showingTo }
						totalItems={ totalItems }
						totalPages={ totalPages }
						onPageChange={ changePage }
					/>
				</>
			) }
		</div>
	);
}
