import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";

export type ExerciseVariantsTarget = {
	active: boolean;
	bodyPart: ExerciseListItem["bodyPart"];
	id: string;
	name: string;
};

export type ExerciseVariantsSheetProps = {
	exercise: ExerciseVariantsTarget;
	routineId: string | null;
	hideTrigger?: boolean;
	isOpen?: boolean;
	onOpenChange?: ( isOpen: boolean ) => void;
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
