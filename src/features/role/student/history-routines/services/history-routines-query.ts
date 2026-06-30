import { queryOptions } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getHistoryRoutinesByStudentAction } from "@/features/role/student/history-routines/actions/get-history-routines-by-student";

export const historyRoutinesQueryKey = ( studentId: string, month: number, year: number ) =>
	[ "student-history-routines", studentId, month, year ] as const;

export type HistoryRoutinesByStudent = Awaited<ReturnType<typeof getHistoryRoutinesByStudentAction>>;

export async function fetchHistoryRoutinesByStudent( studentId: string, month: number, year: number ): Promise<HistoryRoutinesByStudent> {
	return getHistoryRoutinesByStudentAction( { month, studentId, year } );
}

export const historyRoutinesQueryOptions = ( studentId: string, month: number, year: number ) => queryOptions( {
	...QUERY_DEFAULTS.student,
	queryFn: () => fetchHistoryRoutinesByStudent( studentId, month, year ),
	queryKey: historyRoutinesQueryKey( studentId, month, year ),
} );
