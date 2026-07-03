import type { DataGridColumn } from "@heroui-pro/react";
import type { CoachDashboardStudentSummary } from "@/features/role/coach/dashboard/actions/get-coach-dashboard-summary";

import { Chip } from "@heroui/react";

import { CoachDashboardStudentRowActions } from "@/features/role/coach/dashboard/components/coach-dashboard-student-row-actions";

export function formatCoachDashboardDateLabel( date: string | null ) {
	if (!date) {
		return "Sin registros";
	}

	return new Intl.DateTimeFormat( "es-AR", {
		dateStyle: "medium",
	} ).format( new Date( date ) );
}

export function buildCoachDashboardRoutineStatusLabel( student: CoachDashboardStudentSummary, currentPeriodLabel: string ) {
	if (student.hasRoutineThisMonth) {
		return `Cargada ${ currentPeriodLabel }`;
	}

	if (student.lastRoutineMonthLabel) {
		return `Ultima carga ${ student.lastRoutineMonthLabel }`;
	}

	return "Sin rutinas cargadas";
}

export function filterCoachDashboardStudents( students: CoachDashboardStudentSummary[], searchFilter: string ) {
	const normalizedSearch = searchFilter.trim().toLocaleLowerCase( "es" );

	if (!normalizedSearch) {
		return students;
	}

	return students.filter( ( student ) =>
		[
			student.name,
			student.email,
			String( student.dni ),
		].some( ( value ) => value.toLocaleLowerCase( "es" ).includes( normalizedSearch ) ),
	);
}

export function buildCoachDashboardStudentsColumns( currentPeriodLabel: string ): DataGridColumn<CoachDashboardStudentSummary>[] {
	return [
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
						{ buildCoachDashboardRoutineStatusLabel( student, currentPeriodLabel ) }
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
							? `Actualizado ${ formatCoachDashboardDateLabel( student.lastMealPlanUpdatedAt ) }`
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
					<span className={ "text-sm text-foreground" }>{ formatCoachDashboardDateLabel( student.lastProgressAt ) }</span>
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
	];
}
