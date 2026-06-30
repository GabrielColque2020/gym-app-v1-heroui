import type { HistoryRoutineCard } from "@/features/history-routines/types/history-routines";

export type HistoryRoutineWeekGroup = {
	week: number;
	days: HistoryRoutineCard[];
};

export type HistoryRoutineMonthSummary = {
	days: number;
	exercises: number;
	sets: number;
	status: HistoryRoutineCoverageStatus;
	weeks: number;
};

export type HistoryRoutineCoverageStatus = "empty" | "partial" | "complete";

export type HistoryRoutineDayStatus = "empty" | "partial" | "complete";
export type HistoryRoutineWeekStatus = "empty" | "partial" | "complete";

export function groupHistoryRoutinesByWeek( historyRoutines: HistoryRoutineCard[] ) {
	const groupedWeeks = new Map<number, HistoryRoutineCard[]>();

	for (const historyRoutine of historyRoutines) {
		const currentDays = groupedWeeks.get( historyRoutine.week ) ?? [];
		currentDays.push( historyRoutine );
		groupedWeeks.set( historyRoutine.week, currentDays );
	}

	return Array.from( groupedWeeks.entries() )
		.map<HistoryRoutineWeekGroup>( ( [ week, days ] ) => ( {
			week,
			days: [ ...days ].sort( ( left, right ) => left.dayNumber - right.dayNumber ),
		} ) )
		.sort( ( left, right ) => left.week - right.week );
}

export function buildHistoryRoutineMonthSummary( weekGroups: HistoryRoutineWeekGroup[] ): HistoryRoutineMonthSummary {
	let days = 0;
	let exercises = 0;
	let sets = 0;

	for (const weekGroup of weekGroups) {
		days += weekGroup.days.length;

		for (const day of weekGroup.days) {
			exercises += day.exercises.length;

			for (const exercise of day.exercises) {
				sets += exercise.sets.length;
			}
		}
	}

	return {
		days,
		exercises,
		sets,
		status: getHistoryRoutineMonthStatus( weekGroups ),
		weeks: weekGroups.length,
	};
}

export function getHistoryRoutineWeekStatus( weekGroup: HistoryRoutineWeekGroup ): HistoryRoutineWeekStatus {
	if (weekGroup.days.length === 0) return "empty";

	const hasExercises = weekGroup.days.every( ( day ) => day.exercises.length > 0 );
	const hasEveryDay = weekGroup.days.length >= 6;

	if (hasEveryDay && hasExercises) return "complete";

	return "partial";
}

export function getHistoryRoutineDayStatus( day: HistoryRoutineCard ): HistoryRoutineDayStatus {
	if (day.exercises.length === 0) return "empty";

	const hasSets = day.exercises.every( ( exercise ) => exercise.sets.length > 0 );

	return hasSets ? "complete" : "partial";
}

export function getHistoryRoutineMonthStatus( weekGroups: HistoryRoutineWeekGroup[] ): HistoryRoutineCoverageStatus {
	if (weekGroups.length === 0) return "empty";

	return weekGroups.every( ( weekGroup ) => getHistoryRoutineWeekStatus( weekGroup ) === "complete" )
		? "complete"
		: "partial";
}
