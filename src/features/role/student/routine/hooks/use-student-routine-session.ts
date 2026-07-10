"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getStudentRoutineSessionAction } from "@/features/role/student/routine/actions/get-routine-session";

type UseStudentRoutineSessionParams = {
	routineDayId: string | null;
	studentId: string | null;
};

export const studentRoutineSessionQueryKey = (
	routineDayId: string,
	studentId: string | null,
) =>
	[
		"student-routine-session",
		routineDayId,
		studentId ?? "missing-student",
	] as const;

export function useStudentRoutineSession( {
	routineDayId,
	studentId,
}: UseStudentRoutineSessionParams ) {
	return useQuery( {
		...QUERY_DEFAULTS.student,
		enabled: Boolean( routineDayId && studentId ),
		queryFn: () =>
			getStudentRoutineSessionAction( {
				routineDayId: routineDayId ?? "",
				studentId,
			} ),
		queryKey: studentRoutineSessionQueryKey( routineDayId ?? "", studentId ),
	} );
}

