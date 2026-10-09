import { NextResponse, type NextRequest } from "next/server";

import {
	clearFailedLogins,
	isLoginBlocked,
	LOGIN_TOO_MANY_ATTEMPTS_MESSAGE,
	recordFailedLogin,
} from "@/features/login/services/login-attempts";
import {
	LOGIN_INACTIVE_ACCOUNT_MESSAGE,
	LOGIN_INVALID_CREDENTIALS_MESSAGE,
	loginUser,
} from "@/features/login/services/login-service";
import type { LoginPrismaClient } from "@/features/login/services/login-service";
import { getSessionCookieOptions } from "@/features/login/services/session-token";
import prisma from "@/lib/prisma";
import type { LoginErrorResponse, LoginRequest, LoginResponse } from "@/types/auth";

export const runtime = "nodejs";

function getClientIp( request: NextRequest ) {
	const forwardedFor = request.headers.get( "x-forwarded-for" )?.split( "," )[ 0 ]?.trim();

	return forwardedFor
		?? request.headers.get( "x-real-ip" )
		?? request.headers.get( "cf-connecting-ip" )
		?? null;
}

function toErrorResponse( error: string, status: number ) {
	return NextResponse.json<LoginErrorResponse>( {
		error,
	}, {
		status,
	} );
}

export async function POST( request: NextRequest ) {
	let body: Partial<LoginRequest> | null;

	try {
		body = await request.json() as Partial<LoginRequest>;
	} catch {
		return toErrorResponse( "El cuerpo de la solicitud es inválido.", 400 );
	}

	if (!body || typeof body !== "object") {
		return toErrorResponse( "Credenciales inválidas.", 400 );
	}

	if (typeof body.credential !== "string" || typeof body.password !== "string") {
		return toErrorResponse( "Credenciales inválidas.", 400 );
	}

	const attemptScope = { credential: body.credential, ip: getClientIp( request ) };

	try {
		if (await isLoginBlocked( attemptScope )) {
			return toErrorResponse( LOGIN_TOO_MANY_ATTEMPTS_MESSAGE, 429 );
		}

		const loginResponse = await loginUser( {
			credential: body.credential,
			password: body.password,
		}, {
			ip: attemptScope.ip,
			prismaClient: prisma as unknown as LoginPrismaClient,
			userAgent: request.headers.get( "user-agent" ),
		} );

		await clearFailedLogins( body.credential );

		// La sesion viaja solo en la cookie, que el codigo de la pagina no puede leer.
		// Mandarla tambien en la respuesta la dejaba al alcance de cualquier script.
		const response = NextResponse.json<Pick<LoginResponse, "user">>( { user: loginResponse.user } );

		response.cookies.set( getSessionCookieOptions( loginResponse.sessionToken ) );

		return response;
	} catch (error) {
		const message = error instanceof Error ? error.message : "No se pudo iniciar sesión.";

		if (message === LOGIN_INACTIVE_ACCOUNT_MESSAGE) {
			return toErrorResponse( message, 403 );
		}

		if (message === "Debes ingresar un DNI o correo electrónico." || message === "La contraseña es obligatoria.") {
			return toErrorResponse( message, 400 );
		}

		if (message === LOGIN_INVALID_CREDENTIALS_MESSAGE) {
			// Solo cuentan los intentos con usuario o contraseña equivocados. Si no
			// se puede anotar, el login responde igual: el limite no puede dejar
			// afuera a quien entra bien.
			await recordFailedLogin( attemptScope ).catch( ( recordError ) => console.error( "[login]", recordError ) );

			return toErrorResponse( message, 401 );
		}

		// Cualquier otra falla es nuestra (la base, la red): no se le muestra el
		// detalle tecnico a quien esta intentando entrar.
		console.error( "[login]", error );

		return toErrorResponse( "No pudimos iniciar sesión. Probá de nuevo en un momento.", 500 );
	}
}
