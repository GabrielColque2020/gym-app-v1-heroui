"use client";

import type { CoachTrainingRoutine } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";
import { useMemo, useRef, useState } from "react";
import { toast } from "@heroui/react";
import { useReactToPrint } from "react-to-print";

import { CoachCopyRoutineDrawer } from "@/features/role/coach/training-routine/components/shared/coach-copy-routine-drawer";
import { CoachOptionRoutineActionMenu } from "@/features/role/coach/training-routine/components/shared/coach-option-routine-action-menu";
import { CoachDeleteRoutineDrawer } from "@/features/role/coach/training-routine/components/shared/coach-delete-routine-drawer";
import { CoachEditRoutineDrawer } from "@/features/role/coach/training-routine/components/shared/coach-edit-routine-drawer";
import { useDeleteTrainingRoutineStructure } from "@/features/role/coach/training-routine/hooks/use-training-routine-structure";
import { TrainingRoutinePrintable } from "@/features/training-routine/components/shared/training-routine-printable";

type CoachDeleteRoutineActionProps = {
	month: number;
	routineObjective?: string | null;
	routineWeeks: CoachTrainingRoutine[];
	studentId: string;
	studentName: string;
	year: number;
};

export function CoachOptionRoutineDrawer( {
											  month,
											  routineObjective,
											  routineWeeks,
											  studentId,
											  studentName,
											  year,
										  }: CoachDeleteRoutineActionProps ) {
	const [ isConfirmOpen, setIsConfirmOpen ] = useState( false );
	const [ isEditOpen, setIsEditOpen ] = useState( false );
	const [ isCopyOpen, setIsCopyOpen ] = useState( false );
	const deleteRoutine = useDeleteTrainingRoutineStructure();
	const printRef = useRef<HTMLDivElement | null>( null );
	const handlePrint = useReactToPrint( {
		contentRef: printRef,
		documentTitle: `rutina-${ year }-${ String( month ).padStart( 2, "0" ) }`,
		pageStyle: `
			@page {
				size: A4 portrait;
				margin: 6mm;
			}
			body {
				-webkit-print-color-adjust: exact;
				print-color-adjust: exact;
			}
		`,
	} );

	const summary = useMemo(
		() => {
			const dayCount = routineWeeks.reduce( ( count, routineWeek ) => count + routineWeek.routineDays.length, 0 );
			const exerciseCount = routineWeeks.reduce(
				( count, routineWeek ) =>
					count + routineWeek.routineDays.reduce(
						( dayTotal, day ) => dayTotal + day.routines.length,
						0,
					),
				0,
			);

				return {
					dayCount,
					exerciseCount,
					weekCount: routineWeeks.length,
				};
		},
		[ routineWeeks ],
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
			<CoachOptionRoutineActionMenu
				onCopyAction={ () => setIsCopyOpen( true ) }
				onDeleteAction={ handleOpenDeleteConfirm }
				onEditAction={ () => setIsEditOpen( true ) }
				onPrintAction={ () => void handlePrint() }
			/>

			<CoachEditRoutineDrawer
				hideTrigger
				isOpen={ isEditOpen }
				month={ month }
				routineObjective={ routineObjective }
				routineWeeks={ routineWeeks }
				studentId={ studentId }
				year={ year }
				onOpenChangeAction={ setIsEditOpen }
			/>

			<CoachCopyRoutineDrawer
				destinationMonth={ String( month ) }
				destinationWeeksOccupied={ routineWeeks.length }
				destinationYear={ String( year ) }
				hasActiveRoutine
				hideTrigger
				isOpen={ isCopyOpen }
				studentId={ studentId }
				onOpenChangeAction={ setIsCopyOpen }
			/>

			<CoachDeleteRoutineDrawer
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

			<TrainingRoutinePrintable
				contentRef={ printRef }
				month={ month }
				routineObjective={ routineObjective ?? null }
				routineWeeks={ routineWeeks }
				studentName={ studentName }
				year={ year }
			/>
		</>
	);
}
