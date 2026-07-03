"use client";

import { TrashBin } from "@gravity-ui/icons";
import { Alert, Button, Description, Spinner, Surface } from "@heroui/react";
import { Sheet } from "@heroui-pro/react";

import { CoachDeleteRoutineSummaryRow } from "@/features/role/coach/training-routine/components/shared/coach-delete-routine-summary-row";

type Summary = {
	dayCount: number;
	exerciseCount: number;
	weekCount: number;
};

type CoachDeleteRoutineConfirmSheetProps = {
	deleteErrorMessage?: string;
	isConfirmOpen: boolean;
	isDeleting: boolean;
	month: number;
	onClose: () => void;
	onConfirm: () => void;
	studentName: string;
	summary: Summary;
	year: number;
};

export function CoachDeleteRoutineConfirmSheet( {
	deleteErrorMessage,
	isConfirmOpen,
	isDeleting,
	month,
	onClose,
	onConfirm,
	studentName,
	summary,
	year,
}: CoachDeleteRoutineConfirmSheetProps ) {
	return (
		<Sheet isOpen={ isConfirmOpen } placement={ "right" } onOpenChange={ onClose }>
			<Sheet.Header className={ "border-default-100 relative border-b px-6 pb-5 pt-5" }>
				<div className={ "flex min-w-0 items-start gap-3 pe-10" }>
					<div className={ "flex size-10 shrink-0 items-center justify-center rounded-xl border border-danger/20 bg-danger/10 text-danger" }>
						<TrashBin className={ "size-5" }/>
					</div>
					<div className={ "min-w-0 flex-1" }>
						<Sheet.Heading>Eliminar rutina</Sheet.Heading>
						<Description className={ "mt-1 text-sm" }>
							Esta accion no se puede deshacer.
						</Description>
					</div>
				</div>
			</Sheet.Header>

			<Sheet.Body className={ "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-6 py-5" }>
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
						<CoachDeleteRoutineSummaryRow label={ "Anio" } value={ year }/>
						<CoachDeleteRoutineSummaryRow label={ "Semanas" } value={ summary.weekCount }/>
						<CoachDeleteRoutineSummaryRow label={ "Dias" } value={ summary.dayCount }/>
						<CoachDeleteRoutineSummaryRow label={ "Ejercicios cargados" } value={ summary.exerciseCount }/>
					</div>
				</Surface>
			</Sheet.Body>

			<Sheet.Footer className={ "border-default-100 bg-background flex shrink-0 justify-end gap-2 border-t px-6 py-4" }>
				<Button isDisabled={ isDeleting } variant={ "secondary" } onPress={ onClose }>
					Cancelar
				</Button>
				<Button
					className={ "bg-danger text-danger-foreground" }
					isDisabled={ isDeleting }
					isPending={ isDeleting }
					onPress={ onConfirm }
				>
					{ ( { isPending } ) => (
						<>
							{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <TrashBin className={ "size-4" }/> }
							{ isPending ? "Eliminando..." : "Eliminar rutina" }
						</>
					) }
				</Button>
			</Sheet.Footer>
		</Sheet>
	);
}
