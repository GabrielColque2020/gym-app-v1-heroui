import type { ActionData } from "@/lib/action-result";
import { unwrapped } from "@/lib/action-result";
import { queryOptions } from "@tanstack/react-query";

import { getCoachDashboardSummaryAction } from "@/features/role/coach/dashboard/actions/get-coach-dashboard-summary";

export const COACH_DASHBOARD_SUMMARY_QUERY_KEY = [ "coach-dashboard-summary" ] as const;

export type CoachDashboardSummary = ActionData<typeof getCoachDashboardSummaryAction>;

export async function fetchCoachDashboardSummary(): Promise<CoachDashboardSummary> {
	return unwrapped( getCoachDashboardSummaryAction )();
}

export const coachDashboardSummaryQueryOptions = () => queryOptions( {
	gcTime: Infinity,
	queryFn: fetchCoachDashboardSummary,
	queryKey: COACH_DASHBOARD_SUMMARY_QUERY_KEY,
	refetchInterval: false,
	// Muestra lo guardado y refresca al entrar: si el coach viene de cargar una
	// rutina, el aviso de "sin rutina" no puede quedar con datos viejos.
	refetchOnMount: "always",
	refetchOnReconnect: false,
	refetchOnWindowFocus: false,
	retry: 2,
	staleTime: 5 * 60 * 1000,
} );
