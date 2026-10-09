"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { leaveSession } from "@/features/auth/services/leave-session";
import { claimRoutineDrafts } from "@/features/routine/services/routine-logout";

// Cada cuanto se vuelve a preguntar mientras la app esta a la vista.
const CHECK_INTERVAL_MS = 60_000;
// No se pregunta dos veces seguidas: varios pedidos que fallan juntos (o volver
// a la pestaña justo cuando toca el intervalo) disparan una sola comprobacion.
const MIN_GAP_MS = 5_000;

// Saca de la app a quien perdio la sesion mientras la tenia abierta, sobre todo
// a una cuenta que acaban de desactivar. El servidor ya le rechaza cada pedido,
// pero la pantalla seguia ahi, con errores y con los datos que tenia guardados.
//
// Pregunta al volver a la app, cada minuto mientras esta a la vista y apenas
// falla un pedido. Sin conexion no hace nada: la app se usa en el gimnasio y un
// corte de internet no es motivo para echar a nadie.
export function SessionGuard( { userId }: { userId: string } ) {
	const queryClient = useQueryClient();
	const lastCheckRef = useRef( 0 );
	const isLeavingRef = useRef( false );

	// Los borradores que quedaron de una sesion vencida son de quien estaba
	// adentro: si ahora entro otra cuenta, se borran.
	useEffect( () => {
		claimRoutineDrafts( userId );
	}, [ userId ] );

	useEffect( () => {
		async function checkSession() {
			if (isLeavingRef.current || document.hidden || !navigator.onLine) return;
			if (Date.now() - lastCheckRef.current < MIN_GAP_MS) return;

			lastCheckRef.current = Date.now();

			let status: string | null = null;

			try {
				const response = await fetch( "/api/auth/session", { cache: "no-store" } );

				// Solo un "no" explicito del servidor cuenta. Cualquier otra respuesta
				// (una falla nuestra, un proxy) no dice nada sobre la sesion.
				if (response.status !== 401) return;

				status = ( await response.json() as { status?: string } ).status ?? null;
			} catch {
				return;
			}

			if (status !== "inactive" && status !== "none") return;

			isLeavingRef.current = true;
			await leaveSession( queryClient, status === "inactive" ? "inactive" : "expired" );
		}

		const handleVisibility = () => {
			if (!document.hidden) void checkSession();
		};
		const handleFocus = () => void checkSession();
		const intervalId = window.setInterval( () => void checkSession(), CHECK_INTERVAL_MS );
		// Un pedido que falla puede ser la sesion: se comprueba en el momento, sin
		// esperar al minuto.
		const unsubscribeQueries = queryClient.getQueryCache().subscribe( ( event ) => {
			if (event.type === "updated" && event.action.type === "error") void checkSession();
		} );
		const unsubscribeMutations = queryClient.getMutationCache().subscribe( ( event ) => {
			if (event.type === "updated" && event.action.type === "error") void checkSession();
		} );

		document.addEventListener( "visibilitychange", handleVisibility );
		window.addEventListener( "focus", handleFocus );

		return () => {
			window.clearInterval( intervalId );
			unsubscribeQueries();
			unsubscribeMutations();
			document.removeEventListener( "visibilitychange", handleVisibility );
			window.removeEventListener( "focus", handleFocus );
		};
	}, [ queryClient ] );

	return null;
}
