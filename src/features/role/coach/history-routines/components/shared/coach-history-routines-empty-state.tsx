import { Card } from "@heroui/react";

type CoachHistoryRoutinesEmptyStateProps = {
	monthLabel: string;
};

export function CoachHistoryRoutinesEmptyState( {
	monthLabel,
}: CoachHistoryRoutinesEmptyStateProps ) {
	return (
		<Card className={ "border border-dashed border-border" } variant={ "default" }>
			<Card.Content className={ "py-10 text-center" }>
				<p className={ "text-base font-semibold text-foreground" }>No hay historial de rutinas cargado</p>
				<p className={ "mt-1 text-sm text-muted" }>
					No encontramos registros para { monthLabel }.
				</p>
			</Card.Content>
		</Card>
	);
}
