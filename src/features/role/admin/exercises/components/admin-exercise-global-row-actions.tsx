"use client";

import { AdminExerciseGlobalActionMenu } from "@/features/role/admin/exercises/components/admin-exercise-global-action-menu";
import type { AdminExerciseGlobalListItem } from "@/features/role/admin/exercises/types/admin-exercise-global-list-item";

type AdminExerciseGlobalRowActionsProps = {
	exercise: AdminExerciseGlobalListItem;
};

export function AdminExerciseGlobalRowActions( {
	exercise,
}: AdminExerciseGlobalRowActionsProps ) {
	return <AdminExerciseGlobalActionMenu exercise={ exercise }/>;
}
