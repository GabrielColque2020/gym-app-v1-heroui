"use client";

import { Button, Card, Description, Drawer, Spinner } from "@heroui/react";
import { Flag, Info, WifiOff } from "lucide-react";

import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";
import { RoutineSaveDrawerAlerts } from "@/features/role/student/routine/components/shared/routine-save-drawer-alerts";
import { RoutineSaveDrawerSummaryItem } from "@/features/role/student/routine/components/shared/routine-save-drawer-summary-item";
import { useIsOnline } from "@/lib/use-is-online";

export type RoutineSaveSummaryItem = {
	completedSets: number;
	id: string;
	name: string;
	totalSets: number;
};

type RoutineSaveDrawerProps = {
	isOpen: boolean;
	isPending: boolean;
	validationError: string | null;
	summaryItems: RoutineSaveSummaryItem[];
	onConfirmAction: () => void;
	onOpenChangeAction: ( isOpen: boolean ) => void;
};

export default function RoutineSaveDrawer( {
											   isOpen,
											   isPending,
											   validationError,
											   summaryItems,
											   onConfirmAction,
											   onOpenChangeAction,
										   }: RoutineSaveDrawerProps ) {
	const placement = useResponsiveDrawerPlacement();
	const hasCompletedSets = summaryItems.some( ( item ) => item.completedSets > 0 );
	const hasPendingSets = summaryItems.some( ( item ) => item.completedSets < item.totalSets );
	const isOnline = useIsOnline();
	// Sin conexion no se puede terminar: el pedido quedaria en pausa con el boton
	// girando. Las series ya cargadas quedan en el telefono.
	const canConfirmSave = hasCompletedSets && !validationError && !isPending && isOnline;

	return (
		<FeatureDrawerLayout isOpen={ isOpen } placement={ placement } onOpenChangeAction={ onOpenChangeAction }>
			<Drawer.Header className={ "border-default-100 relative border-b pb-4" }>
				<div className={ "flex items-start gap-3" }>
					<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
						<Flag className={ "size-5" }/>
					</div>
					<div className={ "min-w-0" }>
						<Drawer.Heading>Terminar día</Drawer.Heading>
						<Description className={ "mt-1 text-sm" }>
							Tus series ya se fueron guardando. Al terminar, el día queda marcado como realizado.
						</Description>
					</div>
				</div>
			</Drawer.Header>
			<Drawer.Body className={ "min-h-0 flex-1 space-y-6 overflow-y-auto py-3" }>
				{ isOnline ? null : (
					<div className={ "flex items-start gap-3 rounded-xl border border-warning/20 bg-warning/10 p-4" } role={ "status" }>
						<WifiOff className={ "mt-0.5 size-4 shrink-0 text-warning" }/>
						<p className={ "text-sm text-foreground" }>
							Sin conexión. Lo que cargaste queda en este teléfono: terminá el día cuando vuelva la señal.
						</p>
					</div>
				) }
				<RoutineSaveDrawerAlerts
					hasCompletedSets={ hasCompletedSets }
					hasPendingSets={ hasPendingSets }
					validationError={ validationError }
				/>
				<Card className={ "border border-border bg-surface/60" }>
					<Card.Content className={ "space-y-3 p-4" }>
						<div className={ "flex items-center gap-2 text-sm font-semibold text-foreground" }>
							<Info className={ "size-4" }/>
							Lo que hiciste hoy
						</div>
						{ summaryItems.length > 0 ? (
							<div className={ "space-y-3" }>
								{ summaryItems.map( ( item ) => (
									<RoutineSaveDrawerSummaryItem key={ item.id } item={ item }/>
								) ) }
							</div>
						) : (
							<div className={ "rounded-xl border border-warning/20 bg-warning/5 p-4" }>
								<p className={ "text-sm font-semibold text-foreground" }>No hay ejercicios en este día</p>
								<p className={ "mt-1 text-sm text-muted" }>Tu entrenador todavía no cargó ejercicios para este día.</p>
							</div>
						) }
					</Card.Content>
				</Card>
			</Drawer.Body>
			<Drawer.Footer className={ "border-default-100 shrink-0 justify-end gap-2 border-t pt-4" }>
				<Button slot={ "close" } variant={ "secondary" }>Cancelar</Button>
				<Button isDisabled={ !canConfirmSave } isPending={ isPending } onPress={ onConfirmAction }>
					{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <Flag className={ "size-4" }/> }
					{ isPending ? "Guardando..." : "Terminar día" }
				</Button>
			</Drawer.Footer>
		</FeatureDrawerLayout>
	);
}

