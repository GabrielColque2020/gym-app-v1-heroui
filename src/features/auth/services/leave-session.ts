"use client";

import type { QueryClient } from "@tanstack/react-query";

import { clearPersistedQueryCache } from "@/constants/query";
import { clearRoutineStateOnLogout } from "@/features/routine/services/routine-logout";
import { clearAppliedThemePreference } from "@/features/theme/theme-preference";

// Por que se sale. La pantalla de ingreso lo usa para explicarlo.
export type LeaveSessionReason = "inactive" | "expired";

export const LEAVE_SESSION_REASON_PARAM = "motivo";

// Sale de la app en este dispositivo y va a la pantalla de ingreso. Lo usan
// "Cerrar sesion" y el control que detecta una sesion que ya no vale.
//
// Cerrar sesion o una cuenta desactivada borran todo lo guardado en el
// navegador. Una sesion vencida no borra los borradores de la rutina: son
// series que el estudiante cargo y todavia no se guardaron, y las vuelve a ver
// apenas entra de nuevo, en la misma pantalla. Si entra otra cuenta, se borran
// ahi (`claimRoutineDrafts`).
export async function leaveSession( queryClient: QueryClient, reason?: LeaveSessionReason ) {
	const isExpired = reason === "expired";
	const returnPath = `${ window.location.pathname }${ window.location.search }`;

	try {
		await fetch( "/api/auth/logout", {
			method: "POST",
		} );
	} finally {
		if (isExpired) {
			clearPersistedQueryCache();
		} else {
			clearRoutineStateOnLogout();
		}

		clearAppliedThemePreference();
		queryClient.clear();
		window.sessionStorage.clear();

		const params = new URLSearchParams();

		if (reason) params.set( LEAVE_SESSION_REASON_PARAM, reason );
		if (isExpired) params.set( "next", returnPath );

		const query = params.toString();

		// Carga completa y no una navegacion interna: asi no queda viva la
		// pantalla anterior, con sus consultas y reintentos. Esos pedidos
		// seguian saliendo despues de cerrar sesion y, al entrar otra cuenta,
		// podian dejar la pantalla de ingreso trabada.
		window.location.replace( query ? `/login?${ query }` : "/login" );
	}
}
