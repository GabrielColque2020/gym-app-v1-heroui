import type { RoutineSaveSummaryItem } from "@/features/role/student/routine/components/shared/routine-save-drawer";
import type { StudentRoutineSession } from "@/features/routine/services/routine-session";

export function formatDateLabel( date: Date | null ) {
	if (!date) return "Sin sesión registrada";

	return new Intl.DateTimeFormat( "es-AR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	} ).format( date );
}

export function buildRoutineSaveSummary( session: StudentRoutineSession ): RoutineSaveSummaryItem[] {
	return session.exercises.map( ( exercise, index ) => {
		const completedSets = exercise.sets.filter( ( set ) => set.completed ).length;
		const selectedVariantName = exercise.variantOptions.find( ( variant ) => variant.id === exercise.variantExerciseId )?.name;

		return {
			completedSets,
			id: exercise.id,
			name: `${ index + 1 }. ${ selectedVariantName ?? exercise.name }`,
			totalSets: exercise.sets.length,
		};
	} );
}

// Una serie esta hecha cuando tiene repeticiones. El peso es opcional: en un
// ejercicio con el peso del cuerpo no hay nada que cargar ahi.
function isSetCompleted( reps: number | null ) {
	return reps !== null;
}

export function updateSessionSet(
	session: StudentRoutineSession,
	exerciseId: string,
	setId: string,
	updates: Partial<{ weight: number | null; reps: number | null; notes: string | null }>,
) {
	return {
		...session,
		exercises: session.exercises.map( ( exercise ) => (
			exercise.id === exerciseId
				? {
					...exercise,
					sets: exercise.sets.map( ( set ) => (
						set.id === setId
							? {
								...set,
								...( updates.reps !== undefined ? { currentReps: updates.reps } : {} ),
								...( updates.weight !== undefined ? { currentWeight: updates.weight } : {} ),
								...( updates.notes !== undefined ? { notes: updates.notes } : {} ),
								completed: isSetCompleted( updates.reps !== undefined ? updates.reps : set.currentReps ),
							}
							: set
					) ),
				}
				: exercise
		) ),
	};
}

export function updateSessionExerciseSets(
	session: StudentRoutineSession,
	exerciseId: string,
	updates: Partial<{ weight: number | null; reps: number | null; notes: string | null }>,
) {
	return {
		...session,
		exercises: session.exercises.map( ( exercise ) => (
			exercise.id === exerciseId
				? {
					...exercise,
					sets: exercise.sets.map( ( set ) => ( {
						...set,
						...( updates.reps !== undefined ? { currentReps: updates.reps } : {} ),
						...( updates.weight !== undefined ? { currentWeight: updates.weight } : {} ),
						...( updates.notes !== undefined ? { notes: updates.notes } : {} ),
						completed: isSetCompleted( updates.reps !== undefined ? updates.reps : set.currentReps ),
					} ) ),
				}
				: exercise
		) ),
	};
}


export function parseWeightInput( value: string ) {
	const nextValue = value.trim() === "" ? null : Number.parseFloat( value.replace( ",", "." ) );

	return nextValue === null || Number.isNaN( nextValue ) ? null : nextValue;
}

export function getExerciseLastSession( exercise: StudentRoutineSession[ "exercises" ][ number ] ) {
	const selectedVariant = exercise.variantOptions.find( ( variant ) => variant.id === exercise.variantExerciseId );

	return selectedVariant?.lastSession ?? exercise.lastSession;
}

export function applyLastSessionToExercise( session: StudentRoutineSession, exerciseId: string ) {
	return {
		...session,
		exercises: session.exercises.map( ( exercise ) => {
			if (exercise.id !== exerciseId) return exercise;

			const lastSets = getExerciseLastSession( exercise )?.sets ?? [];

			if (lastSets.length === 0) return exercise;

			return {
				...exercise,
				sets: exercise.sets.map( ( set ) => {
					const previous = lastSets.find( ( lastSet ) => lastSet.setNumber === set.setNumber )
						?? lastSets[ lastSets.length - 1 ];
					const currentReps = previous.repsCompleted ?? set.currentReps;
					const currentWeight = previous.weightUsed ?? set.currentWeight;

					return {
						...set,
						completed: isSetCompleted( currentReps ),
						currentReps,
						currentWeight,
					};
				} ),
			};
		} ),
	};
}
