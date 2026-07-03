"use client";

import { BODY_PART_OPTIONS } from "@/features/exercises/services/exercise-form";
import type { DraftRoutineDayExercise } from "@/features/routine/services/routine-day-editor";

export function formatBodyPartValue( bodyPart: string | null | undefined ) {
	if (!bodyPart) return "Sin grupo";

	return BODY_PART_OPTIONS.find( ( option ) => option.value === bodyPart )?.label ?? bodyPart;
}

export function getExerciseName( routine: DraftRoutineDayExercise ) {
	return routine.exercise?.name ?? "Ejercicio sin nombre";
}
