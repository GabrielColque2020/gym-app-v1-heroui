import { queryOptions } from "@tanstack/react-query";

import { getCoachDashboardSummaryAction } from "@/features/role/coach/dashboard/actions/get-coach-dashboard-summary";

export const COACH_DASHBOARD_SUMMARY_QUERY_KEY = [ "coach-dashboard-summary" ] as const;

export type CoachDashboardSummary = Awaited<ReturnType<typeof getCoachDashboardSummaryAction>>;

export async function fetchCoachDashboardSummary(): Promise<CoachDashboardSummary> {
	return getCoachDashboardSummaryAction();
}

export const coachDashboardSummaryQueryOptions = () => queryOptions( {
	gcTime: Infinity,
	queryFn: fetchCoachDashboardSummary,
	queryKey: COACH_DASHBOARD_SUMMARY_QUERY_KEY,
	refetchInterval: false,
	refetchOnMount: false,
	refetchOnReconnect: false,
	refetchOnWindowFocus: false,
	retry: 2,
	staleTime: 5 * 60 * 1000,
} );
