"use client";

import type { AdminTrainingRoutine } from "@/features/admin/trainingRoutine/actions/get-training-routines-by-student";

import { useMemo, useState } from "react";

export function useTrainingRoutineSelection( routines: AdminTrainingRoutine[] ) {
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
