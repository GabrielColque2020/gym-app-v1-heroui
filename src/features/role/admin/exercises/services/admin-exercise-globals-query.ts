import { queryOptions } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getAdminExerciseGlobalsAction } from "@/features/role/admin/exercises/actions/get-admin-exercise-globals";

export const ADMIN_EXERCISE_GLOBALS_QUERY_KEY = [ "admin-exercise-globals" ] as const;

export type AdminExerciseGlobals = Awaited<ReturnType<typeof getAdminExerciseGlobalsAction>>;

export async function fetchAdminExerciseGlobals(): Promise<AdminExerciseGlobals> {
	return getAdminExerciseGlobalsAction();
}

export const adminExerciseGlobalsQueryOptions = () => queryOptions( {
	...QUERY_DEFAULTS.admin,
	queryFn: () => fetchAdminExerciseGlobals(),
	queryKey: ADMIN_EXERCISE_GLOBALS_QUERY_KEY,
} );
