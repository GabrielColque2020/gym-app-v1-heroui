"use client";

import { ArrowsRotateLeft, FloppyDisk } from "@gravity-ui/icons";
import { Button, Spinner } from "@heroui/react";

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
					className={ "flex-1 font-semibold" }
					isDisabled={ isRefreshing }
					onPress={ onRefresh }
					variant={ "secondary" }
				>
					<ArrowsRotateLeft className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
					{ isRefreshing ? "Actualizando" : "Actualizar" }
				</Button>
				<Button className={ "flex-1 font-semibold" } isDisabled={ !canSaveProgress } isPending={ isPending } onPress={ onSave }>
					{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <FloppyDisk/> }
					{ isPending ? "Guardando..." : "Guardar" }
				</Button>
			</div>
			<div className={ "hidden items-center gap-3 sm:flex" }>
				{ statusDescription ? (
					<div className={ "text-right" }>
						<p className={ "text-xs font-semibold uppercase tracking-wide text-muted" }>{ statusLabel }</p>
						<p className={ "text-sm font-semibold text-foreground" }>{ statusDescription }</p>
					</div>
				) : null }
				<Button
					className={ "font-semibold" }
					isDisabled={ isRefreshing }
					onPress={ onRefresh }
					variant={ "secondary" }
				>
					<ArrowsRotateLeft className={ isRefreshing ? "size-4 animate-spin" : "size-4" }/>
					{ isRefreshing ? "Actualizando..." : "Actualizar" }
				</Button>
				<Button className={ "font-semibold" } isDisabled={ !canSaveProgress } isPending={ isPending } size={ "lg" } onPress={ onSave }>
					{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <FloppyDisk/> }
					{ isPending ? "Guardando..." : "Guardar progreso" }
				</Button>
			</div>
		</>
	);
}
