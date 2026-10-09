
import { ErrorAlert, PageBreadcrumbs } from "@/components/common";

type CoachMealPlansErrorStateProps = {
	isRetrying?: boolean;
	breadcrumbs: Array<{ href?: string; label: string }>;
	message: string;
	onRetryAction?: () => void;
};

export function CoachMealPlansErrorState( {
	breadcrumbs,
	isRetrying,
	message,
	onRetryAction,
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
			<ErrorAlert isRetrying={ isRetrying } message={ message } title={ "No se pudo cargar el plan alimenticio" } onRetryAction={ onRetryAction }/>
		</>
	);
}
