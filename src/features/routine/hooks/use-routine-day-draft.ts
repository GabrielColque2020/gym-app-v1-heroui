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
import { createDraftRoutineExercise, serializeRoutineDayDraft } from "@/features/routine/services/routine-day-editor";

type UseRoutineDayDraftOptions = {
	routineDayId: string;
	sourceRoutines: RoutineDayExerciseBase[];
};

export type RoutineDayCopySource = {
	exercise: Omit<ExerciseListItem, "createdAt"> | null;
	exerciseId: string | null;
	observation: string | null;
	reps: string;
	sets: string;
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

	// Sube o baja un ejercicio intercambiando su orden con el vecino. Va en un solo
	// `setDraft`: cambiar los dos ordenes por separado deja un instante con el
	// orden repetido, y el borrador rechaza ese estado.
	function moveExercise( clientId: string, direction: -1 | 1 ) {
		const index = sortedDraftRoutines.findIndex( ( routine ) => routine.clientId === clientId );
		const current = sortedDraftRoutines[ index ];
		const neighbor = sortedDraftRoutines[ index + direction ];

		if (!current || !neighbor) return;

		setDraft( routineDayId, sortedDraftRoutines.map( ( routine ) => {
			if (routine.clientId === current.clientId) return { ...routine, order: neighbor.order };
			if (routine.clientId === neighbor.clientId) return { ...routine, order: current.order };

			return routine;
		} ) );
	}

	// Reemplaza el borrador por copias de los ejercicios de otro dia. Son filas
	// nuevas (sin id): quedan pendientes hasta guardar.
	function replaceWithCopies( routines: RoutineDayCopySource[] ) {
		setDraft( routineDayId, routines.flatMap( ( routine, index ) => {
			if (!routine.exercise || !routine.exerciseId) return [];

			return [ {
				...createDraftRoutineExercise( { ...routine.exercise, createdAt: new Date() }, index + 1 ),
				exerciseId: routine.exerciseId,
				observation: routine.observation ?? "",
				reps: routine.reps,
				sets: routine.sets,
			} ];
		} ) );
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
		moveExercise,
		replaceWithCopies,
		resetDraft,
		updateExerciseField,
		validationError,
	};
}
