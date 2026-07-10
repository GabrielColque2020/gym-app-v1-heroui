"use server";

import { QUERY_ACCELERATE_CACHE } from "@/constants/query";
import { requireAdminSession } from "@/features/auth/admin-session";
import prisma from "@/lib/prisma";

export type AdminDashboardSummary = {
	totals: {
		activeCoaches: number;
		activeStudents: number;
		inactiveUsers: number;
		totalUsers: number;
	};
};

export async function getAdminDashboardSummaryAction(): Promise<AdminDashboardSummary> {
	try {
		await requireAdminSession( "consultar el dashboard admin" );

		const [ totalUsers, activeCoaches, activeStudents, inactiveUsers ] = await Promise.all( [
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
		] );

		return {
			totals: {
				activeCoaches,
				activeStudents,
				inactiveUsers,
				totalUsers,
			},
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudo obtener el resumen del dashboard admin. ${ message }` );
	}
}
