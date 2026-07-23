"use client";

import { Alert, Button, Description, Drawer, Spinner, Surface } from "@heroui/react";
import { Trash2 } from "lucide-react";

import type { CoachExerciseListItem } from "@/features/role/coach/exercises/types/coach-exercise-list-item";
import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";

type CoachDeleteExerciseDrawerProps = {
	deleteErrorMessage?: string;
	exercise: CoachExerciseListItem;
	isDeleting: boolean;
	isOpen: boolean;
	onCloseAction: () => void;
	onConfirmAction: () => void;
};

export function CoachDeleteExerciseDrawer( {
	deleteErrorMessage,
	exercise,
	isDeleting,
	isOpen,
	onCloseAction,
	onConfirmAction,
}: CoachDeleteExerciseDrawerProps ) {
	const placement = useResponsiveDrawerPlacement();

	return (
		<FeatureDrawerLayout
			isDismissable={ false }
			isOpen={ isOpen }
			placement={ placement }
			rightContentClassName={ "w-[34rem]" }
			onOpenChangeAction={ onCloseAction }
		>
			<Drawer.Header className={ "border-default-100 relative border-b pb-4" }>
				<div className={ "flex min-w-0 items-start gap-3 pe-10" }>
					<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-danger/20 bg-danger/10 text-danger" }>
						<Trash2 className={ "size-5" }/>
					</div>
					<div className={ "min-w-0 flex-1" }>
						<Drawer.Heading>Eliminar ejercicio</Drawer.Heading>
						<Description className={ "mt-1 text-sm" }>
							Esta accion es permanente y no se puede deshacer.
						</Description>
					</div>
				</div>
			</Drawer.Header>

			<Drawer.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto py-3" }>
				<Alert className={ "border border-danger/20" } status={ "danger" }>
					<Alert.Content>
						<Alert.Title>Impacto sobre estudiantes y seguimiento</Alert.Title>
						<Alert.Description>
							Si eliminas este ejercicio, dejara de estar disponible para tus rutinas y puede afectar
							lo que los estudiantes ven en sus rutinas e historial. Usa esta opcion solo si estas
							seguro de removerlo permanentemente de tu operacion.
						</Alert.Description>
					</Alert.Content>
				</Alert>

				{ deleteErrorMessage ? (
					<Alert className={ "border border-danger/20" } status={ "danger" }>
						<Alert.Content>
							<Alert.Title>Error al eliminar</Alert.Title>
							<Alert.Description>{ deleteErrorMessage }</Alert.Description>
						</Alert.Content>
					</Alert>
				) : null }

				<Surface className={ "rounded-xl border border-default-hover bg-surface p-4" }>
					<div className={ "grid gap-3 text-sm" }>
						<div className={ "grid gap-1" }>
							<span className={ "font-medium text-muted" }>Ejercicio</span>
							<span className={ "font-semibold text-foreground" }>{ exercise.name }</span>
						</div>
						<div className={ "grid gap-1" }>
							<span className={ "font-medium text-muted" }>Categoria</span>
							<span className={ "text-foreground" }>{ exercise.category || "Sin categoria" }</span>
						</div>
						<div className={ "grid gap-1" }>
							<span className={ "font-medium text-muted" }>Origen</span>
							<span className={ "text-foreground" }>{ exercise.isOverride ? "Global personalizado" : "Propio del coach" }</span>
						</div>
					</div>
				</Surface>
			</Drawer.Body>

			<Drawer.Footer className={ "border-default-100 shrink-0 justify-end gap-2 border-t pt-4" }>
				<Button isDisabled={ isDeleting } variant={ "secondary" } onPress={ onCloseAction }>
					Cancelar
				</Button>
				<Button
					className={ "bg-danger text-danger-foreground" }
					isDisabled={ isDeleting }
					isPending={ isDeleting }
					onPress={ onConfirmAction }
				>
					{ ( { isPending } ) => (
						<>
							{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <Trash2 className={ "size-4" }/> }
							{ isPending ? "Eliminando..." : "Eliminar permanentemente" }
						</>
					) }
				</Button>
			</Drawer.Footer>
		</FeatureDrawerLayout>
	);
}
