"use client";

import { toast } from "@heroui/react";
import { useState } from "react";

import { getErrorMessage } from "@/lib/action-result";

// El nombre que manda el servidor en `Content-Disposition` (`filename="..."`).
function getFileName( response: Response, fallback: string ) {
	const disposition = response.headers.get( "Content-Disposition" ) ?? "";
	const match = /filename\*?=(?:UTF-8'')?"?([^";]+)"?/i.exec( disposition );

	return match?.[ 1 ] ? decodeURIComponent( match[ 1 ] ) : fallback;
}

// Baja un archivo y avisa si no se pudo. Antes era un enlace con `download`: si
// el servidor respondia con un error (sin datos, sin permiso), el navegador no
// bajaba nada o bajaba un archivo con el error adentro, y la pantalla decia
// "Descargando…" igual. Ahora se pide primero y se mira la respuesta.
export async function downloadFile( url: string, fallbackFileName = "reporte.pdf" ) {
	const response = await fetch( url, { cache: "no-store" } );

	if (!response.ok) {
		const result = await response.json().catch( () => null ) as { error?: string } | null;

		throw new Error( result?.error || "No se pudo generar el archivo. Probá de nuevo." );
	}

	const blob = await response.blob();
	const objectUrl = URL.createObjectURL( blob );
	const downloadLink = document.createElement( "a" );

	downloadLink.download = getFileName( response, fallbackFileName );
	downloadLink.href = objectUrl;
	downloadLink.rel = "noopener";
	downloadLink.style.display = "none";
	document.body.append( downloadLink );
	downloadLink.click();
	downloadLink.remove();
	// Un rato despues: algunos navegadores todavia estan leyendo el archivo.
	window.setTimeout( () => URL.revokeObjectURL( objectUrl ), 10_000 );
}

// `downloadFile` con su estado ("Descargando…" mientras de verdad se descarga)
// y el aviso si falla.
export function useFileDownload() {
	const [ isDownloading, setIsDownloading ] = useState( false );

	async function download( url: string, fallbackFileName?: string ) {
		if (isDownloading) return false;

		setIsDownloading( true );

		try {
			await downloadFile( url, fallbackFileName );

			return true;
		} catch (error) {
			toast.danger( "No se pudo descargar", {
				description: getErrorMessage( error, "No se pudo generar el archivo. Probá de nuevo." ),
			} );

			return false;
		} finally {
			setIsDownloading( false );
		}
	}

	return { download, isDownloading };
}
