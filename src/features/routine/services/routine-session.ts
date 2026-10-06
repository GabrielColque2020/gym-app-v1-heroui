import { formatBodyPart } from "@/features/exercises/services/exercise-formatters";
import {
	buildSessionHistory,
	getCurrentProgressEntriesByExercise,
	getLatestProgressEntryBySetNumber,
	getPreviousProgressEntryBySetNumber,
	getProgressEntriesByExercise,
	getProgressEntriesBySlot,
	getProgressEntriesByVariant,
	getSessionKey,
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

function pickFirstText( ...values: Array<string | null | undefined> ) {
	return values.find( ( value ) => value?.trim() )?.trim() ?? null;
}

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

// Cuando empezo a cargarse este dia: la fecha de su registro mas viejo.
function getOwnSessionStart( detail: StudentRoutineSessionDetail ) {
	const ownSessionKey = getSessionKey( {
		dayNumber: detail.dayNumber,
		month: detail.trainingRoutine.month,
		week: detail.trainingRoutine.week,
		year: detail.trainingRoutine.year,
	} );
	const ownDates = detail.progressEntries
		.filter( ( entry ) => getSessionKey( entry ) === ownSessionKey )
		.map( ( entry ) => new Date( entry.date ).getTime() );

	return {
		ownSessionKey,
		ownSessionStart: ownDates.length > 0 ? Math.min( ...ownDates ) : null,
	};
}

export function mapStudentRoutineSessionDetailToSession( detail: StudentRoutineSessionDetail ): StudentRoutineSession {
	// La "sesion anterior" de un ejercicio es la ultima que se hizo antes de este
	// dia. Sin este filtro incluia al propio dia (mostraba como anterior lo que se
	// acababa de cargar) y, en un dia viejo, sesiones hechas despues.
	const { ownSessionKey, ownSessionStart } = getOwnSessionStart( detail );
	const isEarlierSession = ( entry: StudentRoutineSessionDetail["progressEntries"][ number ] ) =>
		getSessionKey( entry ) !== ownSessionKey
		&& ( ownSessionStart === null || new Date( entry.date ).getTime() < ownSessionStart );
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
			const historyExerciseEntries = (
				selectedVariant
					? getProgressEntriesByVariant( detail, selectedVariant.id )
					: getProgressEntriesByExercise( detail, exerciseId )
			).filter( isEarlierSession );
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
				// El historial ya no incluye este dia: la anterior es la primera que aparece.
				const previousSavedSet = getPreviousProgressEntryBySetNumber( historyExerciseEntries, null, setNumber );
				const savedSetNotes = parseProgressNotes( savedSet?.notes ?? null ).notes;
				const currentReps = parseInteger( savedSet?.repsCompleted );
				const currentWeight = parseDecimal( savedSet?.weightUsed );
				const previousReps = parseInteger( previousSavedSet?.repsCompleted );
				const previousSeriesWeight = parseDecimal( previousSavedSet?.weightUsed );

				return {
					// Una serie ya guardada cuenta como hecha tal como quedo, aunque sea un
					// registro viejo sin peso: si no, al corregir otra serie del dia esa se
					// descartaria. Lo requerido (repeticiones y peso) se exige al cargar.
					completed: currentReps !== null || currentWeight !== null,
					currentReps,
					currentWeight,
					// Id fijo por ejercicio y numero de serie, y no el del registro guardado:
					// asi la serie no cambia de id al guardarse por primera vez y el campo
					// que el estudiante esta escribiendo no pierde el foco.
					id: `${ exerciseId }-${ setNumber }`,
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
				imageUrl: pickFirstText(
					routine.exercise?.imageUrl,
					routine.exercise?.globalExercise?.imageUrl,
				),
				instructions: pickFirstText(
					routine.exercise?.instructions,
					routine.exercise?.globalExercise?.instructions,
				),
				coachNote: routine.observation?.trim() || null,
				muscleGroup: routine.observation ?? detail.trainingRoutine.objective ?? "",
				name: selectedVariant?.name ?? exercise?.name ?? "Ejercicio",
				notes: exercise?.tips ?? routine.observation ?? undefined,
				lastSession,
				originalVariantExerciseId: variantExerciseId,
				variantExerciseId,
				variantSelectionExplicit: false,
				restTime: Math.max( setCount * 30, 0 ),
				sets: currentSets,
				videoUrl: pickFirstText(
					routine.exercise?.videoUrl,
					routine.exercise?.globalExercise?.videoUrl,
				),
				variantOptions: routine.variants.map( ( variant ) => ( {
					active: variant.variantExercise.active,
					bodyPart: variant.variantExercise.bodyPart,
					id: variant.variantExercise.id,
					imageUrl: pickFirstText(
						variant.variantExercise.imageUrl,
						variant.variantExercise.globalExercise?.imageUrl,
					),
					instructions: pickFirstText(
						variant.variantExercise.instructions,
						variant.variantExercise.globalExercise?.instructions,
					),
					lastSession: buildSessionHistory(
						getProgressEntriesByVariant( detail, variant.variantExercise.id ).filter( isEarlierSession ),
					),
					name: variant.variantExercise.name,
					videoUrl: pickFirstText(
						variant.variantExercise.videoUrl,
						variant.variantExercise.globalExercise?.videoUrl,
					),
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
				originalVariantExerciseId: sourceExercise.originalVariantExerciseId ?? null,
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
					imageUrl: variant.imageUrl ?? null,
					instructions: variant.instructions ?? null,
					lastSession: serializeSessionHistory( variant.lastSession ),
					name: variant.name,
					videoUrl: variant.videoUrl ?? null,
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
				originalVariantExerciseId: exercise.originalVariantExerciseId ?? null,
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
		return "Seleccioná un día válido antes de guardar.";
	}

	if (session.exercises.length === 0) {
		return "No hay ejercicios para guardar.";
	}

	for (const exercise of session.exercises) {
		if (!exercise.id.trim()) {
			return "Hay un ejercicio sin identificador válido.";
		}

		for (const set of exercise.sets) {
			if (!Number.isInteger( set.setNumber ) || set.setNumber < 1) {
				return "Hay una serie con número inválido.";
			}

			if (set.currentWeight !== null && !Number.isFinite( set.currentWeight )) {
				return "El peso de una serie no es válido.";
			}

			if (set.currentReps !== null && !Number.isFinite( set.currentReps )) {
				return "Las repeticiones de una serie no son válidas.";
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
				// Siempre la variante que se esta mostrando, la haya elegido ahora o
				// venga de antes: mandarla solo cuando se acaba de elegir hacia que el
				// guardado siguiente la borrara.
				variantExerciseId: exercise.variantExerciseId ?? null,
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
