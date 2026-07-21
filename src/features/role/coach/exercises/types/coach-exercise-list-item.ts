import type { BodyPartValue } from "@/features/exercises/services/exercise-form";

import type { CoachExerciseSourceType } from "@/features/role/coach/exercises/services/coach-exercise-form";

export type CoachExerciseListItem = {
	active: boolean;
	bodyPart: BodyPartValue;
	category: string;
	coachExerciseId: string | null;
	createdAt: Date;
	equipment: string;
	externalId: string | null;
	globalExerciseId: string | null;
	id: string;
	imageUrl: string | null;
	instructions: string | null;
	isOverride: boolean;
	muscleGroup: string;
	name: string;
	searchName: string;
	sourceType: CoachExerciseSourceType;
	target: string;
	tips: string | null;
	updatedAt: Date;
	videoUrl: string | null;
};
