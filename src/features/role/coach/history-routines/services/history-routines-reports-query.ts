import { queryOptions } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getHistoryRoutinesReportsByStudentAction } from "@/features/role/coach/history-routines/actions/get-history-routines-reports-by-student";

export const historyRoutinesReportsQueryKey = ( studentId: string ) =>
	[ "coach-history-routines-reports", studentId ] as const;

export type HistoryRoutinesReportsByStudent = Awaited<ReturnType<typeof getHistoryRoutinesReportsByStudentAction>>;

export async function fetchHistoryRoutinesReportsByStudent( studentId: string ): Promise<HistoryRoutinesReportsByStudent> {
	return getHistoryRoutinesReportsByStudentAction( { studentId } );
}

export const historyRoutinesReportsQueryOptions = ( studentId: string ) => queryOptions( {
	...QUERY_DEFAULTS.coach,
	queryFn: () => fetchHistoryRoutinesReportsByStudent( studentId ),
	queryKey: historyRoutinesReportsQueryKey( studentId ),
} );
