import type { AdminRoutineDayDetail } from "@/features/admin/routine/actions/get-routine-day";
import { formatBodyPart } from "@/features/admin/exercises/services/exercise-form";
import type {
	ExerciseProgressRoutine,
	ExerciseProgressRoutineOld,
	RoutinePageStudent,
	ExerciseSessionHistory,
	ExerciseSessionHistorySet,
} from "@/features/student/routine/types/routine.types";

export type StudentRoutineProgressEntry = {
	date: Date | string;
	exerciseId: string;
	id: string;
	notes: string | null;
	dayNumber: number;
	month: number;
	variantExerciseId: string | null;
	week: number;
	year: number;
	repsCompleted: string;
	setsCompleted: string;
	weightUsed: string;
};

export type StudentRoutineSet = {
	completed: boolean;
	currentReps: number | null;
	currentWeight: number | null;
	id: string;
	notes: string | null;
	previousReps: number | null;
	previousWeight: number | null;
	setNumber: number;
	targetReps: number;
};

export type StudentRoutineExercise = {
	equipment: string;
	id: string;
	baseName: string;
	muscleGroup: string;
	name: string;
	notes?: string;
	lastSession: StudentRoutineSessionHistory | null;
	variantExerciseId: string | null;
	restTime: number;
	sets: StudentRoutineSet[];
	variantOptions: StudentRoutineVariantOption[];
};

export type StudentRoutineVariantOption = {
	active: boolean;
	bodyPart: string;
	id: string;
	lastSession: StudentRoutineSessionHistory | null;
	name: string;
};

export type StudentRoutineSessionHistorySet = ExerciseSessionHistorySet;

export type StudentRoutineSessionHistory = ExerciseSessionHistory;

export type StudentRoutineSession = {
	completed: boolean;
	date: Date;
	dayNumber: number;
	exercises: StudentRoutineExercise[];
	id: string;
	title: string;
};

export type StudentRoutineSessionDetail = AdminRoutineDayDetail & {
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

// Convierte un valor de progreso en un numero entero o nulo.
function toHistoryInteger( value: string | number | null | undefined ) {
	return parseInteger( value );
}

// Convierte un valor de progreso en un numero decimal o nulo.
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

// Agrupa las filas de progreso por la fecha de sesion para reconstruir la ultima sesion registrada.
function getSessionKey( entry: StudentRoutineProgressEntry ) {
	return `${ entry.year }-${ entry.month }-${ entry.week }-${ entry.dayNumber }`;
}

// Reconvierte una lista de filas de progreso en una sesion historica util para la UI.
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
		const sets = orderedEntries
			.map( ( entry ) => {
				const parsedNotes = parseProgressNotes( entry.notes );
				const repsCompleted = toHistoryInteger( entry.repsCompleted );
				const weightUsed = toHistoryDecimal( entry.weightUsed );

				return {
					completed: repsCompleted !== null || weightUsed !== null,
					notes: parsedNotes.notes,
					repsCompleted,
					setNumber: parsedNotes.setNumber ?? 0,
					weightUsed,
				};
			} )
			.sort( ( left, right ) => left.setNumber - right.setNumber );

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
	setNumber: number | null;
};

function parseProgressNotes( notes: string | null ): ParsedProgressNotes {
	if (!notes) {
		return {
			notes: null,
			setNumber: null,
		};
	}

	try {
		const parsed = JSON.parse( notes ) as Partial<{ notes: string | null; setNumber: number }>;
		const parsedSetNumber: number | null = typeof parsed.setNumber === "number" ? parsed.setNumber : null;
		const setNumber: number | null = Number.isInteger( parsedSetNumber ) ? parsedSetNumber : null;

		return {
			notes: typeof parsed.notes === "string" ? parsed.notes : null,
			setNumber,
		};
	} catch {
		return {
			notes,
			setNumber: null,
		};
	}
}

function sortByDateDesc( left: StudentRoutineProgressEntry, right: StudentRoutineProgressEntry ) {
	return new Date( right.date ).getTime() - new Date( left.date ).getTime();
}

// Recolecta el historial registrado para una variante concreta del ejercicio.
function getProgressEntriesByVariant(
	detail: StudentRoutineSessionDetail,
	variantExerciseId: string,
) {
	return detail.progressEntries
		.filter( ( entry ) => entry.variantExerciseId === variantExerciseId || entry.exerciseId === variantExerciseId )
		.sort( sortByDateDesc );
}

// Recolecta el historial del slot base y sus variantes para reconstruir la sesion actual.
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

// Busca el ultimo registro guardado para una serie concreta dentro de un ejercicio.
function getLatestProgressEntryBySetNumber(
	entries: StudentRoutineProgressEntry[],
	setNumber: number,
) {
	return [ ...entries ]
		.sort( sortByDateDesc )
		.find( ( entry ) => parseProgressNotes( entry.notes ).setNumber === setNumber ) ?? null;
}

// Devuelve la variante activa a partir del ultimo progreso guardado para el slot.
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
			const lastSession = buildSessionHistory( progressEntries );
			const setCount = Math.max(
				parseInteger( routine.sets ) ?? progressEntries.length ?? 1,
				1,
			);
			const currentSets = Array.from( { length: setCount }, ( _, index ) => {
				const setNumber = index + 1;
				const savedSet = getLatestProgressEntryBySetNumber( progressEntries, setNumber );
				const savedSetNotes = parseProgressNotes( savedSet?.notes ?? null ).notes;
				const currentReps = parseInteger( savedSet?.repsCompleted );
				const currentWeight = parseDecimal( savedSet?.weightUsed );
				const hasCurrentValues = currentReps !== null || currentWeight !== null;
				const previousReps = savedSet ? currentReps : null;
				const previousSeriesWeight = savedSet ? currentWeight : null;

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
				variantExerciseId: exercise.variantExerciseId,
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
