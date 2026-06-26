"use client";

import { useMemo, useState } from "react";

type TrainingRoutineLike = {
	id: string;
	name?: string | null;
	week: number;
	routineDays: readonly unknown[];
};

export function useTrainingRoutineSelection<T extends TrainingRoutineLike>( routines: T[] ) {
	const [ requestedRoutineId, setSelectedRoutineId ] = useState( "" );
	const selectedRoutineId = routines.some( ( routine ) => routine.id === requestedRoutineId )
		? requestedRoutineId
		: routines[ 0 ]?.id ?? "";

	const selectedRoutine = useMemo(
		() => routines.find( ( routine ) => routine.id === selectedRoutineId ) ?? routines[ 0 ] ?? null,
		[ routines, selectedRoutineId ],
	);

	return {
		selectedRoutine,
		selectedRoutineId,
		setSelectedRoutineId,
	};
}
