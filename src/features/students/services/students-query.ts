import { queryOptions } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getStudentsAction } from "@/features/students/actions/get-students";

export const STUDENTS_QUERY_KEY = [ "students" ] as const;

export type Students = Awaited<ReturnType<typeof getStudentsAction>>;

export async function fetchStudents(): Promise<Students> {
	return getStudentsAction();
}

export const studentsQueryOptions = () => queryOptions( {
	...QUERY_DEFAULTS.admin,
	queryFn: fetchStudents,
	queryKey: STUDENTS_QUERY_KEY,
} );
