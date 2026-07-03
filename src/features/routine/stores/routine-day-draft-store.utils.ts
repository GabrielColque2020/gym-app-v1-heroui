import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import type { DayExercise } from "@/features/routine/services/routine-day-editor";
import {
	createDraftRoutineExercise,
	sortDraftRoutineExercises,
	validateRoutineDayDraft,
} from "@/features/routine/services/routine-day-editor";

type DayExercisePatch = Pick<DayExercise, "observation" | "order" | "reps" | "sets">;

export type AddDraftExerciseResult =
	| { error: string; routine?: never }
	| { error?: never; routine: DayExercise };

export function sortAndValidateDraft( draft: DayExercise[] ) {
	const nextDraft = sortDraftRoutineExercises( draft );
	const validationError = validateRoutineDayDraft( nextDraft );

	return {
		draft: nextDraft,
		validationError,
	};
}

export function patchDraftExercise(
	draft: DayExercise[],
	clientId: string,
	patch: Partial<DayExercisePatch>,
) {
	return draft.map( ( routine ) => (
		routine.clientId === clientId
			? {
				...routine,
				...patch,
				order: patch.order ?? routine.order,
				observation: patch.observation ?? routine.observation,
				reps: patch.reps ?? routine.reps,
				sets: patch.sets ?? routine.sets,
			}
			: routine
	) );
}

export function appendDraftExercise(
	currentDraft: DayExercise[],
	exercise: ExerciseListItem,
	order: number,
): AddDraftExerciseResult {
	if (currentDraft.some( ( routine ) => routine.exerciseId === exercise.id )) {
		return {
			error: "No puede agregar el mismo ejercicio mas de una vez en el mismo dia.",
		};
	}

	const nextRoutine = createDraftRoutineExercise( exercise, order );
	const nextDraft = [ ...currentDraft, nextRoutine ];
	const { draft, validationError } = sortAndValidateDraft( nextDraft );

	if (validationError) {
		return {
			error: validationError,
		};
	}

	return {
		routine: draft.find( ( routine ) => routine.clientId === nextRoutine.clientId ) ?? nextRoutine,
	};
}

export function removeDraftExercise(
	draft: DayExercise[],
	clientId: string,
) {
	return sortDraftRoutineExercises(
		draft.filter( ( routine ) => routine.clientId !== clientId ),
	);
}
