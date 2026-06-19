import { NextResponse } from "next/server";

import { AUTH_SESSION_COOKIE_NAME } from "@/features/login/services/session-token";

export const runtime = "nodejs";

export async function POST() {
	const response = NextResponse.json( {
		ok: true,
	} );

	response.cookies.delete( AUTH_SESSION_COOKIE_NAME );

	return response;
}
