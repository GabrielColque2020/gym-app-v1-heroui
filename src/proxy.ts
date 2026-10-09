import { NextResponse, type NextRequest } from "next/server";

import {
	AUTH_SESSION_COOKIE_NAME,
	getSessionCookieOptions,
	getSessionSecret,
	renewSessionToken,
	verifySessionToken,
} from "@/features/login/services/session-token";

function buildLoginUrl( request: NextRequest ) {
	const loginUrl = request.nextUrl.clone();

	loginUrl.pathname = "/login";
	loginUrl.search = "";
	loginUrl.searchParams.set( "next", `${ request.nextUrl.pathname }${ request.nextUrl.search }` );

	return loginUrl;
}

// Corre antes de cada pantalla y de cada server action. Estuvo un tiempo como
// `middleware.ts` en la raiz del proyecto, donde Next no lo encuentra cuando la
// app vive en `src/`: no corria. Ahora es `src/proxy.ts`, el nombre de Next 16.
export async function proxy( request: NextRequest ) {
	const token = request.cookies.get( AUTH_SESSION_COOKIE_NAME )?.value;
	const isLoginRoute = request.nextUrl.pathname === "/login";

	if (isLoginRoute) {
		if (!token) {
			return NextResponse.next();
		}

		const session = await verifySessionToken( token, getSessionSecret() );

		if (session?.active) {
			const dashboardPath = session.role === "ADMIN"
				? "/admin/dashboard"
				: session.role === "COACH"
					? "/coach/dashboard"
					: "/student/dashboard";

			return NextResponse.redirect( new URL( dashboardPath, request.url ) );
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

	// Mientras se usa la app la sesion se renueva: cada pantalla y cada guardado
	// pasan por aca. Sin esto vencia a las 8 horas del ingreso, aunque la persona
	// estuviera entrenando en ese momento.
	const renewedToken = await renewSessionToken( session, getSessionSecret() );
	const response = NextResponse.next();

	if (renewedToken) {
		response.cookies.set( getSessionCookieOptions( renewedToken ) );
	}

	return response;
}

export const config = {
	matcher: [
		// Quedan afuera la API, los archivos y lo que tiene que verse sin sesion:
		// la pantalla sin conexion (la guarda el service worker) y el icono.
		"/((?!api|_next/static|_next/image|favicon.ico|offline|apple-icon|.*\\.[^/]+$).*)",
	],
};
