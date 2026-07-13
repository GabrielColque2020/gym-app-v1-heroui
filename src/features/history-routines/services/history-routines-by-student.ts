import type { Prisma } from "@/generated/prisma/client";

import { QUERY_ACCELERATE_CACHE } from "@/constants/query";
import prisma from "@/lib/prisma";

import {
	buildHistoryRoutineExercise,
	formatDefaultDescription,
	formatDefaultTitle,
	getProgressRepsNumber,
} from "@/features/history-routines/services/history-routines-domain";
import type {
	HistoryProgressEntry,
	HistoryRoutineCard,
	HistoryRoutineExercise,
} from "@/features/history-routines/types/history-routines";

type GetHistoryRoutinesByStudentBaseInput = {
	month: number;
	studentId: string;
	studentWhere?: Prisma.UserWhereInput;
	studentNotFoundMessage: string;
	year: number;
};

const historyRoutineStudentSelect = {
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

const historyRoutineInclude = {
	routineDays: {
		include: {
			routines: {
				include: {
					exercise: {
						select: {
							id: true,
							name: true,
						},
					},
					variants: {
						include: {
							variantExercise: {
								select: {
									id: true,
									name: true,
								},
							},
						},
						orderBy: {
							createdAt: "desc",
						},
					},
				},
				orderBy: {
					order: "asc",
				},
			},
		},
		orderBy: {
			dayNumber: "asc",
		},
	},
} satisfies Prisma.TrainingRoutineInclude;

type HistoryRoutineStudent = Prisma.UserGetPayload<{
	select: typeof historyRoutineStudentSelect;
}>;

type HistoryRoutineTrainingRoutine = Prisma.TrainingRoutineGetPayload<{
	include: typeof historyRoutineInclude;
}>;

function validateMonth( month: number ) {
	if (!Number.isInteger( month ) || month < 1 || month > 12) {
		throw new Error( "El mes seleccionado no es valido." );
	}
}

function validateYear( year: number ) {
	if (!Number.isInteger( year ) || year < 2000 || year > 2100) {
		throw new Error( "El año seleccionado no es valido." );
	}
}

export async function getHistoryRoutinesByStudentBase( {
														   month,
														   studentId,
														   studentNotFoundMessage,
														   studentWhere,
														   year,
													   }: GetHistoryRoutinesByStudentBaseInput ) {
	validateMonth( month );
	validateYear( year );

	if (!studentId.trim()) {
		throw new Error( "Debes seleccionar un estudiante." );
	}

	const student = await prisma.user.findFirst( {
		cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
		select: historyRoutineStudentSelect,
		where: {
			active: true,
			id: studentId,
			role: "STUDENT",
			...studentWhere,
		},
	} ) as HistoryRoutineStudent | null;

	if (!student) {
		throw new Error( studentNotFoundMessage );
	}

	const routines = await prisma.trainingRoutine.findMany( {
		cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
		include: historyRoutineInclude,
		orderBy: {
			week: "asc",
		},
		where: {
			month,
			studentId,
			year,
		},
	} ) as HistoryRoutineTrainingRoutine[];

	const progressEntries = ( await prisma.exerciseProgress.findMany( {
		cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
		orderBy: [
			{
				week: "asc",
			},
			{
				dayNumber: "asc",
			},
			{
				date: "desc",
			},
			{
				id: "desc",
			},
		],
		where: {
			month,
			studentId,
			year,
		},
	} ) ) as HistoryProgressEntry[];

	const dedupedProgressEntries = [] as typeof progressEntries;
	const seenProgressEntries = new Set<string>();

	for (const entry of [ ...progressEntries ].sort( ( left, right ) => {
		const dateDiff = new Date( right.date ).getTime() - new Date( left.date ).getTime();

		if (dateDiff !== 0) return dateDiff;

		return right.id.localeCompare( left.id );
	} )) {
		const entryKey = `${ entry.week }:${ entry.dayNumber }:${ entry.exerciseId ?? "" }:${ entry.variantExerciseId ?? "" }:${ getProgressRepsNumber( entry ) ?? 0 }`;

		if (seenProgressEntries.has( entryKey )) {
			continue;
		}

		seenProgressEntries.add( entryKey );
		dedupedProgressEntries.push( entry );
	}

	const progressBySession = new Map<string, typeof progressEntries>();

	for (const entry of dedupedProgressEntries) {
		const key = `${ entry.week }:${ entry.dayNumber }`;
		const currentEntries = progressBySession.get( key ) ?? [];
		currentEntries.push( entry );
		progressBySession.set( key, currentEntries );
	}

	const historyRoutines = routines.flatMap<HistoryRoutineCard | null>( ( routine ) =>
		routine.routineDays.map( ( routineDay ) => {
			const sessionEntries = progressBySession.get( `${ routine.week }:${ routineDay.dayNumber }` ) ?? [];

			if (sessionEntries.length === 0) {
				return null;
			}

			const exercises = routineDay.routines
				.map( ( routineExercise ) => buildHistoryRoutineExercise( routineExercise, sessionEntries ) )
				.filter( ( exercise ): exercise is HistoryRoutineExercise => Boolean( exercise ) );

			if (exercises.length === 0) {
				return null;
			}

			const latestEntry = sessionEntries[ 0 ];

			return {
				date: latestEntry.date.toISOString(),
				dayNumber: routineDay.dayNumber,
				description: formatDefaultDescription( routine.objective, routine.name ),
				exercises,
				id: `${ routine.id }:${ routineDay.id }`,
				title: formatDefaultTitle( routine.week, routineDay.dayNumber ),
				week: routine.week,
			};
		} ),
	).filter( ( card ): card is HistoryRoutineCard => Boolean( card ) )
		.sort( ( left, right ) => {
			if (left.week !== right.week) return left.week - right.week;

			return left.dayNumber - right.dayNumber;
		} );

	return {
		historyRoutines,
		month,
		student,
		year,
	};
}

export type HistoryRoutinesByStudentBase = Awaited<ReturnType<typeof getHistoryRoutinesByStudentBase>>;
