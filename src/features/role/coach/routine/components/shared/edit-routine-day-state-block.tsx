import { PageBreadcrumbs } from "@/components/common";

type EditRoutineDayStateBlockProps = {
	backHref: string;
	backLabel: string;
	breadcrumbs: Array<{ href?: string; label: string }>;
	children: React.ReactNode;
};

export function EditRoutineDayStateBlock( {
	backHref,
	backLabel,
	breadcrumbs,
	children,
}: EditRoutineDayStateBlockProps ) {
	return (
		<>
			<div className={ "mb-4" }>
				<PageBreadcrumbs backHref={ backHref } backLabel={ backLabel } crumbs={ breadcrumbs }/>
			</div>
			{ children }
		</>
	);
}
