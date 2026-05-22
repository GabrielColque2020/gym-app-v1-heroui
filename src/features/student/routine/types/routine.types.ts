export interface ExerciseSet {
	id: string;
	setNumber: number;
	previousWeight: number;    // Peso usado la sesión anterior
	previousReps: number;       // Repeticiones logradas la sesión anterior
	targetReps: number;         // Repeticiones objetivo para hoy
	currentWeight: number | null; // Peso usado HOY (null si aún no se registra)
	currentReps: number | null;   // Reps logradas HOY (null si aún no se registra)
	completed: boolean;         // Si ya completó este set
}

export interface Exercise {
	id: string;
	name: string;
	equipment: string;          // "Barra Olímpica", "Mancuernas", etc.
	muscleGroup: string;        // "Pecho", "Tríceps", etc.
	restTime: number;           // En segundos
	sets: ExerciseSet[];
	notes?: string;
}

export interface WorkoutSession {
	id: string;
	dayNumber: number;          // Dia 1, 2, 3, etc.
	date: Date;
	title: string;              // "Pecho y Tríceps"
	exercises: Exercise[];
	completed: boolean;
}