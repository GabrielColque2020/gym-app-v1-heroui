import type { CoachTrainingRoutineDay } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";
import { getTrainingRoutineDayTitle } from "@/features/training-routine/services/training-routine-day-formatters";

export function formatExerciseMeta( sets: string, reps: string ) {
	if (sets.trim().length === 0) return reps;
	if (reps.trim().length === 0) return sets;
	return `${ sets } x ${ reps }`;
}

export function getDayTitle( day: CoachTrainingRoutineDay ) {
	return getTrainingRoutineDayTitle( day );
}
