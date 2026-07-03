import { formatBodyPart } from "@/features/exercises/services/exercise-formatters";
import {
	buildSessionHistory,
	getCurrentProgressEntriesByExercise,
	getLatestProgressEntryBySetNumber,
	getPreviousProgressEntryBySetNumber,
	getProgressEntriesByExercise,
	getProgressEntriesBySlot,
	getProgressEntriesByVariant,
	getVariantExerciseId,
	parseDecimal,
	parseInteger,
	parseProgressNotes,
} from "@/features/routine/services/routine-session-progress";
import type {
	StudentRoutineExercise,
	StudentRoutineSession,
	StudentRoutineSessionDetail,
	StudentRoutineSessionHistory,
	StudentRoutineSessionSaveInput,
	StudentRoutineVariantOption,
} from "@/features/routine/services/routine-session.types";
import type {
	ExerciseProgressRoutine,
	RoutinePageStudent,
} from "@/features/routine/types/routine-progress.types";
export type {
	StudentRoutineExercise,
	StudentRoutineProgressEntry,
	StudentRoutineSession,
	StudentRoutineSessionDetail,
	StudentRoutineSessionHistory,
	StudentRoutineSessionHistorySet,
	StudentRoutineSessionSaveExercise,
	StudentRoutineSessionSaveInput,
	StudentRoutineSessionSaveSet,
	StudentRoutineSet,
	StudentRoutineVariantOption,
} from "@/features/routine/services/routine-session.types";

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

function mergeStudentRoutineSessionSets(
	sourceSets: StudentRoutineSession["exercises"][ number ]["sets"],
	draftSets: StudentRoutineSession["exercises"][ number ]["sets"],
) {
	const draftSetsByNumber = new Map( draftSets.map( ( set ) => [ set.setNumber, set ] ) );

	return sourceSets.map( ( sourceSet ) => {
		const draftSet = draftSetsByNumber.get( sourceSet.setNumber );

		if (!draftSet) {
			return sourceSet;
		}

		return {
			...sourceSet,
			completed: draftSet.completed,
			currentReps: draftSet.currentReps,
			currentWeight: draftSet.currentWeight,
			notes: draftSet.notes,
		};
	} );
}

export function mergeStudentRoutineSessionDraft(
	sourceSession: StudentRoutineSession,
	draftSession: StudentRoutineSession | null,
) {
	if (!draftSession) {
		return sourceSession;
	}

	const draftExercisesById = new Map( draftSession.exercises.map( ( exercise ) => [ exercise.id, exercise ] ) );

	return {
		...sourceSession,
		exercises: sourceSession.exercises.map( ( sourceExercise ) => {
			const draftExercise = draftExercisesById.get( sourceExercise.id );
			const sourceVariantOptions = sourceExercise.variantOptions ?? [];
			const sourceVariantIds = new Set( sourceVariantOptions.map( ( variant ) => variant.id ) );
			const draftVariantId = draftExercise?.variantExerciseId ?? null;
			const sourceVariantId = sourceExercise.variantExerciseId ?? null;
			const resolvedVariantId = draftVariantId && sourceVariantIds.has( draftVariantId )
				? draftVariantId
				: sourceVariantId && sourceVariantIds.has( sourceVariantId )
					? sourceVariantId
					: null;
			const resolvedVariant = resolvedVariantId
				? sourceVariantOptions.find( ( variant ) => variant.id === resolvedVariantId ) ?? null
				: null;

			if (!draftExercise) {
				return sourceExercise;
			}

			return {
				...sourceExercise,
				baseName: draftExercise.baseName ?? sourceExercise.baseName,
				lastSession: sourceExercise.lastSession ?? draftExercise.lastSession ?? null,
				name: resolvedVariant?.name ?? sourceExercise.name,
				notes: draftExercise.notes ?? sourceExercise.notes,
				restTime: draftExercise.restTime ?? sourceExercise.restTime,
				sets: mergeStudentRoutineSessionSets( sourceExercise.sets, draftExercise.sets ),
				variantExerciseId: resolvedVariantId,
				variantSelectionExplicit: resolvedVariantId
					? draftExercise.variantSelectionExplicit || sourceExercise.variantSelectionExplicit || false
					: false,
				variantOptions: sourceVariantOptions,
			};
		} ),
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
