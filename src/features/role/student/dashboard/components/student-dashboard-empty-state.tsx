import type { ReactNode } from "react";

import { Card } from "@heroui/react";

type StudentDashboardEmptyStateProps = {
	// Un boton para salir del vacio: que hacer ahora.
	action?: ReactNode;
	description: string;
	title: string;
};

export function StudentDashboardEmptyState( { action, description, title }: StudentDashboardEmptyStateProps ) {
	return (
		<Card className={ "border border-border" } variant={ "default" }>
			<Card.Content className={ "flex flex-col items-center gap-3 py-10 text-center" }>
				<div>
					<p className={ "text-base font-semibold text-foreground" }>{ title }</p>
					<p className={ "mt-1 text-sm text-muted" }>{ description }</p>
				</div>
				{ action }
			</Card.Content>
		</Card>
	);
}
