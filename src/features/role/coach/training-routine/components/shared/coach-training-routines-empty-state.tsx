"use client";

import { useState } from "react";
import { Button, Card } from "@heroui/react";
import { BookmarkCheck, Copy, Plus } from "lucide-react";

import { monthYearLabel } from "@/constants/months";
import { CoachCopyRoutineDrawer } from "@/features/role/coach/training-routine/components/shared/coach-copy-routine-drawer";
import { CoachCreateRoutineDrawer } from "@/features/role/coach/training-routine/components/shared/coach-create-routine-drawer";
import { CoachUseTemplateModal } from "@/features/role/coach/training-routine/components/shared/coach-use-template-modal";
import { useRoutineTemplates } from "@/features/role/coach/training-routine/hooks/use-routine-templates";
import { useTrainingRoutinesStudents } from "@/features/role/coach/training-routines-students/hooks/use-training-routines-students";
import { useLatestTrainingRoutineMonth } from "@/features/training-routine/hooks/use-training-routine-copy-source";

type CoachTrainingRoutinesEmptyStateProps = {
	month: number;
	studentId: string;
	studentName: string;
	year: number;
};

export function CoachTrainingRoutinesEmptyState( {
	month,
	studentId,
	studentName,
	year,
}: CoachTrainingRoutinesEmptyStateProps ) {
	const [ isCreateOpen, setIsCreateOpen ] = useState( false );
	const [ isCopyOpen, setIsCopyOpen ] = useState( false );
	const [ isTemplateOpen, setIsTemplateOpen ] = useState( false );
	const hasTemplates = ( useRoutineTemplates().data ?? [] ).length > 0;
	const latestRoutineMonth = useLatestTrainingRoutineMonth( { month, studentId, year } ).data;
	const hasOtherStudents = ( useTrainingRoutinesStudents().data ?? [] ).some( ( student ) => student.id !== studentId );
	const latestLabel = latestRoutineMonth
		? monthYearLabel( String( latestRoutineMonth.month ), String( latestRoutineMonth.year ) )
		: null;
	const canCopy = Boolean( latestLabel ) || hasOtherStudents;
	// Un solo boton destacado, el camino mas probable: seguir con lo que este
	// estudiante ya venia haciendo; si es nuevo, una plantilla; si no hay, copiar
	// de otro; y si no hay nada de donde partir, crear.
	const primaryAction = latestLabel ? "copy" : hasTemplates ? "template" : hasOtherStudents ? "copy" : "create";
	const primaryClassName = "w-full bg-accent text-accent-foreground sm:w-auto";

	return (
		<Card className={ "border border-dashed border-border" } variant={ "default" }>
			<Card.Content className={ "flex flex-col items-center gap-4 py-10 text-center" }>
				<div>
					<p className={ "text-base font-semibold text-foreground" }>
						{ studentName } todavía no tiene rutina en { monthYearLabel( String( month ), String( year ) ) }
					</p>
					<p className={ "mt-1 text-sm text-muted" }>
						{ latestLabel
							? `Podés partir de la de ${ latestLabel } y ajustarla, o armar una nueva.`
							: hasTemplates
								? "Podés partir de una de tus plantillas y ajustarla, o armar una nueva."
								: hasOtherStudents
									? "Podés partir de la rutina de otro estudiante y ajustarla, o armar una nueva."
								: "Armá la estructura de semanas y días para empezar a cargar ejercicios." }
					</p>
				</div>
				<div className={ "flex w-full flex-col justify-center gap-2 sm:w-auto sm:flex-row" }>
					{ canCopy ? (
						<Button
							className={ primaryAction === "copy" ? primaryClassName : "w-full sm:w-auto" }
							variant={ primaryAction === "copy" ? undefined : "secondary" }
							onPress={ () => setIsCopyOpen( true ) }
						>
							<Copy className={ "size-4" }/>
							{ latestLabel ? `Copiar de ${ latestLabel }` : "Copiar de otro estudiante" }
						</Button>
					) : null }
					{ hasTemplates ? (
						<Button
							className={ primaryAction === "template" ? primaryClassName : "w-full sm:w-auto" }
							variant={ primaryAction === "template" ? undefined : "secondary" }
							onPress={ () => setIsTemplateOpen( true ) }
						>
							<BookmarkCheck className={ "size-4" }/>
							Usar una plantilla
						</Button>
					) : null }
					<Button
						className={ primaryAction === "create" ? primaryClassName : "w-full sm:w-auto" }
						variant={ primaryAction === "create" ? undefined : "secondary" }
						onPress={ () => setIsCreateOpen( true ) }
					>
						<Plus className={ "size-4" }/>
						Crear desde cero
					</Button>
				</div>
			</Card.Content>

			<CoachCreateRoutineDrawer
				hideTrigger
				isOpen={ isCreateOpen }
				month={ month }
				studentId={ studentId }
				year={ year }
				onOpenChangeAction={ setIsCreateOpen }
			/>
			<CoachUseTemplateModal
				hasActiveRoutine={ false }
				isOpen={ isTemplateOpen }
				month={ month }
				studentId={ studentId }
				studentName={ studentName }
				year={ year }
				onOpenChangeAction={ setIsTemplateOpen }
			/>
			<CoachCopyRoutineDrawer
				hideTrigger
				destinationMonth={ String( month ) }
				destinationYear={ String( year ) }
				hasActiveRoutine={ false }
				isOpen={ isCopyOpen }
				studentId={ studentId }
				onOpenChangeAction={ setIsCopyOpen }
			/>
		</Card>
	);
}
