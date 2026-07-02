import { queryOptions } from "@tanstack/react-query";

import { getAdminDashboardSummaryAction } from "@/features/role/admin/dashboard/actions/get-admin-dashboard-summary";

export const ADMIN_DASHBOARD_SUMMARY_QUERY_KEY = [ "admin-dashboard-summary" ] as const;

export type AdminDashboardSummary = Awaited<ReturnType<typeof getAdminDashboardSummaryAction>>;

export async function fetchAdminDashboardSummary(): Promise<AdminDashboardSummary> {
	return getAdminDashboardSummaryAction();
}

export const adminDashboardSummaryQueryOptions = () => queryOptions( {
	gcTime: Infinity,
	queryFn: fetchAdminDashboardSummary,
	queryKey: ADMIN_DASHBOARD_SUMMARY_QUERY_KEY,
	refetchInterval: false,
	refetchOnMount: false,
	refetchOnReconnect: false,
	refetchOnWindowFocus: false,
	retry: 2,
	staleTime: 5 * 60 * 1000,
} );
