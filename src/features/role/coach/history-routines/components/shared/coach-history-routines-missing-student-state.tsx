"use client";

import { Alert } from "@heroui/react";

export function CoachHistoryRoutinesMissingStudentState() {
	return (
		<Alert className={ "border border-warning/20" } status={ "warning" }>
			<Alert.Content>
				<Alert.Title>Seleccioná un estudiante</Alert.Title>
				<Alert.Description>
					Para consultar historial de rutinas primero tenes que elegir un estudiante activo.
				</Alert.Description>
			</Alert.Content>
		</Alert>
	);
}
