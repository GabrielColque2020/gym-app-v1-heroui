"use client";

import { useQuery } from "@tanstack/react-query";

import { coachDashboardSummaryQueryOptions } from "@/features/role/coach/dashboard/services/coach-dashboard-query";

export function useCoachDashboardSummary() {
	return useQuery( coachDashboardSummaryQueryOptions() );
}
