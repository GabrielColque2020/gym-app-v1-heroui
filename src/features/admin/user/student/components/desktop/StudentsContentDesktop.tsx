"use client";

import type { DataGridColumn } from "@heroui-pro/react";
import type { StudentListItem } from "@/features/admin/user/student/actions/get-students";

import { DataGrid } from "@heroui-pro/react";
import { Button, Card, Chip, Spinner } from "@heroui/react";
import { CircleCheck, TrashBin } from "@gravity-ui/icons";
import { useMemo } from "react";

import { ListPagination } from "@/components/common";
import { StudentFilters } from "@/features/admin/user/student/components/shared/StudentFilters";
import { StudentSheet } from "@/features/admin/user/student/components/shared/StudentSheet";
import { useStudentList } from "@/features/admin/user/student/hooks/useStudentList";
import { useStudentStatusAction } from "@/features/admin/user/student/hooks/useStudentStatusAction";

type StudentsContentDesktopProps = {
	students: StudentListItem[];
};

function StudentRowActions( { student }: { student: StudentListItem } ) {
	const { changeStatus, isPending, statusClassName, statusLabel } = useStudentStatusAction( { student } );

	return (
		<div className={ "flex items-center justify-start gap-2" }>
			<StudentSheet mode={ "edit" } student={ student }/>
			<Button
				isIconOnly
				aria-label={ `${ statusLabel } ${ student.name }` }
				className={ statusClassName }
				isDisabled={ isPending }
				size={ "sm" }
				variant={ "ghost" }
				onPress={ changeStatus }
			>
				{ isPending ? (
					<Spinner color={ "current" } size={ "sm" }/>
				) : student.active ? (
					<TrashBin className={ "size-4" }/>
				) : (
					<CircleCheck className={ "size-4" }/>
				) }
			</Button>
		</div>
	);
}

export function StudentsContentDesktop( { students }: StudentsContentDesktopProps ) {
	const columns = useMemo<DataGridColumn<StudentListItem>[]>(
		() => [
			{
				accessorKey: "dni",
				allowsSorting: true,
				cell: ( student ) => <span className={ "font-medium text-foreground" }>{ student.dni }</span>,
				header: "DNI",
				id: "dni",
				minWidth: 130,
			},
			{
				accessorKey: "name",
				allowsSorting: true,
				cell: ( student ) => (
					<div className={ "flex min-w-0 flex-col" }>
						<span className={ "truncate font-medium text-foreground" }>{ student.name }</span>
						<span className={ "truncate text-xs text-muted" }>
							{ student.DescriptionStudent?.objective?.trim() || "Sin objetivo cargado" }
						</span>
					</div>
				),
				header: "Nombre",
				id: "name",
				isRowHeader: true,
				minWidth: 240,
			},
			{
				accessorKey: "email",
				allowsSorting: true,
				cell: ( student ) => <span className={ "truncate" }>{ student.email }</span>,
				header: "Email",
				id: "email",
				minWidth: 240,
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
				minWidth: 140,
			},
			{
				cell: ( student ) => <StudentRowActions student={ student }/>,
				header: "Acciones",
				id: "actions",
				minWidth: 120,
			},
		],
		[],
	);
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
		return (
			<Card className={ "border border-dashed border-border bg-surface-secondary" } variant={ "default" }>
				<Card.Content className={ "py-10 text-center text-sm text-muted" }>
					No hay estudiantes cargados
				</Card.Content>
			</Card>
		);
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
				<Card className={ "border border-dashed border-border bg-surface-secondary" } variant={ "default" }>
					<Card.Content className={ "py-10 text-center text-sm text-muted" }>
						No hay estudiantes que coincidan con los filtros
					</Card.Content>
				</Card>
			) : (
				<>
					<DataGrid
						aria-label={ "Listado de estudiantes" }
						columns={ columns }
						contentClassName={ "min-w-full sm:min-w-[860px]" }
						data={ paginatedStudents }
						getRowId={ ( student ) => student.id }
					/>

					<ListPagination
						currentPage={ currentPage }
						itemLabel={ "estudiantes" }
						mode={ "full" }
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
