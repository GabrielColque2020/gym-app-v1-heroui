"use client";

import { ArrowsRotateLeft, FloppyDisk } from "@gravity-ui/icons";
import { Button, Spinner } from "@heroui/react";

interface RoutineHeaderProps {
	title: string;
	description: string;
	isPending: boolean;
	isRefreshing: boolean;
	canSaveProgress?: boolean;
	onRefresh: () => void;
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
	onRefresh,
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
			{ showButton ? (
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
			) : null }
		</div>
	);
}
