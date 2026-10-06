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
		// Cada vez que se abre el dia se pide lo ultimo: si el entrenador cambio la
		// rutina, el estudiante no entrena con la version vieja. Mientras llega se
		// muestra lo que ya estaba guardado en el telefono.
		refetchOnMount: "always",
		queryFn: () =>
			getStudentRoutineSessionAction( {
				routineDayId: routineDayId ?? "",
				studentId,
			} ),
		queryKey: studentRoutineSessionQueryKey( routineDayId ?? "", studentId ),
	} );
}

