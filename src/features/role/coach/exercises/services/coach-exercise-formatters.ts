import type { CoachExerciseListItem } from "@/features/role/coach/exercises/types/coach-exercise-list-item";

export function formatCoachExerciseSource( exercise: CoachExerciseListItem ) {
	if (exercise.sourceType === "global") {
		return "Global";
	}

	return exercise.isOverride ? "Global personalizado" : "Propio";
}

export function formatCoachExerciseSummary( exercise: CoachExerciseListItem ) {
	return [ exercise.category, exercise.equipment, exercise.target ]
		.map( ( part ) => part.trim() )
		.filter( Boolean )
		.join( " · " );
}
