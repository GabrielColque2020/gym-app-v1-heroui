"use client";

import type { StudentListItem } from "@/features/students/actions/get-students";

import { ListPagination } from "@/components/common";
import { StudentMobileCard } from "@/features/students/components/mobile/student-mobile-card";
import { StudentFilters } from "@/features/students/components/shared/student-filters";
import { StudentsNoMatchEmptyState, StudentsNoneEmptyState } from "@/features/students/components/shared/students-empty-state";
import { useStudentList } from "@/features/students/hooks/use-student-list";

type StudentsContentMobileProps = {
	// Abre el alta: lo usa el boton de la lista vacia.
	onCreateStudentAction?: () => void;
	students: StudentListItem[];
};

export function StudentsContentMobile( { onCreateStudentAction, students }: StudentsContentMobileProps ) {
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
		return <StudentsNoneEmptyState onCreateStudentAction={ onCreateStudentAction }/>;
	}

	return (
		<div className={ "flex w-full flex-col gap-3" }>
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
				<StudentsNoMatchEmptyState onClearFiltersAction={ clearFilters }/>
			) : (
				<>
					<div className={ "grid gap-2" }>
						{ paginatedStudents.map( ( student ) => (
							<StudentMobileCard key={ student.id } student={ student }/>
						) ) }
					</div>

					<ListPagination
						currentPage={ currentPage }
						showingFrom={ showingFrom }
						showingTo={ showingTo }
						totalItems={ totalItems }
						totalPages={ totalPages }
						onPageChangeAction={ changePage }
					/>
				</>
			) }
		</div>
	);
}
