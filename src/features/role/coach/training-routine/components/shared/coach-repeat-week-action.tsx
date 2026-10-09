"use client";

import type { CoachTrainingRoutine } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";

import { useState } from "react";
import { Button, Checkbox, Modal, Spinner, toast } from "@heroui/react";
import { CopyPlus } from "lucide-react";

import { useCopyTrainingRoutineWeeks } from "@/features/training-routine/hooks/use-training-routine-copy";

type CoachRepeatWeekActionProps = {
	month: number;
	routineWeeks: CoachTrainingRoutine[];
	selectedRoutine: CoachTrainingRoutine | null;
	studentId: string;
	year: number;
};

type RepeatWeekButtonProps = {
	isPending: boolean;
	// Copia la semana elegida en las semanas de destino. Si falla, tiene que lanzar un error.
	onRepeatAction: ( sourceWeek: number, destinationWeeks: number[] ) => Promise<void>;
	routineWeeks: CoachTrainingRoutine[];
	selectedRoutine: CoachTrainingRoutine | null;
};

function countExercises( routineWeek: CoachTrainingRoutine ) {
	return routineWeek.routineDays.reduce( ( count, day ) => count + day.routines.length, 0 );
}

function formatWeekList( weeks: number[] ) {
	if (weeks.length === 1) return `la Semana ${ weeks[ 0 ] }`;

	return `las Semanas ${ weeks.slice( 0, -1 ).join( ", " ) } y ${ weeks[ weeks.length - 1 ] }`;
}

// "Repetir en las demas" para la rutina del mes de un estudiante.
export function CoachRepeatWeekAction( {
										  month,
										  routineWeeks,
										  selectedRoutine,
										  studentId,
										  year,
									  }: CoachRepeatWeekActionProps ) {
	const copyWeeks = useCopyTrainingRoutineWeeks();

	return (
		<RepeatWeekButton
			isPending={ copyWeeks.isPending }
			routineWeeks={ routineWeeks }
			selectedRoutine={ selectedRoutine }
			onRepeatAction={ async ( sourceWeek, destinationWeeks ) => {
				await copyWeeks.mutateAsync( {
					destinationMonth: month,
					destinationYear: year,
					sourceMonth: month,
					sourceYear: year,
					studentId,
					weekMappings: destinationWeeks.map( ( destinationWeek ) => ( {
						destinationWeek,
						sourceWeek,
					} ) ),
				} );
			} }
		/>
	);
}

// Lo habitual es que las demas semanas sean la primera con ajustes: esto las deja
// iguales a la semana elegida en un paso, sin pasar por el drawer de copia. Sirve
// para la rutina de un estudiante y para una plantilla; quien lo usa pone la copia.
export function RepeatWeekButton( {
									 isPending,
									 onRepeatAction,
									 routineWeeks,
									 selectedRoutine,
								 }: RepeatWeekButtonProps ) {
	const [ isConfirmOpen, setIsConfirmOpen ] = useState( false );
	// Las semanas que el coach saco de la copia. Se guardan las excluidas y no
	// las elegidas para que, de entrada, vayan todas: es el caso mas comun.
	const [ excludedWeeks, setExcludedWeeks ] = useState<number[]>( [] );

	if (!selectedRoutine) return null;

	const otherWeeks = routineWeeks.filter( ( routineWeek ) => routineWeek.id !== selectedRoutine.id );

	if (otherWeeks.length === 0) return null;

	const sourceExerciseCount = countExercises( selectedRoutine );
	const destinationWeeks = otherWeeks
		.map( ( routineWeek ) => routineWeek.week )
		.filter( ( week ) => !excludedWeeks.includes( week ) );
	const sourceWeek = selectedRoutine.week;

	function toggleWeek( week: number, isSelected: boolean ) {
		setExcludedWeeks( ( current ) => (
			isSelected ? current.filter( ( excluded ) => excluded !== week ) : [ ...current, week ]
		) );
	}

	async function handleRepeat() {
		try {
			await onRepeatAction( sourceWeek, destinationWeeks );

			toast.success( "Semana repetida", {
				description: `La Semana ${ sourceWeek } se copió en ${ formatWeekList( destinationWeeks ) }.`,
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
			{ /* Aparece en cada semana de la grilla: va discreto y con texto corto. */ }
			<Button
				aria-label={ `Repetir la semana ${ sourceWeek } en las demás semanas` }
				className={ "shrink-0" }
				isDisabled={ sourceExerciseCount === 0 }
				size={ "sm" }
				variant={ "ghost" }
				onPress={ () => {
					// Cada vez que se abre vuelven a estar todas marcadas.
					setExcludedWeeks( [] );
					setIsConfirmOpen( true );
				} }
			>
				<CopyPlus className={ "size-4" }/>
				Repetir en las demás
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
								Elegí en qué semanas copiar los días y ejercicios guardados de la
								Semana { sourceWeek }. Después podés ajustar cada una.
							</p>
							<div aria-label={ "Semanas donde repetir" } className={ "space-y-2" } role={ "group" }>
								{ otherWeeks.map( ( routineWeek ) => {
									const exerciseCount = countExercises( routineWeek );
									const isSelected = !excludedWeeks.includes( routineWeek.week );

									return (
										<Checkbox
											key={ routineWeek.id }
											className={ "flex w-full flex-row items-center gap-3 rounded-xl border border-border bg-surface-secondary px-3 py-2" }
											isDisabled={ isPending }
											isSelected={ isSelected }
											onChange={ ( nextIsSelected ) => toggleWeek( routineWeek.week, nextIsSelected ) }
										>
											<Checkbox.Control>
												<Checkbox.Indicator/>
											</Checkbox.Control>
											<Checkbox.Content className={ "min-w-0 flex-1" }>
												<span className={ "block text-sm font-medium text-foreground" }>Semana { routineWeek.week }</span>
												{ /* El aviso va en cada semana y solo pesa si esta marcada:
												     asi se ve que se pierde antes de confirmar. */ }
												<span className={ `block text-xs ${ exerciseCount > 0 && isSelected ? "font-medium text-warning" : "text-muted" }` }>
													{ exerciseCount === 0
														? "Vacía"
														: `${ exerciseCount } ${ exerciseCount === 1 ? "ejercicio" : "ejercicios" }${ isSelected ? ": se reemplazan" : "" }` }
												</span>
											</Checkbox.Content>
										</Checkbox>
									);
								} ) }
							</div>
						</Modal.Body>
						<Modal.Footer className={ "gap-2" }>
							<Button
								isDisabled={ isPending }
								variant={ "secondary" }
								onPress={ () => setIsConfirmOpen( false ) }
							>
								Cancelar
							</Button>
							<Button
								className={ "bg-accent text-accent-foreground" }
								isDisabled={ isPending || destinationWeeks.length === 0 }
								isPending={ isPending }
								onPress={ handleRepeat }
							>
								{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <CopyPlus className={ "size-4" }/> }
								{ isPending
									? "Copiando..."
									: destinationWeeks.length === 0
										? "Elegí una semana"
										: `Repetir en ${ destinationWeeks.length } ${ destinationWeeks.length === 1 ? "semana" : "semanas" }` }
							</Button>
						</Modal.Footer>
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		</>
	);
}
