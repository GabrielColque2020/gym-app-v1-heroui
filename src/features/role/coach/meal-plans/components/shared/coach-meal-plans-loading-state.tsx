import { PageBreadcrumbs } from "@/components/common";
import { CardGridSkeleton } from "@/components/common/skeletons";

type CoachMealPlansLoadingStateProps = {
	breadcrumbs: Array<{ href?: string; label: string }>;
};

export function CoachMealPlansLoadingState( { breadcrumbs }: CoachMealPlansLoadingStateProps ) {
	return (
		<>
			<div className={ "mb-0" }>
				<PageBreadcrumbs
					backHref={ "/coach/student" }
					backLabel={ "Volver a estudiantes" }
					crumbs={ breadcrumbs }
				/>
			</div>
			<CardGridSkeleton cards={ 3 } />
		</>
	);
}
