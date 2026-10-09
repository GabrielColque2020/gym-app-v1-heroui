import type { ActionData } from "@/lib/action-result";
import { unwrapped } from "@/lib/action-result";
import { queryOptions } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getStudentsAction } from "@/features/students/actions/get-students";

export const STUDENTS_QUERY_KEY = [ "students" ] as const;

export type Students = ActionData<typeof getStudentsAction>;

export async function fetchStudents(): Promise<Students> {
	return unwrapped( getStudentsAction )();
}

export const studentsQueryOptions = () => queryOptions( {
	...QUERY_DEFAULTS.coach,
	queryFn: fetchStudents,
	queryKey: STUDENTS_QUERY_KEY,
} );
