"use client";

import { Alert, Button, Description, Drawer, Spinner, Surface } from "@heroui/react";
import { Trash2 } from "lucide-react";

import { CoachDeleteRoutineSummaryRow } from "@/features/role/coach/training-routine/components/shared/coach-delete-routine-summary-row";
import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";

type Summary = {
	dayCount: number;
	exerciseCount: number;
	weekCount: number;
};

type CoachDeleteRoutineConfirmDrawerProps = {
	deleteErrorMessage?: string;
	isConfirmOpen: boolean;
	isDeleting: boolean;
	month: number;
	onCloseAction: () => void;
	onConfirmAction: () => void;
	studentName: string;
	summary: Summary;
	year: number;
};

export function CoachDeleteRoutineDrawer( {
											  deleteErrorMessage,
											  isConfirmOpen,
											  isDeleting,
											  month,
											  onCloseAction,
											  onConfirmAction,
											  studentName,
											  summary,
											  year,
										  }: CoachDeleteRoutineConfirmDrawerProps ) {
	const placement = useResponsiveDrawerPlacement();

	return (
		<FeatureDrawerLayout
			isOpen={ isConfirmOpen }
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
						<Drawer.Heading>Eliminar rutina</Drawer.Heading>
						<Description className={ "mt-1 text-sm" }>
							Esta accion no se puede deshacer.
						</Description>
					</div>
				</div>
			</Drawer.Header>

			<Drawer.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto py-3" }>
				<Alert className={ "border border-danger/20" } status={ "danger" }>
					<Alert.Content>
						<Alert.Title>Accion irreversible</Alert.Title>
						<Alert.Description>
							Esta accion eliminara la rutina completa del mes seleccionado, incluyendo sus semanas,
							dias y ejercicios cargados.
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
					<div className={ "grid gap-3" }>
						<CoachDeleteRoutineSummaryRow label={ "Estudiante" } value={ studentName }/>
						<CoachDeleteRoutineSummaryRow label={ "Mes" } value={ month }/>
						<CoachDeleteRoutineSummaryRow label={ "Año" } value={ year }/>
						<CoachDeleteRoutineSummaryRow label={ "Semanas" } value={ summary.weekCount }/>
						<CoachDeleteRoutineSummaryRow label={ "Dias" } value={ summary.dayCount }/>
						<CoachDeleteRoutineSummaryRow label={ "Ejercicios cargados" } value={ summary.exerciseCount }/>
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
							{ isPending ? "Eliminando..." : "Eliminar rutina" }
						</>
					) }
				</Button>
			</Drawer.Footer>

		</FeatureDrawerLayout>
	);
}

