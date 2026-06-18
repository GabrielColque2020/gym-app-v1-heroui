"use client";

import { useQuery } from "@tanstack/react-query";

import { routineDayQueryOptions } from "@/features/admin/routine/services/routine-day-query";

type UseRoutineDayParams = {
	routineDayId: string | null;
	studentId?: string | null;
};

export function useRoutineDay( { routineDayId, studentId }: UseRoutineDayParams ) {
	return useQuery( routineDayQueryOptions( routineDayId ?? "", studentId ) );
}
