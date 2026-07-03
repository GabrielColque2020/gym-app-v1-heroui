import { Alert } from "@heroui/react";

type RoutineSaveSheetAlertsProps = {
	validationError: string | null;
	hasCompletedSets: boolean;
};

export function RoutineSaveSheetAlerts( {
	validationError,
	hasCompletedSets,
}: RoutineSaveSheetAlertsProps ) {
	return (
		<>
			{ validationError ? (
				<Alert className={ "border border-warning/20" } status={ "warning" }>
					<Alert.Content>
						<Alert.Title>No se puede guardar todavia</Alert.Title>
						<Alert.Description>{ validationError }</Alert.Description>
					</Alert.Content>
				</Alert>
			) : null }
			{ !hasCompletedSets ? (
				<Alert className={ "border border-warning/20" } status={ "warning" }>
					<Alert.Content>
						<Alert.Title>Debes completar al menos una serie</Alert.Title>
						<Alert.Description>
							El guardado solo se habilita cuando existe por lo menos una serie marcada como completada.
						</Alert.Description>
					</Alert.Content>
				</Alert>
			) : null }
		</>
	);
}
