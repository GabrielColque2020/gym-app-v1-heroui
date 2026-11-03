"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Card } from "@heroui/react";
import { MessageSquarePlus, MessageSquareText } from "lucide-react";

import { getErrorMessage } from "@/lib/action-result";
import { RoutineDayExerciseField } from "@/features/role/coach/routine/components/shared/routine-day-exercise-field";
import { ROUTINE_DAY_NOTE_MAX_LENGTH, ROUTINE_DAY_TITLE_MAX_LENGTH } from "@/features/routine/services/routine-day-info";

// Espera despues del ultimo cambio antes de guardar solo, como los ejercicios.
const AUTOSAVE_DELAY_MS = 800;

type DayInfo = { note: string | null; title: string | null };

type EditRoutineDayInfoCardProps = {
	initialInfo: DayInfo;
	onSaveAction: ( info: DayInfo ) => Promise<DayInfo>;
};

type SaveState = { status: "error"; message: string } | { status: "idle" | "saving" | "saved" };

function toInfo( title: string, note: string ): DayInfo {
	return { note: note.trim() || null, title: title.trim() || null };
}

function isSameInfo( left: DayInfo, right: DayInfo ) {
	return left.note === right.note && left.title === right.title;
}

// Titulo ("Pecho + espalda + brazos") y nota del dia para el estudiante ("La
// banca tiene prioridad"). Las planificaciones los traen y no habia donde
// ponerlos. Se guardan solos, aparte de los ejercicios. La nota se despliega al
// pedirla o si ya tiene texto, igual que la de cada ejercicio.
export function EditRoutineDayInfoCard( { initialInfo, onSaveAction }: EditRoutineDayInfoCardProps ) {
	const [ title, setTitle ] = useState( initialInfo.title ?? "" );
	const [ note, setNote ] = useState( initialInfo.note ?? "" );
	const [ isNoteOpen, setIsNoteOpen ] = useState( Boolean( initialInfo.note ) );
	const [ saveState, setSaveState ] = useState<SaveState>( { status: "idle" } );
	// Lo ultimo que quedo guardado, para no volver a mandarlo.
	const [ savedInfo, setSavedInfo ] = useState<DayInfo>( initialInfo );
	// Lo ultimo que llego del servidor. La pantalla puede abrir con la copia
	// guardada en el navegador y recibir despues lo nuevo: si el coach no
	// cambio nada, los campos toman lo nuevo; si esta escribiendo, se respeta.
	const [ serverInfo, setServerInfo ] = useState<DayInfo>( initialInfo );
	const onSaveRef = useRef( onSaveAction );

	if (!isSameInfo( initialInfo, serverInfo )) {
		setServerInfo( initialInfo );

		if (isSameInfo( toInfo( title, note ), serverInfo )) {
			setTitle( initialInfo.title ?? "" );
			setNote( initialInfo.note ?? "" );
			setSavedInfo( initialInfo );
			if (initialInfo.note) setIsNoteOpen( true );
		}
	}

	useEffect( () => {
		onSaveRef.current = onSaveAction;
	} );

	useEffect( () => {
		const info = toInfo( title, note );

		if (isSameInfo( info, savedInfo )) return;

		const timeout = setTimeout( async () => {
			setSaveState( { status: "saving" } );

			try {
				setSavedInfo( await onSaveRef.current( info ) );
				setSaveState( { status: "saved" } );
			} catch (error) {
				setSaveState( { message: getErrorMessage( error, "No se pudo guardar." ), status: "error" } );
			}
		}, AUTOSAVE_DELAY_MS );

		return () => clearTimeout( timeout );
	}, [ note, savedInfo, title ] );

	const hasNote = note.trim().length > 0;

	return (
		<Card className={ "gap-2 p-3" }>
			<div className={ "flex items-end gap-2" }>
				<RoutineDayExerciseField
					ariaLabel={ "Título del día" }
					className={ "min-w-0 flex-1 gap-1" }
					inputClassName={ "w-full" }
					label={ "Título del día (opcional)" }
					name={ "routine-day-title" }
					placeholder={ "Ej: Pecho + espalda + brazos" }
					value={ title }
					onChange={ ( value ) => setTitle( value.slice( 0, ROUTINE_DAY_TITLE_MAX_LENGTH ) ) }
				/>
				<Button
					aria-expanded={ isNoteOpen }
					className={ hasNote ? "shrink-0 text-accent" : "shrink-0" }
					variant={ "secondary" }
					onPress={ () => setIsNoteOpen( ( current ) => !current ) }
				>
					{ hasNote ? <MessageSquareText className={ "size-4" }/> : <MessageSquarePlus className={ "size-4" }/> }
					Nota del día
				</Button>
			</div>

			{ isNoteOpen ? (
				<RoutineDayExerciseField
					ariaLabel={ "Nota del día para el estudiante" }
					inputClassName={ "min-h-16 w-full" }
					isMultiline
					name={ "routine-day-note" }
					placeholder={ "Indicaciones para todo el día (opcional). Ej: la banca tiene prioridad, completá las aproximaciones." }
					value={ note }
					onChange={ ( value ) => setNote( value.slice( 0, ROUTINE_DAY_NOTE_MAX_LENGTH ) ) }
				/>
			) : null }

			{ saveState.status === "idle" ? null : (
				<p
					className={ `text-xs ${ saveState.status === "error" ? "font-medium text-danger" : "text-muted" }` }
					role={ "status" }
				>
					{ saveState.status === "error"
						? `No se guardaron el título y la nota: ${ saveState.message } Cambiá algo para reintentar.`
						: saveState.status === "saving" ? "Guardando…" : "Título y nota guardados" }
				</p>
			) }
		</Card>
	);
}
