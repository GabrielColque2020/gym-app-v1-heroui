export type HistoryRoutineSet = {
	completed: boolean;
	id: string;
	notes: string | null;
	repsCompleted: number | null;
	setNumber: number;
	weightUsed: number | null;
};

export type HistoryProgressEntry = {
	date: Date;
	dayNumber: number;
	exerciseId: string | null;
	id: string;
	month: number;
	notes: string | null;
	repsCompleted: string;
	repsNumber: number | null;
	setsCompleted: string;
	studentId: string | null;
	variantExerciseId: string | null;
	week: number;
	weightUsed: string;
	year: number;
};

export type HistoryRoutineExercise = {
	baseName: string;
	exerciseId: string;
	id: string;
	name: string;
	repsCompleted: number;
	sets: HistoryRoutineSet[];
	setsCompleted: number;
	variantName: string | null;
	weightUsed: number | null;
};

export type HistoryRoutineCard = {
	date: string;
	dayNumber: number;
	description: string;
	exercises: HistoryRoutineExercise[];
	id: string;
	title: string;
	week: number;
};
