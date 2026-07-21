import type { Prisma } from "@/generated/prisma/client";

import { adminExerciseGlobalSelect } from "@/features/role/admin/exercises/services/admin-exercise-global-select";

export type AdminExerciseGlobalListItem = Prisma.ExerciseGlobalGetPayload<{
	select: typeof adminExerciseGlobalSelect;
}>;

