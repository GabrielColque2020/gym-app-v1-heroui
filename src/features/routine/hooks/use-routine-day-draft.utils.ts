import type { DraftRoutineDayExercise } from "@/features/routine/services/routine-day-editor";
import type { CoachRoutineDayExercise } from "@/features/role/coach/routine/actions/get-routine-day";

import {
	mapRoutineExercisesToDraft,
	serializeRoutineDayDraft,
	sortDraftRoutineExercises,
	validateRoutineDayDraft,
} from "@/features/routine/services/routine-day-editor";

export function buildSourceDraftState( sourceRoutines: CoachRoutineDayExercise[] ) {
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
	const activeDraftRoutines = draftRoutines ?? sourceDraftRoutines;
	const sortedDraftRoutines = sortDraftRoutineExercises( activeDraftRoutines );
	const draftSignature = serializeRoutineDayDraft( sortedDraftRoutines );
	const validationError = validateRoutineDayDraft( sortedDraftRoutines );
	const addedExerciseIds = new Set( sortedDraftRoutines.map( ( routine ) => routine.exerciseId ) );

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
