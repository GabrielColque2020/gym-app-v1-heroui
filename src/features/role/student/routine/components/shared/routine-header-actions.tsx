import { Button, Spinner } from "@heroui/react";
import { RotateCw, Save } from "lucide-react";

type RoutineHeaderActionsProps = {
	canSaveProgress: boolean;
	isPending: boolean;
	isRefreshing: boolean;
	onRefresh: () => void;
	onSave: () => void;
	showButton: boolean;
	statusDescription?: string;
	statusLabel: string;
};

export function RoutineHeaderActions( {
										  canSaveProgress,
										  isPending,
										  isRefreshing,
										  onRefresh,
										  onSave,
										  showButton,
										  statusDescription,
										  statusLabel,
									  }: RoutineHeaderActionsProps ) {
	if (!showButton) return null;

	return (
		<>
			<div className={ "flex gap-2 sm:hidden" }>
				<Button
					className={ "flex-1" }
					isDisabled={ isRefreshing }
					onPress={ onRefresh }
					variant={ "secondary" }
				>
					<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
					{ isRefreshing ? "Actualizando" : "Actualizar" }
				</Button>
				<Button className={ "flex-1" } isDisabled={ !canSaveProgress } isPending={ isPending } onPress={ onSave }>
					{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <Save/> }
					{ isPending ? "Guardando..." : "Guardar" }
				</Button>
			</div>
			<div className={ "hidden items-center gap-3 sm:flex" }>
				{ statusDescription ? (
					<div className={ "text-right" }>
						<p className={ "text-xs uppercase tracking-wide text-muted" }>{ statusLabel }</p>
						<p className={ "text-sm text-foreground" }>{ statusDescription }</p>
					</div>
				) : null }
				<Button
					isDisabled={ isRefreshing }
					onPress={ onRefresh }
					variant={ "secondary" }
				>
					<RotateCw className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
					{ isRefreshing ? "Actualizando..." : "Actualizar" }
				</Button>
				<Button isDisabled={ !canSaveProgress } isPending={ isPending } size={ "lg" } onPress={ onSave }>
					{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <Save/> }
					{ isPending ? "Guardando..." : "Guardar progreso" }
				</Button>
			</div>
		</>
	);
}

