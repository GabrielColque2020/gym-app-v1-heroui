import { Card } from "@heroui/react";

type TrainingRoutinesEmptyStateProps = {
	month: number;
	year: number;
};

export function TrainingRoutinesEmptyState( { month, year }: TrainingRoutinesEmptyStateProps ) {
	return (
		<Card className={ "border border-dashed border-border bg-surface" } variant={ "default" }>
			<Card.Content className={ "py-10 text-center" }>
				<p className={ "text-base font-semibold text-foreground" }>
					No hay rutinas cargadas
				</p>
				<p className={ "mt-1 text-sm text-muted" }>
					No encontramos rutinas para { String( month ).padStart( 2, "0" ) }/{ year }.
				</p>
			</Card.Content>
		</Card>
	);
}
