import { RoutineHeaderActions } from "@/features/role/student/routine/components/shared/routine-header-actions";

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
		<div className={ "flex w-full flex-col gap-3 px-2" }>
			<div>
				<h1 className={ "text-xl font-black sm:truncate sm:text-4xl sm:tracking-tight" }>{ title }</h1>
				<p className={ "mt-1 text-base font-semibold text-muted sm:text-base" }>{ description }</p>
			</div>
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
