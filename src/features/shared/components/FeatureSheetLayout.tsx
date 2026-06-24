"use client";

import type { ReactElement, ReactNode } from "react";

import { Sheet } from "@heroui-pro/react";

type FeatureSheetPlacement = "bottom" | "right";

type FeatureSheetLayoutProps = {
	children: ReactNode;
	isOpen?: boolean;
	onOpenChange?: ( isOpen: boolean ) => void;
	placement: FeatureSheetPlacement;
	rightContentClassName?: string;
	trigger?: ReactElement<{ onPress?: () => void }>;
};

// Normaliza la estructura externa de los sheets usados dentro de features.
export function FeatureSheetLayout( {
										children,
										isOpen,
										onOpenChange,
										placement,
										rightContentClassName,
										trigger,
									}: FeatureSheetLayoutProps ) {
	return (
		<Sheet isDetached={ placement === "right" } isOpen={ isOpen } placement={ placement } onOpenChange={ onOpenChange }>
			{ trigger ? <Sheet.Trigger>{ trigger }</Sheet.Trigger> : null }
			<Sheet.Backdrop variant={ "opaque" }>
				<Sheet.Content className={ placement === "right" ? rightContentClassName ?? "w-105" : "mx-auto max-w-105" }>
					<Sheet.Dialog className={ placement === "right" ? "h-full" : undefined }>
						{ placement === "bottom" ? <Sheet.Handle/> : null }
						<Sheet.CloseTrigger className={ "absolute inset-e-4 top-4 z-10" }/>
						{ children }
					</Sheet.Dialog>
				</Sheet.Content>
			</Sheet.Backdrop>
		</Sheet>
	);
}
