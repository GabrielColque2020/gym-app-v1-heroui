"use client";

import { unwrapped } from "@/lib/action-result";
import { useQuery } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getTrainingRoutinesByStudentAction } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";

type UseTrainingRoutinesParams = {
	// La pantalla del mes pide lo ultimo al abrirse, para mostrar lo que el
	// estudiante fue cargando. El editor del dia usa lo que ya hay.
	alwaysFresh?: boolean;
	month: number;
	studentId: string | null;
	year: number;
};

const trainingRoutinesQueryKey = ( studentId: string, month: number, year: number ) =>
	[ "coach-training-routines", studentId, month, year ] as const;

export function useTrainingRoutines( { alwaysFresh = false, month, studentId, year }: UseTrainingRoutinesParams ) {
	return useQuery( {
		...QUERY_DEFAULTS.coach,
		refetchOnMount: alwaysFresh ? "always" : QUERY_DEFAULTS.coach.refetchOnMount,
		enabled: Boolean( studentId ),
		queryFn: () => unwrapped( getTrainingRoutinesByStudentAction )( {
			month,
			studentId: studentId ?? "",
			year,
		} ),
		queryKey: trainingRoutinesQueryKey( studentId ?? "missing-student", month, year ),
	} );
}
