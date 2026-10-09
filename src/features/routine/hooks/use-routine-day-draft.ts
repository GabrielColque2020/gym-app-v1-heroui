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
import { getRoutineDayDraft, useRoutineDayDraftStore } from "@/features/routine/stores/use-routine-day-draft-store";
import { createDraftRoutineExercise } from "@/features/routine/services/routine-day-editor";
import { normalizeRestSeconds } from "@/features/routine/services/rest-seconds";

type UseRoutineDayDraftOptions = {
	// Hay un guardado de este dia viajando al servidor.
	isSaving?: boolean;
	routineDayId: string;
	sourceRoutines: RoutineDayExerciseBase[];
};

export type RoutineDayCopySource = {
	exercise: Omit<ExerciseListItem, "createdAt"> | null;
	exerciseId: string | null;
	observation: string | null;
	reps: string;
	restSeconds?: number | null;
	sets: string;
	// Las variantes del ejercicio en el dia de origen, para copiarlas tambien.
	variantExerciseIds?: string[];
};

type DraftMutationResult =
	| { error: string; routine?: never }
	| { error?: never; routine: DraftRoutineDayExercise };

export function useRoutineDayDraft( { isSaving = false, routineDayId, sourceRoutines }: UseRoutineDayDraftOptions ) {
	const hasHydrated = useRoutineDayDraftStore( ( state ) => state.hasHydrated );
	const draftRoutines = useRoutineDayDraftStore( ( state ) => state.drafts[ routineDayId ] );
	const setDraft = useRoutineDayDraftStore( ( state ) => state.setDraft );
	const clearDraft = useRoutineDayDraftStore( ( state ) => state.clearDraft );
	const removeExercise = useRoutineDayDraftStore( ( state ) => state.removeExercise );
	const updateExercise = useRoutineDayDraftStore( ( state ) => state.updateExercise );
	const addExerciseToStore = useRoutineDayDraftStore( ( state ) => state.addExercise );
	const { sourceDraftRoutines, sourceSignature } = useMemo(
		() => buildSourceDraftState( sourceRoutines ),
		[sourceRoutines],
	);

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
	// Lo guardado mas reciente, para lo que se ejecuta mas tarde (deshacer desde
	// un aviso): para entonces el dia pudo haberse guardado y lo que ese codigo
	// recuerda ya es viejo.
	const latestSourceRef = useRef( sourceDraftRoutines );

	useEffect( () => {
		latestSourceRef.current = sourceDraftRoutines;
	} );

	// El borrador existe solo mientras difiere de lo guardado. Uno igual a lo
	// guardado no aporta nada y es peligroso: si el dia cambia despues en el
	// servidor, esa copia vieja pasaria por "cambios sin guardar" y, al guardarla,
	// pisaria lo nuevo. Por eso tampoco se crea un borrador al abrir el dia: nace
	// con la primera edicion (`hydrateDraftIfNeeded`) y se descarta aca cuando el
	// guardado lo alcanza.
	//
	// Mientras viaja un guardado no se descarta: "lo guardado" esta por cambiar. Si
	// el coach deshace un cambio que se esta guardando, el borrador vuelve a ser
	// igual a lo de antes, pero cuando el guardado termine va a ser distinto y ese
	// deshacer tiene que guardarse tambien.
	useEffect( () => {
		if (!hasHydrated || !draftRoutines || isDirty || isSaving) return;

		clearDraft( routineDayId );
	}, [ clearDraft, draftRoutines, hasHydrated, isDirty, isSaving, routineDayId ] );

	function hydrateDraftIfNeeded() {
		// Se consulta el store y no el valor de este render: agregar un ejercicio
		// hace varias ediciones seguidas, y la segunda todavia veria "sin borrador"
		// y pisaria con lo guardado lo que acaba de agregar la primera.
		if (getRoutineDayDraft( routineDayId )) return;

		setDraft( routineDayId, sourceDraftRoutines );
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
		field: "observation" | "order" | "reps" | "restSeconds" | "sets",
		value: number | string | null,
	) {
		hydrateDraftIfNeeded();
		updateExercise( {
			clientId,
			patch: getRoutineExerciseFieldPatch( field, value ),
			routineDayId,
		} );
	}

	// Devuelve al borrador un ejercicio recien quitado. Si mientras tanto otro
	// ocupo su lugar, va al final.
	function restoreExercise( routine: DraftRoutineDayExercise ) {
		const currentDraft = getRoutineDayDraft( routineDayId ) ?? latestSourceRef.current;

		if (currentDraft.some( ( current ) => current.exerciseId === routine.exerciseId )) return;

		const isOrderTaken = currentDraft.some( ( current ) => current.order === routine.order );
		const order = isOrderTaken
			? currentDraft.reduce( ( highest, current ) => Math.max( highest, current.order ), 0 ) + 1
			: routine.order;

		setDraft( routineDayId, [ ...currentDraft, { ...routine, order } ] );
	}

	// Las variantes de un ejercicio que todavia no se guardo en el dia.
	function setExercisePendingVariants( clientId: string, variantExerciseIds: string[] ) {
		hydrateDraftIfNeeded();
		updateExercise( {
			clientId,
			patch: { pendingVariantExerciseIds: variantExerciseIds },
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
				restSeconds: normalizeRestSeconds( routine.restSeconds ),
				sets: routine.sets,
				// Viajan con la fila nueva y se crean cuando el dia se guarda.
				...( routine.variantExerciseIds?.length ? { pendingVariantExerciseIds: routine.variantExerciseIds } : {} ),
			} ];
		} ) );
	}

	function getSuggestedOrder() {
		return getSuggestedRoutineExerciseOrder( sortedDraftRoutines );
	}

	// Descarta los cambios sin guardar: el dia vuelve a mostrar lo guardado.
	function resetDraft() {
		clearDraft( routineDayId );
	}

	return {
		addExercise,
		addedExerciseIds,
		deleteExercise,
		draftRoutines: sortedDraftRoutines,
		getSuggestedOrder,
		hasHydrated,
		isDirty,
		moveExercise,
		replaceWithCopies,
		resetDraft,
		restoreExercise,
		setExercisePendingVariants,
		updateExerciseField,
		validationError,
	};
}
