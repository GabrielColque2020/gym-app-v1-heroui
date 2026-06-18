import type { AdminRoutineDayExercise } from "@/features/admin/routine/actions/get-routine-day";

export type DraftRoutineDayExercise = {
	clientId: string;
	exercise: AdminRoutineDayExercise[ "exercise" ];
	exerciseId: string;
	id: string | null;
	observation: string;
	order: number;
	reps: string;
	sets: string;
};

export type DayExercise = DraftRoutineDayExercise;

export type SaveRoutineDayExerciseInput = {
	exerciseId: string;
	observation: string;
	order: number;
	reps: string;
	sets: string;
};

export function mapRoutineExerciseToDraft( routine: AdminRoutineDayExercise ): DraftRoutineDayExercise {
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

export function mapRoutineExercisesToDraft( routines: AdminRoutineDayExercise[] ) {
	return routines.map( mapRoutineExerciseToDraft );
}

export function createDraftRoutineExercise(
	exercise: NonNullable<AdminRoutineDayExercise[ "exercise" ]>,
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
			return "Todos los ejercicios deben tener un identificador valido.";
		}

		if (exerciseIds.has( normalizedExerciseId )) {
			return "No puede agregar el mismo ejercicio mas de una vez en el mismo dia.";
		}

		exerciseIds.add( normalizedExerciseId );

		if (!Number.isInteger( routine.order ) || routine.order < 1) {
			return "El orden debe ser un numero entero mayor o igual a 1.";
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

export function mapDraftToSaveInput( routines: DraftRoutineDayExercise[] ): SaveRoutineDayExerciseInput[] {
	return sortDraftRoutineExercises( routines ).map( ( routine ) => ( {
		exerciseId: routine.exerciseId,
		observation: routine.observation.trim(),
		order: routine.order,
		reps: routine.reps.trim(),
		sets: routine.sets.trim(),
	} ) );
}
