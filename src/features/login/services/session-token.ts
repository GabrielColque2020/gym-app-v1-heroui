import type { AuthenticatedUser } from "@/types/auth";

export const AUTH_SESSION_COOKIE_NAME = "gym_app_session";
// Cuanto dura la sesion sin usar la app: se renueva mientras se usa (ver
// `SESSION_RENEW_AFTER_SECONDS`), asi que un estudiante que entro a la mañana
// no se queda afuera a mitad del entrenamiento de la tarde.
export const AUTH_SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 Horas
// Cada cuanto, como mucho, se renueva. Renovarla en cada pedido seria reescribir
// la cookie todo el tiempo sin ganar nada.
export const SESSION_RENEW_AFTER_SECONDS = 60 * 15;

// Los mismos atributos al crearla en el ingreso y al renovarla.
export function getSessionCookieOptions( token: string ) {
	return {
		httpOnly: true,
		maxAge: AUTH_SESSION_TTL_SECONDS,
		name: AUTH_SESSION_COOKIE_NAME,
		path: "/",
		sameSite: "lax" as const,
		secure: process.env.NODE_ENV === "production",
		value: token,
	};
}

export function getSessionSecret() {
	return process.env.AUTH_SESSION_SECRET
		?? process.env.AUTH_SECRET
		?? process.env.DATABASE_URL
		?? "gym-app-dev-secret";
}

export type SessionTokenPayload = {
	active: boolean;
	exp: number;
	iat: number;
	jti: string;
	role: AuthenticatedUser["role"];
	sub: string;
};

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function toBase64( bytes: Uint8Array ) {
	let binary = "";

	for (const byte of bytes) {
		binary += String.fromCharCode( byte );
	}

	return typeof btoa === "function"
		? btoa( binary )
		: Buffer.from( bytes ).toString( "base64" );
}

function fromBase64( value: string ) {
	const binary = typeof atob === "function"
		? atob( value )
		: Buffer.from( value, "base64" ).toString( "binary" );

	const bytes = new Uint8Array( binary.length );

	for (let index = 0; index < binary.length; index += 1) {
		bytes[ index ] = binary.charCodeAt( index );
	}

	return bytes;
}

function toBase64Url( bytes: Uint8Array ) {
	return toBase64( bytes )
		.replaceAll( "+", "-" )
		.replaceAll( "/", "_" )
		.replaceAll( "=", "" );
}

function fromBase64Url( value: string ) {
	const normalized = value
		.replaceAll( "-", "+" )
		.replaceAll( "_", "/" )
		.padEnd( Math.ceil( value.length / 4 ) * 4, "=" );

	return fromBase64( normalized );
}

function encodeUtf8( value: string ) {
	return textEncoder.encode( value );
}

function decodeUtf8( bytes: Uint8Array ) {
	return textDecoder.decode( bytes );
}

async function importHmacKey( secret: string ) {
	return crypto.subtle.importKey(
		"raw",
		encodeUtf8( secret ),
		{
			hash: "SHA-256",
			name: "HMAC",
		},
		false,
		[ "sign", "verify" ],
	);
}

export async function createSessionToken(
	user: AuthenticatedUser,
	secret: string,
) {
	return signSessionPayload( { active: user.active, role: user.role, sub: user.id }, secret );
}

// La misma sesion con el vencimiento corrido desde ahora. Si todavia no paso
// `SESSION_RENEW_AFTER_SECONDS` desde la ultima, devuelve null: no hace falta.
export async function renewSessionToken( session: SessionTokenPayload, secret: string ) {
	if (Date.now() / 1000 - session.iat < SESSION_RENEW_AFTER_SECONDS) {
		return null;
	}

	return signSessionPayload( { active: session.active, role: session.role, sub: session.sub }, secret );
}

async function signSessionPayload(
	user: Pick<SessionTokenPayload, "active" | "role" | "sub">,
	secret: string,
) {
	const issuedAt = Math.floor( Date.now() / 1000 );
	const payload: SessionTokenPayload = {
		...user,
		exp: issuedAt + AUTH_SESSION_TTL_SECONDS,
		iat: issuedAt,
		jti: crypto.randomUUID(),
	};
	const encodedPayload = toBase64Url( encodeUtf8( JSON.stringify( payload ) ) );
	const key = await importHmacKey( secret );
	const signature = await crypto.subtle.sign(
		"HMAC",
		key,
		encodeUtf8( encodedPayload ),
	);

	return `${ encodedPayload }.${ toBase64Url( new Uint8Array( signature ) ) }`;
}

export async function verifySessionToken(
	token: string,
	secret: string,
) {
	const [ encodedPayload, encodedSignature ] = token.split( "." );

	if (!encodedPayload || !encodedSignature) {
		return null;
	}

	const key = await importHmacKey( secret );
	const expectedSignature = await crypto.subtle.sign(
		"HMAC",
		key,
		encodeUtf8( encodedPayload ),
	);
	const expectedSignatureEncoded = toBase64Url( new Uint8Array( expectedSignature ) );

	if (expectedSignatureEncoded !== encodedSignature) {
		return null;
	}

	try {
		const payload = JSON.parse( decodeUtf8( fromBase64Url( encodedPayload ) ) ) as Partial<SessionTokenPayload>;

		if (
			typeof payload.active !== "boolean"
			|| typeof payload.exp !== "number"
			|| typeof payload.iat !== "number"
			|| typeof payload.jti !== "string"
			|| typeof payload.role !== "string"
			|| typeof payload.sub !== "string"
		) {
			return null;
		}

		if (payload.exp * 1000 <= Date.now()) {
			return null;
		}

		return payload as SessionTokenPayload;
	} catch {
		return null;
	}
}
