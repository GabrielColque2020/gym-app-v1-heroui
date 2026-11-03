import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import type { DayExercise } from "@/features/routine/services/routine-day-editor";
import {
	createDraftRoutineExercise,
	getDraftCatalogExerciseIds,
	sortDraftRoutineExercises,
	validateRoutineDayDraft,
} from "@/features/routine/services/routine-day-editor";

type DayExercisePatch = Pick<DayExercise, "observation" | "order" | "pendingVariantExerciseIds" | "reps" | "restSeconds" | "sets">;

export type AddDraftExerciseResult =
	| { draft?: never; error: string; routine?: never }
	| { draft: DayExercise[]; error?: never; routine: DayExercise };

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
				// `null` es un valor valido (sin descanso): solo se conserva si no vino.
				restSeconds: patch.restSeconds !== undefined ? patch.restSeconds : routine.restSeconds ?? null,
				sets: patch.sets ?? routine.sets,
			}
			: routine
	) );
}

// El orden es el lugar en la lista: si ya esta ocupado, el ejercicio entra ahi
// y los de abajo bajan uno; pasado el ultimo, va al final. Antes un orden
// ocupado se rechazaba ("dos ejercicios con el mismo orden") y uno alto dejaba
// huecos, y el orden sugerido para el siguiente no coincidia con la lista.
export function insertDraftExerciseAt(
	draft: DayExercise[],
	routine: DayExercise,
	order: number,
) {
	const sortedDraft = sortDraftRoutineExercises( draft );
	const index = Math.min( Math.max( Math.trunc( order ), 1 ), sortedDraft.length + 1 ) - 1;

	return renumberDraftExercises( [ ...sortedDraft.slice( 0, index ), routine, ...sortedDraft.slice( index ) ] );
}

// Deja los ordenes 1, 2, 3... sin huecos, como los numeros que ve el coach.
function renumberDraftExercises( draft: DayExercise[] ) {
	return draft.map( ( routine, index ) => (
		routine.order === index + 1 ? routine : { ...routine, order: index + 1 }
	) );
}

export function appendDraftExercise(
	currentDraft: DayExercise[],
	exercise: ExerciseListItem,
	order: number,
): AddDraftExerciseResult {
	if (currentDraft.some( ( routine ) => getDraftCatalogExerciseIds( routine ).includes( exercise.id ) )) {
		return {
			error: "No puede agregar el mismo ejercicio más de una vez en el mismo día.",
		};
	}

	const nextRoutine = createDraftRoutineExercise( exercise, order );
	const { draft, validationError } = sortAndValidateDraft( insertDraftExerciseAt( currentDraft, nextRoutine, order ) );

	if (validationError) {
		return {
			error: validationError,
		};
	}

	return {
		draft,
		routine: draft.find( ( routine ) => routine.clientId === nextRoutine.clientId ) ?? nextRoutine,
	};
}

export function removeDraftExercise(
	draft: DayExercise[],
	clientId: string,
) {
	return renumberDraftExercises( sortDraftRoutineExercises(
		draft.filter( ( routine ) => routine.clientId !== clientId ),
	) );
}
