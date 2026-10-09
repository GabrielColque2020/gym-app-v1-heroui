import { ErrorAlert } from "@/components/common";

type CoachDashboardErrorStateProps = {
	isRetrying?: boolean;
	message: string;
	onRetryAction?: () => void;
};

export function CoachDashboardErrorState( { isRetrying, message, onRetryAction }: CoachDashboardErrorStateProps ) {
	return (
		<ErrorAlert isRetrying={ isRetrying } message={ message } title={ "No se pudo cargar el inicio" } onRetryAction={ onRetryAction }/>
	);
}
