"use client";

import { Alert } from "@heroui/react";

type CoachRoutineStructureAlertsProps = {
	errorMessage?: string;
	hasRemovalWarning: boolean;
};

export function CoachRoutineStructureAlerts( {
	errorMessage,
	hasRemovalWarning,
}: CoachRoutineStructureAlertsProps ) {
	return (
		<>
			{ errorMessage ? (
				<Alert className={ "border border-danger/20" } status={ "danger" }>
					<Alert.Content>
						<Alert.Title>Error al guardar</Alert.Title>
						<Alert.Description>{ errorMessage }</Alert.Description>
					</Alert.Content>
				</Alert>
			) : null }

			{ hasRemovalWarning ? (
				<Alert className={ "border border-warning/20" } status={ "warning" }>
					<Alert.Content>
						<Alert.Title>Revisar cambios</Alert.Title>
						<Alert.Description>
							Esta accion puede eliminar dias o ejercicios ya cargados.
						</Alert.Description>
					</Alert.Content>
				</Alert>
			) : null }
		</>
	);
}
