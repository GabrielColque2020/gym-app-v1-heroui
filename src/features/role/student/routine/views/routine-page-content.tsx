"use client";

import { Alert } from "@heroui/react";

import { RoutinePageErrorState } from "@/features/role/student/routine/components/shared/routine-page-error-state";
import {
	RoutinePageLoadedContent
} from "@/features/role/student/routine/components/shared/routine-page-loaded-content";
import { RoutinePageLoadingState } from "@/features/role/student/routine/components/shared/routine-page-loading-state";
import { useRoutinePageState } from "@/features/role/student/routine/hooks/use-routine-page-state";

type RoutinePageContentProps = {
	routineDayId: string | null;
	studentId: string | null;
};

export default function RoutinePageContent( {
												routineDayId,
												studentId,
											}: RoutinePageContentProps ) {
	const state = useRoutinePageState( {
		routineDayId,
		studentId,
	} );

	if (!routineDayId) {
		return (
			<Alert className={ "border border-warning/20" } status={ "warning" }>
				<Alert.Content>
					<Alert.Title>Seleccioná una rutina</Alert.Title>
					<Alert.Description>Para ver tu rutina primero debes elegir un dia desde la lista de rutinas.</Alert.Description>
				</Alert.Content>
			</Alert>
		);
	}

	if (state.isLoading) {
		return <RoutinePageLoadingState/>;
	}

	if (state.isError) {
		return (
			<RoutinePageErrorState
				errorMessage={ state.error instanceof Error ? state.error.message : "Ocurrió un error inesperado." }
				onRetry={ () => state.handleRefresh() }
			/>
		);
	}
	return <RoutinePageLoadedContent state={ state }/>;
}

