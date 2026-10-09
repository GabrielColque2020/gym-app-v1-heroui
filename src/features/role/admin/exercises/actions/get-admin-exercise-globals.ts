"use server";

import type { ActionResult } from "@/lib/action-result";
import { runAction } from "@/lib/run-action";
import { requireAdminSession } from "@/features/auth/admin-session";
import prisma from "@/lib/prisma";

import { adminExerciseGlobalSelect } from "@/features/role/admin/exercises/services/admin-exercise-global-select";
import type { AdminExerciseGlobalListItem } from "@/features/role/admin/exercises/types/admin-exercise-global-list-item";

export async function getAdminExerciseGlobalsAction(): Promise<ActionResult<AdminExerciseGlobalListItem[]>> {
	return runAction( "No se pudo obtener el catálogo global de ejercicios.", async () => {
		await requireAdminSession( "consultar ejercicios globales" );

		return await prisma.exerciseGlobal.findMany( {
			orderBy: [
				{ active: "desc" },
				{ name: "asc" },
			],
			select: adminExerciseGlobalSelect,
		} ) as AdminExerciseGlobalListItem[];
	} );
}
