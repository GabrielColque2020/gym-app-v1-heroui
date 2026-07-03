"use client";

import { useEffect, useRef, useState } from "react";

import type { HistoryRoutineWeekGroup } from "@/features/history-routines/services/history-routines-view";

export function useCoachHistoryRoutinesWeekSelection( weekGroups: HistoryRoutineWeekGroup[] ) {
	const [ selectedWeeks, setSelectedWeeks ] = useState<number[]>( [] );
	const didInitializeWeeks = useRef( false );

	useEffect( () => {
		if (weekGroups.length === 0) {
			didInitializeWeeks.current = false;
			setSelectedWeeks( [] );

			return;
		}

		if (!didInitializeWeeks.current) {
			didInitializeWeeks.current = true;
			setSelectedWeeks( [ weekGroups[ 0 ].week ] );

			return;
		}

		setSelectedWeeks( ( currentSelectedWeeks ) =>
			currentSelectedWeeks.filter( ( week ) =>
				weekGroups.some( ( weekGroup ) => weekGroup.week === week ),
			),
		);
	}, [ weekGroups ] );

	function handleWeekToggle( week: number ) {
		setSelectedWeeks( ( currentSelectedWeeks ) => (
			currentSelectedWeeks.includes( week )
				? currentSelectedWeeks.filter( ( currentWeek ) => currentWeek !== week )
				: [ ...currentSelectedWeeks, week ].sort( ( left, right ) => left - right )
		) );
	}

	return {
		handleWeekToggle,
		selectedWeeks,
	};
}
