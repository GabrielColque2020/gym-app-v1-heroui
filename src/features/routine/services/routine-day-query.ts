import { queryOptions } from "@tanstack/react-query";

import { getRoutineDayAction } from "@/features/routine/actions/get-routine-day";

export const routineDayQueryKey = ( routineDayId: string, studentId?: string | null ) =>
	[ "routine-day", routineDayId, studentId ?? "any-student" ] as const;

export function routineDayQueryOptions( routineDayId: string, studentId?: string | null ) {
	return queryOptions( {
		enabled: Boolean( routineDayId ),
		queryFn: () => getRoutineDayAction( { routineDayId, studentId } ),
		queryKey: routineDayQueryKey( routineDayId, studentId ),
		refetchOnWindowFocus: true,
		staleTime: 60_000,
	} );
}
