"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { StudentRoutineSession, StudentRoutineSet } from "@/features/routine/services/routine-session";
import type {
	ExerciseProgressRoutine,
	RoutinePageStudent,
} from "@/features/routine/types/routine-types";
import {
	mapStudentRoutineSessionDetailToRoutinePages,
	mergeStudentRoutineSessionDraft,
	type StudentRoutineSessionDetail,
} from "@/features/routine/services/routine-session";
import {
	hydrateRoutinePages,
	hydrateSession,
	type PersistedDraftSession,
	type PersistedRoutinePageStudent,
	type PersistedRoutineSessionStore,
	serializeRoutinePages,
	serializeSession,
	updateExerciseSet,
	updateRoutinePagesFromSession,
} from "@/features/routine/stores/routine-session-store.utils";

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
	syncDraftFromSource: ( routineDayId: string, detail: StudentRoutineSessionDetail, session: StudentRoutineSession ) => void;
	setDraft: ( routineDayId: string, session: StudentRoutineSession ) => void;
	setRoutinesByRoutineDayId: ( routineDayId: string, routines: RoutinePageStudent[] ) => void;
	setTrainingRoutineNameStore: ( routineDayId: string, name: string ) => void;
	updateRoutineField: ( routineDayId: string, routineId: string, field: keyof ExerciseProgressRoutine, value: string ) => void;
	updateSet: ( input: UpdateSetInput ) => void;
};

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
			syncDraftFromSource: ( routineDayId, detail, session ) => {
				set( ( state ) => {
					const currentDraft = state.drafts[ routineDayId ] ?? null;
					const nextDraft = mergeStudentRoutineSessionDraft( session, currentDraft );

					return {
						drafts: {
							...state.drafts,
							[ routineDayId ]: nextDraft,
						},
						routinePagesByRoutineDayId: {
							...state.routinePagesByRoutineDayId,
							[ routineDayId ]: mapStudentRoutineSessionDetailToRoutinePages( detail ),
						},
						trainingRoutineNameStore: {
							...state.trainingRoutineNameStore,
							[ routineDayId ]: session.title || `Semana ${ detail.trainingRoutine.week }`,
						},
					};
				} );
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
			partialize: ( state ): PersistedRoutineSessionStore => ( {
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
				const next = persisted as Partial<PersistedRoutineSessionStore>;

				return {
					...current,
					drafts: Object.fromEntries(
						Object.entries( ( next.drafts ?? {} ) as Record<string, PersistedDraftSession> ).map( ( [ routineDayId, session ] ) => [
							routineDayId,
							hydrateSession( session ),
						] ),
					),
					routinePagesByRoutineDayId: Object.fromEntries(
						Object.entries(
							( next.routinePagesByRoutineDayId ?? {} ) as Record<string, PersistedRoutinePageStudent[]>,
						).map( ( [ routineDayId, routines ] ) => [
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
