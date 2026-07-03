"use client";

import { ArrowsRotateLeft, FloppyDisk } from "@gravity-ui/icons";
import { Button, Card, Spinner } from "@heroui/react";

import { RoutineHeader } from "@/features/role/student/routine/components/shared";
import type { useRoutinePageState } from "@/features/role/student/routine/hooks/use-routine-page-state";

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
		<Card className={ "px-5" }>
			<div className={ "sm:hidden" }>
				<RoutineHeader
					title={ `Rutina - Dia ${ activeSession.dayNumber }` }
					description={ `${ activeSession.title } - Sesion de entrenamiento` }
					canSaveProgress={ canSaveProgress }
					isRefreshing={ state.isRefreshing }
					isPending={ saveRoutineSession.isPending }
					onRefresh={ handleRefresh }
					statusDescription={ routineStatusDescription }
					onSave={ handleOpenSaveSheet }
				/>
			</div>
			<div className={ "hidden items-end gap-4 sm:flex" }>
				<div className={ "flex-1 space-y-2" }>
					<h1 className={ "text-4xl font-black tracking-tight text-foreground" }>{ `Rutina - Dia ${ activeSession.dayNumber }` }</h1>
					<p className={ "text-base font-semibold text-muted" }>{ `${ activeSession.title } · Sesion de entrenamiento` }</p>
				</div>
				<Button
					isDisabled={ isFetching && !isLoading }
					onPress={ handleRefresh }
					variant={ "secondary" }
				>
					<ArrowsRotateLeft className={ isFetching && !isLoading ? "size-4 animate-spin" : "size-4" }/>
					{ isFetching && !isLoading ? "Actualizando..." : "Actualizar" }
				</Button>
				<Button isDisabled={ !canSaveProgress } isPending={ saveRoutineSession.isPending } onPress={ handleOpenSaveSheet }>
					{ ( { isPending } ) => (
						<>
							{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <FloppyDisk/> }
							Guardar progreso
						</>
					) }
				</Button>
			</div>
		</Card>
	);
}
