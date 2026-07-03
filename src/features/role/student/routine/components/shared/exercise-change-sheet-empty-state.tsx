"use client";

import { Alert } from "@heroui/react";

export function ExerciseChangeSheetEmptyState() {
	return (
		<Alert className={ "border border-warning/20" } status={ "warning" }>
			<Alert.Content>
				<Alert.Title>Sin variantes disponibles</Alert.Title>
				<Alert.Description>Esta rutina no tiene ejercicios alternativos configurados.</Alert.Description>
			</Alert.Content>
		</Alert>
	);
}
