"use client";

import type { CoachTrainingRoutine } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";
import { useMemo, useState } from "react";
import { toast } from "@heroui/react";

import { CoachCopyRoutineSheet } from "@/features/role/coach/training-routine/components/shared/coach-copy-routine-sheet";
import { CoachDeleteRoutineActionMenu } from "@/features/role/coach/training-routine/components/shared/coach-delete-routine-action-menu";
import { CoachDeleteRoutineConfirmSheet } from "@/features/role/coach/training-routine/components/shared/coach-delete-routine-confirm-sheet";
import { CoachEditRoutineSheet } from "@/features/role/coach/training-routine/components/shared/coach-edit-routine-sheet";
import { useDeleteTrainingRoutineStructure } from "@/features/role/coach/training-routine/hooks/use-training-routine-structure";

type CoachDeleteRoutineActionProps = {
	month: number;
	routines: CoachTrainingRoutine[];
	studentId: string;
	studentName: string;
	year: number;
};

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

	return (
		<>
			<CoachDeleteRoutineActionMenu
				onCopyAction={ () => setIsCopyOpen( true ) }
				onDeleteAction={ handleOpenDeleteConfirm }
				onEditAction={ () => setIsEditOpen( true ) }
			/>

			<CoachEditRoutineSheet
				hideTrigger
				isOpen={ isEditOpen }
				month={ month }
				routines={ routines }
				studentId={ studentId }
				year={ year }
				onOpenChangeAction={ setIsEditOpen }
			/>

			<CoachCopyRoutineSheet
				destinationMonth={ String( month ) }
				destinationWeeksOccupied={ routines.length }
				destinationYear={ String( year ) }
				hasActiveRoutine
				hideTrigger
				isOpen={ isCopyOpen }
				studentId={ studentId }
				onOpenChangeAction={ setIsCopyOpen }
			/>

			<CoachDeleteRoutineConfirmSheet
				deleteErrorMessage={ deleteRoutine.isError ? deleteRoutine.error.message : undefined }
				isConfirmOpen={ isConfirmOpen }
				isDeleting={ deleteRoutine.isPending }
				month={ month }
				onCloseAction={ () => setIsConfirmOpen( false ) }
				onConfirmAction={ handleDelete }
				studentName={ studentName }
				summary={ summary }
				year={ year }
			/>
		</>
	);
}
