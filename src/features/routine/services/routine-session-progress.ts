import type {
	StudentRoutineProgressEntry,
	StudentRoutineSessionDetail,
	StudentRoutineSessionHistory,
} from "@/features/routine/services/routine-session.types";

type ParsedProgressNotes = {
	notes: string | null;
	repsNumber: number | null;
};

export function parseInteger( value: string | number | null | undefined ) {
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

export function parseDecimal( value: string | number | null | undefined ) {
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

export function parseProgressNotes( notes: string | null ): ParsedProgressNotes {
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

export function getProgressRepsNumber( entry: StudentRoutineProgressEntry ) {
	return Number.isInteger( entry.repsNumber ) ? entry.repsNumber : parseProgressNotes( entry.notes ).repsNumber;
}

export function getSessionKey( entry: Pick<StudentRoutineProgressEntry, "year" | "month" | "week" | "dayNumber"> ) {
	return `${ entry.year }-${ entry.month }-${ entry.week }-${ entry.dayNumber }`;
}

export function sortByDateDesc( left: StudentRoutineProgressEntry, right: StudentRoutineProgressEntry ) {
	return new Date( right.date ).getTime() - new Date( left.date ).getTime();
}

function toHistoryInteger( value: string | number | null | undefined ) {
	return parseInteger( value );
}

function toHistoryDecimal( value: string | number | null | undefined ) {
	return parseDecimal( value );
}

export function buildSessionHistory( entries: StudentRoutineProgressEntry[] ): StudentRoutineSessionHistory | null {
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

export function getProgressEntriesByVariant(
	detail: StudentRoutineSessionDetail,
	variantExerciseId: string,
) {
	return detail.progressEntries
		.filter( ( entry ) => entry.variantExerciseId === variantExerciseId || entry.exerciseId === variantExerciseId )
		.sort( sortByDateDesc );
}

export function getProgressEntriesByExercise(
	detail: StudentRoutineSessionDetail,
	exerciseId: string,
) {
	return detail.progressEntries
		.filter( ( entry ) => entry.exerciseId === exerciseId )
		.sort( sortByDateDesc );
}

export function getCurrentProgressEntriesByExercise(
	detail: StudentRoutineSessionDetail,
	exerciseId: string,
	variantExerciseId: string | null,
) {
	const currentSessionKey = getSessionKey( {
		dayNumber: detail.dayNumber,
		month: detail.trainingRoutine.month,
		week: detail.trainingRoutine.week,
		year: detail.trainingRoutine.year,
	} );
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

export function getProgressEntriesBySlot(
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

export function getLatestProgressEntry( entries: StudentRoutineProgressEntry[] ) {
	return [ ...entries ].sort( sortByDateDesc )[ 0 ] ?? null;
}

export function getLatestProgressEntryBySetNumber(
	entries: StudentRoutineProgressEntry[],
	setNumber: number,
) {
	return [ ...entries ]
		.sort( sortByDateDesc )
		.find( ( entry ) => getProgressRepsNumber( entry ) === setNumber ) ?? null;
}

export function getPreviousProgressEntryBySetNumber(
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

export function getVariantExerciseId(
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
