"use server";

import { QUERY_ACCELERATE_CACHE } from "@/constants/query";
import { requireCoachSession } from "@/features/auth/coach-session";
import {
	buildCoachDashboardCurrentPeriod,
	buildCoachDashboardSummary,
	dashboardStudentSelect,
	type DashboardStudentRecord,
} from "@/features/role/coach/dashboard/actions/get-coach-dashboard-summary.utils";
import { mapCoachDashboardStudent } from "@/features/role/coach/dashboard/services/coach-dashboard-mappers";
import prisma from "@/lib/prisma";

export type CoachDashboardStudentSummary = ReturnType<typeof mapCoachDashboardStudent>;

export type CoachDashboardSummary = {
	currentPeriod: {
		label: string;
		month: number;
		recentActivityCutoff: string;
		year: number;
	};
	students: CoachDashboardStudentSummary[];
	totals: {
		activeExercises: number;
		activeStudents: number;
		studentsWithMealPlan: number;
		studentsWithRoutineThisMonth: number;
		studentsWithoutMealPlan: number;
		studentsWithoutRecentActivity: number;
		studentsWithoutRoutineThisMonth: number;
	};
};

export async function getCoachDashboardSummaryAction(): Promise<CoachDashboardSummary> {
	try {
		const session = await requireCoachSession( "consultar el dashboard del coach" );
		const now = new Date();
		const currentPeriod = buildCoachDashboardCurrentPeriod( now );

		const [
			students,
			activeExerciseRecords,
			currentRoutineRecords,
			latestRoutineRecords,
			latestMealPlanRecords,
			latestProgressRecords,
		] = await Promise.all( [
			prisma.user.findMany( {
				cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
				orderBy: [
					{ active: "desc" },
					{ name: "asc" },
				],
				select: dashboardStudentSelect,
				where: {
					coachId: session.sub,
					role: "STUDENT",
				},
			} ) as unknown as Promise<DashboardStudentRecord[]>,
			prisma.exercise.findMany( {
				cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
				select: {
					id: true,
				},
				where: {
					active: true,
					coachId: session.sub,
				},
			} ),
			prisma.trainingRoutineMonth.findMany( {
				cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
				distinct: [ "studentId" ],
				orderBy: [
					{ studentId: "asc" },
				],
				select: {
					studentId: true,
				},
				where: {
					month: currentPeriod.month,
					student: {
						is: {
							coachId: session.sub,
							role: "STUDENT",
						},
					},
					year: currentPeriod.year,
				},
			} ),
			prisma.trainingRoutineMonth.findMany( {
				cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
				distinct: [ "studentId" ],
				orderBy: [
					{ studentId: "asc" },
					{ year: "desc" },
					{ month: "desc" },
					{ updatedAt: "desc" },
				],
				select: {
					month: true,
					studentId: true,
					year: true,
				},
				where: {
					student: {
						is: {
							coachId: session.sub,
							role: "STUDENT",
						},
					},
				},
			} ),
			prisma.mealPlan.findMany( {
				cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
				distinct: [ "studentId" ],
				orderBy: [
					{ studentId: "asc" },
					{ updatedAt: "desc" },
				],
				select: {
					studentId: true,
					updatedAt: true,
				},
				where: {
					student: {
						is: {
							coachId: session.sub,
							role: "STUDENT",
						},
					},
					studentId: {
						not: null,
					},
				},
			} ),
			prisma.exerciseProgress.findMany( {
				cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
				distinct: [ "studentId" ],
				orderBy: [
					{ studentId: "asc" },
					{ date: "desc" },
				],
				select: {
					date: true,
					studentId: true,
				},
				where: {
					student: {
						is: {
							coachId: session.sub,
							role: "STUDENT",
						},
					},
					studentId: {
						not: null,
					},
				},
			} ),
		] );

		return buildCoachDashboardSummary( {
			activeExerciseCount: activeExerciseRecords.length,
			currentRoutineRecords,
			latestMealPlanRecords,
			latestProgressRecords,
			latestRoutineRecords,
			now,
			students,
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudo obtener el resumen del dashboard coach. ${ message }` );
	}
}
