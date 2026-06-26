"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { StudentRoutineSession, StudentRoutineSet } from "@/features/routine/services/routine-session";
import type {
	ExerciseProgressRoutine,
	ExerciseProgressRoutineOld,
	RoutinePageStudent,
} from "@/features/routine/types/routine.types";
import { mapStudentRoutineSessionDetailToRoutinePages, type StudentRoutineSessionDetail } from "@/features/routine/services/routine-session";

type SetPatch = Partial<Pick<StudentRoutineSet, "currentReps" | "currentWeight" | "notes">>;

type UpdateSetInput = {
	exerciseId: string;
	patch: SetPatch;
	routineDayId: string;
	setId: string;
};

type RoutineSessionStoreState = {
	drafts: Record<string, StudentRoutineSession>;
	hasHydrated: boolean;
	routinePagesByRoutineDayId: Record<string, RoutinePageStudent[]>;
	trainingRoutineNameStore: Record<string, string>;
	clearAll: () => void;
	clearDraft: ( routineDayId: string ) => void;
	existsRoutineByRoutineDayId: ( routineDayId: string ) => boolean;
	getRoutinesByRoutineDayId: ( routineDayId: string ) => RoutinePageStudent[];
	getTrainingRoutineNameStore: ( routineDayId: string ) => string;
	hydrateDraftFromSource: ( routineDayId: string, session: StudentRoutineSession ) => void;
	hydrateRoutinePagesFromSource: ( routineDayId: string, detail: StudentRoutineSessionDetail ) => void;
	setDraft: ( routineDayId: string, session: StudentRoutineSession ) => void;
	setRoutinesByRoutineDayId: ( routineDayId: string, routines: RoutinePageStudent[] ) => void;
	setTrainingRoutineNameStore: ( routineDayId: string, name: string ) => void;
	updateRoutineField: ( routineDayId: string, routineId: string, field: keyof ExerciseProgressRoutine, value: string ) => void;
	updateSet: ( input: UpdateSetInput ) => void;
};

type PersistedDraftExercise = Omit<StudentRoutineSession["exercises"][ number ], "lastSession" | "variantOptions"> & {
	lastSession?: StudentRoutineSession["exercises"][ number ]["lastSession"];
	variantOptions?: StudentRoutineSession["exercises"][ number ]["variantOptions"];
};

type PersistedDraftSession = Omit<StudentRoutineSession, "date" | "exercises"> & {
	date: string;
	exercises: PersistedDraftExercise[];
};

type PersistedRoutinePageStudent = Omit<RoutinePageStudent, "exerciseProgressOld"> & {
	exerciseProgressOld: (Omit<ExerciseProgressRoutineOld, "dayNumber" | "week" | "month" | "year"> & {
		dayNumber: number;
		week: number;
		month: number;
		year: number;
	}) | null;
};

type PersistedStore = {
	drafts: Record<string, PersistedDraftSession>;
	routinePagesByRoutineDayId: Record<string, PersistedRoutinePageStudent[]>;
	trainingRoutineNameStore: Record<string, string>;
};

function updateExerciseSet(
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

function serializeSession( session: StudentRoutineSession ): PersistedDraftSession {
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

function hydrateSession( session: PersistedDraftSession ): StudentRoutineSession {
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

function serializeRoutinePages( routines: RoutinePageStudent[] ): PersistedRoutinePageStudent[] {
	return routines.map( ( routine ) => ( {
		...routine,
		exerciseProgressOld: routine.exerciseProgressOld
			? {
				...routine.exerciseProgressOld,
			}
			: null,
	} ) );
}

function hydrateRoutinePages( routines: PersistedRoutinePageStudent[] ): RoutinePageStudent[] {
	return routines.map( ( routine ) => ( {
		...routine,
		exerciseProgressOld: routine.exerciseProgressOld
			? {
				...routine.exerciseProgressOld,
			}
			: null,
	} ) );
}

function updateRoutinePagesFromSession(
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

export const useRoutineSessionStore = create<RoutineSessionStoreState>()(
	persist(
		( set, get ) => ( {
			drafts: {},
			hasHydrated: false,
			routinePagesByRoutineDayId: {},
			trainingRoutineNameStore: {},
			clearAll: () => {
				set( {
					drafts: {},
					hasHydrated: true,
					routinePagesByRoutineDayId: {},
					trainingRoutineNameStore: {},
				} );
			},
			clearDraft: ( routineDayId ) => {
				set( ( state ) => {
					const nextDrafts = { ...state.drafts };
					const nextPages = { ...state.routinePagesByRoutineDayId };
					const nextNames = { ...state.trainingRoutineNameStore };

					delete nextDrafts[ routineDayId ];
					delete nextPages[ routineDayId ];
					delete nextNames[ routineDayId ];

					return {
						drafts: nextDrafts,
						routinePagesByRoutineDayId: nextPages,
						trainingRoutineNameStore: nextNames,
					};
				} );
			},
			existsRoutineByRoutineDayId: ( routineDayId ) => Boolean( get().routinePagesByRoutineDayId[ routineDayId ] ),
			getRoutinesByRoutineDayId: ( routineDayId ) => get().routinePagesByRoutineDayId[ routineDayId ] ?? [],
			getTrainingRoutineNameStore: ( routineDayId ) => get().trainingRoutineNameStore[ routineDayId ] ?? "",
			hydrateDraftFromSource: ( routineDayId, session ) => {
				const { drafts } = get();

				if (Object.prototype.hasOwnProperty.call( drafts, routineDayId )) {
					return;
				}

				set( ( state ) => ( {
					drafts: {
						...state.drafts,
						[ routineDayId ]: session,
					},
				} ) );
			},
			hydrateRoutinePagesFromSource: ( routineDayId, detail ) => {
				const { routinePagesByRoutineDayId } = get();

				if (Object.prototype.hasOwnProperty.call( routinePagesByRoutineDayId, routineDayId )) {
					return;
				}

				set( ( state ) => ( {
					routinePagesByRoutineDayId: {
						...state.routinePagesByRoutineDayId,
						[ routineDayId ]: mapStudentRoutineSessionDetailToRoutinePages( detail ),
					},
					trainingRoutineNameStore: {
						...state.trainingRoutineNameStore,
						[ routineDayId ]: detail.trainingRoutine.name || `Semana ${ detail.trainingRoutine.week }`,
					},
				} ) );
			},
			setDraft: ( routineDayId, session ) => {
				set( ( state ) => ( {
					drafts: {
						...state.drafts,
						[ routineDayId ]: session,
					},
				} ) );
			},
			setRoutinesByRoutineDayId: ( routineDayId, routines ) => {
				set( ( state ) => ( {
					routinePagesByRoutineDayId: {
						...state.routinePagesByRoutineDayId,
						[ routineDayId ]: routines,
					},
				} ) );
			},
			setTrainingRoutineNameStore: ( routineDayId, name ) => {
				set( ( state ) => ( {
					trainingRoutineNameStore: {
						...state.trainingRoutineNameStore,
						[ routineDayId ]: name,
					},
				} ) );
			},
			updateRoutineField: ( routineDayId, routineId, field, value ) => {
				set( ( state ) => {
					const routines = state.routinePagesByRoutineDayId[ routineDayId ] ?? [];

					return {
						routinePagesByRoutineDayId: {
							...state.routinePagesByRoutineDayId,
							[ routineDayId ]: routines.map( ( routine ) => (
								routine.id === routineId && routine.exerciseProgress
									? {
										...routine,
										exerciseProgress: {
											...routine.exerciseProgress,
											[ field ]: value,
										},
									}
									: routine
							) ),
						},
					};
				} );
			},
			updateSet: ( { exerciseId, patch, routineDayId, setId } ) => {
				set( ( state ) => {
					const currentSession = state.drafts[ routineDayId ];
					if (!currentSession) return state;
					const currentPages = state.routinePagesByRoutineDayId[ routineDayId ] ?? [];

					const nextSession: StudentRoutineSession = {
						...currentSession,
						exercises: currentSession.exercises.map( ( exercise ) => (
							exercise.id === exerciseId
								? updateExerciseSet( exercise, setId, patch )
								: exercise
						) ),
					};

					return {
						drafts: {
							...state.drafts,
							[ routineDayId ]: nextSession,
						},
						routinePagesByRoutineDayId: {
							...state.routinePagesByRoutineDayId,
							[ routineDayId ]: updateRoutinePagesFromSession( nextSession, currentPages ),
						},
					};
				} );
			},
		} ),
		{
			name: "routineExerciseProgress-storage",
			storage: createJSONStorage( () => localStorage ),
			partialize: ( state ): PersistedStore => ( {
				drafts: Object.fromEntries(
					Object.entries( state.drafts ).map( ( [ routineDayId, session ] ) => [
						routineDayId,
						serializeSession( session ),
					] ),
				),
				routinePagesByRoutineDayId: Object.fromEntries(
					Object.entries( state.routinePagesByRoutineDayId ).map( ( [ routineDayId, routines ] ) => [
						routineDayId,
						serializeRoutinePages( routines ),
					] ),
				),
				trainingRoutineNameStore: state.trainingRoutineNameStore,
			} ),
			version: 2,
			migrate: ( persisted ) => {
				const legacy = persisted as Partial<{
					drafts: Record<string, PersistedDraftSession>;
					routinePagesByRoutineDayId: Record<string, PersistedRoutinePageStudent[]>;
					trainingRoutineNameStore: Record<string, string>;
				}>;

				return {
					drafts: Object.fromEntries(
						Object.entries( legacy.drafts ?? {} ).map( ( [ routineDayId, session ] ) => [
							routineDayId,
							hydrateSession( session ),
						] ),
					),
					routinePagesByRoutineDayId: Object.fromEntries(
						Object.entries( legacy.routinePagesByRoutineDayId ?? {} ).map( ( [ routineDayId, routines ] ) => [
							routineDayId,
							hydrateRoutinePages( routines ),
						] ),
					),
					trainingRoutineNameStore: legacy.trainingRoutineNameStore ?? {},
				};
			},
			merge: ( persisted, current ) => {
				const next = persisted as Partial<PersistedStore>;

				return {
					...current,
					drafts: Object.fromEntries(
						Object.entries( next.drafts ?? {} ).map( ( [ routineDayId, session ] ) => [
							routineDayId,
							hydrateSession( session ),
						] ),
					),
					routinePagesByRoutineDayId: Object.fromEntries(
						Object.entries( next.routinePagesByRoutineDayId ?? {} ).map( ( [ routineDayId, routines ] ) => [
							routineDayId,
							hydrateRoutinePages( routines ),
						] ),
					),
					trainingRoutineNameStore: next.trainingRoutineNameStore ?? {},
				};
			},
			onRehydrateStorage: () => ( state ) => {
				if (state) {
					state.hasHydrated = true;
				}
			},
		},
	),
);
