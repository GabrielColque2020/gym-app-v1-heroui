export interface ExerciseSet {
	id: string;
	setNumber: number;
	previousWeight: number | null;
	previousReps: number | null;
	targetReps: number;
	currentWeight: number | null;
	currentReps: number | null;
	notes: string | null;
	completed: boolean;
}

export interface ExerciseSessionHistorySet {
	completed: boolean;
	notes: string | null;
	repsCompleted: number | null;
	setNumber: number;
	weightUsed: number | null;
}

export interface ExerciseSessionHistory {
	completed: boolean;
	date: Date;
	dayNumber: number;
	month: number;
	sets: ExerciseSessionHistorySet[];
	week: number;
	year: number;
}

export interface Exercise {
	id: string;
	name: string;
	baseName: string;
	equipment: string;
	muscleGroup: string;
	variantExerciseId: string | null;
	restTime: number;
	sets: ExerciseSet[];
	notes?: string;
	lastSession: ExerciseSessionHistory | null;
	variantOptions: ExerciseVariantOption[];
}

export interface ExerciseVariantOption {
	active: boolean;
	bodyPart: string;
	id: string;
	lastSession: ExerciseSessionHistory | null;
	name: string;
}

export interface WorkoutSession {
	id: string;
	dayNumber: number;
	date: Date;
	title: string;
	exercises: Exercise[];
	completed: boolean;
}

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
