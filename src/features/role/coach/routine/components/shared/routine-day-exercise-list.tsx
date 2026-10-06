"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { MessageSquarePlus, MessageSquareText } from "lucide-react";

import { AsyncMedia } from "@/components/common";
import { formatBodyPartValue, getExerciseName } from "@/features/role/coach/routine/components/shared/routine-day-exercise-editor.utils";
import { RoutineDayExerciseField } from "@/features/role/coach/routine/components/shared/routine-day-exercise-field";
import { RoutineDayExerciseMoveButtons } from "@/features/role/coach/routine/components/shared/routine-day-exercise-move-buttons";
import { RoutineExerciseActions } from "@/features/role/coach/routine/components/shared/routine-exercise-actions";
import type { DraftRoutineDayExercise } from "@/features/routine/services/routine-day-editor";

type UpdateField = ( clientId: string, field: "observation" | "order" | "reps" | "sets", value: number | string ) => void;

type RoutineDayExerciseListProps = {
	onDeleteAction: ( clientId: string ) => void;
	onUpdateField: UpdateField;
	routines: DraftRoutineDayExercise[];
};

type RoutineDayExerciseRowProps = {
	isFirst: boolean;
	isLast: boolean;
	onDeleteAction: ( clientId: string ) => void;
	onUpdateField: UpdateField;
	position: number;
	routine: DraftRoutineDayExercise;
};

function RoutineDayExerciseRow( {
									isFirst,
									isLast,
									onDeleteAction,
									onUpdateField,
									position,
									routine,
								}: RoutineDayExerciseRowProps ) {
	const exerciseName = getExerciseName( routine );
	const hasNote = routine.observation.trim().length > 0;
	// La nota es opcional: se despliega al pedirla o si ya tiene texto.
	const [ isNoteOpen, setIsNoteOpen ] = useState( hasNote );
	const missingClassName = "border-warning";

	return (
		<li className={ "min-w-0 space-y-2 rounded-xl border border-border bg-surface-secondary px-2.5 py-2.5" }>
			<div className={ "flex flex-col gap-2 @xl:flex-row @xl:items-center @xl:gap-3" }>
				<div className={ "flex min-w-0 flex-1 items-center gap-3" }>
					<span className={ "w-5 shrink-0 text-center text-sm font-semibold text-muted" }>{ position }</span>
					<AsyncMedia
						alt={ `Imagen de ${ exerciseName }` }
						className={ "h-12 w-12 shrink-0 rounded-lg border border-border object-cover" }
						emptyLabel={ "Sin imagen" }
						spinnerLabel={ `Cargando imagen de ${ exerciseName }` }
						src={ routine.exercise?.imageUrl }
					/>
					<div className={ "min-w-0" }>
						<p className={ "line-clamp-2 text-sm font-semibold leading-5 text-foreground" }>{ exerciseName }</p>
						<p className={ "truncate text-xs text-muted" }>{ formatBodyPartValue( routine.exercise?.bodyPart ) }</p>
					</div>
				</div>

				{ /* Series y repeticiones siempre a la vista: son lo unico obligatorio. */ }
				<div className={ "flex min-w-0 items-center justify-between gap-1 @xl:shrink-0 @xl:justify-end @xl:gap-2" }>
					<RoutineDayExerciseMoveButtons
						clientId={ routine.clientId }
						exerciseName={ exerciseName }
						isFirst={ isFirst }
						isLast={ isLast }
					/>
					<div className={ "flex items-center gap-1.5" }>
						<RoutineDayExerciseField
							ariaLabel={ `Series de ${ exerciseName }` }
							className={ "w-12 @xl:w-14" }
							inputClassName={ `w-full px-1 text-center ${ routine.sets.trim() ? "" : missingClassName }` }
							inputMode={ "numeric" }
							name={ `series-${ routine.clientId }` }
							placeholder={ "Series" }
							value={ routine.sets }
							onChange={ ( value ) => onUpdateField( routine.clientId, "sets", value ) }
						/>
						<span aria-hidden className={ "text-sm text-muted" }>×</span>
						<RoutineDayExerciseField
							ariaLabel={ `Repeticiones de ${ exerciseName }` }
							className={ "w-16 @xl:w-20" }
							inputClassName={ `w-full px-1 text-center ${ routine.reps.trim() ? "" : missingClassName }` }
							name={ `reps-${ routine.clientId }` }
							placeholder={ "Reps" }
							value={ routine.reps }
							onChange={ ( value ) => onUpdateField( routine.clientId, "reps", value ) }
						/>
					</div>
					<div className={ "flex items-center" }>
						<Button
							isIconOnly
							aria-expanded={ isNoteOpen }
							aria-label={ hasNote ? `Ver nota de ${ exerciseName }` : `Agregar nota a ${ exerciseName }` }
							className={ hasNote ? "size-8 text-accent" : "size-8 text-muted" }
							variant={ "ghost" }
							onPress={ () => setIsNoteOpen( ( current ) => !current ) }
						>
							{ hasNote ? <MessageSquareText className={ "size-4" }/> : <MessageSquarePlus className={ "size-4" }/> }
						</Button>
						<RoutineExerciseActions
							clientId={ routine.clientId }
							exercise={ routine.exercise }
							exerciseName={ exerciseName }
							routineId={ routine.id }
							onDeleteAction={ () => onDeleteAction( routine.clientId ) }
						/>
					</div>
				</div>
			</div>

			{ isNoteOpen ? (
				<RoutineDayExerciseField
					ariaLabel={ `Notas de ${ exerciseName }` }
					inputClassName={ "min-h-16 w-full" }
					isMultiline
					name={ `notes-${ routine.clientId }` }
					placeholder={ "Nota para el estudiante (opcional)" }
					value={ routine.observation }
					onChange={ ( value ) => onUpdateField( routine.clientId, "observation", value ) }
				/>
			) : null }
		</li>
	);
}

// Una sola lista para cualquier ancho. La tabla anterior necesitaba unos 1230 px:
// en una notebook, series y repeticiones quedaban fuera de la pantalla. Cada fila
// se acomoda segun el ancho de la lista y no el de la ventana, porque el menu
// lateral le saca lugar.
export function RoutineDayExerciseList( {
										   onDeleteAction,
										   onUpdateField,
										   routines,
									   }: RoutineDayExerciseListProps ) {
	return (
		<ol aria-label={ "Ejercicios del día" } className={ "@container grid min-w-0 grid-cols-1 gap-2" }>
			{ routines.map( ( routine, index ) => (
				<RoutineDayExerciseRow
					key={ routine.clientId }
					isFirst={ index === 0 }
					isLast={ index === routines.length - 1 }
					position={ index + 1 }
					routine={ routine }
					onDeleteAction={ onDeleteAction }
					onUpdateField={ onUpdateField }
				/>
			) ) }
		</ol>
	);
}
