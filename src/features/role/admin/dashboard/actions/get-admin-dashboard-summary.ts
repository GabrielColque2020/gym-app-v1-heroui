"use server";

import type { ActionResult } from "@/lib/action-result";
import { runAction } from "@/lib/run-action";
import { QUERY_ACCELERATE_CACHE } from "@/constants/query";
import { requireAdminSession } from "@/features/auth/admin-session";
import prisma from "@/lib/prisma";

export type AdminDashboardSummary = {
	totals: {
		activeCoaches: number;
		activeStudents: number;
		inactiveUsers: number;
		// Estudiantes activos sin entrenador, o con un entrenador desactivado.
		studentsWithoutCoach: number;
		totalUsers: number;
	};
};

export async function getAdminDashboardSummaryAction(): Promise<ActionResult<AdminDashboardSummary>> {
	return runAction( "No se pudo obtener el resumen.", async () => {
		await requireAdminSession( "consultar el resumen" );

		const [ totalUsers, activeCoaches, activeStudents, inactiveUsers, studentsWithoutCoach ] = await Promise.all( [
			prisma.user.count( {
				cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
			} ),
			prisma.user.count( {
				cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
				where: {
					active: true,
					role: "COACH",
				},
			} ),
			prisma.user.count( {
				cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
				where: {
					active: true,
					role: "STUDENT",
				},
			} ),
			prisma.user.count( {
				cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
				where: {
					active: false,
				},
			} ),
			prisma.user.count( {
				cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
				where: {
					active: true,
					OR: [ { coachId: null }, { coach: { active: false } } ],
					role: "STUDENT",
				},
			} ),
		] );

		return {
			totals: {
				activeCoaches,
				activeStudents,
				inactiveUsers,
				studentsWithoutCoach,
				totalUsers,
			},
		};
	} );
}
