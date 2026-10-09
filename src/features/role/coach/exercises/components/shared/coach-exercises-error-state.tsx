import { ErrorAlert } from "@/components/common";

type CoachExercisesErrorStateProps = {
	isRetrying?: boolean;
	message: string;
	onRetryAction?: () => void;
};

export function CoachExercisesErrorState( {
	isRetrying,
	message,
	onRetryAction,
}: CoachExercisesErrorStateProps ) {
	return (
		<ErrorAlert isRetrying={ isRetrying } message={ message } title={ "Error al cargar ejercicios" } onRetryAction={ onRetryAction }/>
	);
}
