"use server";

import { getAuthenticatedSession } from "@/features/auth/session";

export async function requireAdminSession( message: string ) {
	const session = await getAuthenticatedSession();

	if (!session) {
		throw new Error( `Debes iniciar sesion para ${ message }.` );
	}

	if (session.role !== "ADMIN") {
		throw new Error( `No tienes permisos para ${ message }.` );
	}

	return session;
}
