import { queryOptions } from "@tanstack/react-query";

import { getHistoryRoutinesByStudentAction } from "@/features/admin/historyRoutines/actions/get-history-routines-by-student";

export const historyRoutinesQueryKey = ( studentId: string, month: number, year: number ) =>
	[ "admin-history-routines", studentId, month, year ] as const;

export type HistoryRoutinesByStudent = Awaited<ReturnType<typeof getHistoryRoutinesByStudentAction>>;

export async function fetchHistoryRoutinesByStudent( studentId: string, month: number, year: number ): Promise<HistoryRoutinesByStudent> {
	return getHistoryRoutinesByStudentAction( { month, studentId, year } );
}

export const historyRoutinesQueryOptions = ( studentId: string, month: number, year: number ) => queryOptions( {
	queryFn: () => fetchHistoryRoutinesByStudent( studentId, month, year ),
	queryKey: historyRoutinesQueryKey( studentId, month, year ),
	refetchOnWindowFocus: true,
	staleTime: 60_000,
} );
