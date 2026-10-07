"use client";

import { useRef, useState } from "react";
import { Popover } from "react-aria-components";

import { AsyncMedia } from "@/components/common/async-media";

type MediaPreviewThumbnailProps = {
	// Nombre de lo que se muestra, para los textos de accesibilidad.
	name: string;
	imageUrl?: string | null;
	// Animacion o video. Si existe, es lo que se ve en grande.
	videoUrl?: string | null;
	thumbnailClassName?: string;
};

// Miniatura que muestra la imagen en grande al pasarle el mouse, enfocarla o
// tocarla. Sirve en las listas donde hay que elegir entre ejercicios parecidos:
// la miniatura alcanza para reconocer, no para distinguir el movimiento, y
// agrandarla le sacaba lugar a la lista.
export function MediaPreviewThumbnail( {
	imageUrl,
	name,
	thumbnailClassName = "h-14 w-14",
	videoUrl,
}: MediaPreviewThumbnailProps ) {
	const triggerRef = useRef<HTMLButtonElement | null>( null );
	const [ isOpen, setIsOpen ] = useState( false );
	// En pantallas anchas va al costado, fuera de la lista. En el telefono no hay
	// costado: va arriba de la fila, para no tapar su boton.
	const [ placement, setPlacement ] = useState<"left" | "top start">( "left" );

	function open() {
		setPlacement( window.innerWidth < 768 ? "top start" : "left" );
		setIsOpen( true );
	}
	const previewSrc = videoUrl?.trim() || imageUrl?.trim() || "";

	// Sin imagen no hay nada que agrandar: queda la miniatura sola.
	if (!previewSrc) {
		return (
			<AsyncMedia
				alt={ `Imagen de ${ name }` }
				className={ `${ thumbnailClassName } shrink-0 rounded-xl border border-border object-cover` }
				emptyLabel={ "Sin imagen" }
				spinnerLabel={ `Cargando imagen de ${ name }` }
				src={ imageUrl }
			/>
		);
	}

	return (
		<>
			<button
				ref={ triggerRef }
				aria-expanded={ isOpen }
				aria-label={ `Ver ${ name } en grande` }
				className={ `${ thumbnailClassName } shrink-0 cursor-zoom-in overflow-hidden rounded-xl border border-border outline-none transition hover:border-accent focus-visible:ring-2 focus-visible:ring-accent` }
				type={ "button" }
				// En el telefono no hay mouse: se abre al tocar y se cierra al tocar afuera,
				// que le saca el foco.
				onBlur={ () => setIsOpen( false ) }
				onClick={ open }
				onFocus={ open }
				onMouseEnter={ open }
				onMouseLeave={ () => setIsOpen( false ) }
			>
				<AsyncMedia
					alt={ `Imagen de ${ name }` }
					className={ "size-full" }
					emptyLabel={ "Sin imagen" }
					spinnerLabel={ `Cargando imagen de ${ name }` }
					src={ imageUrl }
				/>
			</button>
			{ /* No modal y sin atrapar el mouse: es solo para mirar, la lista sigue usable. */ }
			<Popover
				isNonModal
				className={ "pointer-events-none z-[60] w-72 max-w-[80vw] overflow-hidden rounded-2xl border border-border bg-surface shadow-xl" }
				isOpen={ isOpen }
				offset={ 12 }
				placement={ placement }
				triggerRef={ triggerRef }
				onOpenChange={ setIsOpen }
			>
				<AsyncMedia
					autoPlayLoop
					alt={ `${ name } en grande` }
					className={ "aspect-square w-full bg-white" }
					controls={ false }
					emptyLabel={ "Sin imagen" }
					spinnerLabel={ `Cargando ${ name }` }
					src={ previewSrc }
				/>
				<p className={ "px-3 py-2 text-sm font-medium text-foreground" }>{ name }</p>
			</Popover>
		</>
	);
}
