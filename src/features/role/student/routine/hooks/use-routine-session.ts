"use client";

import { useEffect, useMemo, useState } from "react";
import type { StudentRoutineSession } from "@/features/routine/services/routine-session";
import {
	mapStudentRoutineSessionDetailToSession,
	serializeStudentRoutineSession,
	mergeStudentRoutineSessionDraft,
	validateStudentRoutineSession,
	type StudentRoutineSessionDetail,
} from "@/features/routine/services/routine-session";
import { useRoutineSessionStore } from "@/features/routine/stores/use-routine-session-store";

type UseRoutineSessionOptions = {
	// Hay un guardado de este dia viajando al servidor.
	isSaving?: boolean;
	routineDayId: string;
	sourceDetail: StudentRoutineSessionDetail | null;
};

export function useRoutineSession( { isSaving = false, routineDayId, sourceDetail }: UseRoutineSessionOptions ) {
	const hasHydrated = useRoutineSessionStore( ( state ) => state.hasHydrated );
	const draftSession = useRoutineSessionStore( ( state ) => state.drafts[ routineDayId ] ?? null );
	const syncDraftFromSource = useRoutineSessionStore( ( state ) => state.syncDraftFromSource );
	const setDraft = useRoutineSessionStore( ( state ) => state.setDraft );
	const clearDraft = useRoutineSessionStore( ( state ) => state.clearDraft );
	const updateSet = useRoutineSessionStore( ( state ) => state.updateSet );
	// El dia que el estudiante edito en esta visita. El guardado automatico solo
	// actua sobre cambios hechos ahora: un borrador que quedo de otra vez puede
	// ser mas viejo que lo que hay en el servidor.
	const [ editedDayId, setEditedDayId ] = useState<string | null>( null );

	const sourceSession = useMemo( () => ( sourceDetail ? mapStudentRoutineSessionDetailToSession( sourceDetail ) : null ), [ sourceDetail ] );
	const activeSession = useMemo( () => ( sourceSession ? mergeStudentRoutineSessionDraft( sourceSession, draftSession ) : draftSession ), [ draftSession, sourceSession ] );
	const sourceSignature = useMemo( () => ( sourceSession ? serializeStudentRoutineSession( sourceSession ) : null ), [ sourceSession ] );
	const draftSignature = useMemo( () => ( activeSession ? serializeStudentRoutineSession( activeSession ) : null ), [ activeSession ] );
	const validationError = useMemo( () => ( activeSession ? validateStudentRoutineSession( activeSession ) : "Seleccioná un día válido antes de guardar." ), [ activeSession ] );
	const isDirty = Boolean( sourceSignature && draftSignature && sourceSignature !== draftSignature );

	useEffect( () => {
		if (!sourceSession || !sourceDetail) return;

		syncDraftFromSource( routineDayId, sourceDetail, sourceSession );
	}, [
		routineDayId,
		sourceSession,
		sourceDetail,
		syncDraftFromSource,
	] );

	// El borrador existe solo mientras difiere de lo guardado: nace con la primera
	// edicion y se descarta aca cuando el guardado lo alcanza. Mientras viaja un
	// guardado no se descarta, porque "lo guardado" esta por cambiar: si el
	// estudiante deshace un cambio que se esta guardando, ese deshacer tambien
	// tiene que guardarse.
	useEffect( () => {
		if (!hasHydrated || !draftSession || !sourceSession || isDirty || isSaving) return;

		clearDraft( routineDayId );
	}, [ clearDraft, draftSession, hasHydrated, isDirty, isSaving, routineDayId, sourceSession ] );

	function replaceDraft( nextSession: StudentRoutineSession ) {
		setEditedDayId( routineDayId );
		setDraft( routineDayId, nextSession );
	}

	function clearRoutineDraft() {
		clearDraft( routineDayId );
	}

	return {
		activeSession,
		clearDraft: clearRoutineDraft,
		draftSession,
		hasSessionEdits: editedDayId === routineDayId,
		isDirty,
		replaceDraft,
		sourceSession,
		updateSet,
		validationError,
	};
}
