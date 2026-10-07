import { queryOptions } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getRoutineDayAction } from "@/features/routine/actions/get-routine-day";

export const routineDayQueryKey = ( routineDayId: string, studentId?: string | null, templateId?: string | null ) =>
	[ "routine-day", routineDayId, studentId ?? ( templateId ? `template:${ templateId }` : "any-student" ) ] as const;

export function routineDayQueryOptions( routineDayId: string, studentId?: string | null, templateId?: string | null ) {
	return queryOptions( {
		...QUERY_DEFAULTS.coach,
		enabled: Boolean( routineDayId ),
		queryFn: () => getRoutineDayAction( { routineDayId, studentId, templateId } ),
		queryKey: routineDayQueryKey( routineDayId, studentId, templateId ),
	} );
}
