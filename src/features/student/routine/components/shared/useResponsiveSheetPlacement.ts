"use client";

import { useEffect, useState } from "react";

export type RoutineSheetPlacement = "bottom" | "right";

// Resuelve si el sheet debe abrirse desde abajo o desde la derecha segun el ancho de pantalla.
export function useResponsiveSheetPlacement() {
	const [ isDesktop, setIsDesktop ] = useState( false );

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
