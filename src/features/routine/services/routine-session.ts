import { formatBodyPart } from "@/features/exercises/services/exercise-formatters";
import type { RoutineDayDetail } from "@/features/routine/services/routine-day-detail";
import type {
	ExerciseProgressRoutine,
	RoutinePageStudent,
	ExerciseSessionHistory,
	ExerciseSessionHistorySet,
	Exercise,
	ExerciseSet,
	ExerciseVariantOption,
	WorkoutSession,
	ExerciseProgressRoutineOld,
} from "@/features/routine/types/routine.types";

export type StudentRoutineProgressEntry = {
	date: Date | string;
	exerciseId: string;
	id: string;
	notes: string | null;
	dayNumber: number;
	month: number;
	repsNumber: number | null;
	variantExerciseId: string | null;
	week: number;
	year: number;
	repsCompleted: string;
	setsCompleted: string;
	weightUsed: string;
};

export type StudentRoutineSet = ExerciseSet & {
};

export type StudentRoutineExercise = Exercise & {
};

export type StudentRoutineVariantOption = ExerciseVariantOption & {
};

export type StudentRoutineSessionHistorySet = ExerciseSessionHistorySet;
export type StudentRoutineSessionHistory = ExerciseSessionHistory;

export type StudentRoutineSession = WorkoutSession;

export type StudentRoutineSessionDetail = RoutineDayDetail & {
	progressEntries: StudentRoutineProgressEntry[];
};

export type StudentRoutineSessionSaveSet = {
	completed: boolean;
	currentReps: number | null;
	currentWeight: number | null;
	notes: string | null;
	setNumber: number;
};

export type StudentRoutineSessionSaveExercise = {
	exerciseId: string;
	variantExerciseId: string | null;
	sets: StudentRoutineSessionSaveSet[];
};

export type StudentRoutineSessionSaveInput = {
	exercises: StudentRoutineSessionSaveExercise[];
	routineDayId: string;
};

function getExerciseTotals( exercise: StudentRoutineExercise, useCurrentValues: boolean ) {
	const values = exercise.sets.map( ( set ) => ( {
		weight: useCurrentValues ? set.currentWeight : set.previousWeight,
		reps: useCurrentValues ? set.currentReps : set.previousReps,
	} ) );

	const repsCompleted = values.reduce( ( total, set ) => total + ( set.reps ?? 0 ), 0 );
	const weightUsed = values.reduce( ( total, set ) => Math.max( total, set.weight ?? 0 ), 0 );
	const setsCompleted = useCurrentValues
		? exercise.sets.filter( ( set ) => set.completed ).length
		: exercise.sets.length;

	return {
		repsCompleted: String( repsCompleted ),
		setsCompleted: String( setsCompleted ),
		weightUsed: String( weightUsed ),
	};
}

function toHistoryInteger( value: string | number | null | undefined ) {
	return parseInteger( value );
}

function toHistoryDecimal( value: string | number | null | undefined ) {
	return parseDecimal( value );
}

function toExerciseProgress(
	exercise: StudentRoutineExercise,
	useCurrentValues: boolean,
): ExerciseProgressRoutine {
	const totals = getExerciseTotals( exercise, useCurrentValues );

	return {
		exerciseId: exercise.id,
		notes: exercise.notes ?? null,
		repsCompleted: totals.repsCompleted,
		setsCompleted: totals.setsCompleted,
		weightUsed: totals.weightUsed,
	};
}

function getSessionKey( entry: StudentRoutineProgressEntry ) {
	return `${ entry.year }-${ entry.month }-${ entry.week }-${ entry.dayNumber }`;
}

function buildSessionHistory( entries: StudentRoutineProgressEntry[] ): StudentRoutineSessionHistory | null {
	if (entries.length === 0) return null;

	const groupedEntries = new Map<string, StudentRoutineProgressEntry[]>();

	for (const entry of entries) {
		const key = getSessionKey( entry );
		const currentEntries = groupedEntries.get( key ) ?? [];
		currentEntries.push( entry );
		groupedEntries.set( key, currentEntries );
	}

	const sessions = [ ...groupedEntries.values() ].map( ( sessionEntries ) => {
		const orderedEntries = [ ...sessionEntries ].sort( sortByDateDesc );
		const latestEntry = orderedEntries[ 0 ];
		const latestEntriesBySet = new Map<number, StudentRoutineProgressEntry>();

		for (const entry of orderedEntries) {
			const repsNumber = getProgressRepsNumber( entry );
			if (repsNumber === null) continue;

			if (!latestEntriesBySet.has( repsNumber )) {
				latestEntriesBySet.set( repsNumber, entry );
			}
		}

		const sets = [ ...latestEntriesBySet.entries() ]
			.sort( ( [ leftSetNumber ], [ rightSetNumber ] ) => leftSetNumber - rightSetNumber )
			.map( ( [ , entry ] ) => {
				const parsedNotes = parseProgressNotes( entry.notes );
				const repsNumber = getProgressRepsNumber( entry );
				const repsCompleted = toHistoryInteger( entry.repsCompleted );
				const weightUsed = toHistoryDecimal( entry.weightUsed );

				return {
					completed: repsCompleted !== null || weightUsed !== null,
					notes: parsedNotes.notes,
					repsCompleted,
					setNumber: repsNumber ?? parsedNotes.repsNumber ?? 0,
					weightUsed,
				};
			} );

		return {
			completed: sets.length > 0 && sets.every( ( set ) => set.completed ),
			date: new Date( latestEntry.date ),
			dayNumber: latestEntry.dayNumber,
			month: latestEntry.month,
			sets,
			week: latestEntry.week,
			year: latestEntry.year,
		};
	} );

	return sessions.sort( ( left, right ) => right.date.getTime() - left.date.getTime() )[ 0 ] ?? null;
}

export function mapStudentRoutineSessionDetailToRoutinePages( detail: StudentRoutineSessionDetail ): RoutinePageStudent[] {
	const session = mapStudentRoutineSessionDetailToSession( detail );

	return session.exercises.map( ( exercise ) => {
		const oldProgress = toExerciseProgress( exercise, false );
		const currentProgress = exercise.sets.some( ( set ) =>
			set.currentReps !== null || set.currentWeight !== null || set.completed,
		)
			? toExerciseProgress( exercise, true )
			: null;

		return {
			dayNumber: session.dayNumber,
			exerciseProgress: currentProgress,
			exerciseProgressOld: {
				...oldProgress,
				dayNumber: detail.dayNumber,
				month: detail.trainingRoutine.month,
				week: detail.trainingRoutine.week,
				year: detail.trainingRoutine.year,
			},
			id: exercise.id,
			month: detail.trainingRoutine.month,
			observation: exercise.muscleGroup,
			routineName: session.title,
			tips: exercise.notes ?? "",
			week: detail.trainingRoutine.week,
			year: detail.trainingRoutine.year,
		};
	} );
}

function parseInteger( value: string | number | null | undefined ) {
	if (typeof value === "number") {
		return Number.isFinite( value ) ? Math.trunc( value ) : null;
	}

	if (typeof value !== "string") {
		return null;
	}

	const normalized = value.trim();
	if (!normalized) return null;

	const parsed = Number.parseInt( normalized, 10 );
	return Number.isFinite( parsed ) ? parsed : null;
}

function parseDecimal( value: string | number | null | undefined ) {
	if (typeof value === "number") {
		return Number.isFinite( value ) ? value : null;
	}

	if (typeof value !== "string") {
		return null;
	}

	const normalized = value.trim();
	if (!normalized) return null;

	const parsed = Number.parseFloat( normalized );
	return Number.isFinite( parsed ) ? parsed : null;
}

type ParsedProgressNotes = {
	notes: string | null;
	repsNumber: number | null;
};

function parseProgressNotes( notes: string | null ): ParsedProgressNotes {
	if (!notes) {
		return {
			notes: null,
			repsNumber: null,
		};
	}

	try {
		const parsed = JSON.parse( notes ) as Partial<{ notes: string | null; setNumber: number }>;
		const parsedSetNumber: number | null = typeof parsed.setNumber === "number" ? parsed.setNumber : null;
		const repsNumber: number | null = Number.isInteger( parsedSetNumber ) ? parsedSetNumber : null;

		return {
			notes: typeof parsed.notes === "string" ? parsed.notes : null,
			repsNumber,
		};
	} catch {
		return {
			notes,
			repsNumber: null,
		};
	}
}

function getProgressRepsNumber( entry: StudentRoutineProgressEntry ) {
	return Number.isInteger( entry.repsNumber ) ? entry.repsNumber : parseProgressNotes( entry.notes ).repsNumber;
}

function sortByDateDesc( left: StudentRoutineProgressEntry, right: StudentRoutineProgressEntry ) {
	return new Date( right.date ).getTime() - new Date( left.date ).getTime();
}

function getProgressEntriesByVariant(
	detail: StudentRoutineSessionDetail,
	variantExerciseId: string,
) {
	return detail.progressEntries
		.filter( ( entry ) => entry.variantExerciseId === variantExerciseId || entry.exerciseId === variantExerciseId )
		.sort( sortByDateDesc );
}

function getProgressEntriesByExercise(
	detail: StudentRoutineSessionDetail,
	exerciseId: string,
) {
	return detail.progressEntries
		.filter( ( entry ) => entry.exerciseId === exerciseId )
		.sort( sortByDateDesc );
}

function getCurrentProgressEntriesByExercise(
	detail: StudentRoutineSessionDetail,
	exerciseId: string,
	variantExerciseId: string | null,
) {
	const currentSessionKey = getSessionKey( {
		dayNumber: detail.dayNumber,
		month: detail.trainingRoutine.month,
		week: detail.trainingRoutine.week,
		year: detail.trainingRoutine.year,
	} as StudentRoutineProgressEntry );
	const allowedExerciseIds = new Set(
		[ exerciseId, variantExerciseId ]
			.filter( ( value ): value is string => Boolean( value ) ),
	);

	return detail.progressEntries
		.filter( ( entry ) => getSessionKey( entry ) === currentSessionKey )
		.filter( ( entry ) =>
			allowedExerciseIds.has( entry.exerciseId ) || ( entry.variantExerciseId !== null && allowedExerciseIds.has( entry.variantExerciseId ) ),
		)
		.sort( sortByDateDesc );
}

function getProgressEntriesBySlot(
	detail: StudentRoutineSessionDetail,
	routine: StudentRoutineSessionDetail["routines"][ number ],
) {
	const baseExerciseId = routine.exerciseId ?? routine.exercise?.id ?? routine.id;
	const variantExerciseIds = routine.variants.map( ( variant ) => variant.variantExerciseId );

	return detail.progressEntries
		.filter( ( entry ) => {
			if (entry.exerciseId === baseExerciseId) return true;
			if (entry.variantExerciseId && variantExerciseIds.includes( entry.variantExerciseId )) return true;
			if (variantExerciseIds.includes( entry.exerciseId )) return true;

			return false;
		} )
		.sort( sortByDateDesc );
}

function getLatestProgressEntry( entries: StudentRoutineProgressEntry[] ) {
	return [ ...entries ].sort( sortByDateDesc )[ 0 ] ?? null;
}

function getLatestProgressEntryBySetNumber(
	entries: StudentRoutineProgressEntry[],
	setNumber: number,
) {
	return [ ...entries ]
		.sort( sortByDateDesc )
		.find( ( entry ) => getProgressRepsNumber( entry ) === setNumber ) ?? null;
}

function getPreviousProgressEntryBySetNumber(
	historyEntries: StudentRoutineProgressEntry[],
	currentEntry: StudentRoutineProgressEntry | null,
	setNumber: number,
) {
	const orderedEntries = [ ...historyEntries ].sort( sortByDateDesc );

	if (!currentEntry) {
		return orderedEntries.find( ( entry ) => getProgressRepsNumber( entry ) === setNumber ) ?? null;
	}

	let seenCurrent = false;

	for (const entry of orderedEntries) {
		if (getProgressRepsNumber( entry ) !== setNumber) {
			continue;
		}

		if (!seenCurrent) {
			if (entry.id === currentEntry.id) {
				seenCurrent = true;
			}

			continue;
		}

		return entry;
	}

	return null;
}

function getVariantExerciseId(
	routine: StudentRoutineSessionDetail["routines"][ number ],
	slotEntries: StudentRoutineProgressEntry[],
) {
	const latestEntry = getLatestProgressEntry( slotEntries );
	const baseExerciseId = routine.exerciseId ?? routine.exercise?.id ?? null;
	const variantExerciseIds = routine.variants.map( ( variant ) => variant.variantExerciseId );
	const entryVariantExerciseId = latestEntry?.variantExerciseId ?? null;
	const legacyExerciseId = latestEntry?.exerciseId ?? null;

	if (entryVariantExerciseId && variantExerciseIds.includes( entryVariantExerciseId )) {
		return entryVariantExerciseId;
	}

	if (!legacyExerciseId || legacyExerciseId === baseExerciseId || !variantExerciseIds.includes( legacyExerciseId )) {
		return null;
	}

	return legacyExerciseId;
}

export function mapStudentRoutineSessionDetailToSession( detail: StudentRoutineSessionDetail ): StudentRoutineSession {
	const exercises = [ ...detail.routines ]
		.sort( ( left, right ) => left.order - right.order )
		.map( ( routine ) => {
			const exercise = routine.exercise;
			const exerciseId = routine.exerciseId ?? routine.exercise?.id ?? routine.id;
			const progressEntries = getProgressEntriesBySlot( detail, routine );
			const variantExerciseId = getVariantExerciseId( routine, progressEntries );
			const selectedVariant = variantExerciseId
				? routine.variants.find( ( variant ) => variant.variantExercise.id === variantExerciseId )?.variantExercise ?? null
				: null;
			const currentExerciseEntries = getCurrentProgressEntriesByExercise( detail, exerciseId, selectedVariant?.id ?? null );
			const historyExerciseEntries = selectedVariant
				? getProgressEntriesByVariant( detail, selectedVariant.id )
				: getProgressEntriesByExercise( detail, exerciseId );
			const lastSession = buildSessionHistory(
				historyExerciseEntries,
			);
			const setCount = Math.max(
				parseInteger( routine.sets ) ?? 1,
				1,
			);
			const currentSets = Array.from( { length: setCount }, ( _, index ) => {
				const setNumber = index + 1;
				const savedSet = getLatestProgressEntryBySetNumber( currentExerciseEntries, setNumber );
				const previousSavedSet = getPreviousProgressEntryBySetNumber( progressEntries, savedSet, setNumber );
				const savedSetNotes = parseProgressNotes( savedSet?.notes ?? null ).notes;
				const currentReps = parseInteger( savedSet?.repsCompleted );
				const currentWeight = parseDecimal( savedSet?.weightUsed );
				const previousReps = parseInteger( previousSavedSet?.repsCompleted );
				const previousSeriesWeight = parseDecimal( previousSavedSet?.weightUsed );
				const hasCurrentValues = currentReps !== null || currentWeight !== null;

				return {
					completed: Boolean( hasCurrentValues ),
					currentReps,
					currentWeight,
					id: savedSet?.id ?? `${ exerciseId }-${ setNumber }`,
					notes: savedSetNotes,
					previousReps,
					previousWeight: previousSeriesWeight,
					setNumber,
					targetReps: parseInteger( routine.reps ) ?? currentReps ?? 0,
				};
			} );

	return {
		baseName: exercise?.name ?? routine.exercise?.name ?? "Ejercicio",
		equipment: formatBodyPart( selectedVariant?.bodyPart ?? routine.exercise?.bodyPart ?? "CHEST" ),
		id: exerciseId,
		muscleGroup: routine.observation ?? detail.trainingRoutine.objective ?? "",
		name: selectedVariant?.name ?? exercise?.name ?? "Ejercicio",
		notes: exercise?.tips ?? routine.observation ?? undefined,
		lastSession,
		variantExerciseId,
		variantSelectionExplicit: false,
		restTime: Math.max( setCount * 30, 0 ),
		sets: currentSets,
		variantOptions: routine.variants.map( ( variant ) => ( {
			active: variant.variantExercise.active,
			bodyPart: variant.variantExercise.bodyPart,
			id: variant.variantExercise.id,
			lastSession: buildSessionHistory( getProgressEntriesByVariant( detail, variant.variantExercise.id ) ),
			name: variant.variantExercise.name,
		} ) ),
	};
	} );

	const latestActivity = detail.progressEntries[ 0 ]?.date ?? new Date();

	return {
		completed: detail.isFinalized,
		date: new Date( latestActivity ),
		dayNumber: detail.dayNumber,
		exercises,
		id: detail.id,
		title: detail.trainingRoutine.name || `Semana ${ detail.trainingRoutine.week }`,
	};
}

export function serializeStudentRoutineSession( session: StudentRoutineSession ) {
	const serializeSessionHistory = ( history: StudentRoutineSessionHistory | null | undefined ) =>
		history
			? {
				completed: history.completed,
				date: history.date.toISOString(),
				dayNumber: history.dayNumber,
				month: history.month,
				sets: history.sets.map( ( set ) => ( {
					completed: set.completed,
					notes: set.notes,
					repsCompleted: set.repsCompleted,
					setNumber: set.setNumber,
					weightUsed: set.weightUsed,
				} ) ),
				week: history.week,
				year: history.year,
			}
			: null;

	const serializeVariantOptions = ( variantOptions: StudentRoutineVariantOption[] | undefined ) =>
		Array.isArray( variantOptions )
			? [ ...variantOptions ]
				.sort( ( left, right ) => left.id.localeCompare( right.id ) )
				.map( ( variant ) => ( {
					active: variant.active,
					bodyPart: variant.bodyPart,
					id: variant.id,
					lastSession: serializeSessionHistory( variant.lastSession ),
					name: variant.name,
				} ) )
			: [];

	return JSON.stringify( {
		completed: session.completed,
		dayNumber: session.dayNumber,
		exercises: [ ...session.exercises ]
			.sort( ( left, right ) => left.id.localeCompare( right.id ) )
			.map( ( exercise ) => ( {
				id: exercise.id,
				baseName: exercise.baseName,
				name: exercise.name,
				variantExerciseId: exercise.variantExerciseId,
				notes: exercise.notes ?? "",
				lastSession: serializeSessionHistory( exercise.lastSession ),
				restTime: exercise.restTime,
				sets: [ ...exercise.sets ]
					.sort( ( left, right ) => left.setNumber - right.setNumber )
					.map( ( set ) => ( {
						completed: set.completed,
						currentReps: set.currentReps,
						currentWeight: set.currentWeight,
						notes: set.notes ?? "",
						setNumber: set.setNumber,
						targetReps: set.targetReps,
					} ) ),
				variantOptions: serializeVariantOptions( exercise.variantOptions ),
			} ) ),
		id: session.id,
		title: session.title,
	} );
}

export function validateStudentRoutineSession( session: StudentRoutineSession ) {
	if (!session.id.trim()) {
		return "Selecciona un dia valido antes de guardar.";
	}

	if (session.exercises.length === 0) {
		return "No hay ejercicios para guardar.";
	}

	for (const exercise of session.exercises) {
		if (!exercise.id.trim()) {
			return "Hay un ejercicio sin identificador valido.";
		}

		for (const set of exercise.sets) {
			if (!Number.isInteger( set.setNumber ) || set.setNumber < 1) {
				return "Hay una serie con numero invalido.";
			}

			if (set.currentWeight !== null && !Number.isFinite( set.currentWeight )) {
				return "El peso de una serie no es valido.";
			}

			if (set.currentReps !== null && !Number.isFinite( set.currentReps )) {
				return "Las repeticiones de una serie no son validas.";
			}
		}
	}

	return null;
}

export function mapStudentRoutineSessionToSaveInput( session: StudentRoutineSession ): StudentRoutineSessionSaveInput {
	return {
		exercises: session.exercises
			.filter( ( exercise ) => exercise.sets.some( ( set ) => set.completed ) )
			.map( ( exercise ) => ( {
				exerciseId: exercise.id,
				variantExerciseId: exercise.variantSelectionExplicit ? exercise.variantExerciseId : null,
				sets: exercise.sets
					.filter( ( set ) => set.completed )
					.slice()
					.sort( ( left, right ) => left.setNumber - right.setNumber )
					.map( ( set ) => ( {
						completed: set.completed,
						currentReps: set.currentReps,
						currentWeight: set.currentWeight,
						notes: set.notes,
						setNumber: set.setNumber,
					} ) ),
			} ) ),
		routineDayId: session.id,
	};
}
