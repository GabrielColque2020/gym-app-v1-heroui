import { ErrorAlert } from "@/components/common";

type EditRoutineDayErrorStateProps = {
	isRetrying?: boolean;
	message: string;
	onRetryAction?: () => void;
};

export function EditRoutineDayErrorState( {
	isRetrying,
	message,
	onRetryAction,
}: EditRoutineDayErrorStateProps ) {
	return (
		<ErrorAlert isRetrying={ isRetrying } message={ message } title={ "Error al cargar rutina" } onRetryAction={ onRetryAction }/>
	);
}
