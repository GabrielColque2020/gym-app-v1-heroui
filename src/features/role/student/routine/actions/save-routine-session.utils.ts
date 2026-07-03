import type { RoutineDayDetailBase } from "@/features/routine/actions/get-routine-day";
import type {
	StudentRoutineSessionSaveExercise,
	StudentRoutineSessionSaveSet,
} from "@/features/routine/services/routine-session";

type ResolvedStudentRoutineExercise = {
	baseExerciseId: string;
	exercise: StudentRoutineSessionSaveExercise;
	selectedVariantExerciseId: string | null;
};

export function normalizeSetValue( value: number | null ) {
	return value === null ? "" : String( value );
}

export function normalizeSetNotes( value: string | null ) {
	const trimmed = value?.trim() ?? "";
	return trimmed || null;
}

export function validateStudentRoutineSet( set: StudentRoutineSessionSaveSet ) {
	if (!Number.isInteger( set.setNumber ) || set.setNumber < 1) {
		throw new Error( "Hay una serie con numero invalido." );
	}

	if (set.currentReps !== null && !Number.isFinite( set.currentReps )) {
		throw new Error( "Las repeticiones de una serie no son validas." );
	}

	if (set.currentWeight !== null && !Number.isFinite( set.currentWeight )) {
		throw new Error( "El peso de una serie no es valido." );
	}
}

export function resolveStudentRoutineExercises(
	routineDay: RoutineDayDetailBase,
	exercises: StudentRoutineSessionSaveExercise[],
) {
	const baseExerciseIds = Array.from(
		new Set(
			routineDay.routines
				.map( ( routine ) => routine.exerciseId )
				.filter( ( exerciseId ): exerciseId is string => Boolean( exerciseId ) ),
		),
	);
	const variantExerciseIds = Array.from(
		new Set(
			routineDay.routines
				.flatMap( ( routine ) => routine.variants.map( ( variant ) => variant.variantExerciseId ) )
				.filter( ( exerciseId ): exerciseId is string => Boolean( exerciseId ) ),
		),
	);
	const allowedExerciseIds = new Set( [ ...baseExerciseIds, ...variantExerciseIds ] );

	return exercises.map( ( exercise ): ResolvedStudentRoutineExercise => {
		const baseExerciseId = exercise.exerciseId;
		const routine = routineDay.routines.find( ( item ) => item.exerciseId === baseExerciseId ) ?? null;

		if (!routine) {
			throw new Error( "Uno o mas ejercicios no pertenecen al dia seleccionado." );
		}

		const selectedVariantExerciseId = exercise.variantExerciseId?.trim() || null;

		if (selectedVariantExerciseId && !allowedExerciseIds.has( selectedVariantExerciseId )) {
			throw new Error( "Uno o mas ejercicios no pertenecen al dia seleccionado." );
		}

		for (const set of exercise.sets) {
			validateStudentRoutineSet( set );
		}

		return {
			baseExerciseId,
			exercise,
			selectedVariantExerciseId,
		};
	} );
}

export function buildStudentRoutineProgressRows(
	routineDay: RoutineDayDetailBase,
	resolvedExercises: ResolvedStudentRoutineExercise[],
	studentId: string,
) {
	return resolvedExercises.flatMap( ( item ) =>
		item.exercise.sets.map( ( set ) => ( {
			dayNumber: routineDay.dayNumber,
			exerciseId: item.baseExerciseId,
			month: routineDay.trainingRoutine.month,
			notes: normalizeSetNotes( set.notes ),
			repsCompleted: normalizeSetValue( set.currentReps ),
			repsNumber: set.setNumber,
			setsCompleted: set.completed ? "1" : "0",
			studentId,
			variantExerciseId: item.selectedVariantExerciseId,
			week: routineDay.trainingRoutine.week,
			weightUsed: normalizeSetValue( set.currentWeight ),
			year: routineDay.trainingRoutine.year,
		} ) ),
	);
}
