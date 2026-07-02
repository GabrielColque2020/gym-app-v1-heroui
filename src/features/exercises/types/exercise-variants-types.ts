import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";

export type ExerciseVariantListItem = {
	id: string;
	routineId: string;
	variantExerciseId: string;
	variantExercise: ExerciseListItem;
};

export type ExerciseVariantSearchItem = ExerciseListItem;
