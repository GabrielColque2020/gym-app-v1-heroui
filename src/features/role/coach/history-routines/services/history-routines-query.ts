import type { ActionData } from "@/lib/action-result";
import { unwrapped } from "@/lib/action-result";
import { queryOptions } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getHistoryRoutinesByStudentAction } from "@/features/role/coach/history-routines/actions/get-history-routines-by-student";

export const historyRoutinesQueryKey = ( studentId: string, month: number, year: number ) =>
	[ "coach-history-routines", studentId, month, year ] as const;

export type HistoryRoutinesByStudent = ActionData<typeof getHistoryRoutinesByStudentAction>;

export async function fetchHistoryRoutinesByStudent( studentId: string, month: number, year: number ): Promise<HistoryRoutinesByStudent> {
	return unwrapped( getHistoryRoutinesByStudentAction )( { month, studentId, year } );
}

export const historyRoutinesQueryOptions = ( studentId: string, month: number, year: number ) => queryOptions( {
	...QUERY_DEFAULTS.coach,
	queryFn: () => fetchHistoryRoutinesByStudent( studentId, month, year ),
	queryKey: historyRoutinesQueryKey( studentId, month, year ),
} );
