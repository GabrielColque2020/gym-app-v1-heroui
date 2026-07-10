"use client";

import type { ReactElement, ReactNode } from "react";
import { cloneElement, useRef } from "react";

import { Drawer } from "@heroui/react";
import { UNSAFE_PortalProvider } from "@react-aria/overlays";

type FeatureDrawerPlacement = "bottom" | "right";

type FeatureDrawerLayoutProps = {
	children: ReactNode;
	isDismissable?: boolean;
	isHandleOnly?: boolean;
	isOpen?: boolean;
	bottomContentClassName?: string;
	onOpenChangeAction?: ( isOpen: boolean ) => void;
	placement: FeatureDrawerPlacement;
	rightContentClassName?: string;
	trigger?: ReactElement<{ onPress?: () => void }>;
};

// Normaliza la estructura externa de los drawers usados dentro de features.
export function FeatureDrawerLayout( {
								 children,
								 isDismissable = true,
								 isOpen,
								 bottomContentClassName,
								 onOpenChangeAction,
								 placement,
								 rightContentClassName,
								 trigger,
							 }: FeatureDrawerLayoutProps ) {
	const portalContainerRef = useRef<HTMLDivElement | null>( null );
	const triggerElement = trigger
		? cloneElement( trigger, {
			onPress: () => {
				trigger.props.onPress?.();
				onOpenChangeAction?.( true );
			},
		} )
		: null;

	return (
		<Drawer isOpen={ isOpen } onOpenChange={ onOpenChangeAction }>
			{ triggerElement }
			<Drawer.Backdrop variant={ "opaque" } isDismissable={ isDismissable }>
				<Drawer.Content placement={ placement }>
					<Drawer.Dialog
						className={ placement === "right"
							? rightContentClassName ?? "w-115"
							: bottomContentClassName ?? "mx-auto w-full max-w-105"
						}
					>
						{ placement === "bottom" ? <Drawer.Handle/> : null }
						<Drawer.CloseTrigger className={ "absolute inset-e-4 top-4 z-10" }/>
						<div ref={ portalContainerRef } className={ "contents" } data-drawer-no-drag>
							<UNSAFE_PortalProvider getContainer={ () => portalContainerRef.current }>
								{ children }
							</UNSAFE_PortalProvider>
						</div>
					</Drawer.Dialog>
				</Drawer.Content>
			</Drawer.Backdrop>
		</Drawer>
	);
}
