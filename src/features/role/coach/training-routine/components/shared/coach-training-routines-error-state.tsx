"use client";

import { Alert } from "@heroui/react";

type CoachTrainingRoutinesErrorStateProps = {
	message: string;
};

export function CoachTrainingRoutinesErrorState( {
	message,
}: CoachTrainingRoutinesErrorStateProps ) {
	return (
		<Alert className={ "border border-danger/20" } status={ "danger" }>
			<Alert.Content>
				<Alert.Title>Error al cargar rutina</Alert.Title>
				<Alert.Description>{ message }</Alert.Description>
			</Alert.Content>
		</Alert>
	);
}
