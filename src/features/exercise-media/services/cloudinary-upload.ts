import { createHash } from "node:crypto";

import {
	type ExerciseMediaResourceType,
	type ExerciseMediaSlot,
	type ExerciseMediaUploadKind,
	EXERCISE_VIDEO_MAX_SECONDS,
	formatMegabytes,
	getExerciseMediaUploadRules,
} from "@/features/exercise-media/services/exercise-media-limits";

// Los archivos van del navegador directo a Cloudinary: por el servidor no
// pueden pasar, porque en Vercel un pedido no admite mas de 4,5 MB y un video
// pesa mas. El servidor solo firma el permiso para subir y, al guardar el
// ejercicio, comprueba que lo subido cumpla los limites.

type CloudinaryCredentials = {
	apiKey: string;
	apiSecret: string;
	cloudName: string;
};

export function getCloudinaryCredentials(): CloudinaryCredentials | null {
	const cloudinaryUrl = process.env.CLOUDINARY_URL?.trim();

	if (!cloudinaryUrl) return null;

	try {
		const parsed = new URL( cloudinaryUrl );
		const cloudName = parsed.hostname.trim();
		const apiKey = decodeURIComponent( parsed.username );
		const apiSecret = decodeURIComponent( parsed.password );

		// El valor de ejemplo de env.template no son credenciales.
		if (!cloudName || !apiKey || !apiSecret || apiKey === "api_key") return null;

		return { apiKey, apiSecret, cloudName };
	} catch {
		return null;
	}
}

// La firma de Cloudinary: los parametros ordenados por nombre, unidos con "&",
// con el secreto al final, y de eso el SHA-1.
export function signCloudinaryParams( params: Record<string, number | string>, apiSecret: string ) {
	const payload = Object.keys( params )
		.sort()
		.map( ( key ) => `${ key }=${ params[ key ] }` )
		.join( "&" );

	return createHash( "sha1" ).update( `${ payload }${ apiSecret }` ).digest( "hex" );
}

// La carpeta de cada cuenta. Un archivo solo se acepta en un ejercicio si esta
// en la carpeta de quien lo guarda: asi nadie usa ni borra archivos ajenos.
export function getExerciseMediaFolder( owner: { id: string; role: "ADMIN" | "COACH" } ) {
	const root = process.env.CLOUDINARY_ASSET_FOLDER_ROOT?.trim().replace( /^\/+|\/+$/g, "" ) || "exercises";

	return owner.role === "ADMIN" ? `${ root }/uploads/admin` : `${ root }/uploads/coach/${ owner.id }`;
}

export type ExerciseMediaUploadTicket = {
	allowedFormats: string;
	apiKey: string;
	cloudName: string;
	folder: string;
	resourceType: ExerciseMediaResourceType;
	signature: string;
	timestamp: number;
};

export function createExerciseMediaUploadTicket(
	credentials: CloudinaryCredentials,
	folder: string,
	kind: ExerciseMediaUploadKind,
): ExerciseMediaUploadTicket {
	const rules = getExerciseMediaUploadRules( kind );
	const allowedFormats = rules.formats.join( "," );
	const timestamp = Math.floor( Date.now() / 1000 );

	return {
		allowedFormats,
		apiKey: credentials.apiKey,
		cloudName: credentials.cloudName,
		folder,
		resourceType: rules.resourceType,
		signature: signCloudinaryParams( { allowed_formats: allowedFormats, folder, timestamp }, credentials.apiSecret ),
		timestamp,
	};
}

type ParsedExerciseMediaUrl = {
	format: string;
	publicId: string;
	resourceType: ExerciseMediaResourceType;
};

// Desarma la direccion de un archivo de esta cuenta de Cloudinary. Devuelve
// `null` si es de otro lado.
export function parseExerciseMediaUrl( url: string, cloudName: string ): ParsedExerciseMediaUrl | null {
	try {
		const parsed = new URL( url );

		if (parsed.protocol !== "https:" || parsed.hostname !== "res.cloudinary.com") return null;

		const match = parsed.pathname.match( /^\/([^/]+)\/(image|video)\/upload\/(?:v\d+\/)?(.+)\.([a-z0-9]+)$/i );

		if (!match || match[ 1 ] !== cloudName) return null;

		return {
			format: match[ 4 ].toLowerCase(),
			publicId: decodeURIComponent( match[ 3 ] ),
			resourceType: match[ 2 ].toLowerCase() as ExerciseMediaResourceType,
		};
	} catch {
		return null;
	}
}

export function isExerciseMediaInFolder( url: string, cloudName: string, folder: string ) {
	const parsed = parseExerciseMediaUrl( url, cloudName );

	return Boolean( parsed && parsed.publicId.startsWith( `${ folder }/` ) );
}

function buildBasicAuth( credentials: CloudinaryCredentials ) {
	return `Basic ${ Buffer.from( `${ credentials.apiKey }:${ credentials.apiSecret }` ).toString( "base64" ) }`;
}

// Borra un archivo. Nunca interrumpe lo que se estaba haciendo: si falla, queda
// un archivo de mas en Cloudinary y nada mas.
export async function destroyExerciseMedia( credentials: CloudinaryCredentials, url: string ) {
	const parsed = parseExerciseMediaUrl( url, credentials.cloudName );

	if (!parsed) return;

	try {
		const timestamp = Math.floor( Date.now() / 1000 );
		const body = new URLSearchParams( {
			api_key: credentials.apiKey,
			public_id: parsed.publicId,
			signature: signCloudinaryParams( { public_id: parsed.publicId, timestamp }, credentials.apiSecret ),
			timestamp: String( timestamp ),
		} );

		await fetch( `https://api.cloudinary.com/v1_1/${ credentials.cloudName }/${ parsed.resourceType }/destroy`, {
			body,
			method: "POST",
		} );
	} catch {
		// Ver el comentario de arriba.
	}
}

export type ExerciseMediaCheck = { ok: true } | { ok: false; reason: string };

// Comprueba en Cloudinary que el archivo recien subido exista, este en la
// carpeta de quien guarda y respete formato, peso y duracion. Si no cumple, lo
// borra.
export async function verifyUploadedExerciseMedia(
	credentials: CloudinaryCredentials,
	input: { folder: string; slot: ExerciseMediaSlot; url: string },
): Promise<ExerciseMediaCheck> {
	const parsed = parseExerciseMediaUrl( input.url, credentials.cloudName );

	if (!parsed || !parsed.publicId.startsWith( `${ input.folder }/` )) {
		return { ok: false, reason: "El archivo no es uno subido desde tu cuenta." };
	}

	const kind: ExerciseMediaUploadKind = input.slot === "image" ? "image" : parsed.format === "gif" ? "gif" : "video";
	const rules = getExerciseMediaUploadRules( kind );

	if (parsed.resourceType !== rules.resourceType || !rules.formats.includes( parsed.format )) {
		await destroyExerciseMedia( credentials, input.url );

		return { ok: false, reason: "El formato del archivo no está permitido." };
	}

	// `media_metadata` no es opcional: sin el, Cloudinary no informa la duracion
	// de algunos videos (los WebM grabados desde el navegador) y uno de 33
	// segundos pasaba como valido.
	let details: { bytes?: number; duration?: number } | null = null;

	try {
		const response = await fetch(
			`https://api.cloudinary.com/v1_1/${ credentials.cloudName }/resources/${ parsed.resourceType }/upload/${ parsed.publicId.split( "/" ).map( encodeURIComponent ).join( "/" ) }?media_metadata=true`,
			{ cache: "no-store", headers: { Authorization: buildBasicAuth( credentials ) } },
		);

		if (response.status === 404) return { ok: false, reason: "No se encontró el archivo subido. Subilo de nuevo." };
		if (!response.ok) return { ok: false, reason: "No se pudo comprobar el archivo subido. Probá de nuevo en un momento." };

		details = await response.json() as { bytes?: number; duration?: number };
	} catch {
		return { ok: false, reason: "No se pudo comprobar el archivo subido. Probá de nuevo en un momento." };
	}

	if (typeof details.bytes === "number" && details.bytes > rules.maxBytes) {
		await destroyExerciseMedia( credentials, input.url );

		return { ok: false, reason: `El archivo pesa más de ${ formatMegabytes( rules.maxBytes ) }.` };
	}

	if (rules.maxSeconds !== null) {
		// Un video sin duracion conocida no se acepta: no hay forma de saber si
		// respeta el limite.
		if (typeof details.duration !== "number") {
			await destroyExerciseMedia( credentials, input.url );

			return { ok: false, reason: "No se pudo saber cuánto dura el video. Probá con otro archivo." };
		}

		if (details.duration > rules.maxSeconds + 0.5) {
			await destroyExerciseMedia( credentials, input.url );

			return { ok: false, reason: `El video dura más de ${ EXERCISE_VIDEO_MAX_SECONDS } segundos.` };
		}
	}

	return { ok: true };
}
