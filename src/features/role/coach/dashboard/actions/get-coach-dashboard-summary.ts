"use server";

import type { Prisma } from "@/generated/prisma/client";
import { QUERY_ACCELERATE_CACHE } from "@/constants/query";
import { requireCoachSession } from "@/features/auth/coach-session";
import {
	compareStudentsByPriority,
	mapCoachDashboardStudent,
	RECENT_ACTIVITY_WINDOW_DAYS,
} from "@/features/role/coach/dashboard/services/coach-dashboard-mappers";
import prisma from "@/lib/prisma";

const dashboardStudentSelect = {
	active: true,
	dni: true,
	email: true,
	id: true,
	name: true,
} satisfies Prisma.UserSelect;

type DashboardStudentRecord = Prisma.UserGetPayload<{
	select: typeof dashboardStudentSelect;
}>;

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
		const month = now.getMonth() + 1;
		const year = now.getFullYear();
		const recentActivityCutoff = new Date( now );

		recentActivityCutoff.setDate( recentActivityCutoff.getDate() - RECENT_ACTIVITY_WINDOW_DAYS );

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
			prisma.trainingRoutine.findMany( {
				cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
				distinct: [ "studentId" ],
				orderBy: [
					{ studentId: "asc" },
				],
				select: {
					studentId: true,
				},
				where: {
					month,
					student: {
						is: {
							coachId: session.sub,
							role: "STUDENT",
						},
					},
					studentId: {
						not: null,
					},
					year,
				},
			} ),
			prisma.trainingRoutine.findMany( {
				cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
				distinct: [ "studentId" ],
				orderBy: [
					{ studentId: "asc" },
					{ year: "desc" },
					{ month: "desc" },
					{ week: "desc" },
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
					studentId: {
						not: null,
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

		const currentRoutineStudentIds = new Set(
			currentRoutineRecords.flatMap( ( routine ) => routine.studentId ? [ routine.studentId ] : [] ),
		);
		const latestRoutineByStudent = new Map(
			latestRoutineRecords.flatMap( ( routine ) => routine.studentId ? [ [
				routine.studentId,
				{ month: routine.month, year: routine.year },
			] as const ] : [] ),
		);
		const latestMealPlanByStudent = new Map(
			latestMealPlanRecords.flatMap( ( mealPlan ) => mealPlan.studentId ? [ [
				mealPlan.studentId,
				mealPlan.updatedAt,
			] as const ] : [] ),
		);
		const latestProgressByStudent = new Map(
			latestProgressRecords.flatMap( ( progress ) => progress.studentId ? [ [
				progress.studentId,
				progress.date,
			] as const ] : [] ),
		);

		const studentSummaries = students
			.map( ( student ) => mapCoachDashboardStudent( {
				active: student.active,
				dni: student.dni,
				email: student.email,
				hasMealPlan: latestMealPlanByStudent.has( student.id ),
				hasRoutineThisMonth: currentRoutineStudentIds.has( student.id ),
				id: student.id,
				lastMealPlanUpdatedAt: latestMealPlanByStudent.get( student.id ) ?? null,
				lastProgressAt: latestProgressByStudent.get( student.id ) ?? null,
				lastRoutineMonth: latestRoutineByStudent.get( student.id ) ?? null,
				name: student.name,
				recentActivityCutoff,
			} ) )
			.sort( compareStudentsByPriority );

		const activeStudents = studentSummaries.filter( ( student ) => student.active );

		return {
			currentPeriod: {
				label: `${ String( month ).padStart( 2, "0" ) }/${ year }`,
				month,
				recentActivityCutoff: recentActivityCutoff.toISOString(),
				year,
			},
			students: studentSummaries,
			totals: {
				activeExercises: activeExerciseRecords.length,
				activeStudents: activeStudents.length,
				studentsWithMealPlan: activeStudents.filter( ( student ) => student.hasMealPlan ).length,
				studentsWithRoutineThisMonth: activeStudents.filter( ( student ) => student.hasRoutineThisMonth ).length,
				studentsWithoutMealPlan: activeStudents.filter( ( student ) => !student.hasMealPlan ).length,
				studentsWithoutRecentActivity: activeStudents.filter( ( student ) => student.needsRecentActivityAttention ).length,
				studentsWithoutRoutineThisMonth: activeStudents.filter( ( student ) => !student.hasRoutineThisMonth ).length,
			},
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudo obtener el resumen del dashboard coach. ${ message }` );
	}
}
