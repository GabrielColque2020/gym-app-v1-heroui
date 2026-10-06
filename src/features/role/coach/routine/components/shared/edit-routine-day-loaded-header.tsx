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
	nextDayNumber: number | null;
	onSave: () => void;
	onSaveAndNext: () => void;
	title: string;
};

export function EditRoutineDayLoadedHeader( {
												backHref,
												breadcrumbs,
												description,
												hasExercises,
												isDirty,
												isSaveDisabled,
												isSaving,
												nextDayNumber,
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
							className={ nextDayNumber ? undefined : "bg-accent text-accent-foreground" }
							isDisabled={ isSaveDisabled }
							isPending={ isSaving }
							variant={ nextDayNumber ? "secondary" : undefined }
							onPress={ onSave }
						>
							{ isSaving ? <Spinner color={ "current" } size={ "sm" }/> : <Save className={ "size-4" }/> }
							{ isSaving ? "Guardando..." : nextDayNumber ? "Guardar" : "Guardar cambios" }
						</Button>
						{ nextDayNumber ? (
							<Button
								className={ "bg-accent text-accent-foreground" }
								isDisabled={ isSaveDisabled }
								onPress={ onSaveAndNext }
							>
								Guardar y pasar al Día { nextDayNumber }
								<ArrowRight className={ "size-4" }/>
							</Button>
						) : null }
					</div>
				</Card.Header>
			</Card>
		</>
	);
}
