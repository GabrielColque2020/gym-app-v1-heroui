import type { CoachTrainingRoutineDay } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";

export function formatExerciseMeta( sets: string, reps: string ) {
	if (sets.trim().length === 0) return reps;
	if (reps.trim().length === 0) return sets;
	return `${ sets } x ${ reps }`;
}

export function getDayTitle( day: CoachTrainingRoutineDay ) {
	const bodyParts = Array.from(
		new Set(
			day.routines
				.map( ( routine ) => routine.exercise?.bodyPart )
				.filter( Boolean ),
		),
	);

	if (bodyParts.length === 0) return "Sin ejercicios cargados";

	return bodyParts.join( " + " );
}
