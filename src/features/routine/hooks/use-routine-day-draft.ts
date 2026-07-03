"use client";

import { useEffect, useMemo, useRef } from "react";

import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import type { RoutineDayExerciseBase } from "@/features/routine/actions/get-routine-day";
import type { DraftRoutineDayExercise } from "@/features/routine/services/routine-day-editor";
import {
	buildActiveDraftState,
	buildSourceDraftState,
	getRoutineExerciseFieldPatch,
	getSuggestedRoutineExerciseOrder,
} from "@/features/routine/hooks/use-routine-day-draft.utils";
import { useRoutineDayDraftStore } from "@/features/routine/stores/use-routine-day-draft-store";
import { serializeRoutineDayDraft } from "@/features/routine/services/routine-day-editor";

type UseRoutineDayDraftOptions = {
	routineDayId: string;
	sourceRoutines: RoutineDayExerciseBase[];
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
	const { sourceDraftRoutines, sourceSignature } = useMemo(
		() => buildSourceDraftState( sourceRoutines ),
		[sourceRoutines],
	);

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

	const {
		addedExerciseIds,
		draftSignature,
		sortedDraftRoutines,
		validationError,
	} = useMemo(
		() => buildActiveDraftState( sourceDraftRoutines, draftRoutines ),
		[draftRoutines, sourceDraftRoutines],
	);
	const isDirty = draftSignature !== sourceSignature;

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
			patch: getRoutineExerciseFieldPatch( field, value ),
			routineDayId,
		} );
	}

	function getSuggestedOrder() {
		return getSuggestedRoutineExerciseOrder( sortedDraftRoutines );
	}

	function resetDraft( nextSourceRoutines: RoutineDayExerciseBase[] ) {
		const nextDraftRoutines = buildSourceDraftState( nextSourceRoutines ).sourceDraftRoutines;

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
