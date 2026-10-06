import { Button, Card, Spinner } from "@heroui/react";
import { RotateCw, Save } from "lucide-react";

import type { useRoutinePageState } from "@/features/role/student/routine/hooks/use-routine-page-state";
import { PageHeader } from "@/components/common";

type RoutinePageState = ReturnType<typeof useRoutinePageState>;

type RoutinePageLoadedHeaderProps = {
	state: RoutinePageState;
};

export function RoutinePageLoadedHeader( {
											 state,
										 }: RoutinePageLoadedHeaderProps ) {
	const {
		activeSession,
		canSaveProgress,
		handleOpenSaveDrawer,
		handleRefresh,
		isFetching,
		isLoading,
		routineStatusDescription,
		saveRoutineSession,
	} = state;

	return (
		<Card className={ "py-2" }>
			{ /* En el telefono el encabezado es una sola fila: el avance de la sesion va
			     en el subtitulo y Guardar queda en la barra fija de abajo. */ }
			<div className={ "flex items-start justify-between gap-3 p-3 sm:hidden" }>
				<PageHeader
					title={ `Día ${ activeSession.dayNumber }` }
					description={ `${ activeSession.title } · ${ routineStatusDescription }` }
				/>
				<Button
					isIconOnly
					aria-label={ "Actualizar" }
					className={ "shrink-0" }
					isDisabled={ state.isRefreshing }
					variant={ "secondary" }
					onPress={ handleRefresh }
				>
					<RotateCw className={ state.isRefreshing ? "size-4 animate-spin" : "size-4" }/>
				</Button>
			</div>
			<Card.Content className={ "hidden sm:flex p-3" }>
				<div className={ "items-end gap-4 flex" }>
					<PageHeader
						title={ `Rutina - Día ${ activeSession.dayNumber }` }
						description={ `${ activeSession.title } · Sesión de entrenamiento` }
					/>
					<Button
						isDisabled={ isFetching && !isLoading }
						onPress={ handleRefresh }
						variant={ "secondary" }
					>
						<RotateCw className={ isFetching && !isLoading ? "size-4 animate-spin" : "size-4" }/>
						{ isFetching && !isLoading ? "Actualizando..." : "Actualizar" }
					</Button>
					<Button isDisabled={ !canSaveProgress } isPending={ saveRoutineSession.isPending } onPress={ handleOpenSaveDrawer }>
						{ ( { isPending } ) => (
							<>
								{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <Save/> }
								Guardar progreso
							</>
						) }
					</Button>
				</div>

			</Card.Content>
		</Card>
	);
}

