"use client";

import { useEffect, useMemo } from "react";

import type { StudentRoutineSession } from "@/features/student/routine/services/routine-session";
import {
	mapStudentRoutineSessionDetailToSession,
	serializeStudentRoutineSession,
	validateStudentRoutineSession,
	type StudentRoutineSessionDetail,
} from "@/features/student/routine/services/routine-session";
import { useRoutineSessionStore } from "@/features/student/routine/stores/useRoutineSessionStore";

type UseRoutineSessionOptions = {
	routineDayId: string;
	sourceDetail: StudentRoutineSessionDetail | null;
};

// Mezcla el draft persistido con la sesion origen sin perder ejercicios nuevos agregados por el coach.
function mergeSessionVariants( draftSession: StudentRoutineSession | null, sourceSession: StudentRoutineSession | null ) {
	if (!draftSession || !sourceSession) return draftSession ?? sourceSession;

	const draftExercisesById = new Map( draftSession.exercises.map( ( exercise ) => [ exercise.id, exercise ] ) );

	return {
		...draftSession,
		exercises: sourceSession.exercises.map( ( sourceExercise ) => {
			const draftExercise = draftExercisesById.get( sourceExercise.id );

			if (!draftExercise) {
				return sourceExercise;
			}

			return {
				...sourceExercise,
				baseName: draftExercise.baseName ?? sourceExercise.baseName,
				lastSession: sourceExercise.lastSession ?? draftExercise.lastSession ?? null,
				name: draftExercise.variantExerciseId
					? draftExercise.name
					: sourceExercise.name,
				notes: draftExercise.notes ?? sourceExercise.notes,
				restTime: draftExercise.restTime ?? sourceExercise.restTime,
				sets: draftExercise.sets,
				variantExerciseId: draftExercise.variantExerciseId ?? sourceExercise.variantExerciseId ?? null,
				variantOptions: sourceExercise.variantOptions.length > 0
					? sourceExercise.variantOptions
					: draftExercise.variantOptions ?? [],
			};
		} ),
	};
}

export function useRoutineSession( { routineDayId, sourceDetail }: UseRoutineSessionOptions ) {
	const draftSession = useRoutineSessionStore( ( state ) => state.drafts[ routineDayId ] ?? null );
	const hydrateDraftFromSource = useRoutineSessionStore( ( state ) => state.hydrateDraftFromSource );
	const hydrateRoutinePagesFromSource = useRoutineSessionStore( ( state ) => state.hydrateRoutinePagesFromSource );
	const setDraft = useRoutineSessionStore( ( state ) => state.setDraft );
	const setTrainingRoutineNameStore = useRoutineSessionStore( ( state ) => state.setTrainingRoutineNameStore );
	const clearDraft = useRoutineSessionStore( ( state ) => state.clearDraft );
	const updateSet = useRoutineSessionStore( ( state ) => state.updateSet );

	const sourceSession = useMemo(
		() => ( sourceDetail ? mapStudentRoutineSessionDetailToSession( sourceDetail ) : null ),
		[sourceDetail],
	);
	const activeSession = useMemo(
		() => mergeSessionVariants( draftSession, sourceSession ),
		[ draftSession, sourceSession ],
	);
	const sourceSignature = useMemo(
		() => ( sourceSession ? serializeStudentRoutineSession( sourceSession ) : null ),
		[sourceSession],
	);
	const draftSignature = useMemo(
		() => ( activeSession ? serializeStudentRoutineSession( activeSession ) : null ),
		[ activeSession ],
	);
	const validationError = useMemo(
		() => ( activeSession ? validateStudentRoutineSession( activeSession ) : "Selecciona un dia valido antes de guardar." ),
		[activeSession],
	);
	const isDirty = Boolean( sourceSignature && draftSignature && sourceSignature !== draftSignature );

	useEffect( () => {
		if (!sourceSession) return;

		hydrateDraftFromSource( routineDayId, sourceSession );
		setTrainingRoutineNameStore( routineDayId, sourceSession.title );
		if (sourceDetail) {
			hydrateRoutinePagesFromSource( routineDayId, sourceDetail );
		}
	}, [
		hydrateDraftFromSource,
		hydrateRoutinePagesFromSource,
		routineDayId,
		sourceSession,
		sourceDetail,
		setTrainingRoutineNameStore,
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
