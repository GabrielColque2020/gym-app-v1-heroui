import type { ActionData } from "@/lib/action-result";
import { unwrapped } from "@/lib/action-result";
import { queryOptions } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getHistoryRoutinesReportsByStudentAction } from "@/features/role/coach/history-routines/actions/get-history-routines-reports-by-student";

export const historyRoutinesReportsQueryKey = ( studentId: string ) =>
	[ "coach-history-routines-reports", studentId ] as const;

export type HistoryRoutinesReportsByStudent = ActionData<typeof getHistoryRoutinesReportsByStudentAction>;

export async function fetchHistoryRoutinesReportsByStudent( studentId: string ): Promise<HistoryRoutinesReportsByStudent> {
	return unwrapped( getHistoryRoutinesReportsByStudentAction )( { studentId } );
}

export const historyRoutinesReportsQueryOptions = ( studentId: string ) => queryOptions( {
	...QUERY_DEFAULTS.coach,
	// Se pide al abrir: el historial cambia cada vez que el estudiante entrena.
	refetchOnMount: "always",
	queryFn: () => fetchHistoryRoutinesReportsByStudent( studentId ),
	queryKey: historyRoutinesReportsQueryKey( studentId ),
} );
