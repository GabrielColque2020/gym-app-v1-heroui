"use client";

import { useEffect, useState } from "react";

// Resuelve si el drawer debe abrirse desde abajo o desde la derecha segun el ancho de pantalla.
export function useResponsiveDrawerPlacement() {
	const [ isDesktop, setIsDesktop ] = useState( () => {
		if (typeof window === "undefined") return false;

		return window.matchMedia( "(min-width: 768px)" ).matches;
	} );

	useEffect( () => {
		if (typeof window === "undefined") return;

		const mediaQuery = window.matchMedia( "(min-width: 768px)" );

		const updatePlacement = () => {
			setIsDesktop( mediaQuery.matches );
		};

		updatePlacement();
		mediaQuery.addEventListener( "change", updatePlacement );

		return () => mediaQuery.removeEventListener( "change", updatePlacement );
	}, [] );

	return isDesktop ? "right" : "bottom";
}
