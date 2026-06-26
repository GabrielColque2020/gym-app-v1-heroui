import { useQuery } from "@tanstack/react-query";

import { historyRoutinesStudentsQueryOptions } from "@/features/role/admin/history-routines-students/services/history-routines-students-query";

export function useHistoryRoutinesStudents() {
	return useQuery( historyRoutinesStudentsQueryOptions() );
}
