import { Button, Card, Spinner } from "@heroui/react";

import { PageBreadcrumbs, PageHeader } from "@/components/common";
import { Save } from "lucide-react";

type EditRoutineDayLoadedHeaderProps = {
	backHref: string;
	breadcrumbs: Array<{ label: string; href?: string }>;
	description: string;
	isSaveDisabled: boolean;
	isSaving: boolean;
	onSave: () => void;
	title: string;
};

export function EditRoutineDayLoadedHeader( {
												backHref,
												breadcrumbs,
												description,
												isSaveDisabled,
												isSaving,
												onSave,
												title,
											}: EditRoutineDayLoadedHeaderProps ) {
	return (
		<>
			<PageBreadcrumbs backHref={ backHref } backLabel={ "Volver a rutina" } crumbs={ breadcrumbs }/>
			<Card className={ "border border-border py-2" } variant={ "default" }>
				<Card.Header className={ "flex flex-col gap-3 md:flex-row md:items-end md:justify-between p-3" }>
					<div className={ "flex min-w-0 flex-col gap-3" }>
						<PageHeader title={ title } description={ description }/>
					</div>
					<Button
						className={ "bg-accent text-accent-foreground" }
						isDisabled={ isSaveDisabled }
						isPending={ isSaving }
						onPress={ onSave }
					>
						{ isSaving ? <Spinner color={ "current" } size={ "sm" }/> : <Save className={ "size-4" }/> }
						{ isSaving ? "Guardando..." : "Guardar cambios" }
					</Button>
				</Card.Header>
			</Card>
		</>
	);
}
