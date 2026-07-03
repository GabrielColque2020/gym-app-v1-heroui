"use client";

import { Card, Spinner } from "@heroui/react";

export function CoachHistoryRoutinesLoadingState() {
	return (
		<Card className={ "border border-border bg-surface" } variant={ "default" }>
			<Card.Content className={ "flex min-h-56 flex-col items-center justify-center gap-3 py-10 text-center" }>
				<Spinner size={ "lg" }/>
				<div className={ "space-y-1" }>
					<p className={ "text-base font-semibold text-foreground" }>Cargando historial</p>
					<p className={ "text-sm text-muted" }>Consultando el progreso mensual del estudiante.</p>
				</div>
			</Card.Content>
		</Card>
	);
}
