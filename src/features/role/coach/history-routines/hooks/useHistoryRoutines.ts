import { useQuery } from "@tanstack/react-query";

import { historyRoutinesQueryOptions } from "@/features/role/coach/history-routines/services/history-routines-query";

export type UseHistoryRoutinesParams = {
	month: number;
	studentId: string | null;
	year: number;
};

export function useHistoryRoutines( { month, studentId, year }: UseHistoryRoutinesParams ) {
	return useQuery( {
		...historyRoutinesQueryOptions( studentId ?? "missing-student", month, year ),
		enabled: Boolean( studentId ),
	} );
}
