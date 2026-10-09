"use client";

import { useSyncExternalStore } from "react";

function subscribe( onChange: () => void ) {
	window.addEventListener( "online", onChange );
	window.addEventListener( "offline", onChange );

	return () => {
		window.removeEventListener( "online", onChange );
		window.removeEventListener( "offline", onChange );
	};
}

// Si el dispositivo dice tener conexion. Un "si" no garantiza que el servidor
// responda (un Wi-Fi sin internet dice que si), pero un "no" es seguro: no va a
// salir ningun pedido.
export function useIsOnline() {
	return useSyncExternalStore( subscribe, () => navigator.onLine, () => true );
}
