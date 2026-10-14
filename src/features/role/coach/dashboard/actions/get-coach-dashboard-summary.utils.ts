import type { Prisma } from "@/generated/prisma/client";

import {
	compareStudentsByPriority,
	mapCoachDashboardStudent,
	RECENT_ACTIVITY_WINDOW_DAYS,
} from "@/features/role/coach/dashboard/services/coach-dashboard-mappers";
import { summarizeRoutineMonth } from "@/features/training-routine/services/next-routine-day";
import { getAppDateParts } from "@/lib/app-date";

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
	currentMonthProgressRecords: Array<{ dayNumber: number; studentId: string | null; week: number }>;
	currentRoutineRecords: Array<{
		studentId: string | null;
		weeks: Array<{
			routineDays: Array<{ _count: { routines: number }; dayNumber: number; isFinalized: boolean }>;
			week: number;
		}>;
	}>;
	latestMealPlanRecords: Array<{ studentId: string | null; updatedAt: Date }>;
	latestProgressRecords: Array<{ date: Date; studentId: string | null }>;
	latestRoutineRecords: Array<{ month: number; studentId: string | null; year: number }>;
	now: Date;
	students: DashboardStudentRecord[];
};

export function buildCoachDashboardCurrentPeriod( now: Date ) {
	// El mes de hoy en Argentina: el servidor corre en UTC.
	const { month, year } = getAppDateParts( now );
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
	currentMonthProgressRecords,
	currentRoutineRecords,
	latestMealPlanRecords,
	latestProgressRecords,
	latestRoutineRecords,
	now,
	students,
}: BuildCoachDashboardSummaryInput ) {
	const currentPeriod = buildCoachDashboardCurrentPeriod( now );
	const daysWithProgress = new Set(
		currentMonthProgressRecords.map( ( progress ) => `${ progress.studentId }|${ progress.week }|${ progress.dayNumber }` ),
	);
	// Cuanto cumplio cada estudiante la rutina del mes. Solo cuenta como rutina
	// del mes la que tiene algun ejercicio: una estructura vacia esta pendiente.
	const monthProgressByStudent = new Map<string, ReturnType<typeof buildMonthProgress>>();

	for (const routine of currentRoutineRecords) {
		if (!routine.studentId) continue;

		const progress = buildMonthProgress( routine.studentId, routine.weeks, daysWithProgress );

		if (progress.totalCount > 0) monthProgressByStudent.set( routine.studentId, progress );
	}
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
			hasRoutineThisMonth: monthProgressByStudent.has( student.id ),
			id: student.id,
			lastMealPlanUpdatedAt: latestMealPlanByStudent.get( student.id ) ?? null,
			lastProgressAt: latestProgressByStudent.get( student.id ) ?? null,
			lastRoutineMonth: latestRoutineByStudent.get( student.id ) ?? null,
			monthProgress: monthProgressByStudent.get( student.id ) ?? null,
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

// "6 de 12 dias hechos · 2 salteados", con el criterio de `summarizeRoutineMonth`.
function buildMonthProgress(
	studentId: string,
	weeks: BuildCoachDashboardSummaryInput[ "currentRoutineRecords" ][ number ][ "weeks" ],
	daysWithProgress: Set<string>,
) {
	const days = weeks.flatMap( ( week ) => week.routineDays.map( ( day ) => ( {
		exerciseCount: day._count.routines,
		hasProgress: daysWithProgress.has( `${ studentId }|${ week.week }|${ day.dayNumber }` ),
		isFinalized: day.isFinalized,
	} ) ) );
	const summary = summarizeRoutineMonth( days );

	return {
		doneCount: summary.doneCount,
		skippedCount: summary.skippedIndexes.size,
		totalCount: summary.totalCount,
		unfinishedCount: summary.unfinishedIndexes.size,
	};
}
