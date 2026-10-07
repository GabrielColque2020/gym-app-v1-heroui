import { Card } from "@heroui/react";

type CoachMealPlansEmptyStateProps = {
	studentName: string;
};

export function CoachMealPlansEmptyState( { studentName }: CoachMealPlansEmptyStateProps ) {
	return (
		<Card className={ "border border-border" } variant={ "default" }>
			<Card.Content className={ "py-10 text-center" }>
				<p className={ "text-base font-semibold text-foreground" }>El plan todavía está vacío</p>
				<p className={ "mt-1 text-sm text-muted" }>
					Agregá la primera comida de { studentName } con el botón de arriba.
				</p>
			</Card.Content>
		</Card>
	);
}
