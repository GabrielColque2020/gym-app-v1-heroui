import prisma from "@/lib/prisma";
import {
	buildRoutineDayDetailWhere,
	type GetRoutineDayDetailInput,
	normalizeRoutineDayDetailInput,
	routineDayDetailInclude,
} from "@/features/routine/services/routine-day-detail.query";
import { Prisma } from "@/generated/prisma/client";

export type RoutineDayDetail = Prisma.RoutineDayGetPayload<{
	include: typeof routineDayDetailInclude;
}>;

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
		throw new Error( "seleccioná un dia de rutina valido." );
	}

	const routineDay = await prisma.routineDay.findFirst( {
		include: routineDayDetailInclude,
		where: buildRoutineDayDetailWhere( normalizedInput ),
	} ) as RoutineDayDetail | null;

	if (!routineDay) {
		throw new Error( "No se encontró el dia de rutina seleccionado." );
	}

	if (!routineDay.trainingRoutine.student) {
		throw new Error( "No se encontró el estudiante asociado a la rutina." );
	}

	return routineDay;
}
