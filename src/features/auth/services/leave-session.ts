"use client";

import type { QueryClient } from "@tanstack/react-query";

import { clearRoutineStateOnLogout } from "@/features/routine/services/routine-logout";
import { clearAppliedThemePreference } from "@/features/theme/theme-preference";

// Por que se sale. La pantalla de ingreso lo usa para explicarlo.
export type LeaveSessionReason = "inactive" | "expired";

export const LEAVE_SESSION_REASON_PARAM = "motivo";

// Sale de la app en este dispositivo: borra la sesion, lo guardado en el
// navegador (rutina en curso, borradores, datos en cache) y va a la pantalla de
// ingreso. Lo usan "Cerrar sesion" y el control que detecta una cuenta
// desactivada.
export async function leaveSession( queryClient: QueryClient, reason?: LeaveSessionReason ) {
	try {
		await fetch( "/api/auth/logout", {
			method: "POST",
		} );
	} finally {
		clearRoutineStateOnLogout();
		clearAppliedThemePreference();
		queryClient.clear();
		window.sessionStorage.clear();
		// Carga completa y no una navegacion interna: asi no queda viva la
		// pantalla anterior, con sus consultas y reintentos. Esos pedidos
		// seguian saliendo despues de cerrar sesion y, al entrar otra cuenta,
		// podian dejar la pantalla de ingreso trabada.
		window.location.replace( reason ? `/login?${ LEAVE_SESSION_REASON_PARAM }=${ reason }` : "/login" );
	}
}
