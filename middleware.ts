import { NextResponse, type NextRequest } from "next/server";

import {
	AUTH_SESSION_COOKIE_NAME,
	getSessionSecret,
	verifySessionToken,
} from "@/features/login/services/session-token";

function buildLoginUrl( request: NextRequest ) {
	const loginUrl = request.nextUrl.clone();

	loginUrl.pathname = "/login";
	loginUrl.search = "";
	loginUrl.searchParams.set( "next", `${ request.nextUrl.pathname }${ request.nextUrl.search }` );

	return loginUrl;
}

function buildDashboardUrl( request: NextRequest ) {
	return new URL( "/dashboard", request.url );
}

export async function middleware( request: NextRequest ) {
	const token = request.cookies.get( AUTH_SESSION_COOKIE_NAME )?.value;
	const isLoginRoute = request.nextUrl.pathname === "/login";

	if (isLoginRoute) {
		if (!token) {
			return NextResponse.next();
		}

		const session = await verifySessionToken( token, getSessionSecret() );

		if (session?.active) {
			return NextResponse.redirect( buildDashboardUrl( request ) );
		}

		const response = NextResponse.next();

		response.cookies.delete( AUTH_SESSION_COOKIE_NAME );

		return response;
	}

	if (!token) {
		return NextResponse.redirect( buildLoginUrl( request ) );
	}

	const session = await verifySessionToken( token, getSessionSecret() );

	if (!session || !session.active) {
		const response = NextResponse.redirect( buildLoginUrl( request ) );

		response.cookies.delete( AUTH_SESSION_COOKIE_NAME );

		return response;
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
