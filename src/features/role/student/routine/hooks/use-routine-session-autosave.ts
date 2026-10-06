"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { toast } from "@heroui/react";

import type { useSaveStudentRoutineSession } from "@/features/role/student/routine/hooks/use-routine-session-mutations";
import {
	mapStudentRoutineSessionToSaveInput,
	type StudentRoutineSession,
} from "@/features/routine/services/routine-session";

// Espera despues del ultimo cambio antes de guardar solo: lo justo para no
// guardar a mitad de un numero o de varios toques seguidos en mas y menos.
const AUTOSAVE_DELAY_MS = 700;

// `pending`: hay series por guardar y se van a guardar solas. `unsaved`: quedaron
// series sin guardar de una visita anterior y no se guardan solas; el estudiante
// decide guardarlas o descartarlas con "Actualizar".
export type RoutineSessionSaveStatus = "error" | "pending" | "saved" | "saving" | "unsaved";

type UseRoutineSessionAutosaveOptions = {
	activeSession: StudentRoutineSession | null;
	hasSessionEdits: boolean;
	routineDayId: string | null;
	saveRoutineSession: ReturnType<typeof useSaveStudentRoutineSession>;
	sourceSession: StudentRoutineSession | null;
	studentId: string | null;
	validationError: string | null;
};

// Lo que se manda al servidor: solo las series hechas, con repeticiones y peso.
// Una serie con un solo dato no cuenta como cambio hasta que se completa.
function buildSaveSignature( session: StudentRoutineSession | null ) {
	return session ? JSON.stringify( mapStudentRoutineSessionToSaveInput( session ).exercises ) : null;
}

export function useRoutineSessionAutosave( {
	activeSession,
	hasSessionEdits,
	routineDayId,
	saveRoutineSession,
	sourceSession,
	studentId,
	validationError,
}: UseRoutineSessionAutosaveOptions ) {
	const draftSignature = useMemo( () => buildSaveSignature( activeSession ), [ activeSession ] );
	const savedSignature = useMemo( () => buildSaveSignature( sourceSession ), [ sourceSession ] );
	// El contenido cuyo guardado fallo: no se reintenta solo, para no insistir
	// cada segundo con un pedido que vuelve a fallar.
	const [ failedSignature, setFailedSignature ] = useState<string | null>( null );
	// El ultimo contenido que el servidor acepto. Si por algun motivo lo que
	// devuelve no coincide con lo enviado, esto evita guardar lo mismo en bucle.
	const [ acceptedSignature, setAcceptedSignature ] = useState<string | null>( null );
	const hasChanges = Boolean( activeSession && sourceSession )
		&& draftSignature !== savedSignature
		&& draftSignature !== acceptedSignature;
	const isSaving = saveRoutineSession.isPending;
	const hasFailed = hasChanges && failedSignature === draftSignature;
	const canSave = hasChanges && !validationError && Boolean( routineDayId && studentId );

	// `finalize` marca el dia como terminado. `silent` es el guardado automatico:
	// no avisa cada vez que guarda, solo si falla.
	const saveSession = useCallback( async ( { finalize, silent }: { finalize: boolean; silent: boolean } ) => {
		if (!activeSession || !routineDayId || !studentId) {
			if (!silent) toast.danger( "No se puede guardar", { description: "Faltan datos para guardar la sesión." } );

			return false;
		}

		if (validationError) {
			if (!silent) toast.danger( "No se puede guardar", { description: validationError } );

			return false;
		}

		const sentSignature = buildSaveSignature( activeSession );

		try {
			await saveRoutineSession.mutateAsync( {
				...mapStudentRoutineSessionToSaveInput( activeSession ),
				finalize,
				studentId,
			} );
			setFailedSignature( null );
			setAcceptedSignature( sentSignature );

			return true;
		} catch (saveError) {
			setFailedSignature( sentSignature );
			toast.danger( "Error al guardar", {
				description: saveError instanceof Error ? saveError.message : "No se pudieron guardar los cambios.",
			} );

			return false;
		}
	}, [ activeSession, routineDayId, saveRoutineSession, studentId, validationError ] );

	const shouldAutoSave = hasSessionEdits && canSave && !isSaving && !hasFailed;
	// Lo ultimo que se rendereo, para que los temporizadores y la salida de la
	// pantalla guarden el contenido actual y no el de cuando se programaron.
	const latestRef = useRef( { saveSession, shouldAutoSave } );

	// Guardado automatico: un momento despues del ultimo cambio.
	useEffect( () => {
		if (!shouldAutoSave) return;

		const timeoutId = window.setTimeout( () => {
			void latestRef.current.saveSession( { finalize: false, silent: true } );
		}, AUTOSAVE_DELAY_MS );

		return () => window.clearTimeout( timeoutId );
	}, [ draftSignature, shouldAutoSave ] );

	// En el gimnasio el telefono se bloquea o se cambia de app entre series: al
	// ocultarse la pantalla se guarda lo pendiente sin esperar al temporizador.
	useEffect( () => {
		function handleVisibilityChange() {
			if (document.visibilityState === "hidden" && latestRef.current.shouldAutoSave) {
				void latestRef.current.saveSession( { finalize: false, silent: true } );
			}
		}

		document.addEventListener( "visibilitychange", handleVisibilityChange );

		return () => document.removeEventListener( "visibilitychange", handleVisibilityChange );
	}, [] );

	// Al salir del dia se guarda lo que quedo pendiente.
	useEffect( () => () => {
		if (latestRef.current.shouldAutoSave) {
			void latestRef.current.saveSession( { finalize: false, silent: true } );
		}
	}, [ routineDayId ] );

	// Va despues de los efectos de arriba: sus limpiezas tienen que ver todavia los
	// valores del render anterior.
	useEffect( () => {
		latestRef.current = { saveSession, shouldAutoSave };
	} );

	const saveStatus: RoutineSessionSaveStatus = isSaving
		? "saving"
		: hasFailed
			? "error"
			: !hasChanges
				? "saved"
				: hasSessionEdits ? "pending" : "unsaved";

	return {
		saveSession,
		saveStatus,
	};
}
