"use server";

import type { Prisma } from "@/generated/prisma/client";

import { QUERY_ACCELERATE_CACHE } from "@/constants/query";
import { getAuthenticatedSession } from "@/features/auth/session";
import { selectNextRoutineDay } from "@/features/role/student/dashboard/services/student-dashboard-mappers";
import prisma from "@/lib/prisma";

const studentSelect = {
	id: true,
	name: true,
} satisfies Prisma.UserSelect;

type StudentRecord = Prisma.UserGetPayload<{
	select: typeof studentSelect;
}>;

const trainingRoutineWeekInclude = {
	routineDays: {
		include: {
			routines: {
				select: {
					id: true,
				},
			},
		},
		orderBy: {
			dayNumber: "asc",
		},
	},
} satisfies Prisma.TrainingRoutineWeekInclude;

type TrainingRoutineMonthRecord = Prisma.TrainingRoutineMonthGetPayload<{
	include: {
		weeks: {
			include: typeof trainingRoutineWeekInclude;
		};
	};
}>;

export type StudentDashboardSummary = {
	history: {
		lastProgressAt: string | null;
		lastRecordedMonth: string | null;
		lastRecordedMonthValue: {
			month: number;
			year: number;
		} | null;
	};
	mealPlans: {
		lastUpdatedAt: string | null;
		total: number;
	};
	routine: {
		currentMonth: number;
		currentYear: number;
		exercisesInNextDay: number;
		hasCurrentMonthRoutine: boolean;
		nextRoutineDay: {
			dayNumber: number;
			exerciseCount: number;
			id: string;
			isFinalized: boolean;
			title: string;
			week: number;
		} | null;
		totalWeeks: number;
	};
	student: {
		id: string;
		name: string;
	};
};

export async function getStudentDashboardSummaryAction(): Promise<StudentDashboardSummary> {
	try {
		const session = await getAuthenticatedSession();

		if (!session) {
			throw new Error( "Debes iniciar sesion para ver tu dashboard." );
		}

		if (session.role !== "STUDENT") {
			throw new Error( "No tienes permisos para consultar el dashboard de estudiante." );
		}

		const now = new Date();
		const currentMonth = now.getMonth() + 1;
		const currentYear = now.getFullYear();
		const [ student, currentMonthRoutineMonth, mealPlans, latestProgress ] = await Promise.all( [
			prisma.user.findFirst( {
				cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
				select: studentSelect,
				where: {
					active: true,
					id: session.sub,
					role: "STUDENT",
				},
			} ) as Promise<StudentRecord | null>,
			prisma.trainingRoutineMonth.findFirst( {
				cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
				include: {
					weeks: {
						include: trainingRoutineWeekInclude,
						orderBy: [
							{ week: "asc" },
						],
					},
				},
				where: {
					month: currentMonth,
					studentId: session.sub,
					year: currentYear,
				},
			} ) as Promise<TrainingRoutineMonthRecord | null>,
			prisma.mealPlan.findMany( {
				cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
				orderBy: {
					updatedAt: "desc",
				},
				select: {
					id: true,
					updatedAt: true,
				},
				where: {
					studentId: session.sub,
				},
			} ),
			prisma.exerciseProgress.findFirst( {
				cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
				orderBy: [
					{ date: "desc" },
					{ id: "desc" },
				],
				select: {
					date: true,
					month: true,
					year: true,
				},
				where: {
					studentId: session.sub,
				},
			} ),
		] );

		if (!student) {
			throw new Error( "No se encontro un estudiante activo para mostrar el dashboard." );
		}

		const currentMonthRoutines = currentMonthRoutineMonth?.weeks ?? [];
		const orderedRoutineDays = currentMonthRoutines.flatMap( ( routine ) =>
			routine.routineDays.map( ( day ) => ( {
				dayNumber: day.dayNumber,
				exerciseCount: day.routines.length,
				id: day.id,
				isFinalized: day.isFinalized,
				title: routine.name,
				week: routine.week,
			} ) ),
		).sort( ( left, right ) => {
			if (left.week !== right.week) return left.week - right.week;

			return left.dayNumber - right.dayNumber;
		} );
		const nextRoutineDay = selectNextRoutineDay( orderedRoutineDays );
		const lastRecordedMonthValue = latestProgress
			? {
				month: latestProgress.month,
				year: latestProgress.year,
			}
			: null;

		return {
			history: {
				lastProgressAt: latestProgress?.date.toISOString() ?? null,
				lastRecordedMonth: latestProgress ? `${ String( latestProgress.month ).padStart( 2, "0" ) }/${ latestProgress.year }` : null,
				lastRecordedMonthValue,
			},
			mealPlans: {
				lastUpdatedAt: mealPlans[ 0 ]?.updatedAt.toISOString() ?? null,
				total: mealPlans.length,
			},
			routine: {
				currentMonth,
				currentYear,
				exercisesInNextDay: nextRoutineDay?.exerciseCount ?? 0,
				hasCurrentMonthRoutine: currentMonthRoutines.length > 0,
				nextRoutineDay,
				totalWeeks: currentMonthRoutines.length,
			},
			student: {
				id: student.id,
				name: student.name,
			},
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudo obtener el resumen del dashboard estudiante. ${ message }` );
	}
}
