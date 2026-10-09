"use server";

import { getAuthenticatedSession } from "@/features/auth/session";

export async function requireCoachSession( message: string ) {
	const session = await getAuthenticatedSession();

	if (!session) {
		throw new Error( `Tenés que iniciar sesión para ${ message }.` );
	}

	if (session.role !== "COACH") {
		throw new Error( `No tenés permiso para ${ message }.` );
	}

	return session;
}
