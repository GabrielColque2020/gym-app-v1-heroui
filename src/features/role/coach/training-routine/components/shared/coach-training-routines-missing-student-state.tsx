"use client";

import { Alert } from "@heroui/react";

export function CoachTrainingRoutinesMissingStudentState() {
	return (
		<Alert className={ "border border-warning/20" } status={ "warning" }>
			<Alert.Content>
				<Alert.Title>Selecciona un estudiante</Alert.Title>
				<Alert.Description>
					Para consultar rutinas primero tenes que elegir un estudiante activo.
				</Alert.Description>
			</Alert.Content>
		</Alert>
	);
}
