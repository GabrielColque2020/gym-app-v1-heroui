import { Alert } from "@heroui/react";

type RoutineSaveDrawerAlertsProps = {
	validationError: string | null;
	hasCompletedSets: boolean;
	hasPendingSets: boolean;
};

export function RoutineSaveDrawerAlerts( {
	validationError,
	hasCompletedSets,
	hasPendingSets,
}: RoutineSaveDrawerAlertsProps ) {
	return (
		<>
			{ validationError ? (
				<Alert className={ "border border-warning/20" } status={ "warning" }>
					<Alert.Content>
						<Alert.Title>No se puede guardar todavía</Alert.Title>
						<Alert.Description>{ validationError }</Alert.Description>
					</Alert.Content>
				</Alert>
			) : null }
			{ !hasCompletedSets ? (
				<Alert className={ "border border-warning/20" } status={ "warning" }>
					<Alert.Content>
						<Alert.Title>Todavía no cargaste ninguna serie</Alert.Title>
						<Alert.Description>
							Para terminar el día cargá al menos una serie con repeticiones y peso.
						</Alert.Description>
					</Alert.Content>
				</Alert>
			) : null }
			{ /* Se puede terminar con series sin hacer: solo se avisa. */ }
			{ hasCompletedSets && hasPendingSets ? (
				<Alert className={ "border border-warning/20" } status={ "warning" }>
					<Alert.Content>
						<Alert.Title>Te quedaron series sin cargar</Alert.Title>
						<Alert.Description>
							Podés terminar igual. Si después las hacés, las podés cargar y se guardan solas.
						</Alert.Description>
					</Alert.Content>
				</Alert>
			) : null }
		</>
	);
}

