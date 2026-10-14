import { afterEach, describe, expect, it, vi } from "vitest";

import { Prisma } from "@/generated/prisma/client";
import { getErrorMessage, isNetworkError, NETWORK_ERROR_MESSAGE, unwrapAction } from "@/lib/action-result";
import { runAction, toUserFacingMessage } from "@/lib/run-action";

const FALLBACK = "No se pudo guardar.";

function duplicate( message: string, target?: unknown ) {
	return new Prisma.PrismaClientKnownRequestError( message, {
		clientVersion: "test",
		code: "P2002",
		meta: target === undefined ? undefined : { modelName: "User", target },
	} );
}

afterEach( () => {
	vi.restoreAllMocks();
} );

describe( "runAction", () => {
	it( "devuelve los datos", async () => {
		await expect( runAction( FALLBACK, async () => 42 ) ).resolves.toEqual( { data: 42, ok: true } );
	} );

	it( "un mensaje nuestro (`Error` a secas) llega tal cual", async () => {
		await expect( runAction( FALLBACK, async () => {
			throw new Error( "Tenés que iniciar sesión." );
		} ) ).resolves.toEqual( { ok: false, reason: "Tenés que iniciar sesión." } );
	} );

	it( "lo tecnico se cambia por el texto de respaldo y queda en el log", async () => {
		const log = vi.spyOn( console, "error" ).mockImplementation( () => {} );

		await expect( runAction( FALLBACK, async () => {
			throw new TypeError( "Cannot read properties of undefined" );
		} ) ).resolves.toEqual( { ok: false, reason: FALLBACK } );
		expect( log ).toHaveBeenCalled();
	} );
} );

describe( "toUserFacingMessage con duplicados (P2002)", () => {
	it( "nombra el campo repetido", () => {
		expect( toUserFacingMessage( duplicate( "Unique constraint failed", [ "email" ] ), FALLBACK ) ).toBe( "Ese email ya lo usa otra cuenta." );
		expect( toUserFacingMessage( duplicate( "Unique constraint failed", [ "dni" ] ), FALLBACK ) ).toBe( "Ese DNI ya lo usa otra cuenta." );
		expect( toUserFacingMessage( duplicate( "Unique constraint failed on User_email_key" ), FALLBACK ) ).toBe( "Ese email ya lo usa otra cuenta." );
		expect( toUserFacingMessage( duplicate( "Unique constraint failed", [ "studentId", "month", "year" ] ), FALLBACK ) ).toBe( "Ese estudiante ya tiene una rutina en ese mes." );
	} );

	it( "el nombre del modelo no cuenta como el campo \"name\"", () => {
		expect( toUserFacingMessage( duplicate( "Unique constraint failed", [ "coachId", "externalId" ] ), FALLBACK ) ).toBe( "Eso ya está cargado." );
	} );

	it( "otro error de la base no se muestra", () => {
		vi.spyOn( console, "error" ).mockImplementation( () => {} );
		const notFound = new Prisma.PrismaClientKnownRequestError( "Record not found", { clientVersion: "test", code: "P2025" } );

		expect( toUserFacingMessage( notFound, FALLBACK ) ).toBe( FALLBACK );
	} );
} );

describe( "action-result", () => {
	it( "unwrapAction devuelve los datos o tira el motivo", () => {
		expect( unwrapAction( { data: "ok", ok: true } ) ).toBe( "ok" );
		expect( () => unwrapAction( { ok: false, reason: "No podés." } ) ).toThrow( "No podés." );
	} );

	it( "los errores de red se traducen", () => {
		expect( isNetworkError( new TypeError( "Failed to fetch" ) ) ).toBe( true );
		expect( isNetworkError( new Error( "Load failed" ) ) ).toBe( true );
		expect( isNetworkError( new Error( "Ese email ya lo usa otra cuenta." ) ) ).toBe( false );
		expect( getErrorMessage( new TypeError( "Failed to fetch" ), FALLBACK ) ).toBe( NETWORK_ERROR_MESSAGE );
		expect( getErrorMessage( new Error( "Ese DNI ya lo usa otra cuenta." ), FALLBACK ) ).toBe( "Ese DNI ya lo usa otra cuenta." );
		expect( getErrorMessage( "algo raro", FALLBACK ) ).toBe( FALLBACK );
	} );
} );
