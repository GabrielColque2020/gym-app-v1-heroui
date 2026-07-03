import type { RoutineDayDetail } from "@/features/routine/services/routine-day-detail";
import type {
	Exercise,
	ExerciseSessionHistory,
	ExerciseSessionHistorySet,
	ExerciseSet,
	ExerciseVariantOption,
	WorkoutSession,
} from "@/features/routine/types/routine-types";

export type StudentRoutineProgressEntry = {
	date: Date | string;
	exerciseId: string;
	id: string;
	notes: string | null;
	dayNumber: number;
	month: number;
	repsNumber: number | null;
	variantExerciseId: string | null;
	week: number;
	year: number;
	repsCompleted: string;
	setsCompleted: string;
	weightUsed: string;
};

export type StudentRoutineSet = ExerciseSet & {};

export type StudentRoutineExercise = Exercise & {};

export type StudentRoutineVariantOption = ExerciseVariantOption & {};

export type StudentRoutineSessionHistorySet = ExerciseSessionHistorySet;
export type StudentRoutineSessionHistory = ExerciseSessionHistory;

export type StudentRoutineSession = WorkoutSession;

export type StudentRoutineSessionDetail = RoutineDayDetail & {
	progressEntries: StudentRoutineProgressEntry[];
};

export type StudentRoutineSessionSaveSet = {
	completed: boolean;
	currentReps: number | null;
	currentWeight: number | null;
	notes: string | null;
	setNumber: number;
};

export type StudentRoutineSessionSaveExercise = {
	exerciseId: string;
	variantExerciseId: string | null;
	sets: StudentRoutineSessionSaveSet[];
};

export type StudentRoutineSessionSaveInput = {
	exercises: StudentRoutineSessionSaveExercise[];
	routineDayId: string;
};
