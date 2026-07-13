import { Card } from "@heroui/react";

type CoachExercisesEmptyStateProps = {
	message: string;
};

export function CoachExercisesEmptyState( {
											  message,
										  }: CoachExercisesEmptyStateProps ) {
	return (
		<Card className={ "flex-1 border border-border" } variant={ "default" }>
			<Card.Content className={ "py-10 text-center text-sm text-muted" }>
				{ message }
			</Card.Content>
		</Card>
	);
}
