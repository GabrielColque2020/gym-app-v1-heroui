"use server";

import { requireAdminSession } from "@/features/auth/admin-session";
import prisma from "@/lib/prisma";

import { adminExerciseGlobalSelect } from "@/features/role/admin/exercises/services/admin-exercise-global-select";
import type { AdminExerciseGlobalListItem } from "@/features/role/admin/exercises/types/admin-exercise-global-list-item";

export async function getAdminExerciseGlobalsAction(): Promise<AdminExerciseGlobalListItem[]> {
	try {
		await requireAdminSession( "consultar ejercicios globales" );

		return await prisma.exerciseGlobal.findMany( {
			orderBy: [
				{ active: "desc" },
				{ name: "asc" },
			],
			select: adminExerciseGlobalSelect,
		} ) as AdminExerciseGlobalListItem[];
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudo obtener el catalogo global de ejercicios. ${ message }` );
	}
}
