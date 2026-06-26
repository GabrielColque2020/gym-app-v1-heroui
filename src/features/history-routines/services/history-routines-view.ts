import type { HistoryRoutineCard } from "@/features/history-routines/types/history-routines";

export type HistoryRoutineWeekGroup = {
	week: number;
	days: HistoryRoutineCard[];
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
