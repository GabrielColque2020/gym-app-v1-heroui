export interface RoutineListStore {
	id: string | null;
	exerciseId: string | null;
	name: string;
	order: number;
	reps: string;
	sets: string;
	observation: string;
}

export interface ExerciseProgressRoutine {
	exerciseId: string | null;
	weightUsed: string;
	setsCompleted: string;
	repsCompleted: string;
	notes: string | null;
}

export interface ExerciseProgressRoutineOld extends ExerciseProgressRoutine {
	dayNumber: number;
	week: number;
	month: number;
	year: number;
}

export interface RoutinePageStudent {
	id: string;
	routineName: string;
	observation: string;
	tips: string;
	week: number;
	year: number;
	month: number;
	dayNumber: number;
	exerciseProgress: ExerciseProgressRoutine | null;
	exerciseProgressOld: ExerciseProgressRoutineOld | null;
}
