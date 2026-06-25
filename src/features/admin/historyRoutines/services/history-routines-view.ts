import type { AdminHistoryRoutine } from "@/features/admin/historyRoutines/actions/get-history-routines-by-student";

export type HistoryRoutineWeekGroup = {
	week: number;
	days: AdminHistoryRoutine[];
};

export function groupHistoryRoutinesByWeek( historyRoutines: AdminHistoryRoutine[] ) {
	const groupedWeeks = new Map<number, AdminHistoryRoutine[]>();

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
