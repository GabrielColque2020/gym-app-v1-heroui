import {
	destroyExerciseMedia,
	getCloudinaryCredentials,
	getExerciseMediaFolder,
	isExerciseMediaInFolder,
	verifyUploadedExerciseMedia,
} from "@/features/exercise-media/services/cloudinary-upload";
import type { ExerciseMediaSlot } from "@/features/exercise-media/services/exercise-media-limits";

type MediaOwner = { id: string; role: "ADMIN" | "COACH" };

type MediaValues = {
	imageUrl: string | null;
	videoUrl: string | null;
};

const SLOTS: Array<{ key: keyof MediaValues; slot: ExerciseMediaSlot }> = [
	{ key: "imageUrl", slot: "image" },
	{ key: "videoUrl", slot: "video" },
];

// La imagen y el video que llegan con un ejercicio tienen que ser los que ya
// tenia (o los del catalogo del que salio) o un archivo recien subido por quien
// guarda, que cumpla los limites. Cualquier otra direccion se rechaza: el
// formulario no deja escribir una, asi que solo llegaria de un pedido armado a mano.
export async function assertExerciseMediaAllowed( input: {
	alreadyAllowed: Array<string | null | undefined>;
	next: MediaValues;
	owner: MediaOwner;
} ) {
	const allowed = new Set( input.alreadyAllowed.filter( ( url ): url is string => Boolean( url ) ) );

	for (const { key, slot } of SLOTS) {
		const url = input.next[ key ];

		if (!url || allowed.has( url )) continue;

		const credentials = getCloudinaryCredentials();

		if (!credentials) {
			throw new Error( "La subida de archivos todavía no está configurada en este entorno." );
		}

		const check = await verifyUploadedExerciseMedia( credentials, {
			folder: getExerciseMediaFolder( input.owner ),
			slot,
			url,
		} );

		if (!check.ok) {
			throw new Error( check.reason );
		}
	}
}

// Borra de Cloudinary los archivos propios que el ejercicio dejo de usar: los
// que se reemplazaron o se quitaron. Los del catalogo general no se tocan.
export async function removeUnusedExerciseMedia( input: {
	next: Array<string | null | undefined>;
	owner: MediaOwner;
	previous: Array<string | null | undefined>;
} ) {
	const credentials = getCloudinaryCredentials();

	if (!credentials) return;

	const folder = getExerciseMediaFolder( input.owner );
	const stillUsed = new Set( input.next.filter( Boolean ) );

	for (const url of input.previous) {
		if (!url || stillUsed.has( url )) continue;
		if (!isExerciseMediaInFolder( url, credentials.cloudName, folder )) continue;

		await destroyExerciseMedia( credentials, url );
	}
}
