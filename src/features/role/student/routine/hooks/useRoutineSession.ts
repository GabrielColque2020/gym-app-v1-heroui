"use client";

import { useEffect, useMemo } from "react";
import type { StudentRoutineSession } from "@/features/routine/services/routine-session";
import {
	mapStudentRoutineSessionDetailToSession,
	serializeStudentRoutineSession,
	mergeStudentRoutineSessionDraft,
	validateStudentRoutineSession,
	type StudentRoutineSessionDetail,
} from "@/features/routine/services/routine-session";
import { useRoutineSessionStore } from "@/features/routine/stores/useRoutineSessionStore";

type UseRoutineSessionOptions = {
	routineDayId: string;
	sourceDetail: StudentRoutineSessionDetail | null;
};

export function useRoutineSession( { routineDayId, sourceDetail }: UseRoutineSessionOptions ) {
	const draftSession = useRoutineSessionStore( ( state ) => state.drafts[ routineDayId ] ?? null );
	const syncDraftFromSource = useRoutineSessionStore( ( state ) => state.syncDraftFromSource );
	const setDraft = useRoutineSessionStore( ( state ) => state.setDraft );
	const clearDraft = useRoutineSessionStore( ( state ) => state.clearDraft );
	const updateSet = useRoutineSessionStore( ( state ) => state.updateSet );

	const sourceSession = useMemo( () => ( sourceDetail ? mapStudentRoutineSessionDetailToSession( sourceDetail ) : null ), [ sourceDetail ] );
	const activeSession = useMemo( () => ( sourceSession ? mergeStudentRoutineSessionDraft( sourceSession, draftSession ) : draftSession ), [ draftSession, sourceSession ] );
	const sourceSignature = useMemo( () => ( sourceSession ? serializeStudentRoutineSession( sourceSession ) : null ), [ sourceSession ] );
	const draftSignature = useMemo( () => ( activeSession ? serializeStudentRoutineSession( activeSession ) : null ), [ activeSession ] );
	const validationError = useMemo( () => ( activeSession ? validateStudentRoutineSession( activeSession ) : "Selecciona un dia valido antes de guardar." ), [ activeSession ] );
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

	function replaceDraft( nextSession: StudentRoutineSession ) {
		setDraft( routineDayId, nextSession );
	}

	function clearRoutineDraft() {
		clearDraft( routineDayId );
	}

	return {
		activeSession,
		clearDraft: clearRoutineDraft,
		draftSession,
		isDirty,
		replaceDraft,
		sourceSession,
		updateSet,
		validationError,
	};
}
