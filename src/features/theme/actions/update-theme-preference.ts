"use server";

import type { ThemePreference } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedSession } from "@/features/auth/session";
import { uiThemePreferenceToThemePreference, type UiThemePreference } from "@/features/theme/theme-preference";

export async function updateThemePreferenceAction( themePreference: UiThemePreference ) {
	const session = await getAuthenticatedSession();

	if (!session) {
		throw new Error( "Debes iniciar sesión para cambiar el tema." );
	}

	await prisma.user.update( {
		data: {
			themePreference: uiThemePreferenceToThemePreference( themePreference ),
		} as { themePreference: ThemePreference },
		where: {
			id: session.sub,
		},
	} );
}
