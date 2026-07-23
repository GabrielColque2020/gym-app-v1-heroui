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
	imageUrl?: string | null;
	instructions?: string | null;
	muscleGroup: string;
	originalVariantExerciseId: string | null;
	variantExerciseId: string | null;
	variantSelectionExplicit: boolean;
	restTime: number;
	sets: ExerciseSet[];
	notes?: string;
	lastSession: ExerciseSessionHistory | null;
	videoUrl?: string | null;
	variantOptions: ExerciseVariantOption[];
}

export interface ExerciseVariantOption {
	active: boolean;
	bodyPart: string;
	id: string;
	lastSession: ExerciseSessionHistory | null;
	imageUrl?: string | null;
	instructions?: string | null;
	name: string;
	videoUrl?: string | null;
}

export interface WorkoutSession {
	id: string;
	dayNumber: number;
	date: Date;
	title: string;
	exercises: Exercise[];
	completed: boolean;
}
