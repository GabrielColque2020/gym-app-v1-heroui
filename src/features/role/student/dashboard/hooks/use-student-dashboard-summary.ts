"use client";

import { useQuery } from "@tanstack/react-query";

import { studentDashboardSummaryQueryOptions } from "@/features/role/student/dashboard/services/student-dashboard-query";

export function useStudentDashboardSummary() {
	return useQuery( studentDashboardSummaryQueryOptions() );
}
