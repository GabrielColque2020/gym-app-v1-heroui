import { Alert } from "@heroui/react";

import { PageBreadcrumbs } from "@/components/common";

type CoachMealPlansErrorStateProps = {
	breadcrumbs: Array<{ href?: string; label: string }>;
	message: string;
};

export function CoachMealPlansErrorState( {
	breadcrumbs,
	message,
}: CoachMealPlansErrorStateProps ) {
	return (
		<>
			<div className={ "mb-0" }>
				<PageBreadcrumbs
					backHref={ "/coach/student" }
					backLabel={ "Volver a estudiantes" }
					crumbs={ breadcrumbs }
				/>
			</div>
			<Alert className={ "border border-danger/20" } status={ "danger" }>
				<Alert.Content>
					<Alert.Title>No se pudo cargar el plan alimenticio</Alert.Title>
					<Alert.Description>{ message }</Alert.Description>
				</Alert.Content>
			</Alert>
		</>
	);
}
