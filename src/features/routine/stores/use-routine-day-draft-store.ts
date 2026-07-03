"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";
import type { RoutineDayExercise } from "@/features/routine/services/routine-day-detail";
import type { DayExercise } from "@/features/routine/services/routine-day-editor";
import {
	getNextRoutineExerciseOrder,
	mapRoutineExercisesToDraft,
	sortDraftRoutineExercises,
} from "@/features/routine/services/routine-day-editor";
import { ROUTINE_DAY_DRAFT_STORAGE_KEY } from "@/features/routine/services/routine-storage";
import {
	appendDraftExercise,
	patchDraftExercise,
	removeDraftExercise,
	sortAndValidateDraft,
} from "@/features/routine/stores/routine-day-draft-store.utils";

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
						const nextDraft = patchDraftExercise( currentDraft, clientId, patch );
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
					const result = appendDraftExercise( currentDraft, exercise, order );

					if ("error" in result) {
						return result;
					}

					set( ( state ) => ( {
						drafts: {
							...state.drafts,
							[ routineDayId ]: sortDraftRoutineExercises( [ ...currentDraft, result.routine ] ),
						},
					} ) );

					return result;
				},
				removeExercise: ( routineDayId, clientId ) => {
					set( ( state ) => ( {
						drafts: {
							...state.drafts,
							[ routineDayId ]: removeDraftExercise( state.drafts[ routineDayId ] ?? [], clientId ),
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
			name: ROUTINE_DAY_DRAFT_STORAGE_KEY,
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
