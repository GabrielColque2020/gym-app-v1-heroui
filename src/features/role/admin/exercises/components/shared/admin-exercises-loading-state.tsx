import { Card, Spinner } from "@heroui/react";

type AdminExercisesLoadingStateProps = {
	description?: string;
	title?: string;
};

export function AdminExercisesLoadingState( {
	description = "Consultando el catalogo y preparando la lista paginada.",
	title = "Cargando ejercicios globales",
}: AdminExercisesLoadingStateProps ) {
	return (
		<Card className={ "border border-border bg-surface" } variant={ "default" }>
			<Card.Content className={ "flex min-h-56 flex-col items-center justify-center gap-3 py-10 text-center" }>
				<Spinner size={ "lg" }/>
				<div className={ "space-y-1" }>
					<p className={ "text-base font-semibold text-foreground" }>{ title }</p>
					<p className={ "text-sm text-muted" }>{ description }</p>
				</div>
			</Card.Content>
		</Card>
	);
}
