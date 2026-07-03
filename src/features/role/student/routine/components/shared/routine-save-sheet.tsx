"use client";

import { Button, Card, Description, Spinner } from "@heroui/react";
import { Sheet } from "@heroui-pro/react";
import { Info, Save } from "lucide-react";

import { FeatureSheetLayout } from "@/features/shared/components/feature-sheet-layout";
import { useResponsiveSheetPlacement } from "@/features/shared/hooks/use-responsive-sheet-placement";
import { RoutineSaveSheetAlerts } from "@/features/role/student/routine/components/shared/routine-save-sheet-alerts";
import { RoutineSaveSheetSummaryItem } from "@/features/role/student/routine/components/shared/routine-save-sheet-summary-item";

export type RoutineSaveSummaryItem = {
	completedSets: number;
	id: string;
	name: string;
	totalSets: number;
};

type RoutineSaveSheetProps = {
	isOpen: boolean;
	isPending: boolean;
	validationError: string | null;
	summaryItems: RoutineSaveSummaryItem[];
	onConfirmAction: () => void;
	onOpenChangeAction: ( isOpen: boolean ) => void;
};

export default function RoutineSaveSheet( {
											  isOpen,
											  isPending,
											  validationError,
											  summaryItems,
											  onConfirmAction,
											  onOpenChangeAction,
										  }: RoutineSaveSheetProps ) {
	const placement = useResponsiveSheetPlacement();
	const hasCompletedSets = summaryItems.some( ( item ) => item.completedSets > 0 );
	const canConfirmSave = hasCompletedSets && !validationError && !isPending;

	return (
		<FeatureSheetLayout isOpen={ isOpen } placement={ placement } onOpenChangeAction={ onOpenChangeAction }>
			<Sheet.Header className={ "border-default-100 border-b px-6 pb-4 pt-5" }>
				<div className={ "flex items-start gap-3" }>
					<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
						<Info className={ "size-5" }/>
					</div>
					<div className={ "min-w-0" }>
						<Sheet.Heading>Guardar progreso</Sheet.Heading>
						<Description className={ "mt-1 text-sm" }>
							Revisa el resumen de series que se van a guardar antes de confirmar.
						</Description>
					</div>
				</div>
			</Sheet.Header>
			<Sheet.Body className={ "min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-5" }>
				<RoutineSaveSheetAlerts validationError={ validationError } hasCompletedSets={ hasCompletedSets }/>
				<Card className={ "border border-border bg-surface/60" }>
					<Card.Content className={ "space-y-3 p-4" }>
						<div className={ "flex items-center gap-2 text-sm font-semibold text-foreground" }>
							<Info className={ "size-4" }/>
							Resumen de guardado
						</div>
						{ summaryItems.length > 0 ? (
							<div className={ "space-y-3" }>
								{ summaryItems.map( ( item ) => (
									<RoutineSaveSheetSummaryItem key={ item.id } item={ item }/>
								) ) }
							</div>
						) : (
							<div className={ "rounded-xl border border-warning/20 bg-warning/5 p-4" }>
								<p className={ "text-sm font-semibold text-foreground" }>No hay ejercicios para guardar</p>
								<p className={ "mt-1 text-sm text-muted" }>La rutina no tiene series completadas para persistir.</p>
							</div>
						) }
					</Card.Content>
				</Card>
			</Sheet.Body>
			<Sheet.Footer className={ "border-default-100 flex shrink-0 justify-end gap-2 border-t px-6 py-4" }>
				<Sheet.Close>
					<Button variant={ "secondary" }>Cancelar</Button>
				</Sheet.Close>
				<Button isDisabled={ !canConfirmSave } isPending={ isPending } onPress={ onConfirmAction }>
					{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <Save className={ "size-4" }/> }
					{ isPending ? "Guardando..." : "Guardar progreso" }
				</Button>
			</Sheet.Footer>
		</FeatureSheetLayout>
	);
}
