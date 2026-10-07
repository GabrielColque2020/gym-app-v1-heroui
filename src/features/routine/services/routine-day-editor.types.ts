import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import type { RoutineDayExerciseBase } from "@/features/routine/actions/get-routine-day";

export type DraftRoutineDayExercise = {
	clientId: string;
	exercise: RoutineDayExerciseBase["exercise"] | ExerciseListItem;
	exerciseId: string;
	id: string | null;
	observation: string;
	order: number;
	reps: string;
	// Descanso entre series, en segundos. `null` si el entrenador no lo definio.
	restSeconds: number | null;
	sets: string;
};

export type DayExercise = DraftRoutineDayExercise;

export type SaveRoutineDayExerciseInput = {
	exerciseId: string;
	observation: string;
	order: number;
	reps: string;
	restSeconds: number | null;
	sets: string;
};
