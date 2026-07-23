"use client";

import { Spinner } from "@heroui/react";
import { ImageOff, VideoOff } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { getOptimizedCloudinaryMedia } from "@/lib/cloudinary-media";

type AsyncMediaKind = "auto" | "image" | "video";
type MediaLoadState = "empty" | "error" | "loaded" | "loading";

type AsyncMediaProps = {
	alt: string;
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
	className = "",
	controls = true,
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
	const [ loadState, setLoadState ] = useState<MediaLoadState>( normalizedSrc ? "loading" : "empty" );

	useEffect( () => {
		setLoadState( normalizedSrc ? "loading" : "empty" );
	}, [ normalizedSrc ] );

	const placeholderLabel = loadState === "error"
		? errorLabel ?? (resolvedKind === "video" ? "No se pudo cargar el video." : "No se pudo cargar la imagen.")
		: emptyLabel ?? (resolvedKind === "video" ? "Sin video disponible." : "Sin imagen disponible." );
	const PlaceholderIcon = resolvedKind === "video" ? VideoOff : ImageOff;

	return (
		<div className={ `relative overflow-hidden bg-muted/30 ${ className }` }>
			{ deliverySrc ? deliveryKind === "video" ? (
				<video
					className={ `h-full w-full bg-content2 object-contain ${ loadState === "loaded" ? "opacity-100" : "opacity-0" } ${ mediaClassName }` }
					controls={ controls }
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
