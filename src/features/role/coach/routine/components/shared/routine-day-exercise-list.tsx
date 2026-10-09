"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { MessageSquarePlus, MessageSquareText } from "lucide-react";

import { MediaPreviewThumbnail } from "@/components/common/media-preview-thumbnail";
import { formatBodyPartValue, getExerciseName } from "@/features/role/coach/routine/components/shared/routine-day-exercise-editor.utils";
import { RoutineDayExerciseField } from "@/features/role/coach/routine/components/shared/routine-day-exercise-field";
import { RoutineDayExerciseMoveButtons } from "@/features/role/coach/routine/components/shared/routine-day-exercise-move-buttons";
import { RoutineExerciseActions } from "@/features/role/coach/routine/components/shared/routine-exercise-actions";
import { RoutineExerciseVariantsButton } from "@/features/role/coach/routine/components/shared/routine-exercise-variants-button";
import { RoutineRestSelect } from "@/features/role/coach/routine/components/shared/routine-rest-select";
import type { DraftRoutineDayExercise } from "@/features/routine/services/routine-day-editor";

type UpdateField = ( clientId: string, field: "observation" | "order" | "reps" | "restSeconds" | "sets", value: number | string | null ) => void;

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
				<div className={ "flex min-w-0 flex-1 items-center gap-2" }>
					<RoutineDayExerciseMoveButtons
						clientId={ routine.clientId }
						exerciseName={ exerciseName }
						isFirst={ isFirst }
						isLast={ isLast }
						position={ position }
					/>
					{ /* Igual que al agregar un ejercicio: al pasar el mouse por la imagen
					     se ve el movimiento en grande, para repasar el dia sin abrir nada. */ }
					<MediaPreviewThumbnail
						imageUrl={ routine.exercise?.imageUrl }
						name={ exerciseName }
						thumbnailClassName={ "h-12 w-12" }
						videoUrl={ routine.exercise?.videoUrl }
					/>
					<div className={ "min-w-0" }>
						<p className={ "line-clamp-4 text-sm font-semibold leading-5 text-foreground" }>{ exerciseName }</p>
						<div className={ "mt-0.5 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1" }>
							<p className={ "truncate text-xs text-muted" }>{ formatBodyPartValue( routine.exercise?.bodyPart ) }</p>
							{ routine.exercise ? (
								<RoutineExerciseVariantsButton
									clientId={ routine.clientId }
									exerciseName={ exerciseName }
									pendingCount={ routine.pendingVariantExerciseIds?.length ?? 0 }
									routineId={ routine.id }
								/>
							) : null }
						</div>
					</div>
				</div>

				{ /* Series y repeticiones siempre a la vista: son lo unico obligatorio. Cada
				     campo lleva su rotulo: con un numero cargado ya no se ve el texto
				     de ayuda y no se sabia cual era cual. */ }
				{ /* En angosto arranca desde el borde y no debajo de la imagen: con la sangria,
				     el descanso con su tiempo empujaba las acciones afuera de la tarjeta. */ }
				<div className={ "flex min-w-0 items-end justify-between gap-1 @xl:shrink-0 @xl:justify-end @xl:gap-3" }>
					<div className={ "flex min-w-0 items-end gap-1.5" }>
						<RoutineDayExerciseField
							ariaLabel={ `Series de ${ exerciseName }` }
							className={ "w-14 gap-0.5" }
							label={ "Series" }
							inputClassName={ `w-full px-1 text-center ${ routine.sets.trim() ? "" : missingClassName }` }
							inputMode={ "numeric" }
							name={ `series-${ routine.clientId }` }
							placeholder={ "3" }
							value={ routine.sets }
							// Las series son un numero: en escritorio el teclado dejaba escribir letras.
							onChange={ ( value ) => onUpdateField( routine.clientId, "sets", value.replace( /\D/g, "" ).slice( 0, 2 ) ) }
						/>
						<span aria-hidden className={ "pb-2 text-sm text-muted" }>×</span>
						<RoutineDayExerciseField
							ariaLabel={ `Repeticiones de ${ exerciseName }` }
							className={ "w-20 min-w-14 shrink gap-0.5" }
							label={ "Repeticiones" }
							inputClassName={ `w-full px-1 text-center ${ routine.reps.trim() ? "" : missingClassName }` }
							name={ `reps-${ routine.clientId }` }
							placeholder={ "10-12" }
							value={ routine.reps }
							onChange={ ( value ) => onUpdateField( routine.clientId, "reps", value ) }
						/>
					</div>
					<div className={ "flex shrink-0 items-center" }>
						{ /* Opcional: es el tiempo con el que arranca el reloj del estudiante. */ }
						<RoutineRestSelect
							ariaLabel={ `Descanso de ${ exerciseName }` }
							value={ routine.restSeconds ?? null }
							onChangeAction={ ( value ) => onUpdateField( routine.clientId, "restSeconds", value ) }
						/>
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
							exerciseName={ exerciseName }
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

type KeyedRow = {
	clientId: string;
	key: string;
	order: number;
};

// Clave estable por fila. Un ejercicio recien agregado recibe su id definitivo al
// guardarse: si la clave fuera ese id, al guardar solo se remontaria la fila y
// el campo que el coach esta escribiendo perderia el foco. Una fila conserva su
// clave mientras conserve su id, y si el id cambio, la hereda de la fila que
// ocupaba ese orden.
function assignRowKeys( previousRows: KeyedRow[], routines: DraftRoutineDayExercise[] ): KeyedRow[] {
	const previousByClientId = new Map( previousRows.map( ( row ) => [ row.clientId, row ] ) );
	const currentClientIds = new Set( routines.map( ( routine ) => routine.clientId ) );
	const replacedRows = previousRows.filter( ( row ) => !currentClientIds.has( row.clientId ) );
	const usedKeys = new Set<string>();

	return routines.map( ( routine ) => {
		const inherited = previousByClientId.get( routine.clientId )
			?? replacedRows.find( ( row ) => row.order === routine.order && !usedKeys.has( row.key ) );
		const key = inherited?.key ?? routine.clientId;

		usedKeys.add( key );

		return { clientId: routine.clientId, key, order: routine.order };
	} );
}

function areSameRows( left: KeyedRow[], right: KeyedRow[] ) {
	return left.length === right.length && left.every( ( row, index ) => (
		row.clientId === right[ index ].clientId && row.key === right[ index ].key && row.order === right[ index ].order
	) );
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
	const [ keyedRows, setKeyedRows ] = useState<KeyedRow[]>( () => assignRowKeys( [], routines ) );
	const nextKeyedRows = assignRowKeys( keyedRows, routines );

	// Ajuste de estado durante el render: las claves dependen de las anteriores.
	if (!areSameRows( keyedRows, nextKeyedRows )) {
		setKeyedRows( nextKeyedRows );
	}

	return (
		<ol aria-label={ "Ejercicios del día" } className={ "@container grid min-w-0 grid-cols-1 gap-2" }>
			{ routines.map( ( routine, index ) => (
				<RoutineDayExerciseRow
					key={ nextKeyedRows[ index ].key }
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
