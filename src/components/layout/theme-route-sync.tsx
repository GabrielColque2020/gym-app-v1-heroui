"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import {
	getStoredThemePreference,
	HEROUI_THEME_STORAGE_KEY,
} from "@/features/theme/theme-preference";

const LEGACY_THEME_STORAGE_KEY = "theme";

export function ThemeRouteSync() {
	const pathname = usePathname();
	const { setTheme } = useTheme();

	useLayoutEffect( () => {
		if (typeof window === "undefined") {
			return;
		}

		const storedThemePreference = window.localStorage.getItem( HEROUI_THEME_STORAGE_KEY );
		const legacyThemePreference = window.localStorage.getItem( LEGACY_THEME_STORAGE_KEY );
		const themePreference = getStoredThemePreference( storedThemePreference ?? legacyThemePreference );

		setTheme( themePreference );

		if (legacyThemePreference !== null) {
			window.localStorage.removeItem( LEGACY_THEME_STORAGE_KEY );
		}
	}, [ pathname, setTheme ] );

	return null;
}
