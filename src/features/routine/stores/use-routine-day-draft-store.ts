"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import type { RoutineDayExercise } from "@/features/routine/services/routine-day-detail";
import type { DayExercise } from "@/features/routine/services/routine-day-editor";
import {
	createDraftRoutineExercise,
	getNextRoutineExerciseOrder,
	mapRoutineExercisesToDraft,
	sortDraftRoutineExercises,
	validateRoutineDayDraft,
} from "@/features/routine/services/routine-day-editor";

type DayExercisePatch = Pick<DayExercise, "observation" | "order" | "reps" | "sets">;

type SetDraftResult =
	| { error: string; routine?: never }
	| { error?: never; routine: DayExercise };

type UpdateExerciseParams = {
	clientId: string;
	patch: Partial<DayExercisePatch>;
	routineDayId: string;
};

type AddExerciseParams = {
	exercise: ExerciseListItem;
	order: number;
	routineDayId: string;
};

type RoutineDayDraftStoreState = {
	hasHydrated: boolean;
	drafts: Record<string, DayExercise[]>;
	clearAllDrafts: () => void;
	setDraft: ( routineDayId: string, draft: DayExercise[] ) => void;
	hydrateDraftFromSource: ( routineDayId: string, routines: RoutineDayExercise[] ) => void;
	updateExercise: ( params: UpdateExerciseParams ) => void;
	addExercise: ( params: AddExerciseParams ) => SetDraftResult;
	removeExercise: ( routineDayId: string, clientId: string ) => void;
	clearDraft: ( routineDayId: string ) => void;
};

const initialState = {
	drafts: {},
	hasHydrated: false,
} satisfies Pick<RoutineDayDraftStoreState, "drafts" | "hasHydrated">;

let markRoutineDayDraftsHydrated: (() => void) | null = null;

function sortAndValidateDraft( draft: DayExercise[] ) {
	const nextDraft = sortDraftRoutineExercises( draft );
	const validationError = validateRoutineDayDraft( nextDraft );

	return {
		draft: nextDraft,
		validationError,
	};
}

export const useRoutineDayDraftStore = create<RoutineDayDraftStoreState>()(
	persist(
		( set, get ) => {
			markRoutineDayDraftsHydrated = () => {
				set( { hasHydrated: true } );
			};

			return {
				...initialState,
				clearAllDrafts: () => {
					set( {
						drafts: {},
						hasHydrated: true,
					} );
				},
				setDraft: ( routineDayId, draft ) => {
					set( ( state ) => ( {
						drafts: {
							...state.drafts,
							[ routineDayId ]: sortDraftRoutineExercises( draft ),
						},
					} ) );
				},
				hydrateDraftFromSource: ( routineDayId, routines ) => {
					const { drafts } = get();

					if (Object.prototype.hasOwnProperty.call( drafts, routineDayId )) return;

					set( ( state ) => ( {
						drafts: {
							...state.drafts,
							[ routineDayId ]: mapRoutineExercisesToDraft( routines ),
						},
					} ) );
				},
				updateExercise: ( { clientId, patch, routineDayId } ) => {
					set( ( state ) => {
						const currentDraft = state.drafts[ routineDayId ] ?? [];
						const nextDraft = currentDraft.map( ( routine ) => (
							routine.clientId === clientId
								? {
									...routine,
									...patch,
									order: patch.order ?? routine.order,
									observation: patch.observation ?? routine.observation,
									reps: patch.reps ?? routine.reps,
									sets: patch.sets ?? routine.sets,
								}
								: routine
						) );
						const { draft, validationError } = sortAndValidateDraft( nextDraft );

						if (validationError) {
							return state;
						}

						return {
							drafts: {
								...state.drafts,
								[ routineDayId ]: draft,
							},
						};
					} );
				},
				addExercise: ( { exercise, order, routineDayId } ) => {
					const currentDraft = get().drafts[ routineDayId ] ?? [];

					if (currentDraft.some( ( routine ) => routine.exerciseId === exercise.id )) {
						return {
							error: "No puede agregar el mismo ejercicio mas de una vez en el mismo dia.",
						};
					}

					const nextRoutine = createDraftRoutineExercise( exercise, order );
					const nextDraft = [ ...currentDraft, nextRoutine ];
					const { draft, validationError } = sortAndValidateDraft( nextDraft );

					if (validationError) {
						return {
							error: validationError,
						};
					}

					set( ( state ) => ( {
						drafts: {
							...state.drafts,
							[ routineDayId ]: draft,
						},
					} ) );

					return {
						routine: draft.find( ( routine ) => routine.clientId === nextRoutine.clientId ) ?? nextRoutine,
					};
				},
				removeExercise: ( routineDayId, clientId ) => {
					set( ( state ) => ( {
						drafts: {
							...state.drafts,
							[ routineDayId ]: sortDraftRoutineExercises(
								( state.drafts[ routineDayId ] ?? [] ).filter( ( routine ) => routine.clientId !== clientId ),
							),
						},
					} ) );
				},
				clearDraft: ( routineDayId ) => {
					set( ( state ) => {
						if (!Object.prototype.hasOwnProperty.call( state.drafts, routineDayId )) return state;

						const nextDrafts = { ...state.drafts };

						delete nextDrafts[ routineDayId ];

						return {
							drafts: nextDrafts,
						};
					} );
				},
			};
		},
		{
			name: "coach-routine-day-drafts",
			partialize: ( state ) => ( {
				drafts: state.drafts,
			} ),
			storage: createJSONStorage( () => localStorage ),
			onRehydrateStorage: () => () => {
				markRoutineDayDraftsHydrated?.();
			},
		},
	),
);

export const routineDayDraftStore = useRoutineDayDraftStore;

export function getRoutineDayDraft( routineDayId: string ) {
	return useRoutineDayDraftStore.getState().drafts[ routineDayId ] ?? null;
}

export function ensureRoutineDayDraft( routineDayId: string, routines: RoutineDayExercise[] ) {
	const store = useRoutineDayDraftStore.getState();

	if (Object.prototype.hasOwnProperty.call( store.drafts, routineDayId )) return;

	store.setDraft( routineDayId, mapRoutineExercisesToDraft( routines ) );
}

export function createEmptyRoutineDayDraft( routineDayId: string ) {
	useRoutineDayDraftStore.getState().setDraft( routineDayId, [] );
}

export function getNextRoutineDayExerciseOrder( routineDayId: string ) {
	return getNextRoutineExerciseOrder( useRoutineDayDraftStore.getState().drafts[ routineDayId ] ?? [] );
}
