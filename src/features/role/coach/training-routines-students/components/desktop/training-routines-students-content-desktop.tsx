"use client";

import type { DataGridColumn } from "@heroui-pro/react";
import { DataGrid } from "@heroui-pro/react";
import type { TrainingRoutinesStudentListItem } from "@/features/role/coach/training-routines-students/actions/get-training-routines-students";
import { Button, Card, Chip, Label, SearchField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { ArrowRight } from "lucide-react";

import { ListPagination } from "@/components/common";
import { useTrainingRoutinesStudentsList } from "@/features/role/coach/training-routines-students/hooks/use-training-routines-students-list";

type TrainingRoutinesStudentsContentDesktopProps = {
	students: TrainingRoutinesStudentListItem[];
};

function TrainingRoutineStudentRowActions( { student }: { student: TrainingRoutinesStudentListItem } ) {
	const router = useRouter();

	return (
		<Button
			isIconOnly
			aria-label={ `Ver rutina de ${ student.name }` }
			className={ "text-accent" }
			size={ "sm" }
			variant={ "ghost" }
			onPress={ () => router.push( `/coach/training-routine?studentId=${ student.id }` ) }
		>
			<ArrowRight className={ "size-4" }/>
		</Button>
	);
}

export function TrainingRoutinesStudentsContentDesktop( { students }: TrainingRoutinesStudentsContentDesktopProps ) {
	const columns = useMemo<DataGridColumn<TrainingRoutinesStudentListItem>[]>(
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
				cell: ( student ) => <TrainingRoutineStudentRowActions student={ student }/>,
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
		updateSearchFilter,
	} = useTrainingRoutinesStudentsList( { students } );
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
			<Card className={ "border border-border flex-1" } variant={ "default" }>
				<Card.Content className={ "py-10 text-center text-sm text-muted" }>
					No hay estudiantes activos cargados
				</Card.Content>
			</Card>
		);
	}

	return (
		<Card className={ "flex w-full flex-col gap-4 p-0" } variant={ "transparent" }>
			<Card.Content className={ "grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end" }>
				<SearchField
					name={ "training-routine-student-search-filter" }
					value={ searchFilter }
					onChange={ updateSearchFilter }
				>
					<Label>Buscar</Label>
					<SearchField.Group className={ "border border-border" }>
						<SearchField.SearchIcon/>
						<SearchField.Input placeholder={ "Nombre, email o DNI..." }/>
						<SearchField.ClearButton/>
					</SearchField.Group>
				</SearchField>

				<Button isDisabled={ !hasFilters } size={ "sm" } variant={ "secondary" } onPress={ clearFilters }>
					Limpiar
				</Button>
			</Card.Content>

			{ filteredStudents.length === 0 ? (
				<Card className={ "border border-dashed border-border bg-surface-secondary" } variant={ "default" }>
					<Card.Content className={ "py-10 text-center text-sm text-muted" }>
						No hay estudiantes activos que coincidan con la busqueda
					</Card.Content>
				</Card>
			) : (
				<>
					<DataGrid
						aria-label={ "Listado de estudiantes activos para rutinas" }
						columns={ columns }
						contentClassName={ "min-w-full sm:min-w-[860px]" }
						data={ paginatedStudents }
						getRowId={ ( student ) => student.id }
					/>

					<ListPagination
						currentPage={ currentPage }
						itemLabel={ "estudiantes activos" }
						showingFrom={ showingFrom }
						showingTo={ showingTo }
						totalItems={ totalItems }
						totalPages={ totalPages }
						onPageChangeAction={ changePage }
					/>
				</>
			) }
		</Card>
	);
}
