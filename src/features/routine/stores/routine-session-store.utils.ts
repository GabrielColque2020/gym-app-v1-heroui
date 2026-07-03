import type { StudentRoutineSession } from "@/features/routine/services/routine-session";
import type {
	ExerciseProgressRoutineOld,
	RoutinePageStudent,
} from "@/features/routine/types/routine-progress.types";

type PersistedDraftExercise = Omit<StudentRoutineSession["exercises"][ number ], "lastSession" | "variantOptions"> & {
	lastSession?: StudentRoutineSession["exercises"][ number ]["lastSession"];
	variantOptions?: StudentRoutineSession["exercises"][ number ]["variantOptions"];
};

export type PersistedDraftSession = Omit<StudentRoutineSession, "date" | "exercises"> & {
	date: string;
	exercises: PersistedDraftExercise[];
};

export type PersistedRoutinePageStudent = Omit<RoutinePageStudent, "exerciseProgressOld"> & {
	exerciseProgressOld: (Omit<ExerciseProgressRoutineOld, "dayNumber" | "week" | "month" | "year"> & {
		dayNumber: number;
		week: number;
		month: number;
		year: number;
	}) | null;
};

export type PersistedRoutineSessionStore = {
	drafts: Record<string, PersistedDraftSession>;
	routinePagesByRoutineDayId: Record<string, PersistedRoutinePageStudent[]>;
	trainingRoutineNameStore: Record<string, string>;
};

type SetPatch = Partial<
	Pick<
		StudentRoutineSession["exercises"][ number ]["sets"][ number ],
		"currentReps" | "currentWeight" | "notes"
	>
>;

export function updateExerciseSet(
	exercise: StudentRoutineSession["exercises"][ number ],
	setId: string,
	patch: SetPatch,
) {
	return {
		...exercise,
		sets: exercise.sets.map( ( set ) => (
			set.id === setId
				? {
					...set,
					...( patch.currentReps !== undefined ? { currentReps: patch.currentReps } : {} ),
					...( patch.currentWeight !== undefined ? { currentWeight: patch.currentWeight } : {} ),
					...( patch.notes !== undefined ? { notes: patch.notes } : {} ),
					completed: (
						( patch.currentReps !== undefined ? patch.currentReps : set.currentReps ) !== null
						&& ( patch.currentWeight !== undefined ? patch.currentWeight : set.currentWeight ) !== null
					),
				}
				: set
		) ),
	};
}

export function serializeSession( session: StudentRoutineSession ): PersistedDraftSession {
	return {
		completed: session.completed,
		date: session.date.toISOString(),
		dayNumber: session.dayNumber,
		exercises: session.exercises.map( ( exercise ) => ( {
			equipment: exercise.equipment,
			id: exercise.id,
			baseName: exercise.baseName,
			muscleGroup: exercise.muscleGroup,
			name: exercise.name,
			variantExerciseId: exercise.variantExerciseId,
			variantSelectionExplicit: exercise.variantSelectionExplicit,
			notes: exercise.notes,
			restTime: exercise.restTime,
			sets: exercise.sets.map( ( set ) => ( {
				completed: set.completed,
				currentReps: set.currentReps,
				currentWeight: set.currentWeight,
				id: set.id,
				notes: set.notes,
				previousReps: set.previousReps,
				previousWeight: set.previousWeight,
				setNumber: set.setNumber,
				targetReps: set.targetReps,
			} ) ),
		} ) ),
		id: session.id,
		title: session.title,
	};
}

export function hydrateSession( session: PersistedDraftSession ): StudentRoutineSession {
	return {
		...session,
		date: new Date( session.date ),
		exercises: session.exercises.map( ( exercise ) => ( {
			...exercise,
			baseName: exercise.baseName ?? exercise.name,
			lastSession: exercise.lastSession ?? null,
			variantExerciseId: exercise.variantExerciseId ?? null,
			variantSelectionExplicit: exercise.variantSelectionExplicit ?? false,
			variantOptions: exercise.variantOptions ?? [],
		} ) ),
	};
}

export function serializeRoutinePages( routines: RoutinePageStudent[] ): PersistedRoutinePageStudent[] {
	return routines.map( ( routine ) => ( {
		...routine,
		exerciseProgressOld: routine.exerciseProgressOld
			? {
				...routine.exerciseProgressOld,
			}
			: null,
	} ) );
}

export function hydrateRoutinePages( routines: PersistedRoutinePageStudent[] ): RoutinePageStudent[] {
	return routines.map( ( routine ) => ( {
		...routine,
		exerciseProgressOld: routine.exerciseProgressOld
			? {
				...routine.exerciseProgressOld,
			}
			: null,
	} ) );
}

export function updateRoutinePagesFromSession(
	session: StudentRoutineSession,
	currentPages: RoutinePageStudent[],
) {
	return session.exercises.map( ( exercise ) => {
		const existingPage = currentPages.find( ( page ) => page.id === exercise.id );
		const hasCurrentProgress = exercise.sets.some( ( set ) =>
			set.currentReps !== null || set.currentWeight !== null || set.completed,
		);

		return {
			dayNumber: existingPage?.dayNumber ?? session.dayNumber,
			exerciseProgress: hasCurrentProgress
				? {
					exerciseId: exercise.id,
					notes: exercise.notes ?? null,
					repsCompleted: String( exercise.sets.reduce( ( total, set ) => total + ( set.currentReps ?? 0 ), 0 ) ),
					setsCompleted: String( exercise.sets.filter( ( set ) => set.completed ).length ),
					weightUsed: String( exercise.sets.reduce( ( total, set ) => Math.max( total, set.currentWeight ?? 0 ), 0 ) ),
				}
				: null,
			exerciseProgressOld: existingPage?.exerciseProgressOld ?? null,
			id: exercise.id,
			month: existingPage?.month ?? 0,
			observation: exercise.muscleGroup,
			routineName: session.title,
			tips: exercise.notes ?? "",
			week: existingPage?.week ?? 0,
			year: existingPage?.year ?? 0,
		};
	} );
}
