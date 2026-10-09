"use server";

import { getAuthenticatedSession } from "@/features/auth/session";
import {
	createExerciseMediaUploadTicket,
	type ExerciseMediaUploadTicket,
	getCloudinaryCredentials,
	getExerciseMediaFolder,
} from "@/features/exercise-media/services/cloudinary-upload";
import type { ExerciseMediaUploadKind } from "@/features/exercise-media/services/exercise-media-limits";

export type ExerciseMediaUploadTicketResult =
	| { ok: true; ticket: ExerciseMediaUploadTicket }
	| { ok: false; reason: string };

const UPLOAD_KINDS: ExerciseMediaUploadKind[] = [ "gif", "image", "video" ];

// El permiso para subir un archivo directo a Cloudinary, a la carpeta de quien
// lo pide. Devuelve el motivo en vez de lanzar un error: en produccion el
// mensaje de un error no llega al navegador.
export async function createExerciseMediaUploadTicketAction( kind: ExerciseMediaUploadKind ): Promise<ExerciseMediaUploadTicketResult> {
	const session = await getAuthenticatedSession();

	if (!session || ( session.role !== "COACH" && session.role !== "ADMIN" )) {
		return { ok: false, reason: "Tu sesión no permite subir archivos. Volvé a iniciar sesión." };
	}

	if (!UPLOAD_KINDS.includes( kind )) {
		return { ok: false, reason: "Ese tipo de archivo no está permitido." };
	}

	const credentials = getCloudinaryCredentials();

	if (!credentials) {
		return { ok: false, reason: "La subida de archivos todavía no está configurada en este entorno." };
	}

	return {
		ok: true,
		ticket: createExerciseMediaUploadTicket(
			credentials,
			getExerciseMediaFolder( { id: session.sub, role: session.role } ),
			kind,
		),
	};
}
