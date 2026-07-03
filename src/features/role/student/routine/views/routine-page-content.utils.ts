import type { RoutineSaveSummaryItem } from "@/features/role/student/routine/components/shared/routine-save-sheet";
import type { StudentRoutineSession } from "@/features/routine/services/routine-session";

export function formatDateLabel( date: Date | null ) {
	if (!date) return "Sin sesion registrada";

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
								completed:
									( updates.reps !== undefined ? updates.reps : set.currentReps ) !== null
									&& ( updates.weight !== undefined ? updates.weight : set.currentWeight ) !== null,
							}
							: set
					) ),
				}
				: exercise
		) ),
	};
}
