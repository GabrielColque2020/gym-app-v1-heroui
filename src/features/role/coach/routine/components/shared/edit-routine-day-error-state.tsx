import { Alert } from "@heroui/react";

type EditRoutineDayErrorStateProps = {
	message: string;
};

export function EditRoutineDayErrorState( {
	message,
}: EditRoutineDayErrorStateProps ) {
	return (
		<Alert className={ "border border-danger/20" } status={ "danger" }>
			<Alert.Content>
				<Alert.Title>Error al cargar rutina</Alert.Title>
				<Alert.Description>{ message }</Alert.Description>
			</Alert.Content>
		</Alert>
	);
}
