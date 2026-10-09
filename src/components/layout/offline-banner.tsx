"use client";

import { useEffect, useState } from "react";

import { Wifi, WifiOff } from "lucide-react";

import { useIsOnline } from "@/lib/use-is-online";

// Cuanto queda a la vista el aviso de que volvio la conexion.
const BACK_ONLINE_NOTICE_MS = 3000;

// Avisa cuando el dispositivo se queda sin conexion. En el gimnasio pasa seguido,
// y sin esto la app no decia nada: los guardados quedaban "Guardando…" para
// siempre y no se sabia si lo cargado estaba a salvo.
export function OfflineBanner() {
	const isOnline = useIsOnline();
	const [ wasOffline, setWasOffline ] = useState( false );
	const [ showBackOnline, setShowBackOnline ] = useState( false );

	// Al volver la conexion, un aviso corto: confirma que lo pendiente se va a
	// guardar ahora.
	if (!isOnline && !wasOffline) {
		setWasOffline( true );
		setShowBackOnline( false );
	}

	if (isOnline && wasOffline) {
		setWasOffline( false );
		setShowBackOnline( true );
	}

	useEffect( () => {
		if (!showBackOnline) return;

		const timeoutId = window.setTimeout( () => setShowBackOnline( false ), BACK_ONLINE_NOTICE_MS );

		return () => window.clearTimeout( timeoutId );
	}, [ showBackOnline ] );

	if (isOnline && !showBackOnline) return null;

	return (
		<div
			aria-live={ "polite" }
			className={ isOnline
				? "flex items-center gap-2 border-b border-success/20 bg-success/10 px-5 py-2 text-sm text-success"
				: "flex items-center gap-2 border-b border-warning/20 bg-warning/10 px-5 py-2 text-sm text-foreground" }
			role={ "status" }
		>
			{ isOnline ? (
				<>
					<Wifi className={ "size-4 shrink-0" }/>
					<span>Volvió la conexión. Se guarda lo que estaba pendiente.</span>
				</>
			) : (
				<>
					<WifiOff className={ "size-4 shrink-0 text-warning" }/>
					<span>Sin conexión. Podés seguir cargando: se guarda solo cuando vuelva la señal.</span>
				</>
			) }
		</div>
	);
}
