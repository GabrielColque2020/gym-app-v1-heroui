"use client";

import { useEffect } from "react";

// Mantiene la pantalla encendida mientras `isActive`. El navegador suelta el
// bloqueo cada vez que la app pasa a segundo plano, asi que se vuelve a pedir al
// volver. Donde no existe (navegadores viejos) no hace nada.
export function useScreenWakeLock( isActive: boolean ) {
	useEffect( () => {
		if (!isActive || !( "wakeLock" in navigator )) return;

		let sentinel: WakeLockSentinel | null = null;
		let isCancelled = false;

		async function request() {
			if (document.visibilityState !== "visible" || ( sentinel && !sentinel.released )) return;

			try {
				const nextSentinel = await navigator.wakeLock.request( "screen" );

				if (isCancelled) {
					void nextSentinel.release();
					return;
				}

				sentinel = nextSentinel;
			} catch {
				// Con bateria baja o sin permiso el navegador lo niega: la pantalla se
				// apaga como siempre.
			}
		}

		void request();
		document.addEventListener( "visibilitychange", request );

		return () => {
			isCancelled = true;
			document.removeEventListener( "visibilitychange", request );
			void sentinel?.release();
		};
	}, [ isActive ] );
}
