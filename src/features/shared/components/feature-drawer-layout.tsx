"use client";

import type { ReactElement, ReactNode } from "react";
import { cloneElement, useRef } from "react";

import { Drawer } from "@heroui/react";
import { UNSAFE_PortalProvider } from "@react-aria/overlays";
import { twMerge } from "tailwind-merge";

type FeatureDrawerPlacement = "bottom" | "right";

type FeatureDrawerLayoutProps = {
	children: ReactNode;
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
const BOTTOM_DIALOG_CLASS_NAME = "flex max-h-[92dvh] w-full flex-col rounded-t-2xl border-t border-border bg-surface";
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
								 isDismissable,
								 isOpen,
								 bottomContentClassName,
								 onOpenChangeAction,
								 placement,
								 rightContentClassName,
								 trigger,
							 }: FeatureDrawerLayoutProps ) {
	const portalContainerRef = useRef<HTMLDivElement | null>( null );
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
				onOpenChange={ onOpenChangeAction }
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
							</UNSAFE_PortalProvider>
						</div>
					</Drawer.Dialog>
				</Drawer.Content>
			</Drawer.Backdrop>
		</>
	);
}
