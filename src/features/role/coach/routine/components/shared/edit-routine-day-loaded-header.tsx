import { Button, Card, Chip, Spinner } from "@heroui/react";

import { PageBreadcrumbs, PageHeader } from "@/components/common";
import { ArrowRight, Save } from "lucide-react";

type EditRoutineDayLoadedHeaderProps = {
	backHref: string;
	breadcrumbs: Array<{ label: string; href?: string }>;
	description: string;
	hasExercises: boolean;
	isDirty: boolean;
	isSaveDisabled: boolean;
	isSaving: boolean;
	nextStepLabel: string | null;
	onSave: () => void;
	onSaveAndNext: () => void;
	title: string;
};

function capitalize( text: string ) {
	return text.charAt( 0 ).toUpperCase() + text.slice( 1 );
}

export function EditRoutineDayLoadedHeader( {
												backHref,
												breadcrumbs,
												description,
												hasExercises,
												isDirty,
												isSaveDisabled,
												isSaving,
												nextStepLabel,
												onSave,
												onSaveAndNext,
												title,
											}: EditRoutineDayLoadedHeaderProps ) {
	return (
		<>
			<PageBreadcrumbs backHref={ backHref } backLabel={ "Volver a rutina" } crumbs={ breadcrumbs }/>
			<Card className={ "border border-border py-2" } variant={ "default" }>
				{ /* Con `flex-wrap` los botones bajan de renglon antes de que el titulo se parta. */ }
				<Card.Header className={ "flex flex-row flex-wrap items-center justify-between gap-3 p-3" }>
					<div className={ "flex min-w-64 flex-1 flex-col items-start gap-2" }>
						<PageHeader title={ title } description={ description }/>
						{ isDirty || hasExercises ? (
							<Chip color={ isDirty ? "warning" : "success" } size={ "sm" } variant={ "soft" }>
								{ isDirty ? "Cambios sin guardar" : "Todo guardado" }
							</Chip>
						) : null }
					</div>
					{ /* Con un dia siguiente, lo principal es guardar y seguir cargando la semana. */ }
					<div className={ "flex w-full flex-col gap-2 sm:w-auto sm:flex-row" }>
						<Button
							className={ nextStepLabel ? undefined : "bg-accent text-accent-foreground" }
							isDisabled={ isSaveDisabled }
							isPending={ isSaving }
							variant={ nextStepLabel ? "secondary" : undefined }
							onPress={ onSave }
						>
							{ isSaving ? <Spinner color={ "current" } size={ "sm" }/> : <Save className={ "size-4" }/> }
							{ isSaving ? "Guardando..." : nextStepLabel ? "Guardar" : "Guardar cambios" }
						</Button>
						{ nextStepLabel ? (
							<Button
								className={ "bg-accent text-accent-foreground" }
								// Sin cambios pendientes no hay nada que guardar: solo avanza.
								isDisabled={ isDirty && isSaveDisabled }
								onPress={ onSaveAndNext }
							>
								{ isDirty ? `Guardar y ${ nextStepLabel }` : capitalize( nextStepLabel ) }
								<ArrowRight className={ "size-4" }/>
							</Button>
						) : null }
					</div>
				</Card.Header>
			</Card>
		</>
	);
}
