"use client";

import { clearPersistedQueryCache } from "@/constants/query";
import {
	ROUTINE_DAY_DRAFT_STORAGE_KEY,
	ROUTINE_SESSION_STORAGE_KEY,
} from "@/features/routine/services/routine-storage";
import { useRoutineDayDraftStore } from "@/features/routine/stores/use-routine-day-draft-store";
import { useRoutineSessionStore } from "@/features/routine/stores/use-routine-session-store";

export function clearRoutineStateOnLogout() {
	useRoutineSessionStore.getState().clearAll();
	useRoutineDayDraftStore.getState().clearAllDrafts();

	clearPersistedQueryCache();
	window.localStorage.removeItem( ROUTINE_SESSION_STORAGE_KEY );
	window.localStorage.removeItem( ROUTINE_DAY_DRAFT_STORAGE_KEY );
}
