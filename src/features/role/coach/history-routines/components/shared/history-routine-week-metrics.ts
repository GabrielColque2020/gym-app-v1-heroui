"use client";

import type { HistoryRoutineWeekGroup } from "@/features/history-routines/services/history-routines-view";

export function getWeekExerciseCount( weekGroup: HistoryRoutineWeekGroup ) {
	return weekGroup.days.reduce( ( total, day ) => total + day.exercises.length, 0 );
}
