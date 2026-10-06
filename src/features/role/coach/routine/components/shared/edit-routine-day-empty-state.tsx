import { Alert } from "@heroui/react";

export function EditRoutineDayEmptyState() {
	return (
		<Alert className={ "border border-warning/20" } status={ "warning" }>
			<Alert.Content>
				<Alert.Title>Seleccioná una rutina</Alert.Title>
				<Alert.Description>
					Para editar ejercicios primero tenés que elegir un día desde la rutina del estudiante.
				</Alert.Description>
			</Alert.Content>
		</Alert>
	);
}
