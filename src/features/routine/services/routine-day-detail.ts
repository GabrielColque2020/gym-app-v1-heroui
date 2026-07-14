import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

import {
	buildRoutineDayDetailWhere,
	type GetRoutineDayDetailInput,
	normalizeRoutineDayDetailInput,
	routineDayDetailInclude,
} from "@/features/routine/services/routine-day-detail.query";

type FetchedRoutineDayDetail = Prisma.RoutineDayGetPayload<{
	include: typeof routineDayDetailInclude;
}>;

type RoutineDayStudent = NonNullable<
	FetchedRoutineDayDetail["trainingRoutineWeek"]["trainingRoutineMonth"]["student"]
>;

export type RoutineDayDetail = Omit<FetchedRoutineDayDetail, "trainingRoutineWeek"> & {
	trainingRoutine: {
		month: number;
		name: string;
		objective: string | null;
		student: RoutineDayStudent;
		week: number;
		year: number;
	};
};

export type RoutineDayExercise = RoutineDayDetail[ "routines" ][ number ];

export async function getRoutineDayDetailBase( {
												   coachId,
												   routineDayId,
												   studentId,
											   }: GetRoutineDayDetailInput ): Promise<RoutineDayDetail> {
	const normalizedInput = normalizeRoutineDayDetailInput( {
		coachId,
		routineDayId,
		studentId,
	} );

	if (!normalizedInput.routineDayId) {
		throw new Error( "Seleccioná un dia de rutina valido." );
	}

	const routineDay = await prisma.routineDay.findFirst( {
		include: routineDayDetailInclude,
		where: buildRoutineDayDetailWhere( normalizedInput ),
	} ) as FetchedRoutineDayDetail | null;

	if (!routineDay) {
		throw new Error( "No se encontró el dia de rutina seleccionado." );
	}

	const student = routineDay.trainingRoutineWeek.trainingRoutineMonth.student;

	if (!student) {
		throw new Error( "No se encontró el estudiante asociado a la rutina." );
	}

	return {
		...routineDay,
		trainingRoutine: {
			month: routineDay.trainingRoutineWeek.trainingRoutineMonth.month,
			name: routineDay.trainingRoutineWeek.name,
			objective: routineDay.trainingRoutineWeek.trainingRoutineMonth.objective,
			student,
			week: routineDay.trainingRoutineWeek.week,
			year: routineDay.trainingRoutineWeek.trainingRoutineMonth.year,
		},
	};
}
