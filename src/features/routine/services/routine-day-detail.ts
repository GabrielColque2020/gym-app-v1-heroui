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

function pickFirstText( ...values: Array<string | null | undefined> ) {
	return values.find( ( value ) => value?.trim() )?.trim() ?? null;
}

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
		routines: routineDay.routines.map( ( routine ) => ( {
			...routine,
			exercise: routine.exercise
				? {
					...routine.exercise,
					imageUrl: pickFirstText(
						routine.exercise.imageUrl,
						routine.exercise.globalExercise?.imageUrl,
					),
					instructions: pickFirstText(
						routine.exercise.instructions,
						routine.exercise.globalExercise?.instructions,
					),
					videoUrl: pickFirstText(
						routine.exercise.videoUrl,
						routine.exercise.globalExercise?.videoUrl,
					),
				}
				: routine.exercise,
			variants: routine.variants.map( ( variant ) => ( {
				...variant,
				variantExercise: {
					...variant.variantExercise,
					imageUrl: pickFirstText(
						variant.variantExercise.imageUrl,
						variant.variantExercise.globalExercise?.imageUrl,
					),
					instructions: pickFirstText(
						variant.variantExercise.instructions,
						variant.variantExercise.globalExercise?.instructions,
					),
					videoUrl: pickFirstText(
						variant.variantExercise.videoUrl,
						variant.variantExercise.globalExercise?.videoUrl,
					),
				},
			} ) ),
		} ) ),
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
