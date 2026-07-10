import { RoutineHeaderActions } from "@/features/role/student/routine/components/shared/routine-header-actions";
import { PageHeader } from "@/components/common";

interface RoutineHeaderProps {
	title: string;
	description: string;
	isPending: boolean;
	isRefreshing: boolean;
	canSaveProgress?: boolean;
	onRefreshAction: () => void;
	onSave: () => void;
	statusDescription?: string;
	statusLabel?: string;
	showButton?: boolean;
}

export default function RoutineHeader( {
										   title,
										   description,
										   isPending,
										   isRefreshing,
										   canSaveProgress = true,
										   onRefreshAction,
										   onSave,
										   statusDescription,
										   statusLabel = "Ejercicios cargados",
										   showButton = true,
									   }: RoutineHeaderProps ) {
	return (
		<div className={ "flex w-full flex-col gap-3" }>
			<PageHeader
				title={ title }
				description={ description }
			/>
			<RoutineHeaderActions
				canSaveProgress={ canSaveProgress }
				isPending={ isPending }
				isRefreshing={ isRefreshing }
				onRefresh={ onRefreshAction }
				onSave={ onSave }
				showButton={ showButton }
				statusDescription={ statusDescription }
				statusLabel={ statusLabel }
			/>
		</div>
	);
}

