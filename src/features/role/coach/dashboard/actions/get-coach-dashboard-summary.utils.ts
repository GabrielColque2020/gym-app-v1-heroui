"use server";

import type { Prisma } from "@/generated/prisma/client";

import {
	compareStudentsByPriority,
	mapCoachDashboardStudent,
	RECENT_ACTIVITY_WINDOW_DAYS,
} from "@/features/role/coach/dashboard/services/coach-dashboard-mappers";

export const dashboardStudentSelect = {
	active: true,
	dni: true,
	email: true,
	id: true,
	name: true,
} satisfies Prisma.UserSelect;

export type DashboardStudentRecord = Prisma.UserGetPayload<{
	select: typeof dashboardStudentSelect;
}>;

type BuildCoachDashboardSummaryInput = {
	activeExerciseCount: number;
	currentRoutineRecords: Array<{ studentId: string | null }>;
	latestMealPlanRecords: Array<{ studentId: string | null; updatedAt: Date }>;
	latestProgressRecords: Array<{ date: Date; studentId: string | null }>;
	latestRoutineRecords: Array<{ month: number; studentId: string | null; year: number }>;
	now: Date;
	students: DashboardStudentRecord[];
};

export function buildCoachDashboardCurrentPeriod( now: Date ) {
	const month = now.getMonth() + 1;
	const year = now.getFullYear();
	const recentActivityCutoff = new Date( now );

	recentActivityCutoff.setDate( recentActivityCutoff.getDate() - RECENT_ACTIVITY_WINDOW_DAYS );

	return {
		label: `${ String( month ).padStart( 2, "0" ) }/${ year }`,
		month,
		recentActivityCutoff,
		year,
	};
}

export function buildCoachDashboardSummary( {
	activeExerciseCount,
	currentRoutineRecords,
	latestMealPlanRecords,
	latestProgressRecords,
	latestRoutineRecords,
	now,
	students,
}: BuildCoachDashboardSummaryInput ) {
	const currentPeriod = buildCoachDashboardCurrentPeriod( now );
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
			recentActivityCutoff: currentPeriod.recentActivityCutoff,
		} ) )
		.sort( compareStudentsByPriority );

	const activeStudents = studentSummaries.filter( ( student ) => student.active );

	return {
		currentPeriod: {
			label: currentPeriod.label,
			month: currentPeriod.month,
			recentActivityCutoff: currentPeriod.recentActivityCutoff.toISOString(),
			year: currentPeriod.year,
		},
		students: studentSummaries,
		totals: {
			activeExercises: activeExerciseCount,
			activeStudents: activeStudents.length,
			studentsWithMealPlan: activeStudents.filter( ( student ) => student.hasMealPlan ).length,
			studentsWithRoutineThisMonth: activeStudents.filter( ( student ) => student.hasRoutineThisMonth ).length,
			studentsWithoutMealPlan: activeStudents.filter( ( student ) => !student.hasMealPlan ).length,
			studentsWithoutRecentActivity: activeStudents.filter( ( student ) => student.needsRecentActivityAttention ).length,
			studentsWithoutRoutineThisMonth: activeStudents.filter( ( student ) => !student.hasRoutineThisMonth ).length,
		},
	};
}
