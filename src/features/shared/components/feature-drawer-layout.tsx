"use client";

import type { ReactElement, ReactNode } from "react";
import { cloneElement, useRef, useState } from "react";

import { Button, Drawer, Modal } from "@heroui/react";
import { UNSAFE_PortalProvider } from "@react-aria/overlays";
import { twMerge } from "tailwind-merge";

type FeatureDrawerPlacement = "bottom" | "right";

type FeatureDrawerLayoutProps = {
	children: ReactNode;
	// Con cambios sin guardar, cerrar (la X, Escape, tocar afuera, "Cancelar")
	// pregunta antes. Un clic afuera de mas tiraba un alta completa.
	hasUnsavedChanges?: boolean;
	isDismissable?: boolean;
	isOpen?: boolean;
	bottomContentClassName?: string;
	onOpenChangeAction?: ( isOpen: boolean ) => void;
	placement: FeatureDrawerPlacement;
	rightContentClassName?: string;
	trigger?: ReactElement<{ onPress?: () => void }>;
};

// En el telefono el drawer sube desde abajo y ocupa todo el ancho; en escritorio
// entra desde la derecha como panel lateral.
//
// El alto maximo es el que pida cada drawer (92% de la pantalla si no dice
// nada), pero nunca mas que lo que el teclado deja ver. `dvh` no se entera del
// teclado: con el abierto, el drawer seguia midiendo casi toda la pantalla en un
// lugar visible de la mitad, y lo que sobraba —con el campo en el que se estaba
// escribiendo— quedaba fuera de vista. `--visual-viewport-height` la pone React
// Aria en el fondo del drawer y la actualiza cuando el teclado abre y cierra.
//
// `feature-drawer--bottom` es la marca propia para los estilos de globals.css:
// la clase de posicion de la libreria no sirve (ver el comentario de abajo).
const BOTTOM_DIALOG_CLASS_NAME = [
	"feature-drawer--bottom flex w-full flex-col rounded-t-2xl border-t border-border bg-surface",
	"[--feature-drawer-max-height:92dvh]",
	"max-h-[min(var(--feature-drawer-max-height),calc(var(--visual-viewport-height,100dvh)-1.5rem))]",
].join( " " );
const RIGHT_DIALOG_CLASS_NAME = "w-115 border-l border-border bg-surface";

// De que lado se apoya el drawer y desde donde entra. Se fija aca, con clases
// propias, porque la libreria a veces recalcula su clase de posicion como "abajo"
// en un drawer que es "derecha" (pasa cuando se monta otro drawer mientras este
// esta abierto, por ejemplo al agregar un ejercicio y despues buscar otro): el
// panel saltaba al borde izquierdo.
const RIGHT_CONTENT_CLASS_NAME = [
	"items-stretch justify-end",
	"[&[data-entering=true]_.drawer__dialog]:translate-x-full [&[data-entering=true]_.drawer__dialog]:translate-y-0",
	"[&[data-exiting=true]_.drawer__dialog]:translate-x-full [&[data-exiting=true]_.drawer__dialog]:translate-y-0",
].join( " " );
const BOTTOM_CONTENT_CLASS_NAME = [
	"items-end justify-normal",
	"[&[data-entering=true]_.drawer__dialog]:translate-x-0 [&[data-entering=true]_.drawer__dialog]:translate-y-full",
	"[&[data-exiting=true]_.drawer__dialog]:translate-x-0 [&[data-exiting=true]_.drawer__dialog]:translate-y-full",
].join( " " );

// Normaliza la estructura externa de los drawers usados dentro de features.
export function FeatureDrawerLayout( {
								 children,
								 hasUnsavedChanges = false,
								 isDismissable,
								 isOpen,
								 bottomContentClassName,
								 onOpenChangeAction,
								 placement,
								 rightContentClassName,
								 trigger,
							 }: FeatureDrawerLayoutProps ) {
	const portalContainerRef = useRef<HTMLDivElement | null>( null );
	const [ isDiscardOpen, setIsDiscardOpen ] = useState( false );

	function handleOpenChange( nextIsOpen: boolean ) {
		if (!nextIsOpen && hasUnsavedChanges) {
			setIsDiscardOpen( true );
			return;
		}

		onOpenChangeAction?.( nextIsOpen );
	}

	// Abajo no se cierra tocando afuera ni arrastrando: el drawer ocupa casi toda
	// la pantalla y un toque de mas tiraba un formulario a medio llenar. Se
	// cierra con sus botones. Al costado, un clic afuera es a proposito.
	const canDismiss = isDismissable ?? placement !== "bottom";
	const triggerElement = trigger
		? cloneElement( trigger, {
			onPress: () => {
				trigger.props.onPress?.();
				onOpenChangeAction?.( true );
			},
		} )
		: null;

	return (
		<>
			{ triggerElement }
			<Drawer.Backdrop
				isDismissable={ canDismiss }
				isOpen={ isOpen }
				variant={ "opaque" }
				onOpenChange={ handleOpenChange }
			>
				<Drawer.Content
					className={ placement === "right" ? RIGHT_CONTENT_CLASS_NAME : BOTTOM_CONTENT_CLASS_NAME }
					placement={ placement }
				>
					<Drawer.Dialog
						className={ placement === "right"
							? twMerge( RIGHT_DIALOG_CLASS_NAME, rightContentClassName )
							: twMerge( BOTTOM_DIALOG_CLASS_NAME, bottomContentClassName )
						}
					>
						{ /* La manija solo se dibuja si de verdad se puede arrastrar. */ }
						{ placement === "bottom" && canDismiss ? <Drawer.Handle/> : null }
						<Drawer.CloseTrigger className={ "absolute inset-e-4 top-4 z-10" }/>
						<div ref={ portalContainerRef } className={ "contents" } data-drawer-no-drag>
							<UNSAFE_PortalProvider getContainer={ () => portalContainerRef.current }>
								{ children }
								<DiscardChangesModal
									isOpen={ isDiscardOpen }
									onDiscardAction={ () => {
										setIsDiscardOpen( false );
										onOpenChangeAction?.( false );
									} }
									onOpenChangeAction={ setIsDiscardOpen }
								/>
							</UNSAFE_PortalProvider>
						</div>
					</Drawer.Dialog>
				</Drawer.Content>
			</Drawer.Backdrop>
		</>
	);
}

type DiscardChangesModalProps = {
	isOpen: boolean;
	onDiscardAction: () => void;
	onOpenChangeAction: ( isOpen: boolean ) => void;
};

// Va adentro del drawer (en su contenedor de portales): asi queda encima y el
// foco no se escapa al fondo.
function DiscardChangesModal( { isOpen, onDiscardAction, onOpenChangeAction }: DiscardChangesModalProps ) {
	return (
		<Modal.Backdrop isOpen={ isOpen } variant={ "blur" } onOpenChange={ onOpenChangeAction }>
			<Modal.Container placement={ "center" } size={ "sm" }>
				<Modal.Dialog className={ "mx-auto w-full max-w-sm" }>
					<Modal.Header>
						<Modal.Heading>¿Descartar los cambios?</Modal.Heading>
					</Modal.Header>
					<Modal.Body>
						<p className={ "text-sm text-muted" }>Lo que cargaste en este formulario todavía no se guardó.</p>
					</Modal.Body>
					<Modal.Footer className={ "gap-2" }>
						<Button variant={ "secondary" } onPress={ () => onOpenChangeAction( false ) }>
							Seguir editando
						</Button>
						<Button className={ "bg-danger text-danger-foreground" } onPress={ onDiscardAction }>
							Descartar
						</Button>
					</Modal.Footer>
				</Modal.Dialog>
			</Modal.Container>
		</Modal.Backdrop>
	);
}
