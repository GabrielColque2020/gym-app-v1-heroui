import type { CoachDashboardStudentSummary } from "@/features/role/coach/dashboard/actions/get-coach-dashboard-summary";

import { Card, Chip } from "@heroui/react";

import { CoachDashboardStudentRowActions } from "@/features/role/coach/dashboard/components/coach-dashboard-student-row-actions";
import {
	buildCoachDashboardRoutineStatusLabel,
	formatCoachDashboardDateLabel,
} from "@/features/role/coach/dashboard/components/coach-dashboard-students-table.utils";

type CoachDashboardStudentMobileCardProps = {
	currentPeriodLabel: string;
	student: CoachDashboardStudentSummary;
};

export function CoachDashboardStudentMobileCard( {
	currentPeriodLabel,
	student,
}: CoachDashboardStudentMobileCardProps ) {
	return (
		<Card className={ "border border-border bg-surface-secondary" } variant={ "default" }>
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
						<p className={ "text-sm text-foreground" }>{ buildCoachDashboardRoutineStatusLabel( student, currentPeriodLabel ) }</p>
					</div>
					<div className={ "rounded-lg border border-border bg-surface px-3 py-2" }>
						<p className={ "text-xs font-medium text-muted" }>Plan alimenticio</p>
						<p className={ "text-sm text-foreground" }>
							{ student.hasMealPlan
								? `Actualizado ${ formatCoachDashboardDateLabel( student.lastMealPlanUpdatedAt ) }`
								: "Sin plan cargado" }
						</p>
					</div>
					<div className={ "rounded-lg border border-border bg-surface px-3 py-2 sm:col-span-2" }>
						<p className={ "text-xs font-medium text-muted" }>Ultima actividad</p>
						<p className={ "text-sm text-foreground" }>{ formatCoachDashboardDateLabel( student.lastProgressAt ) }</p>
					</div>
				</div>
				<CoachDashboardStudentRowActions student={ student }/>
			</Card.Content>
		</Card>
	);
}
