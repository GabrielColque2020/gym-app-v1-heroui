import { Button, Card, Chip, Spinner } from "@heroui/react";

import { PageBreadcrumbs, PageHeader } from "@/components/common";
import type { RoutineDaySaveStatus } from "@/features/role/coach/routine/hooks/use-edit-routine-day-loaded-state";
import { ArrowRight, RotateCw, Save, WifiOff } from "lucide-react";

type EditRoutineDayLoadedHeaderProps = {
	backHref: string;
	backLabel: string;
	breadcrumbs: Array<{ label: string; href?: string }>;
	description: string;
	hasExercises: boolean;
	isSaveDisabled: boolean;
	nextStepLabel: string | null;
	onSave: () => void;
	onSaveAndNext: () => void;
	saveStatus: RoutineDaySaveStatus;
	title: string;
};

const SAVE_STATUS_CHIP = {
	blocked: { color: "warning", label: "Faltan datos para guardar" },
	// Se reintenta solo; "Reintentar" queda para no tener que esperar.
	error: { color: "danger", label: "No se pudo guardar. Se reintenta solo" },
	offline: { color: "warning", label: "Sin conexión. Se guarda al volver" },
	// Todavia no salio el pedido, pero va a salir solo: para el coach ya esta guardando.
	pending: { color: "accent", label: "Guardando…" },
	saved: { color: "success", label: "Guardado" },
	saving: { color: "accent", label: "Guardando…" },
	unsaved: { color: "warning", label: "Cambios sin guardar de antes" },
} as const;

function capitalize( text: string ) {
	return text.charAt( 0 ).toUpperCase() + text.slice( 1 );
}

// El dia se guarda solo: el encabezado muestra en que estado esta y deja el boton
// para seguir con el dia siguiente. "Reintentar" aparece solo si un guardado fallo.
export function EditRoutineDayLoadedHeader( {
												backHref,
												backLabel,
												breadcrumbs,
												description,
												hasExercises,
												isSaveDisabled,
												nextStepLabel,
												onSave,
												onSaveAndNext,
												saveStatus,
												title,
											}: EditRoutineDayLoadedHeaderProps ) {
	const chip = SAVE_STATUS_CHIP[ saveStatus ];
	const hasPendingChanges = saveStatus !== "saved";
	// Un dia vacio y sin cambios no tiene nada que informar.
	const showChip = hasPendingChanges || hasExercises;

	return (
		<>
			<PageBreadcrumbs backHref={ backHref } backLabel={ backLabel } crumbs={ breadcrumbs }/>
			<Card className={ "border border-border py-2" } variant={ "default" }>
				{ /* Con `flex-wrap` los botones bajan de renglon antes de que el titulo se parta. */ }
				<Card.Header className={ "flex flex-row flex-wrap items-center justify-between gap-3 p-3" }>
					<div className={ "flex min-w-64 flex-1 flex-col items-start gap-2" }>
						<PageHeader title={ title } description={ description }/>
						{ showChip ? (
							<Chip color={ chip.color } role={ "status" } size={ "sm" } variant={ "soft" }>
								{ saveStatus === "saving" || saveStatus === "pending" ? <Spinner color={ "current" } size={ "sm" }/> : null }
								{ saveStatus === "offline" ? <WifiOff className={ "size-3" }/> : null }
								{ chip.label }
							</Chip>
						) : null }
					</div>
					<div className={ "flex w-full flex-col gap-2 sm:w-auto sm:flex-row" }>
						{ saveStatus === "error" ? (
							<Button variant={ "secondary" } onPress={ onSave }>
								<RotateCw className={ "size-4" }/>
								Reintentar
							</Button>
						) : null }
						{ /* Cambios de otra visita: no se guardan solos. "Actualizar" los descarta. */ }
						{ saveStatus === "unsaved" ? (
							<Button variant={ "secondary" } onPress={ onSave }>
								<Save className={ "size-4" }/>
								Guardar
							</Button>
						) : null }
						{ nextStepLabel ? (
							<Button
								className={ "bg-accent text-accent-foreground" }
								// Sin cambios pendientes solo avanza; con cambios, guarda antes de pasar.
								isDisabled={ hasPendingChanges && isSaveDisabled }
								onPress={ onSaveAndNext }
							>
								{ capitalize( nextStepLabel ) }
								<ArrowRight className={ "size-4" }/>
							</Button>
						) : null }
					</div>
				</Card.Header>
			</Card>
		</>
	);
}
