import type { Prisma } from "@/generated/prisma/client";

import { monthYearLabel } from "@/constants/months";
import { QUERY_ACCELERATE_CACHE } from "@/constants/query";
import prisma from "@/lib/prisma";

import { getHistoryRoutinesByStudentBase } from "@/features/history-routines/services/history-routines-by-student";
import { buildHistoryRoutineMonthSummary, groupHistoryRoutinesByWeek, type HistoryRoutineMonthSummary } from "@/features/history-routines/services/history-routines-view";

type GetHistoryRoutinesReportsByStudentBaseInput = {
	studentId: string;
	studentNotFoundMessage: string;
	studentWhere?: Prisma.UserWhereInput;
};

const historyRoutineReportStudentSelect = {
	DescriptionStudent: {
		select: {
			objective: true,
			observations: true,
		},
	},
	dni: true,
	email: true,
	id: true,
	name: true,
} satisfies Prisma.UserSelect;

type HistoryRoutineReportStudent = Prisma.UserGetPayload<{
	select: typeof historyRoutineReportStudentSelect;
}>;

export type HistoryRoutineReportRow = {
	// Dias del mes que el estudiante marco como terminados.
	finishedDays: number;
	month: number;
	monthLabel: string;
	periodKey: string;
	// Dias con ejercicios en la rutina de ese mes. Cero si el mes ya no tiene rutina.
	plannedDays: number;
	summary: HistoryRoutineMonthSummary;
	year: number;
};

export async function getHistoryRoutinesReportsByStudentBase( {
	studentId,
	studentNotFoundMessage,
	studentWhere,
}: GetHistoryRoutinesReportsByStudentBaseInput ) {
	if (!studentId.trim()) {
		throw new Error( "Debes seleccionar un estudiante." );
	}

	const student = await prisma.user.findFirst( {
		cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
		select: historyRoutineReportStudentSelect,
		where: {
			active: true,
			id: studentId,
			role: "STUDENT",
			...studentWhere,
		},
	} ) as HistoryRoutineReportStudent | null;

	if (!student) {
		throw new Error( studentNotFoundMessage );
	}

	const periods = await prisma.exerciseProgress.findMany( {
		cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
		distinct: [ "year", "month" ],
		orderBy: [
			{
				year: "desc",
			},
			{
				month: "desc",
			},
		],
		select: {
			month: true,
			year: true,
		},
		where: {
			month: {
				gte: 1,
				lte: 12,
			},
			studentId,
			year: {
				gte: 2000,
				lte: 2100,
			},
		},
	} );

	// La rutina de cada mes, para saber cuantos dias tenia y cuantos se terminaron.
	const routineMonths = await prisma.trainingRoutineMonth.findMany( {
		select: {
			month: true,
			weeks: {
				select: {
					routineDays: {
						select: {
							isFinalized: true,
							routines: {
								select: {
									id: true,
								},
							},
						},
					},
				},
			},
			year: true,
		},
		where: {
			studentId,
		},
	} ) as unknown as Array<{
		month: number;
		weeks: Array<{ routineDays: Array<{ isFinalized: boolean; routines: Array<{ id: string }> }> }>;
		year: number;
	}>;
	const dayCountsByPeriod = new Map( routineMonths.map( ( routineMonth ) => {
		const daysWithExercises = routineMonth.weeks
			.flatMap( ( week ) => week.routineDays )
			.filter( ( day ) => day.routines.length > 0 );

		return [
			`${ routineMonth.year }-${ routineMonth.month }`,
			{
				finishedDays: daysWithExercises.filter( ( day ) => day.isFinalized ).length,
				plannedDays: daysWithExercises.length,
			},
		] as const;
	} ) );

	const reports = await Promise.all(
		periods.map( async ( period ) => {
			const monthData = await getHistoryRoutinesByStudentBase( {
				month: period.month,
				studentId,
				studentNotFoundMessage,
				studentWhere,
				year: period.year,
			} );

			const dayCounts = dayCountsByPeriod.get( `${ period.year }-${ period.month }` );

			return {
				finishedDays: dayCounts?.finishedDays ?? 0,
				month: period.month,
				// "Octubre 2026" y no "10/2026": se lee de un vistazo.
				monthLabel: monthYearLabel( String( period.month ), String( period.year ) ),
				periodKey: `${ period.year }-${ String( period.month ).padStart( 2, "0" ) }`,
				plannedDays: dayCounts?.plannedDays ?? 0,
				summary: buildHistoryRoutineMonthSummary(
					groupHistoryRoutinesByWeek( monthData.historyRoutines ),
				),
				year: period.year,
			} satisfies HistoryRoutineReportRow;
		} ),
	);

	return {
		reports,
		student,
	};
}
