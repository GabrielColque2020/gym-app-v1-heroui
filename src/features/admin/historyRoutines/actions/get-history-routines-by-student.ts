"use server";

import { getAuthenticatedSession } from "@/features/auth/session";
import prisma from "@/lib/prisma";

type GetHistoryRoutinesByStudentInput = {
	month: number;
	studentId: string;
	year: number;
};

type HistoryRoutineSet = {
	completed: boolean;
	id: string;
	notes: string | null;
	repsCompleted: number | null;
	setNumber: number;
	weightUsed: number | null;
};

type HistoryProgressEntry = {
	date: Date;
	dayNumber: number;
	exerciseId: string | null;
	id: string;
	month: number;
	notes: string | null;
	repsCompleted: string;
	repsNumber: number | null;
	setsCompleted: string;
	studentId: string | null;
	variantExerciseId: string | null;
	week: number;
	weightUsed: string;
	year: number;
};

type HistoryRoutineExercise = {
	baseName: string;
	exerciseId: string;
	id: string;
	name: string;
	repsCompleted: number;
	sets: HistoryRoutineSet[];
	setsCompleted: number;
	variantName: string | null;
	weightUsed: number | null;
};

type HistoryRoutineCard = {
	date: string;
	dayNumber: number;
	description: string;
	exercises: HistoryRoutineExercise[];
	id: string;
	title: string;
	week: number;
};

function validateMonth( month: number ) {
	if (!Number.isInteger( month ) || month < 1 || month > 12) {
		throw new Error( "El mes seleccionado no es valido." );
	}
}

function validateYear( year: number ) {
	if (!Number.isInteger( year ) || year < 2000 || year > 2100) {
		throw new Error( "El anio seleccionado no es valido." );
	}
}

function parseProgressNotes( notes: string | null ) {
	if (!notes) {
		return {
			notes: null as string | null,
			repsNumber: null as number | null,
		};
	}

	try {
		const parsed = JSON.parse( notes ) as Partial<{ notes: string | null; setNumber: number }>;

		return {
			notes: typeof parsed.notes === "string" ? parsed.notes : null,
			repsNumber: typeof parsed.setNumber === "number" && Number.isInteger( parsed.setNumber ) ? parsed.setNumber : null,
		};
	} catch {
		return {
			notes,
			repsNumber: null,
		};
	}
}

function getProgressRepsNumber( entry: Pick<HistoryProgressEntry, "notes" | "repsNumber"> ) {
	if (Number.isInteger( entry.repsNumber )) {
		return entry.repsNumber;
	}

	return parseProgressNotes( entry.notes ).repsNumber;
}

function parseInteger( value: string | null ) {
	if (!value) return null;

	const parsed = Number.parseInt( value.trim(), 10 );

	return Number.isFinite( parsed ) ? parsed : null;
}

function parseDecimal( value: string | null ) {
	if (!value) return null;

	const parsed = Number.parseFloat( value.trim() );

	return Number.isFinite( parsed ) ? parsed : null;
}

function formatDefaultTitle( week: number, dayNumber: number ) {
	return `Semana ${ week } - Dia ${ dayNumber }`;
}

function formatDefaultDescription( objective?: string | null, name?: string | null ) {
	return [ objective?.trim(), name?.trim() ]
		.filter( Boolean )
		.join( " - " ) || "Sin descripcion cargada";
}

function buildHistoryRoutineExercise(
	routine: {
		exercise?: { id: string; name: string | null } | null;
		exerciseId: string | null;
		id: string;
		variants: Array<{ variantExercise: { id: string; name: string | null } }>;
	},
	entries: HistoryProgressEntry[],
): HistoryRoutineExercise | null {
	const baseExerciseId = routine.exerciseId ?? routine.exercise?.id ?? routine.id;
	const variantExerciseIds = routine.variants.map( ( variant ) => variant.variantExercise.id );
	const exerciseEntries = entries.filter( ( entry ) =>
		entry.exerciseId === baseExerciseId
		|| (entry.variantExerciseId !== null && variantExerciseIds.includes( entry.variantExerciseId ))
		|| (entry.exerciseId !== null && variantExerciseIds.includes( entry.exerciseId ))
	);

	if (exerciseEntries.length === 0) {
		return null;
	}

	const latestEntry = exerciseEntries[ 0 ];
	const selectedVariantId = latestEntry.variantExerciseId && variantExerciseIds.includes( latestEntry.variantExerciseId )
		? latestEntry.variantExerciseId
		: null;
	const selectedVariant = selectedVariantId
		? routine.variants.find( ( variant ) => variant.variantExercise.id === selectedVariantId )?.variantExercise ?? null
		: null;

	const sets = exerciseEntries
		.map( ( entry, index ) => {
			const parsedNotes = parseProgressNotes( entry.notes );
			const repsCompleted = parseInteger( entry.repsCompleted );
			const weightUsed = parseDecimal( entry.weightUsed );

			return {
				completed: entry.setsCompleted === "1" || repsCompleted !== null || weightUsed !== null,
				id: entry.id,
				notes: parsedNotes.notes,
				repsCompleted,
				setNumber: getProgressRepsNumber( entry ) ?? parsedNotes.repsNumber ?? index + 1,
				weightUsed,
			};
		} )
		.sort( ( left, right ) => left.setNumber - right.setNumber );

	return {
		baseName: routine.exercise?.name ?? "Ejercicio",
		exerciseId: baseExerciseId,
		id: baseExerciseId,
		name: selectedVariant?.name ?? routine.exercise?.name ?? "Ejercicio",
		repsCompleted: sets.reduce( ( total, set ) => total + ( set.repsCompleted ?? 0 ), 0 ),
		sets,
		setsCompleted: sets.filter( ( set ) => set.completed ).length,
		variantName: selectedVariant?.name ?? null,
		weightUsed: sets.reduce( ( total, set ) => Math.max( total, set.weightUsed ?? 0 ), 0 ) || null,
	};
}

export async function getHistoryRoutinesByStudentAction( {
	month,
	studentId,
	year,
}: GetHistoryRoutinesByStudentInput ) {
	try {
		const session = await getAuthenticatedSession();

		validateMonth( month );
		validateYear( year );

		if (!session) {
			throw new Error( "Debes iniciar sesion para ver el historial de rutinas." );
		}

		if (session.role !== "COACH") {
			throw new Error( "No tienes permisos para consultar historial de rutinas." );
		}

		if (!studentId.trim()) {
			throw new Error( "Debes seleccionar un estudiante." );
		}

		const student = await prisma.user.findFirst( {
			select: {
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
			},
			where: {
				active: true,
				coachId: session.sub,
				id: studentId,
				role: "STUDENT",
			},
		} );

		if (!student) {
			throw new Error( "No se encontro un estudiante activo para consultar su historial." );
		}

		const routines = await prisma.trainingRoutine.findMany( {
			include: {
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
			},
			orderBy: {
				week: "asc",
			},
			where: {
				month,
				studentId,
				year,
			},
		} );

		const progressEntries = ( await prisma.exerciseProgress.findMany( {
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
		} ) ) {
			const parsedNotes = parseProgressNotes( entry.notes );
			const entryKey = `${ entry.week }:${ entry.dayNumber }:${ entry.exerciseId ?? "" }:${ entry.variantExerciseId ?? "" }:${ getProgressRepsNumber( entry ) ?? parsedNotes.repsNumber ?? 0 }`;

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
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudo obtener el historial de rutinas del estudiante. ${ message }` );
	}
}

export type HistoryRoutinesByStudent = Awaited<ReturnType<typeof getHistoryRoutinesByStudentAction>>;
export type AdminHistoryRoutine = HistoryRoutinesByStudent[ "historyRoutines" ][ number ];
