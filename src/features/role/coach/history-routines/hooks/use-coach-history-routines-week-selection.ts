"use client";

import { useMemo, useState } from "react";

import type { HistoryRoutineWeekGroup } from "@/features/history-routines/services/history-routines-view";

export function useCoachHistoryRoutinesWeekSelection( weekGroups: HistoryRoutineWeekGroup[] ) {
	const [ selectedWeeks, setSelectedWeeks ] = useState<number[] | null>( null );
	const resolvedSelectedWeeks = useMemo( () => {
		if (weekGroups.length === 0) {
			return [];
		}

		if (selectedWeeks === null) {
			return [ weekGroups[ 0 ].week ];
		}

		return selectedWeeks.filter( ( week ) =>
			weekGroups.some( ( weekGroup ) => weekGroup.week === week ),
		);
	}, [ selectedWeeks, weekGroups ] );

	function handleWeekToggle( week: number ) {
		setSelectedWeeks( ( currentSelectedWeeks ) => {
			const current = currentSelectedWeeks ?? (weekGroups.length > 0 ? [ weekGroups[ 0 ].week ] : []);

			return current.includes( week )
				? current.filter( ( currentWeek ) => currentWeek !== week )
				: [ ...current, week ].sort( ( left, right ) => left - right );
		} );
	}

	return {
		handleWeekToggle,
		selectedWeeks: resolvedSelectedWeeks,
	};
}
