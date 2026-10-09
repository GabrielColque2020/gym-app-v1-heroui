import type { ActionData } from "@/lib/action-result";
import { unwrapped } from "@/lib/action-result";
import { queryOptions } from "@tanstack/react-query";

import { getStudentDashboardSummaryAction } from "@/features/role/student/dashboard/actions/get-student-dashboard-summary";

export const STUDENT_DASHBOARD_SUMMARY_QUERY_KEY = [ "student-dashboard-summary" ] as const;

export type StudentDashboardSummary = ActionData<typeof getStudentDashboardSummaryAction>;

export async function fetchStudentDashboardSummary(): Promise<StudentDashboardSummary> {
	return unwrapped( getStudentDashboardSummaryAction )();
}

export const studentDashboardSummaryQueryOptions = () => queryOptions( {
	gcTime: Infinity,
	queryFn: fetchStudentDashboardSummary,
	queryKey: STUDENT_DASHBOARD_SUMMARY_QUERY_KEY,
	refetchInterval: false,
	// El inicio dice que dia sigue y si esta en curso: se pide al abrirlo, para
	// que no muestre "pendiente" un dia que el estudiante ya empezo.
	refetchOnMount: "always",
	refetchOnReconnect: false,
	refetchOnWindowFocus: false,
	retry: 2,
	staleTime: 5 * 60 * 1000,
} );
