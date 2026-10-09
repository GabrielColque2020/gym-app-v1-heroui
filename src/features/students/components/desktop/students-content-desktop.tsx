"use client";

import type { DataGridColumn } from "@heroui-pro/react";
import { DataGrid } from "@heroui-pro/react";
import type { StudentListItem } from "@/features/students/actions/get-students";
import { Chip } from "@heroui/react";
import { useMemo } from "react";
import Link from "next/link";

import { buildStudentTrainingRoutineHref } from "@/features/role/coach/dashboard/services/coach-dashboard-links";

import { ListPagination } from "@/components/common";
import { StudentFilters } from "@/features/students/components/shared/student-filters";
import { StudentRowActions } from "@/features/students/components/shared/student-row-actions";
import { StudentsEmptyState } from "@/features/students/components/shared/students-empty-state";
import { useStudentList } from "@/features/students/hooks/use-student-list";

type StudentsContentDesktopProps = {
	students: StudentListItem[];
};

export function StudentsContentDesktop( { students }: StudentsContentDesktopProps ) {
	const columns = useMemo<DataGridColumn<StudentListItem>[]>( () => [
		// Primero el nombre, que es por lo que se reconoce a alguien. Los anchos
		// minimos suman 670: la tabla se muestra desde 672 de ancho y entra entera.
		{
			accessorKey: "name",
			allowsSorting: true,
			cell: ( student ) => (
				<div className={ "flex min-w-0 flex-col" }>
					{ /* El nombre abre la ficha: la columna de acciones puede quedar fuera de vista. */ }
					<Link
						className={ "truncate font-medium text-foreground underline-offset-2 hover:text-accent hover:underline" }
						href={ buildStudentTrainingRoutineHref( student.id ) }
					>
						{ student.name }
					</Link>
					<span className={ "truncate text-xs text-muted" }>
						{ student.DescriptionStudent?.objective?.trim() || "Sin objetivo cargado" }
					</span>
				</div>
			),
			header: "Nombre",
			id: "name",
			isRowHeader: true,
			minWidth: 190,
		},
		{
			accessorKey: "email",
			allowsSorting: true,
			cell: ( student ) => <span className={ "truncate" }>{ student.email }</span>,
			header: "Email",
			id: "email",
			minWidth: 180,
		},
		{
			accessorKey: "dni",
			allowsSorting: true,
			cell: ( student ) => <span className={ "tabular-nums" }>{ student.dni }</span>,
			header: "DNI",
			id: "dni",
			minWidth: 90,
		},
		{
			accessorKey: "active",
			allowsSorting: true,
			cell: ( student ) => (
				<Chip color={ student.active ? "success" : "danger" } size={ "sm" } variant={ "soft" }>
					{ student.active ? "Activo" : "Inactivo" }
				</Chip>
			),
			header: "Estado",
			id: "active",
			minWidth: 90,
		},
		{
			cell: ( student ) => <StudentRowActions student={ student }/>,
			header: "Acciones",
			id: "actions",
			minWidth: 190,
		},
	], [] );
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
				layout={ "desktop" }
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
					<DataGrid
						aria-label={ "Listado de estudiantes" }
						columns={ columns }
						contentClassName={ "min-w-full" }
						data={ paginatedStudents }
						getRowId={ ( student ) => student.id }
					/>

					<ListPagination
						currentPage={ currentPage }
						itemLabel={ "estudiantes" }
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
