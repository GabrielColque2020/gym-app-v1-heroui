"use client";

import type { ReactElement, ReactNode } from "react";
import { useRef } from "react";

import { Sheet } from "@heroui-pro/react";
import { UNSAFE_PortalProvider } from "@react-aria/overlays";

type FeatureSheetPlacement = "bottom" | "right";

type FeatureSheetLayoutProps = {
	children: ReactNode;
	isDismissable?: boolean;
	isHandleOnly?: boolean;
	isOpen?: boolean;
	onOpenChangeAction?: ( isOpen: boolean ) => void;
	placement: FeatureSheetPlacement;
	rightContentClassName?: string;
	trigger?: ReactElement<{ onPress?: () => void }>;
};

// Normaliza la estructura externa de los sheets usados dentro de features.
export function FeatureSheetLayout( {
	children,
	isDismissable = true,
	isHandleOnly = false,
	isOpen,
	onOpenChangeAction,
										placement,
	rightContentClassName,
	trigger,
}: FeatureSheetLayoutProps ) {
	const portalContainerRef = useRef<HTMLDivElement | null>( null );

	return (
		<Sheet
			isDetached={ placement === "right" }
			isDismissable={ isDismissable }
			isHandleOnly={ isHandleOnly }
			isOpen={ isOpen }
			placement={ placement }
			onOpenChange={ onOpenChangeAction }
		>
			{ trigger ? <Sheet.Trigger>{ trigger }</Sheet.Trigger> : null }
			<Sheet.Backdrop variant={ "opaque" }>
				<Sheet.Content className={ placement === "right" ? rightContentClassName ?? "w-115" : "mx-auto max-w-105" }>
					<Sheet.Dialog className={ placement === "right" ? "h-full" : undefined }>
						{ placement === "bottom" ? <Sheet.Handle/> : null }
						<Sheet.CloseTrigger className={ "absolute inset-e-4 top-4 z-10" }/>
						<div ref={ portalContainerRef } className={ "contents" } data-sheet-no-drag>
							<UNSAFE_PortalProvider getContainer={ () => portalContainerRef.current }>
								{ children }
							</UNSAFE_PortalProvider>
						</div>
					</Sheet.Dialog>
				</Sheet.Content>
			</Sheet.Backdrop>
		</Sheet>
	);
}
