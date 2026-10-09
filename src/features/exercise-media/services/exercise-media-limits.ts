// Que archivos puede llevar un ejercicio y cuanto pueden pesar. Lo usan el
// formulario (para avisar antes de subir) y el servidor (para comprobarlo
// despues): el navegador solo no alcanza, porque se le puede mentir.

export type ExerciseMediaSlot = "image" | "video";

// Como lo guarda Cloudinary. Un GIF va en el lugar del video, pero para
// Cloudinary es una imagen.
export type ExerciseMediaResourceType = "image" | "video";

export const EXERCISE_IMAGE_MAX_BYTES = 5 * 1024 * 1024;
export const EXERCISE_VIDEO_MAX_BYTES = 20 * 1024 * 1024;
export const EXERCISE_VIDEO_MAX_SECONDS = 30;

export const EXERCISE_IMAGE_FORMATS = [ "jpg", "jpeg", "png", "webp" ] as const;
export const EXERCISE_VIDEO_FORMATS = [ "mp4", "webm", "mov" ] as const;
export const EXERCISE_GIF_FORMATS = [ "gif" ] as const;

export type ExerciseMediaUploadKind = "gif" | "image" | "video";

export function getExerciseMediaUploadRules( kind: ExerciseMediaUploadKind ) {
	if (kind === "image") {
		return {
			formats: EXERCISE_IMAGE_FORMATS as readonly string[],
			maxBytes: EXERCISE_IMAGE_MAX_BYTES,
			maxSeconds: null,
			resourceType: "image" as ExerciseMediaResourceType,
		};
	}

	if (kind === "gif") {
		return {
			formats: EXERCISE_GIF_FORMATS as readonly string[],
			maxBytes: EXERCISE_VIDEO_MAX_BYTES,
			maxSeconds: null,
			resourceType: "image" as ExerciseMediaResourceType,
		};
	}

	return {
		formats: EXERCISE_VIDEO_FORMATS as readonly string[],
		maxBytes: EXERCISE_VIDEO_MAX_BYTES,
		maxSeconds: EXERCISE_VIDEO_MAX_SECONDS,
		resourceType: "video" as ExerciseMediaResourceType,
	};
}

function getFileExtension( fileName: string ) {
	return fileName.split( "." ).pop()?.trim().toLowerCase() ?? "";
}

// De que tipo es un archivo elegido para un lugar, o `null` si ese lugar no lo
// acepta. Mira la extension y el tipo que informa el navegador.
export function resolveExerciseMediaUploadKind(
	slot: ExerciseMediaSlot,
	file: { name: string; type: string },
): ExerciseMediaUploadKind | null {
	const extension = getFileExtension( file.name );

	if (slot === "image") {
		return ( EXERCISE_IMAGE_FORMATS as readonly string[] ).includes( extension ) && file.type.startsWith( "image/" )
			? "image"
			: null;
	}

	if (extension === "gif" && file.type === "image/gif") return "gif";

	return ( EXERCISE_VIDEO_FORMATS as readonly string[] ).includes( extension ) && file.type.startsWith( "video/" )
		? "video"
		: null;
}

export function formatMegabytes( bytes: number ) {
	return `${ new Intl.NumberFormat( "es-AR", { maximumFractionDigits: 1 } ).format( bytes / ( 1024 * 1024 ) ) } MB`;
}

export const EXERCISE_MEDIA_HELP = {
	image: `JPG, PNG o WebP, hasta ${ formatMegabytes( EXERCISE_IMAGE_MAX_BYTES ) }.`,
	video: `GIF, MP4, WebM o MOV, hasta ${ formatMegabytes( EXERCISE_VIDEO_MAX_BYTES ) }. Los videos, hasta ${ EXERCISE_VIDEO_MAX_SECONDS } segundos.`,
} as const;
