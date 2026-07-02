"use client";

import type { DataGridColumn } from "@heroui-pro/react";
import { DataGrid } from "@heroui-pro/react";
import type { CoachDashboardStudentSummary } from "@/features/role/coach/dashboard/actions/get-coach-dashboard-summary";
import { Card, Chip, Label, SearchField } from "@heroui/react";
import { useMemo, useState } from "react";

import { ListPagination, usePagination } from "@/components/common";
import { CoachDashboardEmptyState } from "@/features/role/coach/dashboard/components/CoachDashboardEmptyState";
import { CoachDashboardStudentRowActions } from "@/features/role/coach/dashboard/components/CoachDashboardStudentRowActions";

type CoachDashboardStudentsTableProps = {
	currentPeriodLabel: string;
	students: CoachDashboardStudentSummary[];
};

function formatDateLabel( date: string | null ) {
	if (!date) {
		return "Sin registros";
	}

	return new Intl.DateTimeFormat( "es-AR", {
		dateStyle: "medium",
	} ).format( new Date( date ) );
}

function buildRoutineStatusLabel( student: CoachDashboardStudentSummary, currentPeriodLabel: string ) {
	if (student.hasRoutineThisMonth) {
		return `Cargada ${ currentPeriodLabel }`;
	}

	if (student.lastRoutineMonthLabel) {
		return `Ultima carga ${ student.lastRoutineMonthLabel }`;
	}

	return "Sin rutinas cargadas";
}

export function CoachDashboardStudentsTable( {
												 currentPeriodLabel,
												 students,
											 }: CoachDashboardStudentsTableProps ) {
	const [ searchFilter, setSearchFilter ] = useState( "" );
	const [ page, setPage ] = useState( 1 );
	const normalizedSearch = searchFilter.trim().toLocaleLowerCase( "es" );
	const filteredStudents = useMemo(
		() => students.filter( ( student ) => {
			if (!normalizedSearch) {
				return true;
			}

			return [
				student.name,
				student.email,
				String( student.dni ),
			].some( ( value ) => value.toLocaleLowerCase( "es" ).includes( normalizedSearch ) );
		} ),
		[ normalizedSearch, students ],
	);
	const pagination = usePagination( {
		items: filteredStudents,
		itemsPerPage: 8,
		page,
	} );
	const columns = useMemo<DataGridColumn<CoachDashboardStudentSummary>[]>( () => [
		{
			accessorKey: "name",
			allowsSorting: true,
			cell: ( student ) => (
				<div className={ "flex min-w-0 flex-col" }>
					<span className={ "truncate font-medium text-foreground" }>{ student.name }</span>
					<span className={ "truncate text-xs text-muted" }>
						{ student.email } · DNI { student.dni }
					</span>
				</div>
			),
			header: "Estudiante",
			id: "name",
			isRowHeader: true,
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
			minWidth: 120,
		},
		{
			accessorKey: "hasRoutineThisMonth",
			allowsSorting: true,
			cell: ( student ) => (
				<div className={ "flex min-w-0 flex-col gap-1" }>
					<Chip color={ student.hasRoutineThisMonth ? "success" : "warning" } size={ "sm" } variant={ "soft" }>
						{ student.hasRoutineThisMonth ? "Si" : "No" }
					</Chip>
					<span className={ "text-xs text-muted" }>
						{ buildRoutineStatusLabel( student, currentPeriodLabel ) }
					</span>
				</div>
			),
			header: "Rutina del mes",
			id: "routine",
			minWidth: 180,
		},
		{
			accessorKey: "hasMealPlan",
			allowsSorting: true,
			cell: ( student ) => (
				<div className={ "flex min-w-0 flex-col gap-1" }>
					<Chip color={ student.hasMealPlan ? "success" : "warning" } size={ "sm" } variant={ "soft" }>
						{ student.hasMealPlan ? "Si" : "No" }
					</Chip>
					<span className={ "text-xs text-muted" }>
						{ student.hasMealPlan
							? `Actualizado ${ formatDateLabel( student.lastMealPlanUpdatedAt ) }`
							: "Sin plan cargado" }
					</span>
				</div>
			),
			header: "Plan alimenticio",
			id: "meal-plan",
			minWidth: 180,
		},
		{
			accessorKey: "lastProgressAt",
			allowsSorting: true,
			cell: ( student ) => (
				<div className={ "flex min-w-0 flex-col gap-1" }>
					<span className={ "text-sm text-foreground" }>{ formatDateLabel( student.lastProgressAt ) }</span>
					<span className={ "text-xs text-muted" }>
						{ student.needsRecentActivityAttention ? "Requiere revision" : "Actividad al dia" }
					</span>
				</div>
			),
			header: "Ultima actividad",
			id: "last-progress",
			minWidth: 180,
		},
		{
			cell: ( student ) => <CoachDashboardStudentRowActions student={ student }/>,
			header: "Acciones",
			id: "actions",
			minWidth: 220,
		},
	], [ currentPeriodLabel ] );

	if (students.length === 0) {
		return (
			<CoachDashboardEmptyState
				description={ "Primero necesitas cargar estudiantes para usar el dashboard operativo." }
				title={ "Todavia no hay estudiantes vinculados al coach" }
			/>
		);
	}

	return (
		<Card className={ "border border-border bg-surface" } variant={ "default" }>
			<Card.Content className={ "space-y-4 px-5 py-4 sm:px-6" }>
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
							<SearchField.Group>
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
								<Card key={ student.id } className={ "border border-border bg-surface-secondary" } variant={ "default" }>
									<Card.Content className={ "space-y-3 px-4 py-4" }>
										<div className={ "flex items-start justify-between gap-3" }>
											<div className={ "min-w-0" }>
												<p className={ "truncate text-sm font-semibold text-foreground" }>{ student.name }</p>
												<p className={ "truncate text-xs text-muted" }>{ student.email }</p>
												<p className={ "text-xs text-muted" }>DNI { student.dni }</p>
											</div>
											<Chip color={ student.active ? "success" : "danger" } size={ "sm" } variant={ "soft" }>
												{ student.active ? "Activo" : "Inactivo" }
											</Chip>
										</div>
										<div className={ "grid gap-2 sm:grid-cols-2" }>
											<div className={ "rounded-lg border border-border bg-surface px-3 py-2" }>
												<p className={ "text-xs font-medium text-muted" }>Rutina del mes</p>
												<p className={ "text-sm text-foreground" }>{ buildRoutineStatusLabel( student, currentPeriodLabel ) }</p>
											</div>
											<div className={ "rounded-lg border border-border bg-surface px-3 py-2" }>
												<p className={ "text-xs font-medium text-muted" }>Plan alimenticio</p>
												<p className={ "text-sm text-foreground" }>
													{ student.hasMealPlan
														? `Actualizado ${ formatDateLabel( student.lastMealPlanUpdatedAt ) }`
														: "Sin plan cargado" }
												</p>
											</div>
											<div className={ "rounded-lg border border-border bg-surface px-3 py-2 sm:col-span-2" }>
												<p className={ "text-xs font-medium text-muted" }>Ultima actividad</p>
												<p className={ "text-sm text-foreground" }>{ formatDateLabel( student.lastProgressAt ) }</p>
											</div>
										</div>
										<CoachDashboardStudentRowActions student={ student }/>
									</Card.Content>
								</Card>
							) ) }
						</div>
						<ListPagination
							currentPage={ pagination.currentPage }
							itemLabel={ "estudiantes" }
							showingFrom={ pagination.showingFrom }
							showingTo={ pagination.showingTo }
							totalItems={ pagination.totalItems }
							totalPages={ pagination.totalPages }
							onPageChange={ setPage }
						/>
					</>
				) }
			</Card.Content>
		</Card>
	);
}
