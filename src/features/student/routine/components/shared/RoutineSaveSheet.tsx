"use client";

import { CircleCheck, CircleInfo, FloppyDisk } from "@gravity-ui/icons";
import { Alert, Button, Card, Chip, Description, Spinner } from "@heroui/react";
import { Sheet } from "@heroui-pro/react";

import { FeatureSheetLayout } from "@/features/shared/components/FeatureSheetLayout";
import { useResponsiveSheetPlacement } from "@/features/student/routine/components/shared/useResponsiveSheetPlacement";
import React from "react";

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
	onConfirm: () => void;
	onOpenChange: ( isOpen: boolean ) => void;
};

// Formatea el conteo de series completadas para mostrar el resumen antes de guardar.
function formatCompletionLabel( completedSets: number, totalSets: number ) {
	return `${ completedSets }/${ totalSets } series completadas`;
}

export default function RoutineSaveSheet( {
											  isOpen,
											  isPending,
											  validationError,
											  summaryItems,
											  onConfirm,
											  onOpenChange,
										  }: RoutineSaveSheetProps ) {
	const placement = useResponsiveSheetPlacement();
	const hasCompletedSets = summaryItems.some( ( item ) => item.completedSets > 0 );
	const canConfirmSave = hasCompletedSets && !validationError && !isPending;

	return (
		<FeatureSheetLayout isOpen={ isOpen } placement={ placement } onOpenChange={ onOpenChange }>
			<Sheet.Header className={ "border-default-100 border-b px-6 pb-4 pt-5" }>
				<div className={ "flex items-start gap-3" }>
					<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-soft bg-accent-soft/60 text-accent" }>
						<CircleInfo className={ "size-5" }/>
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
				{ validationError ? (
					<Alert className={ "border border-warning/20" } status={ "warning" }>
						<Alert.Content>
							<Alert.Title>No se puede guardar todavia</Alert.Title>
							<Alert.Description>{ validationError }</Alert.Description>
						</Alert.Content>
					</Alert>
				) : null }

				{ !hasCompletedSets ? (
					<Alert className={ "border border-warning/20" } status={ "warning" }>
						<Alert.Content>
							<Alert.Title>Debes completar al menos una serie</Alert.Title>
							<Alert.Description>
								El guardado solo se habilita cuando existe por lo menos una serie marcada como completada.
							</Alert.Description>
						</Alert.Content>
					</Alert>
				) : null }

				<Card className={ "border border-border bg-surface/60" }>
					<Card.Content className={ "space-y-3 p-4" }>
						<div className={ "flex items-center gap-2 text-sm font-semibold text-foreground" }>
							<CircleInfo className={ "size-4" }/>
							Resumen de guardado
						</div>

						{ summaryItems.length > 0 ? (
							<div className={ "space-y-3" }>
								{ summaryItems.map( ( item ) => (
									<div
										key={ item.id }
										className={ "flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-background px-4 py-3" }
									>
										<div className={ "min-w-0" }>
											<p className={ "truncate text-sm font-semibold text-foreground" }>{ item.name }</p>
											<p className={ "text-xs text-muted" }>Se guardaran solo las series completadas</p>
										</div>

										<Chip
											color={ item.completedSets === item.totalSets && item.totalSets > 0 ? "success" : "warning" }
											size={ "sm" }
											variant={ "soft" }
										>
											<Chip.Label>{ formatCompletionLabel( item.completedSets, item.totalSets ) }</Chip.Label>
										</Chip>
									</div>
								) ) }
							</div>
						) : (
							<Alert className={ "border border-warning/20" } status={ "warning" }>
								<Alert.Content>
									<Alert.Title>No hay ejercicios para guardar</Alert.Title>
									<Alert.Description>
										La rutina no tiene series completadas para persistir.
									</Alert.Description>
								</Alert.Content>
							</Alert>
						) }
					</Card.Content>
				</Card>
			</Sheet.Body>

			<Sheet.Footer className={ "border-default-100 flex shrink-0 justify-end gap-2 border-t px-6 py-4" }>
				<Sheet.Close>
					<Button variant={ "secondary" }>
						Cancelar
					</Button>
				</Sheet.Close>

				<Button
					isDisabled={ !canConfirmSave }
					isPending={ isPending }
					onPress={ onConfirm }
				>
					{ ( { isPending } ) => (
						<>
							{ isPending ? <Spinner color={ "current" } size={ "sm" }/> :
								<FloppyDisk className={ "size-4" }/> }
							{ isPending ? "Guardando..." : "Guardar progreso" }
						</>
					) }

				</Button>
			</Sheet.Footer>
		</FeatureSheetLayout>
	);
}
