"use client";

import { useEffect } from "react";

// Lo que cuenta como "algo abierto encima": drawers, modales, el menu lateral del
// telefono y los menus desplegables. Los que se estan yendo (la animacion de
// salida; el menu lateral queda asi, montado) ya no cuentan.
const OVERLAY_SELECTOR = "[role=\"dialog\"], [role=\"alertdialog\"]";
const GUARD_MARK = "__overlayBackGuard";
// Lo que tarda un overlay en reaccionar a Escape: si sigue abierto, se vuelve a
// poner la entrada para el proximo "atras".
const RECHECK_MS = 400;

function getOpenOverlays() {
	return Array.from( document.querySelectorAll<HTMLElement>( OVERLAY_SELECTOR ) )
		.filter( ( element ) => !element.closest( "[data-exiting=\"true\"]" ) );
}

function isOnGuard() {
	return Boolean( ( window.history.state as Record<string, unknown> | null )?.[ GUARD_MARK ] );
}

// El de mas arriba se cierra como con Escape: asi respeta lo que haga cada uno
// (el aviso de cambios sin guardar, por ejemplo) y no hace falta tocar cada drawer.
function closeTopOverlay( overlays: HTMLElement[] ) {
	const top = overlays[ overlays.length - 1 ];
	const active = document.activeElement;
	const target = active instanceof HTMLElement && top.contains( active ) ? active : top;

	target.dispatchEvent( new KeyboardEvent( "keydown", { bubbles: true, cancelable: true, key: "Escape" } ) );
}

// El boton "atras" del telefono (y el del navegador) cierra lo que este abierto
// encima en vez de retroceder la pagina de atras. Abrir un drawer no agregaba
// nada al historial: "atras" salia de la pantalla con el drawer abierto y lo
// cargado se perdia.
//
// Mientras haya algo abierto hay una entrada de mas en el historial, igual a la
// actual (misma direccion, mismo estado de Next), y "atras" la consume.
//
// Si se cierra con sus botones, la entrada no se saca: un `history.back()` en ese
// momento cancelaba la navegacion que el mismo boton acababa de pedir (un item
// del menu que lleva a otra pantalla). Queda ahi y se pasa de largo despues: el
// "atras" que sale de ella, o que cae en ella, no mostraria nada nuevo, asi que
// se da uno mas.
export function OverlayBackGuard() {
	useEffect( () => {
		// La entrada en la que se estaba, para saber de donde se viene en `popstate`.
		let current = { href: window.location.href, isGuard: isOnGuard() };
		// El proximo `popstate` es un "atras" nuestro, no del usuario.
		let isSkipping = false;
		let recheckTimer: number | undefined;

		function remember() {
			current = { href: window.location.href, isGuard: isOnGuard() };
		}

		function skipBack() {
			isSkipping = true;
			window.history.back();
		}

		function sync() {
			if (getOpenOverlays().length > 0 && !isOnGuard()) {
				// Con el estado de Next adentro, para que el router lo tome como propio.
				window.history.pushState( { ...window.history.state, [ GUARD_MARK ]: true }, "", window.location.href );
			}

			remember();
		}

		function handlePopState() {
			const left = current;
			const wasSkipping = isSkipping;
			const overlays = getOpenOverlays();

			isSkipping = false;
			remember();

			if (overlays.length > 0) {
				closeTopOverlay( overlays );
				window.clearTimeout( recheckTimer );
				recheckTimer = window.setTimeout( sync, RECHECK_MS );
				return;
			}

			if (wasSkipping) return;

			// Cayo en una entrada que quedo de un overlay ya cerrado (volviendo desde
			// otra pantalla), o salio de una a la misma direccion: el toque no cambio
			// nada en pantalla.
			if (isOnGuard() || ( left.isGuard && left.href === window.location.href )) {
				skipBack();
			}
		}

		const observer = new MutationObserver( sync );

		observer.observe( document.body, {
			attributeFilter: [ "data-exiting", "role" ],
			attributes: true,
			childList: true,
			subtree: true,
		} );
		window.addEventListener( "popstate", handlePopState );
		sync();

		return () => {
			observer.disconnect();
			window.removeEventListener( "popstate", handlePopState );
			window.clearTimeout( recheckTimer );
		};
	}, [] );

	return null;
}
