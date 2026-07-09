import { Card } from "@heroui/react";

import {
	formatDateLabel,
	formatLastProgressLabel,
	formatLastRecordedMonthLabel,
} from "@/features/role/student/dashboard/services/student-dashboard-mappers";

type StudentDashboardActivityCardProps = {
	lastMealPlanUpdatedAt: string | null;
	lastProgressAt: string | null;
	lastRecordedMonthValue: {
		month: number;
		year: number;
	} | null;
};

function ActivityRow( { label, value }: { label: string; value: string } ) {
	return (
		<div className={ "flex items-center justify-between gap-4 rounded-lg border border-border bg-surface-secondary px-4 py-3" }>
			<p className={ "text-sm text-muted" }>{ label }</p>
			<p className={ "text-sm font-medium text-foreground" }>{ value }</p>
		</div>
	);
}

export function StudentDashboardActivityCard( {
	lastMealPlanUpdatedAt,
	lastProgressAt,
	lastRecordedMonthValue,
}: StudentDashboardActivityCardProps ) {
	return (
		<Card className={ "border border-border py-2" } variant={ "default" }>
			<Card.Content className={ "space-y-4 p-3" }>
				<div className={ "space-y-1" }>
					<p className={ "text-base font-semibold text-foreground" }>Actividad reciente</p>
					<p className={ "text-sm text-muted" }>Una referencia rapida de tus ultimos movimientos cargados.</p>
				</div>
				<div className={ "grid gap-3" }>
					<ActivityRow label={ "Ultimo progreso guardado" } value={ formatLastProgressLabel( lastProgressAt ) }/>
					<ActivityRow label={ "Ultimo mes con historial" } value={ formatLastRecordedMonthLabel( lastRecordedMonthValue ) }/>
					<ActivityRow label={ "Ultima actualizacion del plan" } value={ formatDateLabel( lastMealPlanUpdatedAt ) }/>
				</div>
			</Card.Content>
		</Card>
	);
}
