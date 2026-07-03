import { Alert } from "@heroui/react";

type CoachExercisesErrorStateProps = {
	message: string;
};

export function CoachExercisesErrorState( {
	message,
}: CoachExercisesErrorStateProps ) {
	return (
		<Alert className={ "border border-danger/20" } status={ "danger" }>
			<Alert.Content>
				<Alert.Title>Error al cargar ejercicios</Alert.Title>
				<Alert.Description>{ message }</Alert.Description>
			</Alert.Content>
		</Alert>
	);
}
