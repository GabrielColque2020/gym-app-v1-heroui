import { useQuery } from "@tanstack/react-query";

import { historyRoutinesReportsQueryOptions } from "@/features/role/coach/history-routines/services/history-routines-reports-query";

export function useHistoryRoutinesReports( studentId: string | null ) {
	return useQuery( {
		...historyRoutinesReportsQueryOptions( studentId ?? "missing-student" ),
		enabled: Boolean( studentId ),
	} );
}
