import type { RoutineDayDetailBase, RoutineDayExerciseBase } from "@/features/routine/actions/get-routine-day";

export {
	getRoutineDayAction,
	type RoutineDayDetailBase,
	type RoutineDayExerciseBase,
} from "@/features/routine/actions/get-routine-day";

export type CoachRoutineDayDetail = RoutineDayDetailBase;
export type CoachRoutineDayExercise = RoutineDayExerciseBase;
