import { Button, Card, Chip, Spinner } from "@heroui/react";
import { CheckCircle2, Flag, RotateCw, Save } from "lucide-react";

import type { useRoutinePageState } from "@/features/role/student/routine/hooks/use-routine-page-state";
import { PageHeader } from "@/components/common";

type RoutinePageState = ReturnType<typeof useRoutinePageState>;

type RoutinePageLoadedHeaderProps = {
	state: RoutinePageState;
};

const SAVE_STATUS_CHIP = {
	error: { color: "danger", label: "No se pudo guardar" },
	// Todavia no salio el pedido, pero va a salir solo: para el estudiante ya esta guardando.
	pending: { color: "accent", label: "Guardando…" },
	saved: { color: "success", label: "Guardado" },
	saving: { color: "accent", label: "Guardando…" },
	unsaved: { color: "warning", label: "Series sin guardar de antes" },
} as const;

// Las series se guardan solas: el encabezado muestra en que estado esta el
// guardado. "Reintentar" y "Guardar" aparecen solo cuando hace falta una mano.
export function RoutinePageLoadedHeader( {
											 state,
										 }: RoutinePageLoadedHeaderProps ) {
	const {
		activeSession,
		canFinishDay,
		handleOpenFinishDrawer,
		handleRefresh,
		handleSaveNow,
		isDayFinished,
		isRefreshing,
		routineStatusDescription,
		saveStatus,
	} = state;
	const chip = SAVE_STATUS_CHIP[ saveStatus ];
	const isBusy = saveStatus === "saving" || saveStatus === "pending";
	// Un dia sin ninguna serie cargada no tiene nada que informar como "Guardado".
	const hasLoadedSets = activeSession.exercises.some( ( exercise ) => exercise.sets.some( ( set ) => set.completed ) );
	const showSaveChip = saveStatus !== "saved" || hasLoadedSets;
	const statusChips = !showSaveChip && !isDayFinished ? null : (
		<div className={ "flex flex-wrap items-center gap-2" }>
			{ showSaveChip ? (
				<Chip color={ chip.color } role={ "status" } size={ "sm" } variant={ "soft" }>
					{ isBusy ? <Spinner color={ "current" } size={ "sm" }/> : null }
					{ chip.label }
				</Chip>
			) : null }
			{ isDayFinished ? (
				<Chip color={ "success" } size={ "sm" } variant={ "soft" }>
					<CheckCircle2 className={ "size-3" }/>
					Día terminado
				</Chip>
			) : null }
			{ saveStatus === "error" ? (
				<Button size={ "sm" } variant={ "secondary" } onPress={ handleSaveNow }>
					<RotateCw className={ "size-4" }/>
					Reintentar
				</Button>
			) : null }
			{ /* Series de otra visita: no se guardan solas. "Actualizar" las descarta. */ }
			{ saveStatus === "unsaved" ? (
				<Button size={ "sm" } variant={ "secondary" } onPress={ handleSaveNow }>
					<Save className={ "size-4" }/>
					Guardar
				</Button>
			) : null }
		</div>
	);

	return (
		<Card className={ "py-2" }>
			{ /* En el telefono el avance de la sesion va en el subtitulo y "Terminar día"
			     queda en la barra fija de abajo. */ }
			<div className={ "flex flex-col gap-2 p-3 sm:hidden" }>
				<div className={ "flex items-start justify-between gap-3" }>
					<PageHeader
						title={ `Día ${ activeSession.dayNumber }` }
						description={ `${ activeSession.title } · ${ routineStatusDescription }` }
					/>
					<Button
						isIconOnly
						aria-label={ "Actualizar" }
						className={ "shrink-0" }
						isDisabled={ isRefreshing }
						variant={ "secondary" }
						onPress={ handleRefresh }
					>
						<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
					</Button>
				</div>
				{ statusChips }
			</div>
			<Card.Content className={ "hidden p-3 sm:flex" }>
				<div className={ "flex w-full flex-wrap items-end justify-between gap-4" }>
					<div className={ "flex min-w-64 flex-1 flex-col items-start gap-2" }>
						<PageHeader
							title={ `Rutina - Día ${ activeSession.dayNumber }` }
							description={ `${ activeSession.title } · ${ routineStatusDescription }` }
						/>
						{ statusChips }
					</div>
					<div className={ "flex items-center gap-2" }>
						<Button isDisabled={ isRefreshing } variant={ "secondary" } onPress={ handleRefresh }>
							<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
							{ isRefreshing ? "Actualizando..." : "Actualizar" }
						</Button>
						{ isDayFinished ? null : (
							<Button isDisabled={ !canFinishDay } onPress={ handleOpenFinishDrawer }>
								<Flag className={ "size-4" }/>
								Terminar día
							</Button>
						) }
					</div>
				</div>
			</Card.Content>
		</Card>
	);
}
