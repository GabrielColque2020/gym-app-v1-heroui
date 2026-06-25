import { useQuery } from "@tanstack/react-query";

import { historyRoutinesStudentsQueryOptions } from "@/features/admin/historyRoutinesStudents/services/history-routines-students-query";

export function useHistoryRoutinesStudents() {
	return useQuery( historyRoutinesStudentsQueryOptions() );
}
