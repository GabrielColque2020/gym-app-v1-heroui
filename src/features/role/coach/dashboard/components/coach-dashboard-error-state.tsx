import { Alert } from "@heroui/react";

type CoachDashboardErrorStateProps = {
	message: string;
};

export function CoachDashboardErrorState( { message }: CoachDashboardErrorStateProps ) {
	return (
		<Alert className={ "border border-danger/20" } status={ "danger" }>
			<Alert.Content>
				<Alert.Title>No se pudo cargar el inicio</Alert.Title>
				<Alert.Description>{ message }</Alert.Description>
			</Alert.Content>
		</Alert>
	);
}
