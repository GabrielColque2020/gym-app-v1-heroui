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
	students: CoachDashboardStudentSummary[];
};

export function CoachDashboardStudentsTable( {
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
		() => buildCoachDashboardStudentsColumns(),
		[],
	);

	if (students.length === 0) {
		return (
			<CoachDashboardEmptyState
				description={ "Cargá el primero desde Estudiantes, en el menú, para empezar." }
				title={ "Todavía no tenés estudiantes" }
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
						description={ "No encontramos estudiantes que coincidan con la búsqueda." }
						title={ "Sin resultados" }
					/>
				) : (
					<>
						{ /* Tabla o tarjetas segun el ancho de este bloque y no el de la ventana:
						     la tabla pedia 1100 px fijos y, con el menu lateral, no entraba ni en
						     una pantalla de 1440. Ahora entra desde 896 y, por debajo, van tarjetas. */ }
						<div className={ "@container" }>
							<div className={ "hidden @4xl:block" }>
								<DataGrid
									aria-label={ "Listado de estudiantes del entrenador" }
									columns={ columns }
									contentClassName={ "min-w-full" }
									data={ pagination.paginatedItems }
									getRowId={ ( student ) => student.id }
								/>
							</div>
							{ /* `grid-cols-1` fija el ancho de la columna: sin eso, una tarjeta con
							     un correo largo se salia del bloque en el telefono. */ }
							<div className={ "grid grid-cols-1 gap-3 @2xl:grid-cols-2 @4xl:hidden" }>
								{ pagination.paginatedItems.map( ( student ) => (
									<CoachDashboardStudentMobileCard
										key={ student.id }
										student={ student }
									/>
								) ) }
							</div>
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
