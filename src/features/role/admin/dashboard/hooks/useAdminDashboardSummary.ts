"use client";

import { useQuery } from "@tanstack/react-query";

import { adminDashboardSummaryQueryOptions } from "@/features/role/admin/dashboard/services/admin-dashboard-query";

export function useAdminDashboardSummary() {
	return useQuery( adminDashboardSummaryQueryOptions() );
}
