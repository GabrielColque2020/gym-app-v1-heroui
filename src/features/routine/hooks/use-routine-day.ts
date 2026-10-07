"use client";

import { useQuery } from "@tanstack/react-query";

import { routineDayQueryOptions } from "@/features/routine/services/routine-day-query";

type UseRoutineDayParams = {
	routineDayId: string | null;
	studentId?: string | null;
	templateId?: string | null;
};

export function useRoutineDay( { routineDayId, studentId, templateId }: UseRoutineDayParams ) {
	return useQuery( routineDayQueryOptions( routineDayId ?? "", studentId, templateId ) );
}
