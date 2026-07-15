"use client";

import type { DataGridColumn } from "@heroui-pro/react";
import { DataGrid } from "@heroui-pro/react";
import type { CoachDashboardStudentSummary } from "@/features/role/coach/dashboard/actions/get-coach-dashboard-summary";
import { Card, Label, SearchField } from "@heroui/react";
import { useMemo, useState } from "react";

import { ListPagination, usePagination } from "@/components/common";
import { CoachDashboardEmptyState } from "@/features/role/coach/dashboard/components/coach-dashboard-empty-state";
import { CoachDashboardStudentMobileCard } from "@/features/role/coach/dashboard/components/coach-dashboard-student-mobile-card";
import { buildCoachDashboardStudentsColumns, filterCoachDashboardStudents, } from "@/features/role/coach/dashboard/components/coach-dashboard-students-table.utils";

type CoachDashboardStudentsTableProps = {
	currentPeriodLabel: string;
	students: CoachDashboardStudentSummary[];
};

export function CoachDashboardStudentsTable( {
												 currentPeriodLabel,
												 students,
											 }: CoachDashboardStudentsTableProps ) {
	const [ searchFilter, setSearchFilter ] = useState( "" );
	const [ page, setPage ] = useState( 1 );
	const filteredStudents = useMemo(
		() => filterCoachDashboardStudents( students, searchFilter ),
		[ searchFilter, students ],
	);
	const pagination = usePagination( {
		items: filteredStudents,
		itemsPerPage: 8,
		page,
	} );
	const columns = useMemo<DataGridColumn<CoachDashboardStudentSummary>[]>(
		() => buildCoachDashboardStudentsColumns( currentPeriodLabel ),
		[ currentPeriodLabel ],
	);

	if (students.length === 0) {
		return (
			<CoachDashboardEmptyState
				description={ "Primero necesitas cargar estudiantes para usar el dashboard operativo." }
				title={ "Todavía no hay estudiantes vinculados al coach" }
			/>
		);
	}

	return (
		<Card className={ "border border-border py-2" } variant={ "default" }>
			<Card.Content className={ "space-y-4 p-3" }>
				<div className={ "flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between" }>
					<div className={ "space-y-1" }>
						<p className={ "text-base font-semibold text-foreground" }>Estudiantes</p>
						<p className={ "text-sm text-muted" }>Entradas directas para corregir rutina, plan o historial.</p>
					</div>
					<div className={ "w-full lg:max-w-md" }>
						<SearchField
							name={ "coach-dashboard-student-search" }
							value={ searchFilter }
							onChange={ ( value ) => {
								setSearchFilter( value );
								setPage( 1 );
							} }
						>
							<Label>Buscar estudiante</Label>
							<SearchField.Group className={ "border border-border" }>
								<SearchField.SearchIcon/>
								<SearchField.Input placeholder={ "Nombre, email o DNI..." }/>
								<SearchField.ClearButton/>
							</SearchField.Group>
						</SearchField>
					</div>
				</div>

				{ filteredStudents.length === 0 ? (
					<CoachDashboardEmptyState
						description={ "No encontramos estudiantes que coincidan con la busqueda cargada." }
						title={ "Sin resultados" }
					/>
				) : (
					<>
						<div className={ "hidden md:block" }>
							<DataGrid
								aria-label={ "Listado operativo de estudiantes del coach" }
								columns={ columns }
								contentClassName={ "min-w-full sm:min-w-[1100px]" }
								data={ pagination.paginatedItems }
								getRowId={ ( student ) => student.id }
							/>
						</div>
						<div className={ "space-y-3 md:hidden" }>
							{ pagination.paginatedItems.map( ( student ) => (
								<CoachDashboardStudentMobileCard
									key={ student.id }
									currentPeriodLabel={ currentPeriodLabel }
									student={ student }
								/>
							) ) }
						</div>
						<ListPagination
							currentPage={ pagination.currentPage }
							itemLabel={ "estudiantes" }
							showingFrom={ pagination.showingFrom }
							showingTo={ pagination.showingTo }
							totalItems={ pagination.totalItems }
							totalPages={ pagination.totalPages }
							onPageChangeAction={ setPage }
						/>
					</>
				) }
			</Card.Content>
		</Card>
	);
}
