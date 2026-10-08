"use client";

import type { CoachTrainingRoutine } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";
import { useMemo, useState } from "react";
import { Button, toast } from "@heroui/react";
import { CalendarRange } from "lucide-react";

import { CoachCopyRoutineDrawer } from "@/features/role/coach/training-routine/components/shared/coach-copy-routine-drawer";
import { CoachOptionRoutineActionMenu } from "@/features/role/coach/training-routine/components/shared/coach-option-routine-action-menu";
import { CoachDeleteRoutineDrawer } from "@/features/role/coach/training-routine/components/shared/coach-delete-routine-drawer";
import { CoachEditRoutineDrawer } from "@/features/role/coach/training-routine/components/shared/coach-edit-routine-drawer";
import { CoachSaveTemplateModal } from "@/features/role/coach/training-routine/components/shared/coach-save-template-modal";
import { useDeleteTrainingRoutineStructure } from "@/features/role/coach/training-routine/hooks/use-training-routine-structure";
import { downloadFileFromUrl } from "@/features/shared/services/download-file";
import { buildTrainingRoutineReportPdfUrl } from "@/features/training-routine/services/training-routines-report-pdf-url";

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
	// El drawer de copiar se abre con el origen por defecto (otro mes del
	// estudiante) o ya parado en una plantilla, segun desde donde se pidio.
	const [ copySource, setCopySource ] = useState<"student" | "template">( "student" );
	const [ isCopyOpen, setIsCopyOpen ] = useState( false );

	function openCopy( source: "student" | "template" ) {
		setCopySource( source );
		setIsCopyOpen( true );
	}
	const [ isSaveTemplateOpen, setIsSaveTemplateOpen ] = useState( false );
	// Series que el estudiante ya cargo en el mes: copiar o usar una plantilla
	// encima no las borra, pero hay que avisarlo.
	const loadedSetCount = routineWeeks.reduce(
		( count, routineWeek ) => count + routineWeek.routineDays.reduce( ( dayTotal, day ) => dayTotal + ( day.loadedSetCount ?? 0 ), 0 ),
		0,
	);
	const [ isDownloading, setIsDownloading ] = useState( false );
	const deleteRoutine = useDeleteTrainingRoutineStructure();

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

	function handleDownloadReport() {
		setIsDownloading( true );
		downloadFileFromUrl(
			buildTrainingRoutineReportPdfUrl( {
				month,
				studentId,
				year,
			} ),
		);
		window.setTimeout( () => {
			setIsDownloading( false );
		}, 1200 );
	}

	return (
		<>
			{ /* Agregar o quitar semanas y dias es parte de armar la rutina: va a la
			     vista y con su nombre, no dentro del menu como un "Editar" mas. */ }
			<Button className={ "flex-1 @xl:flex-none" } variant={ "secondary" } onPress={ () => setIsEditOpen( true ) }>
				<CalendarRange className={ "size-4" }/>
				Semanas y días
			</Button>
			<CoachOptionRoutineActionMenu
				isDownloading={ isDownloading }
				onCopyAction={ () => openCopy( "student" ) }
				onDeleteAction={ handleOpenDeleteConfirm }
				onPrintAction={ handleDownloadReport }
				onSaveTemplateAction={ () => setIsSaveTemplateOpen( true ) }
				onUseTemplateAction={ () => openCopy( "template" ) }
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
				// Al cambiar de origen arranca limpio. La clave no cambia al cerrar, para
				// que el drawer se vaya con su animacion.
				key={ copySource }
				destinationMonth={ String( month ) }
				destinationLoadedSetCount={ loadedSetCount }
				destinationWeekNumbers={ routineWeeks.map( ( routineWeek ) => routineWeek.week ) }
				destinationWeeksOccupied={ routineWeeks.length }
				destinationYear={ String( year ) }
				hasActiveRoutine
				hideTrigger
				isOpen={ isCopyOpen }
				preferTemplateSource={ copySource === "template" }
				studentId={ studentId }
				onOpenChangeAction={ setIsCopyOpen }
			/>

			<CoachSaveTemplateModal
				isOpen={ isSaveTemplateOpen }
				month={ month }
				studentId={ studentId }
				studentName={ studentName }
				summary={ summary }
				year={ year }
				onOpenChangeAction={ setIsSaveTemplateOpen }
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
		</>
	);
}
