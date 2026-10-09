import type { ActionResult } from "@/lib/action-result";
import { Prisma } from "@/generated/prisma/client";

// Corre el cuerpo de una server action y convierte lo que tire en un motivo para
// mostrar. Los mensajes que escribimos nosotros (`throw new Error("...")`) pasan
// tal cual; lo tecnico (la base, la red, un bug) se cambia por `fallback`, que
// dice que fallo sin jerga.
export async function runAction<T>( fallback: string, body: () => Promise<T> ): Promise<ActionResult<T>> {
	try {
		return { data: await body(), ok: true };
	} catch (error) {
		const reason = getUserFacingReason( error );

		if (!reason) {
			console.error( fallback, error );
		}

		return { ok: false, reason: reason ?? fallback };
	}
}

function getUserFacingReason( error: unknown ) {
	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		return error.code === "P2002" ? getDuplicateReason( error ) : null;
	}

	// Solo `Error` a secas: es el que tiran las validaciones y los permisos. Sus
	// subclases (TypeError de un fetch, errores de Prisma, etc.) son tecnicas.
	if (error instanceof Error && error.constructor === Error) {
		return error.message;
	}

	return null;
}

// Dos registros que no pueden repetirse. El mensaje de Prisma nombra los campos
// de la restriccion, y con eso se arma un aviso que diga que corregir.
function getDuplicateReason( error: Prisma.PrismaClientKnownRequestError ) {
	// Sin el resto de `meta`: trae `modelName`, que haria coincidir "name" siempre.
	const detail = `${ error.message } ${ JSON.stringify( error.meta?.target ?? "" ) }`;
	// Sin `\b`: el guion bajo cuenta como letra, y el nombre de la restriccion
	// puede venir como `User_email_key`.
	const hasField = ( field: string ) => new RegExp( `(^|[^a-z])${ field }([^a-z]|$)`, "i" ).test( detail );

	if (hasField( "email" )) return "Ese email ya lo usa otra cuenta.";
	if (hasField( "dni" )) return "Ese DNI ya lo usa otra cuenta.";
	if (hasField( "month" )) return "Ese estudiante ya tiene una rutina en ese mes.";
	if (hasField( "name" )) return "Ya tenés una con ese nombre.";

	return "Eso ya está cargado.";
}
