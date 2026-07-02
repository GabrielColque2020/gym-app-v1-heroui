"use client";

import { useEffect, useMemo, useRef } from "react";

import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import type { DraftRoutineDayExercise } from "@/features/routine/services/routine-day-editor";
import type { CoachRoutineDayExercise } from "@/features/role/coach/routine/actions/get-routine-day";
import { useRoutineDayDraftStore } from "@/features/routine/stores/useRoutineDayDraftStore";
import {
	mapRoutineExercisesToDraft,
	serializeRoutineDayDraft,
	sortDraftRoutineExercises,
	validateRoutineDayDraft,
} from "@/features/routine/services/routine-day-editor";

type UseRoutineDayDraftOptions = {
	routineDayId: string;
	sourceRoutines: CoachRoutineDayExercise[];
};

type DraftMutationResult =
	| { error: string; routine?: never }
	| { error?: never; routine: DraftRoutineDayExercise };

export function useRoutineDayDraft( { routineDayId, sourceRoutines }: UseRoutineDayDraftOptions ) {
	const hasHydrated = useRoutineDayDraftStore( ( state ) => state.hasHydrated );
	const draftRoutines = useRoutineDayDraftStore( ( state ) => state.drafts[ routineDayId ] );
	const setDraft = useRoutineDayDraftStore( ( state ) => state.setDraft );
	const clearDraft = useRoutineDayDraftStore( ( state ) => state.clearDraft );
	const removeExercise = useRoutineDayDraftStore( ( state ) => state.removeExercise );
	const updateExercise = useRoutineDayDraftStore( ( state ) => state.updateExercise );
	const addExerciseToStore = useRoutineDayDraftStore( ( state ) => state.addExercise );
	const lastSeededSignatureRef = useRef<string | null>( null );

	const sourceDraftRoutines = useMemo(
		() => mapRoutineExercisesToDraft( sourceRoutines ),
		[sourceRoutines],
	);
	const sourceSignature = useMemo(
		() => serializeRoutineDayDraft( sourceDraftRoutines ),
		[sourceDraftRoutines],
	);
	const activeDraftRoutines = draftRoutines ?? sourceDraftRoutines;

	useEffect( () => {
		if (!hasHydrated) return;
		if (draftRoutines) return;
		if (lastSeededSignatureRef.current === sourceSignature) return;

		setDraft( routineDayId, sourceDraftRoutines );
		lastSeededSignatureRef.current = sourceSignature;
	}, [
		draftRoutines,
		hasHydrated,
		routineDayId,
		setDraft,
		sourceDraftRoutines,
		sourceSignature,
	] );

	const sortedDraftRoutines = useMemo(
		() => sortDraftRoutineExercises( activeDraftRoutines ),
		[ activeDraftRoutines ],
	);
	const draftSignature = useMemo(
		() => serializeRoutineDayDraft( sortedDraftRoutines ),
		[ sortedDraftRoutines ],
	);
	const validationError = useMemo(
		() => validateRoutineDayDraft( sortedDraftRoutines ),
		[ sortedDraftRoutines ],
	);
	const isDirty = draftSignature !== sourceSignature;
	const addedExerciseIds = useMemo(
		() => new Set( sortedDraftRoutines.map( ( routine ) => routine.exerciseId ) ),
		[ sortedDraftRoutines ],
	);

	function hydrateDraftIfNeeded() {
		if (draftRoutines) return;

		setDraft( routineDayId, sourceDraftRoutines );
		lastSeededSignatureRef.current = sourceSignature;
	}

	function addExercise( exercise: ExerciseListItem, order: number ): DraftMutationResult {
		hydrateDraftIfNeeded();

		const result = addExerciseToStore( {
			exercise,
			order,
			routineDayId,
		} );

		if ("error" in result) {
			return result;
		}

		return result;
	}

	function deleteExercise( clientId: string ) {
		hydrateDraftIfNeeded();
		removeExercise( routineDayId, clientId );
	}

	function updateExerciseField(
		clientId: string,
		field: "observation" | "order" | "reps" | "sets",
		value: number | string,
	) {
		hydrateDraftIfNeeded();
		updateExercise( {
			clientId,
			patch: {
				[ field ]: field === "order" ? Number( value ) || 0 : String( value ),
			},
			routineDayId,
		} );
	}

	function getSuggestedOrder() {
		return sortedDraftRoutines.reduce( ( highestOrder, routine ) => Math.max( highestOrder, routine.order ), 0 ) + 1;
	}

	function resetDraft( nextSourceRoutines: CoachRoutineDayExercise[] ) {
		const nextDraftRoutines = mapRoutineExercisesToDraft( nextSourceRoutines );

		setDraft( routineDayId, nextDraftRoutines );
		lastSeededSignatureRef.current = serializeRoutineDayDraft( nextDraftRoutines );
	}

	function clearRoutineDraft() {
		clearDraft( routineDayId );
		lastSeededSignatureRef.current = null;
	}

	return {
		addExercise,
		addedExerciseIds,
		clearDraft: clearRoutineDraft,
		deleteExercise,
		draftRoutines: sortedDraftRoutines,
		getSuggestedOrder,
		hasHydrated,
		isDirty,
		resetDraft,
		updateExerciseField,
		validationError,
	};
}
