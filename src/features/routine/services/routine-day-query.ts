import { queryOptions } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getRoutineDayAction } from "@/features/routine/actions/get-routine-day";

export const routineDayQueryKey = ( routineDayId: string, studentId?: string | null ) =>
	[ "routine-day", routineDayId, studentId ?? "any-student" ] as const;

export function routineDayQueryOptions( routineDayId: string, studentId?: string | null ) {
	return queryOptions( {
		...QUERY_DEFAULTS.admin,
		enabled: Boolean( routineDayId ),
		queryFn: () => getRoutineDayAction( { routineDayId, studentId } ),
		queryKey: routineDayQueryKey( routineDayId, studentId ),
	} );
}
