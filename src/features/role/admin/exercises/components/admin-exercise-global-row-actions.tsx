"use client";

import { AdminExerciseGlobalDrawer } from "@/features/role/admin/exercises/components/shared/admin-exercise-global-drawer";
import type { AdminExerciseGlobalListItem } from "@/features/role/admin/exercises/types/admin-exercise-global-list-item";

type AdminExerciseGlobalRowActionsProps = {
	exercise: AdminExerciseGlobalListItem;
};

export function AdminExerciseGlobalRowActions( {
	exercise,
}: AdminExerciseGlobalRowActionsProps ) {
	return <AdminExerciseGlobalDrawer exercise={ exercise }/>;
}
