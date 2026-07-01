import { NextResponse, type NextRequest } from "next/server";

import { AUTH_SESSION_COOKIE_NAME, AUTH_SESSION_TTL_SECONDS, loginUser } from "@/features/login/services/login-service";
import type { LoginPrismaClient } from "@/features/login/services/login-service";
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
		return toErrorResponse( "El cuerpo de la solicitud es invalido.", 400 );
	}

	if (!body || typeof body !== "object") {
		return toErrorResponse( "Credenciales invalidas.", 400 );
	}

	if (typeof body.credential !== "string" || typeof body.password !== "string") {
		return toErrorResponse( "Credenciales invalidas.", 400 );
	}

	try {
		const loginResponse = await loginUser( {
			credential: body.credential,
			password: body.password,
		}, {
			ip: getClientIp( request ),
			prismaClient: prisma as unknown as LoginPrismaClient,
			userAgent: request.headers.get( "user-agent" ),
		} );

		const response = NextResponse.json<LoginResponse>( loginResponse );

		response.cookies.set( {
			httpOnly: true,
			maxAge: AUTH_SESSION_TTL_SECONDS,
			name: AUTH_SESSION_COOKIE_NAME,
			path: "/",
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			value: loginResponse.sessionToken,
		} );

		return response;
	} catch (error) {
		const message = error instanceof Error ? error.message : "No se pudo iniciar sesión.";

		if (message === "La cuenta se encuentra inactiva.") {
			return toErrorResponse( message, 403 );
		}

		if (message === "Debes ingresar un DNI o correo electrónico." || message === "La contraseña es obligatoria.") {
			return toErrorResponse( message, 400 );
		}

		return toErrorResponse( message, 401 );
	}
}
