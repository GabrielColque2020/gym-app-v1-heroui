"use client";

import { ErrorAlert } from "@/components/common";

type CoachTrainingRoutinesErrorStateProps = {
	isRetrying?: boolean;
	message: string;
	onRetryAction?: () => void;
};

export function CoachTrainingRoutinesErrorState( {
	isRetrying,
	message,
	onRetryAction,
}: CoachTrainingRoutinesErrorStateProps ) {
	return (
		<ErrorAlert isRetrying={ isRetrying } message={ message } title={ "Error al cargar rutina" } onRetryAction={ onRetryAction }/>
	);
}
