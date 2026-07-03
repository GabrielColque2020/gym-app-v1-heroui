import { Card } from "@heroui/react";

type StudentsEmptyStateProps = {
	message: string;
};

export function StudentsEmptyState( { message }: StudentsEmptyStateProps ) {
	return (
		<Card className={ "border border-dashed border-border bg-surface-secondary" } variant={ "default" }>
			<Card.Content className={ "py-10 text-center text-sm text-muted" }>
				{ message }
			</Card.Content>
		</Card>
	);
}
