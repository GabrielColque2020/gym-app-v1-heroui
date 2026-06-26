import { queryOptions } from "@tanstack/react-query";

import { getHistoryRoutinesStudentsAction } from "@/features/role/admin/history-routines-students/actions/get-history-routines-students";

export const HISTORY_ROUTINES_STUDENTS_QUERY_KEY = [ "history-routines-students" ] as const;

export type HistoryRoutinesStudents = Awaited<ReturnType<typeof getHistoryRoutinesStudentsAction>>;

export async function fetchHistoryRoutinesStudents(): Promise<HistoryRoutinesStudents> {
	return getHistoryRoutinesStudentsAction();
}

export const historyRoutinesStudentsQueryOptions = () => queryOptions( {
	queryFn: fetchHistoryRoutinesStudents,
	queryKey: HISTORY_ROUTINES_STUDENTS_QUERY_KEY,
	refetchOnWindowFocus: true,
	staleTime: 60_000,
} );
