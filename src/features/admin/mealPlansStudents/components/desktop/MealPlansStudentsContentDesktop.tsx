"use client";

import type { DataGridColumn } from "@heroui-pro/react";

import { DataGrid } from "@heroui-pro/react";
import { Button, Card, Chip, Label, SearchField } from "@heroui/react";
import { ArrowRight } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { ListPagination } from "@/components/common";
import type { MealPlansStudentListItem } from "@/features/admin/mealPlansStudents/actions/get-meal-plans-students";
import { useMealPlansStudentsList } from "@/features/admin/mealPlansStudents/hooks/useMealPlansStudentsList";

type MealPlansStudentsContentDesktopProps = {
	students: MealPlansStudentListItem[];
};

function MealPlansStudentRowActions( { student }: { student: MealPlansStudentListItem } ) {
	const router = useRouter();

	return (
		<Button
			isIconOnly
			aria-label={ `Ver planes de ${ student.name }` }
			className={ "text-accent" }
			size={ "sm" }
			variant={ "ghost" }
			onPress={ () => router.push( `/admin/mealPlans?studentId=${ student.id }` ) }
		>
			<ArrowRight className={ "size-4" }/>
		</Button>
	);
}

export function MealPlansStudentsContentDesktop( { students }: MealPlansStudentsContentDesktopProps ) {
	const columns = useMemo<DataGridColumn<MealPlansStudentListItem>[]>( () => [
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
			cell: () => (
				<Chip color={ "success" } size={ "sm" } variant={ "soft" }>
					Activo
				</Chip>
			),
			header: "Estado",
			id: "active",
			minWidth: 140,
		},
		{
			cell: ( student ) => <MealPlansStudentRowActions student={ student }/>,
			header: "Acciones",
			id: "actions",
			minWidth: 120,
		},
	], [] );
	const {
		changePage,
		clearFilters,
		filteredStudents,
		hasFilters,
		pagination,
		searchFilter,
		updateSearchFilter,
	} = useMealPlansStudentsList( { students } );
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
					No hay estudiantes activos cargados
				</Card.Content>
			</Card>
		);
	}

	return (
		<div className={ "flex w-full flex-col gap-4" }>
			<div className={ "grid gap-3 rounded-xl border border-border bg-surface-secondary p-3 lg:grid-cols-[1fr_auto] lg:items-end" }>
				<SearchField
					name={ "meal-plan-student-search-filter" }
					value={ searchFilter }
					onChange={ updateSearchFilter }
				>
					<Label>Buscar</Label>
					<SearchField.Group>
						<SearchField.SearchIcon/>
						<SearchField.Input placeholder={ "Nombre, email o DNI..." }/>
						<SearchField.ClearButton/>
					</SearchField.Group>
				</SearchField>

				<Button isDisabled={ !hasFilters } size={ "sm" } variant={ "secondary" } onPress={ clearFilters }>
					Limpiar
				</Button>
			</div>

			{ filteredStudents.length === 0 ? (
				<Card className={ "border border-dashed border-border bg-surface-secondary" } variant={ "default" }>
					<Card.Content className={ "py-10 text-center text-sm text-muted" }>
						No hay estudiantes activos que coincidan con la busqueda
					</Card.Content>
				</Card>
			) : (
				<>
					<DataGrid
						aria-label={ "Listado de estudiantes activos para planes alimenticios" }
						columns={ columns }
						contentClassName={ "min-w-full sm:min-w-[860px]" }
						data={ paginatedStudents }
						getRowId={ ( student ) => student.id }
					/>

					<ListPagination
						currentPage={ currentPage }
						itemLabel={ "estudiantes activos" }
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
