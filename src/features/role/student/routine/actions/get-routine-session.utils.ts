import type { RoutineDayDetailBase } from "@/features/routine/actions/get-routine-day";

export function collectStudentRoutineProgressIds( routineDay: RoutineDayDetailBase ) {
	const exerciseIds = Array.from(
		new Set(
			routineDay.routines.flatMap( ( routine ) => [
				routine.exerciseId ?? routine.exercise?.id,
				...routine.variants.map( ( variant ) => variant.variantExerciseId ),
			] ).filter( ( exerciseId ): exerciseId is string => Boolean( exerciseId ) ),
		),
	);
	const variantExerciseIds = Array.from(
		new Set(
			routineDay.routines
				.flatMap( ( routine ) => routine.variants.map( ( variant ) => variant.variantExerciseId ) )
				.filter( ( exerciseId ): exerciseId is string => Boolean( exerciseId ) ),
		),
	);

	return {
		exerciseIds,
		variantExerciseIds,
	};
}

export function buildStudentRoutineProgressWhere(
	studentId: string,
	exerciseIds: string[],
	variantExerciseIds: string[],
) {
	return {
		studentId,
		OR: [
			exerciseIds.length > 0
				? {
					exerciseId: {
						in: exerciseIds,
					},
				}
				: undefined,
			variantExerciseIds.length > 0
				? {
					variantExerciseId: {
						in: variantExerciseIds,
					},
				}
				: undefined,
		].filter( Boolean ) as Array<Record<string, unknown>>,
	};
}

