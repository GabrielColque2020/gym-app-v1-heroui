import { Button, Card, Spinner } from "@heroui/react";
import { RotateCw, Save } from "lucide-react";

import RoutineHeader from "@/features/role/student/routine/components/shared/routine-header";
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
		handleOpenSaveSheet,
		handleRefresh,
		isFetching,
		isLoading,
		routineStatusDescription,
		saveRoutineSession,
	} = state;

	return (
		<Card className={ "py-2" }>
			<div className={ "sm:hidden p-3" }>
				<RoutineHeader
					title={ `Rutina - Dia ${ activeSession.dayNumber }` }
					description={ `${ activeSession.title } - Sesion de entrenamiento` }
					canSaveProgress={ canSaveProgress }
					isRefreshing={ state.isRefreshing }
					isPending={ saveRoutineSession.isPending }
					onRefreshAction={ handleRefresh }
					statusDescription={ routineStatusDescription }
					onSave={ handleOpenSaveSheet }
				/>
			</div>
			<Card.Content className={ "hidden sm:flex p-3" }>
				<div className={ "items-end gap-4 flex" }>
					<PageHeader
						title={ `Rutina - Dia ${ activeSession.dayNumber }` }
						description={ `${ activeSession.title } · Sesion de entrenamiento` }
					/>
					<Button
						isDisabled={ isFetching && !isLoading }
						onPress={ handleRefresh }
						variant={ "secondary" }
					>
						<RotateCw className={ isFetching && !isLoading ? "size-4 animate-spin" : "size-4" }/>
						{ isFetching && !isLoading ? "Actualizando..." : "Actualizar" }
					</Button>
					<Button isDisabled={ !canSaveProgress } isPending={ saveRoutineSession.isPending } onPress={ handleOpenSaveSheet }>
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
