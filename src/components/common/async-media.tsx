"use client";

import { Spinner } from "@heroui/react";
import { ImageOff, VideoOff } from "lucide-react";
import { useMemo, useState } from "react";

import { getOptimizedCloudinaryMedia } from "@/lib/cloudinary-media";

type AsyncMediaKind = "auto" | "image" | "video";
type MediaLoadState = "empty" | "error" | "loaded" | "loading";

type AsyncMediaProps = {
	alt: string;
	// Un video que arranca solo, en silencio y en bucle, como un GIF. Es lo
	// normal: el movimiento de un ejercicio se mira, no se "reproduce". Los GIF
	// del catalogo ademas se entregan como video (pesan mucho menos), y con
	// controles a la vista parecian un reproductor en vez de una animacion.
	autoPlayLoop?: boolean;
	className?: string;
	controls?: boolean;
	emptyLabel?: string;
	errorLabel?: string;
	kind?: AsyncMediaKind;
	mediaClassName?: string;
	src?: string | null;
	spinnerLabel?: string;
};

function resolveKind( src: string, kind: AsyncMediaKind ) {
	if (kind !== "auto") {
		return kind;
	}

	return /\.(mp4|webm|ogg|mov|m4v)(?:\?.*)?$/i.test( src ) ? "video" : "image";
}

export function AsyncMedia( {
	alt,
	autoPlayLoop = true,
	className = "",
	controls = false,
	emptyLabel,
	errorLabel,
	kind = "auto",
	mediaClassName = "",
	src,
	spinnerLabel = "Cargando media",
}: AsyncMediaProps ) {
	const normalizedSrc = src?.trim() ?? "";
	const resolvedKind = useMemo(
		() => (normalizedSrc ? resolveKind( normalizedSrc, kind ) : kind === "video" ? "video" : "image"),
		[ kind, normalizedSrc ],
	);
	const optimizedMedia = useMemo(
		() => normalizedSrc
			? getOptimizedCloudinaryMedia( normalizedSrc, resolvedKind === "video" ? "video" : "image" )
			: { kind: resolvedKind === "video" ? "video" : "image", url: "" },
		[ normalizedSrc, resolvedKind ],
	);
	const deliverySrc = optimizedMedia.url;
	const deliveryKind = optimizedMedia.kind === "video" ? "video" : "image";
	// Como termino la carga, y de que archivo: si cambia el archivo, lo anterior
	// deja de valer y vuelve a mostrarse "cargando" sin tener que reiniciar nada.
	const [ settled, setSettled ] = useState<{ src: string; state: "error" | "loaded" } | null>( null );
	const loadState: MediaLoadState = !normalizedSrc
		? "empty"
		: settled?.src === normalizedSrc ? settled.state : "loading";
	const setLoadState = ( state: "error" | "loaded" ) => setSettled( { src: normalizedSrc, state } );

	const placeholderLabel = loadState === "error"
		? errorLabel ?? (resolvedKind === "video" ? "No se pudo cargar el video." : "No se pudo cargar la imagen.")
		: emptyLabel ?? (resolvedKind === "video" ? "Sin video disponible." : "Sin imagen disponible." );
	const PlaceholderIcon = resolvedKind === "video" ? VideoOff : ImageOff;

	return (
		<div className={ `relative overflow-hidden bg-muted/30 ${ className }` }>
			{ deliverySrc ? deliveryKind === "video" ? (
				<video
					className={ `h-full w-full bg-content2 object-contain ${ loadState === "loaded" ? "opacity-100" : "opacity-0" } ${ mediaClassName }` }
					autoPlay={ autoPlayLoop }
					controls={ controls }
					loop={ autoPlayLoop }
					// Sin silencio el navegador no deja que arranque solo.
					muted={ autoPlayLoop }
					playsInline={ autoPlayLoop }
					src={ deliverySrc }
					onError={ () => setLoadState( "error" ) }
					onLoadedData={ () => setLoadState( "loaded" ) }
				/>
			) : (
				<img
					alt={ alt }
					className={ `h-full w-full bg-content2 object-contain ${ loadState === "loaded" ? "opacity-100" : "opacity-0" } ${ mediaClassName }` }
					src={ deliverySrc }
					onError={ () => setLoadState( "error" ) }
					onLoad={ () => setLoadState( "loaded" ) }
				/>
			) : null }

			{ loadState === "loading" ? (
				<div className={ "absolute inset-0 flex items-center justify-center bg-background/45 backdrop-blur-[1px]" }>
					<Spinner aria-label={ spinnerLabel } size={ "sm" } />
				</div>
			) : null }

			{ loadState === "empty" || loadState === "error" ? (
				<div className={ "absolute inset-0 flex flex-col items-center justify-center gap-2 px-3 text-center text-xs text-muted-foreground" }>
					<PlaceholderIcon className={ "size-5" } />
					<span>{ placeholderLabel }</span>
				</div>
			) : null }
		</div>
	);
}
