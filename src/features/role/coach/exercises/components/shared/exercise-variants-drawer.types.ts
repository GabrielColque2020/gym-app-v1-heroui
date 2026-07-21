import type { CoachExerciseListItem } from "@/features/role/coach/exercises/types/coach-exercise-list-item";

export type CoachExerciseSourceType = "coach" | "global";

export type ExerciseVariantsTarget = {
	active: boolean;
	bodyPart: CoachExerciseListItem["bodyPart"];
	id: string;
	name: string;
	category?: string | null;
	coachExerciseId?: string | null;
	equipment?: string | null;
	externalId?: string | null;
	globalExerciseId?: string | null;
	imageUrl?: string | null;
	instructions?: string | null;
	isOverride?: boolean;
	muscleGroup?: string | null;
	searchName?: string | null;
	sourceType?: CoachExerciseSourceType;
	target?: string | null;
	tips?: string | null;
	videoUrl?: string | null;
};

export type ExerciseVariantsDrawerProps = {
	exercise: ExerciseVariantsTarget;
	routineId: string | null;
	hideTrigger?: boolean;
	isOpen?: boolean;
	onOpenChangeAction?: ( isOpen: boolean ) => void;
	placement?: "bottom" | "right";
	triggerClassName?: string;
	triggerVariant?: "button" | "icon";
};

export type DraftVariantItem = {
	exercise: ExerciseVariantsTarget;
	relationId: string | null;
};

export const SEARCH_DEBOUNCE_MS = 300;
export const EMPTY_ARRAY: never[] = [];
