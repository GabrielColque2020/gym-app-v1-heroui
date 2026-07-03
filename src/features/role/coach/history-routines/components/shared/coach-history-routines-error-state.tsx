"use client";

import { Alert } from "@heroui/react";

type CoachHistoryRoutinesErrorStateProps = {
	message: string;
};

export function CoachHistoryRoutinesErrorState( {
	message,
}: CoachHistoryRoutinesErrorStateProps ) {
	return (
		<Alert className={ "border border-danger/20" } status={ "danger" }>
			<Alert.Content>
				<Alert.Title>Error al cargar historial</Alert.Title>
				<Alert.Description>{ message }</Alert.Description>
			</Alert.Content>
		</Alert>
	);
}
