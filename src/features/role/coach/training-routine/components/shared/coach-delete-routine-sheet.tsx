"use client";

import type { CoachTrainingRoutine } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";

import { Sheet } from "@heroui-pro/react";
import { Alert, Button, Description, Spinner, Surface, Typography, toast, Dropdown, Header, Label } from "@heroui/react";
import { Copy, EllipsisVertical, Pencil, TrashBin } from "@gravity-ui/icons";
import { useMemo, useState } from "react";

import { CoachCopyRoutineSheet } from "@/features/role/coach/training-routine/components/shared/coach-copy-routine-sheet";
import { CoachEditRoutineSheet } from "@/features/role/coach/training-routine/components/shared/coach-edit-routine-sheet";
import { useDeleteTrainingRoutineStructure } from "@/features/role/coach/training-routine/hooks/use-training-routine-structure";
import { FeatureSheetLayout } from "@/features/shared/components/feature-sheet-layout";

type CoachDeleteRoutineActionProps = {
	month: number;
	routines: CoachTrainingRoutine[];
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

export function CoachDeleteRoutineSheet( {
											 month,
											 routines,
											 studentId,
											 studentName,
											 year,
										 }: CoachDeleteRoutineActionProps ) {
	const [ isConfirmOpen, setIsConfirmOpen ] = useState( false );
	const [ isEditOpen, setIsEditOpen ] = useState( false );
	const [ isCopyOpen, setIsCopyOpen ] = useState( false );
	const deleteRoutine = useDeleteTrainingRoutineStructure();
	const summary = useMemo(
		() => {
			const dayCount = routines.reduce( ( count, routine ) => count + routine.routineDays.length, 0 );
			const exerciseCount = routines.reduce(
				( count, routine ) =>
					count + routine.routineDays.reduce(
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

	function handleOpenDeleteConfirm() {
		deleteRoutine.reset();
		setIsConfirmOpen( true );
	}

	function handleOpenEdit() {
		setIsEditOpen( true );
	}

	function handleOpenCopy() {
		setIsCopyOpen( true );
	}

	return (
		<>
			<Dropdown>
				<Button isIconOnly aria-label={ "Menu" } variant={ "outline" } className={ "border border-accent/50 text-accent shadow-s" }>
					<EllipsisVertical/>
				</Button>
				<Dropdown.Popover>
					<Dropdown.Menu onAction={ ( key ) => {
						if (key === "edit-file") {
							handleOpenEdit();
						}
						if (key === "copy-file") {
							handleOpenCopy();
						}
						if (key === "delete-file") {
							handleOpenDeleteConfirm();
						}
					} }>
						<Dropdown.Section>
							<Header>Opciones</Header>
							<Dropdown.Item id={ "edit-file" } textValue={ "Editar rutina" }>
								<Pencil className={ "size-4 shrink-0 text-warning" }/>
								<Label className={ "text-warning" }>Editar</Label>
							</Dropdown.Item>
							<Dropdown.Item id={ "copy-file" } textValue={ "Copiar rutina" }>
								<Copy className={ "size-4 shrink-0 text-accent" }/>
								<Label className={ "text-accent" }>Copiar</Label>
							</Dropdown.Item>
							<Dropdown.Item id={ "delete-file" } textValue={ "Eliminar rutina" } variant={ "danger" }>
								<TrashBin className={ "size-4 shrink-0 text-danger" }/>
								<Label className={ "text-danger" }>Eliminar</Label>
							</Dropdown.Item>
						</Dropdown.Section>
					</Dropdown.Menu>
				</Dropdown.Popover>
			</Dropdown>

			<CoachEditRoutineSheet
				hideTrigger
				isOpen={ isEditOpen }
				month={ month }
				routines={ routines }
				studentId={ studentId }
				year={ year }
				onOpenChange={ setIsEditOpen }
			/>

			<CoachCopyRoutineSheet
				destinationMonth={ String( month ) }
				destinationWeeksOccupied={ routines.length }
				destinationYear={ String( year ) }
				hasActiveRoutine
				hideTrigger
				isOpen={ isCopyOpen }
				studentId={ studentId }
				onOpenChange={ setIsCopyOpen }
			/>

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
					<Button
						isDisabled={ deleteRoutine.isPending }
						variant={ "secondary" }
						onPress={ () => setIsConfirmOpen( false ) }
					>
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
