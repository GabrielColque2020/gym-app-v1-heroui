import { cookies } from "next/headers";

import type { ThemePreference } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import {
	AUTH_SESSION_COOKIE_NAME,
	getSessionSecret,
	verifySessionToken,
} from "@/features/login/services/session-token";

export type AuthenticatedSession = Awaited<ReturnType<typeof getAuthenticatedSession>>;

// `inactive`: la sesion es de una cuenta que existe pero fue desactivada.
// `none`: no hay sesion, vencio o la cuenta ya no existe.
export type SessionStatus = "active" | "inactive" | "none";

type SessionUser = {
	active: boolean;
	name: string;
	themePreference: ThemePreference;
};

// Lee la sesion y la cuenta a la que pertenece. Que la cuenta este activa se
// mira en la base en cada pedido y no en el token, que dura horas: desactivar a
// alguien tiene que cortarle el acceso en el momento.
async function readSession() {
	const cookieStore = await cookies();
	const token = cookieStore.get( AUTH_SESSION_COOKIE_NAME )?.value;

	if (!token) {
		return null;
	}

	const session = await verifySessionToken( token, getSessionSecret() );

	if (!session) {
		return null;
	}

	const user = await prisma.user.findUnique( {
		where: {
			id: session.sub,
		},
	} ) as SessionUser | null;

	return user ? { session, user } : null;
}

export async function getAuthenticatedSession() {
	const current = await readSession();

	if (!current?.user.active) {
		return null;
	}

	return {
		...current.session,
		name: current.user.name,
		themePreference: current.user.themePreference,
	};
}

export async function getSessionStatus(): Promise<SessionStatus> {
	const current = await readSession();

	if (!current) return "none";

	return current.user.active ? "active" : "inactive";
}
