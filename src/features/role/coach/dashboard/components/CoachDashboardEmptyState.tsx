import { Card } from "@heroui/react";

type CoachDashboardEmptyStateProps = {
	description: string;
	title: string;
};

export function CoachDashboardEmptyState( { description, title }: CoachDashboardEmptyStateProps ) {
	return (
		<Card className={ "border border-dashed border-border bg-surface-secondary" } variant={ "default" }>
			<Card.Content className={ "py-10 text-center" }>
				<p className={ "text-base font-semibold text-foreground" }>{ title }</p>
				<p className={ "mt-1 text-sm text-muted" }>{ description }</p>
			</Card.Content>
		</Card>
	);
}
