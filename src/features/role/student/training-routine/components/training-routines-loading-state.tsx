import { Card, Spinner } from "@heroui/react";

export function TrainingRoutinesLoadingState() {
	return (

		<Card.Content className={ "flex min-h-56 flex-col items-center justify-center gap-3 py-10 text-center" }>
			<Spinner size={ "lg" }/>
			<div className={ "space-y-1" }>
				<p className={ "text-base font-semibold text-foreground" }>
					Cargando rutina
				</p>
				<p className={ "text-sm text-muted" }>
					Consultando tus semanas y dias de entrenamiento.
				</p>
			</div>
		</Card.Content>

	);
}
