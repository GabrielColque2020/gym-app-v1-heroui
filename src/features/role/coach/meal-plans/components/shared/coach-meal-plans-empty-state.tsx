import { Card } from "@heroui/react";

type CoachMealPlansEmptyStateProps = {
	studentName: string;
};

export function CoachMealPlansEmptyState( { studentName }: CoachMealPlansEmptyStateProps ) {
	return (
		<Card className={ "border border-border" } variant={ "default" }>
			<Card.Content className={ "py-10 text-center" }>
				<p className={ "text-base font-semibold text-foreground" }>No hay planes alimenticios cargados</p>
				<p className={ "mt-1 text-sm text-muted" }>
					{ studentName } no tiene planes alimenticios para consultar.
				</p>
			</Card.Content>
		</Card>
	);
}
