import { Card } from "@heroui/react";

type CoachTrainingRoutinesEmptyStateProps = {
	month: number;
	studentName: string;
	year: number;
};

export function CoachTrainingRoutinesEmptyState( {
	month,
	studentName,
	year,
}: CoachTrainingRoutinesEmptyStateProps ) {
	return (
		<Card className={ "border border-dashed border-border" } variant={ "default" }>
			<Card.Content className={ "py-10 text-center" }>
				<p className={ "text-base font-semibold text-foreground" }>No hay rutinas cargadas</p>
				<p className={ "mt-1 text-sm text-muted" }>
					{ studentName } no tiene rutinas para { month }/{ year }.
				</p>
			</Card.Content>
		</Card>
	);
}
