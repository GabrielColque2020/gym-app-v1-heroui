"use client";

import { ErrorAlert } from "@/components/common";

type CoachHistoryRoutinesErrorStateProps = {
	isRetrying?: boolean;
	message: string;
	onRetryAction?: () => void;
};

export function CoachHistoryRoutinesErrorState( {
	isRetrying,
	message,
	onRetryAction,
}: CoachHistoryRoutinesErrorStateProps ) {
	return (
		<ErrorAlert isRetrying={ isRetrying } message={ message } title={ "Error al cargar historial" } onRetryAction={ onRetryAction }/>
	);
}
