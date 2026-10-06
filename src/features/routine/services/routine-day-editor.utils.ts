import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import type { RoutineDayExerciseBase } from "@/features/routine/actions/get-routine-day";
import type {
	DraftRoutineDayExercise,
	SaveRoutineDayExerciseInput,
} from "@/features/routine/services/routine-day-editor.types";

export function mapRoutineExerciseToDraft( routine: RoutineDayExerciseBase ): DraftRoutineDayExercise {
	return {
		clientId: routine.id,
		exercise: routine.exercise,
		exerciseId: routine.exerciseId ?? "",
		id: routine.id,
		observation: routine.observation ?? "",
		order: routine.order,
		reps: routine.reps,
		sets: routine.sets,
	};
}

export function mapRoutineExercisesToDraft( routines: RoutineDayExerciseBase[] ) {
	return routines.map( mapRoutineExerciseToDraft );
}

export function createDraftRoutineExercise(
	exercise: NonNullable<ExerciseListItem>,
	order: number,
): DraftRoutineDayExercise {
	return {
		clientId: `draft-${ crypto.randomUUID() }`,
		exercise,
		exerciseId: exercise.id,
		id: null,
		observation: "",
		order,
		reps: "",
		sets: "",
	};
}

export function sortDraftRoutineExercises( routines: DraftRoutineDayExercise[] ) {
	return [ ...routines ].sort( ( a, b ) => {
		if (a.order !== b.order) return a.order - b.order;

		return a.exercise?.name?.localeCompare( b.exercise?.name ?? "" ) ?? 0;
	} );
}

export function getNextRoutineExerciseOrder( routines: DraftRoutineDayExercise[] ) {
	return routines.reduce( ( highestOrder, routine ) => Math.max( highestOrder, routine.order ), 0 ) + 1;
}

export function validateRoutineDayDraft( routines: DraftRoutineDayExercise[] ) {
	const exerciseIds = new Set<string>();
	const orders = new Set<number>();

	for (const routine of routines) {
		const normalizedExerciseId = routine.exerciseId.trim();

		if (!normalizedExerciseId) {
			return "Todos los ejercicios deben tener un identificador válido.";
		}

		if (exerciseIds.has( normalizedExerciseId )) {
			return "No puede agregar el mismo ejercicio más de una vez en el mismo día.";
		}

		exerciseIds.add( normalizedExerciseId );

		if (!Number.isInteger( routine.order ) || routine.order < 1) {
			return "El orden debe ser un número entero mayor o igual a 1.";
		}

		if (orders.has( routine.order )) {
			return "No puede haber dos ejercicios con el mismo orden.";
		}

		orders.add( routine.order );
	}

	return null;
}

export function serializeRoutineDayDraft( routines: DraftRoutineDayExercise[] ) {
	return JSON.stringify(
		sortDraftRoutineExercises( routines ).map( ( routine ) => ( {
			exerciseId: routine.exerciseId,
			observation: routine.observation.trim(),
			order: routine.order,
			reps: routine.reps.trim(),
			sets: routine.sets.trim(),
		} ) ),
	);
}

type SavedRoutineLike = {
	exerciseId: string | null;
	observation: string | null;
	order: number;
	reps: string;
	sets: string;
};

// Si un borrador difiere de lo guardado para ese dia. Compara con la misma firma
// que `serializeRoutineDayDraft`, armada desde las filas guardadas.
export function isRoutineDayDraftDirty(
	draft: DraftRoutineDayExercise[] | undefined,
	savedRoutines: SavedRoutineLike[],
) {
	if (!draft) return false;

	const savedSignature = JSON.stringify(
		[ ...savedRoutines ]
			.sort( ( a, b ) => a.order - b.order )
			.map( ( routine ) => ( {
				exerciseId: routine.exerciseId ?? "",
				observation: ( routine.observation ?? "" ).trim(),
				order: routine.order,
				reps: routine.reps.trim(),
				sets: routine.sets.trim(),
			} ) ),
	);

	return serializeRoutineDayDraft( draft ) !== savedSignature;
}

export function mapDraftToSaveInput( routines: DraftRoutineDayExercise[] ): SaveRoutineDayExerciseInput[] {
	return sortDraftRoutineExercises( routines ).map( ( routine ) => ( {
		exerciseId: routine.exerciseId,
		observation: routine.observation.trim(),
		order: routine.order,
		reps: routine.reps.trim(),
		sets: routine.sets.trim(),
	} ) );
}
