import { queryOptions } from "@tanstack/react-query";

import { getStudentDashboardSummaryAction } from "@/features/role/student/dashboard/actions/get-student-dashboard-summary";

export const STUDENT_DASHBOARD_SUMMARY_QUERY_KEY = [ "student-dashboard-summary" ] as const;

export type StudentDashboardSummary = Awaited<ReturnType<typeof getStudentDashboardSummaryAction>>;

export async function fetchStudentDashboardSummary(): Promise<StudentDashboardSummary> {
	return getStudentDashboardSummaryAction();
}

export const studentDashboardSummaryQueryOptions = () => queryOptions( {
	gcTime: Infinity,
	queryFn: fetchStudentDashboardSummary,
	queryKey: STUDENT_DASHBOARD_SUMMARY_QUERY_KEY,
	refetchInterval: false,
	refetchOnMount: false,
	refetchOnReconnect: false,
	refetchOnWindowFocus: false,
	retry: 2,
	staleTime: 5 * 60 * 1000,
} );
