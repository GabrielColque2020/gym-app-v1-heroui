import { Card, Spinner } from "@heroui/react";

import { PageBreadcrumbs } from "@/components/common";

type CoachMealPlansLoadingStateProps = {
	breadcrumbs: Array<{ href?: string; label: string }>;
};

export function CoachMealPlansLoadingState( { breadcrumbs }: CoachMealPlansLoadingStateProps ) {
	return (
		<>
			<div className={ "mb-0" }>
				<PageBreadcrumbs
					backHref={ "/coach/meal-plans-students" }
					backLabel={ "Volver a estudiantes" }
					crumbs={ breadcrumbs }
				/>
			</div>
			<Card className={ "border border-border bg-surface" } variant={ "default" }>
				<Card.Content className={ "flex min-h-56 flex-col items-center justify-center gap-3 py-10 text-center" }>
					<Spinner size={ "lg" }/>
					<div className={ "space-y-1" }>
						<p className={ "text-base font-semibold text-foreground" }>Cargando planes alimenticios</p>
						<p className={ "text-sm text-muted" }>Consultando los planes del estudiante seleccionado.</p>
					</div>
				</Card.Content>
			</Card>
		</>
	);
}
