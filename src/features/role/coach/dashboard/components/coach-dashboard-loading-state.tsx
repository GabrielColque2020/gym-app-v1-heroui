import { Card, Spinner } from "@heroui/react";

export function CoachDashboardLoadingState() {
	return (
		<Card className={ "border border-border bg-surface" } variant={ "default" }>
			<Card.Content className={ "flex min-h-72 flex-col items-center justify-center gap-3 py-10 text-center" }>
				<Spinner size={ "lg" }/>
				<div className={ "space-y-1" }>
					<p className={ "text-base font-semibold text-foreground" }>Cargando dashboard coach</p>
					<p className={ "text-sm text-muted" }>Consultando estudiantes, rutinas, planes y actividad reciente.</p>
				</div>
			</Card.Content>
		</Card>
	);
}
