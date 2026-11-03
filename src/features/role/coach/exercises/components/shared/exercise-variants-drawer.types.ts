import type { CoachExerciseListItem } from "@/features/role/coach/exercises/types/coach-exercise-list-item";
import type { RoutineDayChecklistItem } from "@/features/role/coach/routine/components/shared/routine-day-checklist";

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
	// Cuantos ejercicios activos del catalogo comparten este nombre.
	sameNameCount?: number;
	searchName?: string | null;
	sourceType?: CoachExerciseSourceType;
	target?: string | null;
	tips?: string | null;
	videoUrl?: string | null;
};

export type ExerciseVariantsDrawerProps = {
	exercise: ExerciseVariantsTarget;
	routineId: string | null;
	// Para un ejercicio que todavia no esta guardado en el dia (`routineId` nulo):
	// las variantes elegidas hasta ahora y a quien avisarle cuando cambian.
	pendingVariantExerciseIds?: string[];
	onPendingChangeAction?: ( variantExerciseIds: string[] ) => void;
	// Los otros dias de la rutina con el mismo ejercicio, para dejarles estas
	// mismas variantes. Solo con el ejercicio ya guardado (`routineId`).
	otherDays?: RoutineDayChecklistItem[];
	onApplyToDaysAction?: ( routineDayIds: string[] ) => Promise<boolean>;
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
