import type { DraftRoutineDayExercise } from "@/features/routine/services/routine-day-editor";
import type { RoutineDayExerciseBase } from "@/features/routine/actions/get-routine-day";

import {
	getDraftCatalogExerciseIds,
	mapRoutineExercisesToDraft,
	serializeRoutineDayDraft,
	sortDraftRoutineExercises,
	validateRoutineDayDraft,
} from "@/features/routine/services/routine-day-editor";

export function buildSourceDraftState( sourceRoutines: RoutineDayExerciseBase[] ) {
	const sourceDraftRoutines = mapRoutineExercisesToDraft( sourceRoutines );
	const sourceSignature = serializeRoutineDayDraft( sourceDraftRoutines );

	return {
		sourceDraftRoutines,
		sourceSignature,
	};
}

export function buildActiveDraftState(
	sourceDraftRoutines: DraftRoutineDayExercise[],
	draftRoutines: DraftRoutineDayExercise[] | undefined,
) {
	// El id de cada fila sale siempre de lo guardado: una fila del borrador lo
	// tiene si su ejercicio ya esta guardado en el dia. Asi no depende de lo que
	// el borrador haya anotado cuando se creo, que puede haber quedado viejo.
	const savedIdByExerciseId = new Map(
		sourceDraftRoutines.map( ( routine ) => [ routine.exerciseId, routine.id ] ),
	);
	const activeDraftRoutines = draftRoutines
		? draftRoutines.map( ( routine ) => ( { ...routine, id: savedIdByExerciseId.get( routine.exerciseId ) ?? null } ) )
		: sourceDraftRoutines;
	const sortedDraftRoutines = sortDraftRoutineExercises( activeDraftRoutines );
	const draftSignature = serializeRoutineDayDraft( sortedDraftRoutines );
	const validationError = validateRoutineDayDraft( sortedDraftRoutines );
	const addedExerciseIds = new Set( sortedDraftRoutines.flatMap( getDraftCatalogExerciseIds ) );

	return {
		addedExerciseIds,
		draftSignature,
		sortedDraftRoutines,
		validationError,
	};
}

export function getRoutineExerciseFieldPatch(
	field: "observation" | "order" | "reps" | "sets",
	value: number | string,
) {
	return {
		[ field ]: field === "order" ? Number( value ) || 0 : String( value ),
	};
}

export function getSuggestedRoutineExerciseOrder( routines: DraftRoutineDayExercise[] ) {
	return routines.reduce( ( highestOrder, routine ) => Math.max( highestOrder, routine.order ), 0 ) + 1;
}
