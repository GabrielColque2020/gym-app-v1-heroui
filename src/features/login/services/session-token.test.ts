import { createHmac } from "node:crypto";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { AuthenticatedUser } from "@/types/auth";
import {
	AUTH_SESSION_TTL_SECONDS,
	createSessionToken,
	renewSessionToken,
	SESSION_MAX_AGE_SECONDS,
	SESSION_RENEW_AFTER_SECONDS,
	verifySessionToken,
} from "@/features/login/services/session-token";

const SECRET = "secreto-de-prueba";
const START = new Date( "2026-10-14T12:00:00Z" ).getTime();
const user = { active: true, id: "u1", role: "STUDENT" } as AuthenticatedUser;

function at( secondsFromStart: number ) {
	vi.setSystemTime( START + secondsFromStart * 1000 );
}

afterEach( () => {
	vi.useRealTimers();
} );

describe( "sesion", () => {
	it( "un token recien creado vale y guarda cuando se ingreso", async () => {
		vi.useFakeTimers( { now: START } );
		const session = await verifySessionToken( await createSessionToken( user, SECRET ), SECRET );

		expect( session?.sub ).toBe( "u1" );
		expect( session?.authAt ).toBe( START / 1000 );
	} );

	it( "rechaza un token firmado con otro secreto o modificado", async () => {
		vi.useFakeTimers( { now: START } );
		const token = await createSessionToken( user, SECRET );
		const [ payload, signature ] = token.split( "." );

		expect( await verifySessionToken( token, "otro-secreto" ) ).toBeNull();
		expect( await verifySessionToken( `${ payload }x.${ signature }`, SECRET ) ).toBeNull();
	} );

	it( "vence a las 8 horas sin uso", async () => {
		vi.useFakeTimers( { now: START } );
		const token = await createSessionToken( user, SECRET );

		at( AUTH_SESSION_TTL_SECONDS - 60 );
		expect( await verifySessionToken( token, SECRET ) ).not.toBeNull();
		at( AUTH_SESSION_TTL_SECONDS );
		expect( await verifySessionToken( token, SECRET ) ).toBeNull();
	} );

	it( "no se renueva antes de los 15 minutos", async () => {
		vi.useFakeTimers( { now: START } );
		const session = await verifySessionToken( await createSessionToken( user, SECRET ), SECRET );

		at( SESSION_RENEW_AFTER_SECONDS - 1 );
		expect( await renewSessionToken( session!, SECRET ) ).toBeNull();
	} );

	it( "usandola todos los dias, vence igual a los 7 dias del ingreso", async () => {
		vi.useFakeTimers( { now: START } );
		let token = await createSessionToken( user, SECRET );
		let lastValidHour = 0;

		for (let hour = 1; hour <= 8 * 24; hour++) {
			at( hour * 3600 );
			const session = await verifySessionToken( token, SECRET );

			if (!session) break;

			lastValidHour = hour;
			// La renovacion conserva el momento del ingreso.
			expect( session.authAt ).toBe( START / 1000 );
			token = await renewSessionToken( session, SECRET ) ?? token;
		}

		expect( lastValidHour ).toBe( SESSION_MAX_AGE_SECONDS / 3600 - 1 );
	} );

	it( "acepta los tokens de antes del tope (sin authAt) y cuenta desde su emision", async () => {
		vi.useFakeTimers( { now: START } );
		const issuedAt = START / 1000;
		const legacy = { active: true, exp: issuedAt + 3600, iat: issuedAt, jti: "x", role: "COACH", sub: "u2" };
		const toBase64Url = ( value: Buffer ) => value.toString( "base64url" );
		const encoded = toBase64Url( Buffer.from( JSON.stringify( legacy ) ) );
		const token = `${ encoded }.${ toBase64Url( createHmac( "sha256", SECRET ).update( encoded ).digest() ) }`;
		const session = await verifySessionToken( token, SECRET );

		expect( session?.sub ).toBe( "u2" );
		expect( session?.authAt ).toBe( issuedAt );
	} );
} );
