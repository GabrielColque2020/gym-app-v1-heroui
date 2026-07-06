import type { ThemePreference } from "@/generated/prisma/enums";

export type UiThemePreference = "system" | "light" | "dark";
export const HEROUI_THEME_STORAGE_KEY = "heroui-theme";

export function themePreferenceToUiThemePreference( themePreference: ThemePreference ): UiThemePreference {
	switch (themePreference) {
		case "LIGHT":
			return "light";
		case "DARK":
			return "dark";
		case "SYSTEM":
		default:
			return "system";
	}
}

export function uiThemePreferenceToThemePreference( themePreference: UiThemePreference ): ThemePreference {
	switch (themePreference) {
		case "light":
			return "LIGHT";
		case "dark":
			return "DARK";
		case "system":
		default:
			return "SYSTEM";
	}
}

export function getStoredThemePreference( rawThemePreference: string | null ): UiThemePreference {
	if (rawThemePreference === "light" || rawThemePreference === "dark" || rawThemePreference === "system") {
		return rawThemePreference;
	}

	return "system";
}

export function persistThemePreference( themePreference: UiThemePreference ) {
	if (typeof window === "undefined") {
		return;
	}

	window.localStorage.setItem( HEROUI_THEME_STORAGE_KEY, themePreference );
}

export function clearAppliedThemePreference() {
	if (typeof window === "undefined") {
		return;
	}

	window.localStorage.setItem( HEROUI_THEME_STORAGE_KEY, "system" );
}
