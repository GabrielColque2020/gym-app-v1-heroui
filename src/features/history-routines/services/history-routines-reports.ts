import type { Prisma } from "@/generated/prisma/client";

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
	month: number;
	monthLabel: string;
	periodKey: string;
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

	const reports = await Promise.all(
		periods.map( async ( period ) => {
			const monthData = await getHistoryRoutinesByStudentBase( {
				month: period.month,
				studentId,
				studentNotFoundMessage,
				studentWhere,
				year: period.year,
			} );

			return {
				month: period.month,
				monthLabel: `${ String( period.month ).padStart( 2, "0" ) }/${ period.year }`,
				periodKey: `${ period.year }-${ String( period.month ).padStart( 2, "0" ) }`,
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
