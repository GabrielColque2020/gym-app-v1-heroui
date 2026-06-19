import { cookies } from "next/headers";

import {
	AUTH_SESSION_COOKIE_NAME,
	getSessionSecret,
	verifySessionToken,
} from "@/features/login/services/session-token";

export async function getAuthenticatedSession() {
	const cookieStore = await cookies();
	const token = cookieStore.get( AUTH_SESSION_COOKIE_NAME )?.value;

	if (!token) {
		return null;
	}

	return verifySessionToken( token, getSessionSecret() );
}
