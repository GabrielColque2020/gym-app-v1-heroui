import type { ActionData } from "@/lib/action-result";
import { unwrapped } from "@/lib/action-result";
import { queryOptions } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import { getAdminExerciseGlobalsAction } from "@/features/role/admin/exercises/actions/get-admin-exercise-globals";

export const ADMIN_EXERCISE_GLOBALS_QUERY_KEY = [ "admin-exercise-globals" ] as const;

export type AdminExerciseGlobals = ActionData<typeof getAdminExerciseGlobalsAction>;

export async function fetchAdminExerciseGlobals(): Promise<AdminExerciseGlobals> {
	return unwrapped( getAdminExerciseGlobalsAction )();
}

export const adminExerciseGlobalsQueryOptions = () => queryOptions( {
	...QUERY_DEFAULTS.admin,
	queryFn: () => fetchAdminExerciseGlobals(),
	queryKey: ADMIN_EXERCISE_GLOBALS_QUERY_KEY,
} );
