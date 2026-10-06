"use client";

import type { CoachTrainingRoutine } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";

import { useState } from "react";
import { Button, Modal, Spinner, toast } from "@heroui/react";
import { CopyPlus } from "lucide-react";

import { useCopyTrainingRoutineWeeks } from "@/features/training-routine/hooks/use-training-routine-copy";

type CoachRepeatWeekActionProps = {
	month: number;
	routineWeeks: CoachTrainingRoutine[];
	selectedRoutine: CoachTrainingRoutine | null;
	studentId: string;
	year: number;
};

function countExercises( routineWeek: CoachTrainingRoutine ) {
	return routineWeek.routineDays.reduce( ( count, day ) => count + day.routines.length, 0 );
}

function formatWeekList( weeks: number[] ) {
	if (weeks.length === 1) return `la Semana ${ weeks[ 0 ] }`;

	return `las Semanas ${ weeks.slice( 0, -1 ).join( ", " ) } y ${ weeks[ weeks.length - 1 ] }`;
}

// Lo habitual es que las demas semanas del mes sean la primera con ajustes: esto
// las deja iguales a la semana elegida en un paso, sin pasar por el drawer de copia.
export function CoachRepeatWeekAction( {
										  month,
										  routineWeeks,
										  selectedRoutine,
										  studentId,
										  year,
									  }: CoachRepeatWeekActionProps ) {
	const [ isConfirmOpen, setIsConfirmOpen ] = useState( false );
	const copyWeeks = useCopyTrainingRoutineWeeks();

	if (!selectedRoutine) return null;

	const otherWeeks = routineWeeks.filter( ( routineWeek ) => routineWeek.id !== selectedRoutine.id );

	if (otherWeeks.length === 0) return null;

	const sourceExerciseCount = countExercises( selectedRoutine );
	const weeksWithContent = otherWeeks.filter( ( routineWeek ) => countExercises( routineWeek ) > 0 );
	const otherWeekNumbers = otherWeeks.map( ( routineWeek ) => routineWeek.week );
	const sourceWeek = selectedRoutine.week;

	async function handleRepeat() {
		try {
			await copyWeeks.mutateAsync( {
				destinationMonth: month,
				destinationYear: year,
				sourceMonth: month,
				sourceYear: year,
				studentId,
				weekMappings: otherWeekNumbers.map( ( destinationWeek ) => ( {
					destinationWeek,
					sourceWeek,
				} ) ),
			} );

			toast.success( "Semana repetida", {
				description: `La Semana ${ sourceWeek } se copió en ${ formatWeekList( otherWeekNumbers ) }.`,
			} );
			setIsConfirmOpen( false );
		} catch {
			toast.danger( "Error al repetir la semana", {
				description: "No se pudo completar la copia.",
			} );
		}
	}

	return (
		<>
			<Button
				className={ "shrink-0" }
				isDisabled={ sourceExerciseCount === 0 }
				size={ "sm" }
				variant={ "secondary" }
				onPress={ () => setIsConfirmOpen( true ) }
			>
				<CopyPlus className={ "size-4" }/>
				Repetir en las demás semanas
			</Button>

			<Modal.Backdrop
				isDismissable={ false }
				isOpen={ isConfirmOpen }
				variant={ "blur" }
				onOpenChange={ setIsConfirmOpen }
			>
				<Modal.Container size={ "sm" }>
					<Modal.Dialog className={ "sm:max-w-md" }>
						<Modal.Header>
							<Modal.Heading>Repetir la Semana { sourceWeek }</Modal.Heading>
						</Modal.Header>
						<Modal.Body className={ "space-y-3" }>
							<p className={ "text-sm leading-6 text-muted" }>
								Los días y ejercicios guardados de la Semana { sourceWeek } se van a copiar
								en { formatWeekList( otherWeekNumbers ) }. Después podés ajustar cada una.
							</p>
							{ weeksWithContent.length > 0 ? (
								<p className={ "text-sm font-medium leading-6 text-warning" }>
									Se reemplaza lo que ya tiene cargado { formatWeekList(
										weeksWithContent.map( ( routineWeek ) => routineWeek.week ),
									) }.
								</p>
							) : null }
						</Modal.Body>
						<Modal.Footer className={ "gap-2" }>
							<Button
								isDisabled={ copyWeeks.isPending }
								variant={ "secondary" }
								onPress={ () => setIsConfirmOpen( false ) }
							>
								Cancelar
							</Button>
							<Button
								className={ "bg-accent text-accent-foreground" }
								isDisabled={ copyWeeks.isPending }
								isPending={ copyWeeks.isPending }
								onPress={ handleRepeat }
							>
								{ copyWeeks.isPending ? <Spinner color={ "current" } size={ "sm" }/> : <CopyPlus className={ "size-4" }/> }
								{ copyWeeks.isPending ? "Copiando..." : "Repetir semana" }
							</Button>
						</Modal.Footer>
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		</>
	);
}
