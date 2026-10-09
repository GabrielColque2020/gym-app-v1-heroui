"use client";

import { useEffect, useRef, useState } from "react";

import { useIsOnline } from "@/lib/use-is-online";

// Esperas entre reintentos de un guardado que fallo: crecen para no insistir
// cada segundo contra un servidor que no responde.
const RETRY_DELAYS_MS = [ 10_000, 20_000, 40_000, 60_000 ];

// Vuelve a intentar solo un guardado automatico que fallo. En el gimnasio la
// señal va y viene: sin esto el cambio quedaba en "No se pudo guardar" hasta que
// la persona tocara "Reintentar", y si cerraba la app se perdia.
//
// Reintenta al volver la conexion, al volver a la app y, mientras tanto, cada
// tanto. Sin conexion no intenta: no saldria ningun pedido.
export function useAutosaveRetry( { hasFailed, onRetry }: { hasFailed: boolean; onRetry: () => void } ) {
	const isOnline = useIsOnline();
	// Cuantos reintentos van desde la ultima vez que se guardo bien. Es estado y no
	// una referencia: si un reintento vuelve a fallar, `hasFailed` no cambia, y
	// esto es lo que programa el siguiente.
	const [ attempts, setAttempts ] = useState( 0 );
	const onRetryRef = useRef( onRetry );

	useEffect( () => {
		onRetryRef.current = onRetry;
	} );

	// Se guardo bien: la proxima falla vuelve a empezar por la espera mas corta.
	if (!hasFailed && attempts !== 0) {
		setAttempts( 0 );
	}

	// Cada tanto, mientras haya conexion.
	useEffect( () => {
		if (!hasFailed || !isOnline) return;

		const delay = RETRY_DELAYS_MS[ Math.min( attempts, RETRY_DELAYS_MS.length - 1 ) ];
		const timeoutId = window.setTimeout( () => {
			setAttempts( ( current ) => current + 1 );
			onRetryRef.current();
		}, delay );

		return () => window.clearTimeout( timeoutId );
	}, [ attempts, hasFailed, isOnline ] );

	// Al volver la conexion o a la app, sin esperar al proximo intento.
	useEffect( () => {
		if (!hasFailed) return;

		function retryNow() {
			if (document.visibilityState !== "visible" || !navigator.onLine) return;

			setAttempts( ( current ) => current + 1 );
			onRetryRef.current();
		}

		window.addEventListener( "online", retryNow );
		document.addEventListener( "visibilitychange", retryNow );

		return () => {
			window.removeEventListener( "online", retryNow );
			document.removeEventListener( "visibilitychange", retryNow );
		};
	}, [ hasFailed ] );

	return { isOnline };
}
