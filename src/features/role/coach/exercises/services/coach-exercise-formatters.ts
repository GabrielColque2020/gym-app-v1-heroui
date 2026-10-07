import type { CoachExerciseListItem } from "@/features/role/coach/exercises/types/coach-exercise-list-item";

// De donde sale el ejercicio, dicho para el entrenador: del catalogo general
// que ven todos, del catalogo pero con cambios suyos, o creado por el.
export function formatCoachExerciseSource( exercise: CoachExerciseListItem ) {
	if (exercise.sourceType === "global") {
		return "Catálogo";
	}

	return exercise.isOverride ? "Catálogo, editado" : "Propio";
}

export function formatCoachExerciseSummary( exercise: CoachExerciseListItem ) {
	return [ exercise.category, exercise.equipment, exercise.target ]
		.map( ( part ) => part.trim() )
		.filter( Boolean )
		.join( " · " );
}
