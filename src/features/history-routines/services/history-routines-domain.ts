import type {
	HistoryProgressEntry,
	HistoryRoutineExercise,
	HistoryRoutineSet,
} from "@/features/history-routines/types/history-routines";

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

export function getProgressRepsNumber( entry: Pick<HistoryProgressEntry, "notes" | "repsNumber"> ) {
	if (Number.isInteger( entry.repsNumber )) {
		return entry.repsNumber;
	}

	return parseProgressNotes( entry.notes ).repsNumber;
}

export function parseInteger( value: string | null ) {
	if (!value) return null;

	const parsed = Number.parseInt( value.trim(), 10 );

	return Number.isFinite( parsed ) ? parsed : null;
}

export function parseDecimal( value: string | null ) {
	if (!value) return null;

	const parsed = Number.parseFloat( value.trim() );

	return Number.isFinite( parsed ) ? parsed : null;
}

export function formatDefaultTitle( week: number, dayNumber: number ) {
	return `Semana ${ week } - Dia ${ dayNumber }`;
}

export function formatDefaultDescription( objective?: string | null, name?: string | null ) {
	return [ objective?.trim(), name?.trim() ]
		.filter( Boolean )
		.join( " - " ) || "Sin descripcion cargada";
}

export function buildHistoryRoutineExercise(
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

	const sets: HistoryRoutineSet[] = exerciseEntries
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
