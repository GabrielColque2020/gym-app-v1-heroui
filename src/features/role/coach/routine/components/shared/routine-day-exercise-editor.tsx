"use client";

import type { DraftRoutineDayExercise } from "@/features/routine/services/routine-day-editor";

import { RoutineDayExercisesDesktop } from "@/features/role/coach/routine/components/shared/routine-day-exercises-desktop";
import { RoutineDayExercisesMobile } from "@/features/role/coach/routine/components/shared/routine-day-exercises-mobile";

type RoutineDayExerciseEditorProps = {
	onDelete: ( clientId: string ) => void;
	onUpdateField: ( clientId: string, field: "observation" | "order" | "reps" | "sets", value: number | string ) => void;
	routines: DraftRoutineDayExercise[];
};

export function RoutineDayExercisesDesktopEditor( props: RoutineDayExerciseEditorProps ) {
	return <RoutineDayExercisesDesktop { ...props }/>;
}

export function RoutineDayExercisesMobileEditor( props: RoutineDayExerciseEditorProps ) {
	return <RoutineDayExercisesMobile { ...props }/>;
}

export {
	RoutineDayExercisesDesktop as RoutineDayExercisesDesktop,
	RoutineDayExercisesMobile as RoutineDayExercisesMobile,
};
