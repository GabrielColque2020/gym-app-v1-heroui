"use client";

import { clearPersistedQueryCache } from "@/constants/query";
import {
	ROUTINE_DAY_DRAFT_STORAGE_KEY,
	ROUTINE_SESSION_STORAGE_KEY,
} from "@/features/routine/services/routine-storage";
import { useRoutineDayDraftStore } from "@/features/routine/stores/use-routine-day-draft-store";
import { useRoutineSessionStore } from "@/features/routine/stores/use-routine-session-store";

// De quien son los borradores guardados en este navegador. Cuando la sesion
// vence, los borradores quedan (son series sin guardar), y esto evita que los
// vea —o los herede— otra cuenta que entre despues en el mismo telefono.
const ROUTINE_DRAFTS_OWNER_STORAGE_KEY = "gym-app-routine-drafts-owner";

function clearRoutineDrafts() {
	useRoutineSessionStore.getState().clearAll();
	useRoutineDayDraftStore.getState().clearAllDrafts();

	window.localStorage.removeItem( ROUTINE_SESSION_STORAGE_KEY );
	window.localStorage.removeItem( ROUTINE_DAY_DRAFT_STORAGE_KEY );
}

// Cerrar sesion a proposito (o una cuenta desactivada): no queda nada.
export function clearRoutineStateOnLogout() {
	clearRoutineDrafts();
	clearPersistedQueryCache();
	window.localStorage.removeItem( ROUTINE_DRAFTS_OWNER_STORAGE_KEY );
}

// La cuenta que tiene la sesion abierta se queda con los borradores. Si eran de
// otra, se borran. Sin dueño anotado (borradores de antes de que esto
// existiera) se asume que son de quien esta adentro: hasta entonces se borraban
// en cada salida, asi que no pueden ser de otro.
export function claimRoutineDrafts( userId: string ) {
	try {
		const owner = window.localStorage.getItem( ROUTINE_DRAFTS_OWNER_STORAGE_KEY );

		if (owner && owner !== userId) {
			clearRoutineDrafts();
		}

		window.localStorage.setItem( ROUTINE_DRAFTS_OWNER_STORAGE_KEY, userId );
	} catch {
		// Sin almacenamiento disponible no hay borradores que cuidar.
	}
}
