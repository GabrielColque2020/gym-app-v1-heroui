import { queryOptions } from "@tanstack/react-query";

import { TEMP_COACH_ID } from "@/features/admin/shared/tempCoach";
import { getStudentsAction } from "@/features/admin/user/student/actions/get-students";

export const STUDENTS_QUERY_KEY = [ "students", TEMP_COACH_ID ] as const;

export type Students = Awaited<ReturnType<typeof getStudentsAction>>;

export async function fetchStudents(): Promise<Students> {
	return getStudentsAction();
}

export const studentsQueryOptions = () => queryOptions( {
	queryFn: fetchStudents,
	queryKey: STUDENTS_QUERY_KEY,
	refetchOnWindowFocus: true,
	staleTime: 60_000,
} );
