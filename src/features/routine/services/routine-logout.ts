"use client";

import { clearPersistedQueryCache } from "@/constants/query";
import { useRoutineDayDraftStore } from "@/features/routine/stores/useRoutineDayDraftStore";
import { useRoutineSessionStore } from "@/features/routine/stores/useRoutineSessionStore";

const ROUTINE_SESSION_STORAGE_KEY = "routineExerciseProgress-storage";
const ROUTINE_DAY_DRAFT_STORAGE_KEYS = [
	"admin-routine-day-drafts",
	"coach-routine-day-drafts",
] as const;

export function clearRoutineStateOnLogout() {
	useRoutineSessionStore.getState().clearAll();
	useRoutineDayDraftStore.getState().clearAllDrafts();

	clearPersistedQueryCache();
	window.localStorage.removeItem( ROUTINE_SESSION_STORAGE_KEY );
	for (const storageKey of ROUTINE_DAY_DRAFT_STORAGE_KEYS) {
		window.localStorage.removeItem( storageKey );
	}
}
