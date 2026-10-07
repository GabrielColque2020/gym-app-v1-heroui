import type { HistoryRoutineCard } from "@/features/history-routines/types/history-routines";

export type HistoryRoutineWeekGroup = {
	week: number;
	days: HistoryRoutineCard[];
};

export type HistoryRoutineMonthSummary = {
	// Series que el estudiante marco como hechas, de las `sets` registradas.
	completedSets: number;
	days: number;
	exercises: number;
	sets: number;
	weeks: number;
};

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
	let completedSets = 0;

	for (const weekGroup of weekGroups) {
		days += weekGroup.days.length;

		for (const day of weekGroup.days) {
			exercises += day.exercises.length;

			for (const exercise of day.exercises) {
				sets += exercise.sets.length;
				completedSets += exercise.sets.filter( ( set ) => set.completed ).length;
			}
		}
	}

	return {
		completedSets,
		days,
		exercises,
		sets,
		weeks: weekGroups.length,
	};
}
