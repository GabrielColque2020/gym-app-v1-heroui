import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import {
	AUTH_SESSION_COOKIE_NAME,
	getSessionSecret,
	verifySessionToken,
} from "@/features/login/services/session-token";

export type AuthenticatedSession = Awaited<ReturnType<typeof getAuthenticatedSession>>;

export async function getAuthenticatedSession() {
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
		select: {
			active: true,
			name: true,
		},
		where: {
			id: session.sub,
		},
	} );

	if (!user?.active) {
		return null;
	}

	return {
		...session,
		name: user.name,
	};
}
