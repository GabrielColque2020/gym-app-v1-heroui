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
	// Variantes elegidas para un ejercicio que todavia no esta guardado en el dia.
	// Las variantes cuelgan de la fila guardada: hasta que exista, esperan aca y
	// viajan con el guardado del dia. En una fila ya guardada no se usan.
	pendingVariantExerciseIds?: string[];
};

export type DayExercise = DraftRoutineDayExercise;

export type SaveRoutineDayExerciseInput = {
	exerciseId: string;
	observation: string;
	order: number;
	reps: string;
	restSeconds: number | null;
	sets: string;
	// Solo se aplican si el guardado crea la fila; en una que ya existe se ignoran.
	variantExerciseIds?: string[];
};
