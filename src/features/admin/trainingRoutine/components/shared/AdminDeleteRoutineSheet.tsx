"use client";

import type { AdminTrainingRoutine } from "@/features/admin/trainingRoutine/actions/get-training-routines-by-student";
import type { Key } from "@heroui/react";

import { Sheet } from "@heroui-pro/react";
import {
	Alert,
	Button,
	Description,
	Dropdown,
	Header,
	Label,
	Spinner,
	Surface,
	Typography,
	toast,
} from "@heroui/react";
import { EllipsisVertical, TrashBin } from "@gravity-ui/icons";
import { useMemo, useState } from "react";

import { useDeleteTrainingRoutineStructure } from "@/features/admin/trainingRoutine/hooks/useTrainingRoutineStructure";
import { FeatureSheetLayout } from "@/features/shared/components/FeatureSheetLayout";

type AdminDeleteRoutineActionProps = {
	month: number;
	routines: AdminTrainingRoutine[];
	studentId: string;
	studentName: string;
	year: number;
};

function SummaryRow( { label, value }: { label: string; value: React.ReactNode } ) {
	return (
		<div className={ "flex items-center justify-between gap-4" }>
			<Typography className={ "text-sm text-muted" }>{ label }</Typography>
			<Typography className={ "text-sm font-medium" }>{ value }</Typography>
		</div>
	);
}

export function AdminDeleteRoutineSheet( {
											 month,
											 routines,
											 studentId,
											 studentName,
											 year,
										 }: AdminDeleteRoutineActionProps ) {
	const [ isConfirmOpen, setIsConfirmOpen ] = useState( false );
	const deleteRoutine = useDeleteTrainingRoutineStructure();
	const summary = useMemo(
		() => {
			const dayCount = routines.reduce( ( count, routine ) => count + routine.routineDays.length, 0 );
			const exerciseCount = routines.reduce(
				( count, routine ) => count + routine.routineDays.reduce(
					( dayTotal, day ) => dayTotal + day.routines.length,
					0,
				),
				0,
			);

			return {
				dayCount,
				exerciseCount,
				weekCount: routines.length,
			};
		},
		[ routines ],
	);

	function handleAction( key: Key ) {
		if (key === "delete") {
			deleteRoutine.reset();
			setIsConfirmOpen( true );
		}
	}

	async function handleDelete() {
		try {
			await deleteRoutine.mutateAsync( {
				month,
				studentId,
				year,
			} );
			toast.success( "Rutina eliminada", {
				description: "La rutina completa del mes seleccionado fue eliminada.",
			} );
			setIsConfirmOpen( false );
		} catch {
			toast.danger( "Error al eliminar rutina", {
				description: "No se pudo eliminar la rutina completa.",
			} );
		}
	}

	return (
		<>
			<Dropdown>
				<Button
					isIconOnly
					aria-label={ "Opciones de rutina" }
					className={ "text-foreground shadow-sm" }
					variant={ "outline" }
				>
					<EllipsisVertical className={ "size-4" }/>
				</Button>
				<Dropdown.Popover placement={ "bottom end" }>
					<Dropdown.Menu onAction={ handleAction }>
						<Header>Opciones</Header>
						<Dropdown.Item id={ "delete" } textValue={ "Eliminar rutina" } variant={ "danger" }>
							<TrashBin className={ "size-4 shrink-0 text-danger" }/>
							<Label>Eliminar rutina</Label>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown.Popover>
			</Dropdown>

			<FeatureSheetLayout isOpen={ isConfirmOpen } placement={ "right" } onOpenChange={ setIsConfirmOpen }>
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

					{ deleteRoutine.isError ? (
						<Alert className={ "border border-danger/20" } status={ "danger" }>
							<Alert.Content>
								<Alert.Title>Error al eliminar</Alert.Title>
								<Alert.Description>{ deleteRoutine.error.message }</Alert.Description>
							</Alert.Content>
						</Alert>
					) : null }

					<Surface className={ "rounded-xl border border-default-hover bg-surface p-4" }>
						<div className={ "grid gap-3" }>
							<SummaryRow label={ "Estudiante" } value={ studentName }/>
							<SummaryRow label={ "Mes" } value={ month }/>
							<SummaryRow label={ "Anio" } value={ year }/>
							<SummaryRow label={ "Semanas" } value={ summary.weekCount }/>
							<SummaryRow label={ "Dias" } value={ summary.dayCount }/>
							<SummaryRow label={ "Ejercicios cargados" } value={ summary.exerciseCount }/>
						</div>
					</Surface>
				</Sheet.Body>

				<Sheet.Footer className={ "border-default-100 bg-background flex shrink-0 justify-end gap-2 border-t px-6 py-4" }>
					<Button isDisabled={ deleteRoutine.isPending } variant={ "secondary" } onPress={ () => setIsConfirmOpen( false ) }>
						Cancelar
					</Button>
					<Button
						className={ "bg-danger text-danger-foreground" }
						isDisabled={ deleteRoutine.isPending }
						isPending={ deleteRoutine.isPending }
						onPress={ handleDelete }
					>
						{ ( { isPending } ) => (
							<>
								{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <TrashBin className={ "size-4" }/> }
								{ isPending ? "Eliminando..." : "Eliminar rutina" }
							</>
						) }
					</Button>
				</Sheet.Footer>
			</FeatureSheetLayout>
		</>
	);
}
