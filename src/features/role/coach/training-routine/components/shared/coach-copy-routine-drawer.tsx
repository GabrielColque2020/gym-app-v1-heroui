"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { Copy } from "lucide-react";

import { CoachCopyRoutineDrawerInnerDesktop, } from "@/features/role/coach/training-routine/components/desktop/coach-copy-routine-drawer-inner-desktop";
import {
	CoachCopyRoutineDrawerInnerMobile,
	type CoachCopyRoutineDrawerInnerProps,
} from "@/features/role/coach/training-routine/components/mobile/coach-copy-routine-drawer-inner-mobile";
import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";

export type CoachCopyRoutineDrawerContentProps = CoachCopyRoutineDrawerInnerProps & {
	hideTrigger?: boolean;
	isOpen?: boolean;
	onOpenChangeAction?: ( isOpen: boolean ) => void;
};

export function CoachCopyRoutineDrawer( {
										   hideTrigger = false,
										   isOpen,
										   onOpenChangeAction,
										   ...props
									   }: CoachCopyRoutineDrawerContentProps ) {
	const [ internalIsOpen, setInternalIsOpen ] = useState( false );
	const placement = useResponsiveDrawerPlacement();
	const isMobile = placement === "bottom";
	const open = isOpen ?? internalIsOpen;
	const setOpen = onOpenChangeAction ?? setInternalIsOpen;

	return (
		<>
			{ hideTrigger ? null : (
				<Button
					variant={ "outline" }
					className={
						isMobile
							? "bg-accent-foreground border border-accent/50 text-accent shadow-sm"
							: "bg-surface border border-accent/50 text-accent shadow-sm"
					}
					onPress={ () => setOpen( true ) }
				>
					<Copy className={ "size-4" }/> { !isMobile && "Copiar rutina" }
				</Button>
			) }
			<FeatureDrawerLayout
				isOpen={ open }
				placement={ placement }
				rightContentClassName={ "w-[42rem]" }
				onOpenChangeAction={ setOpen }
			>
				{ isMobile ? (
					<CoachCopyRoutineDrawerInnerMobile { ...props } />
				) : (
					<CoachCopyRoutineDrawerInnerDesktop { ...props } />
				) }
			</FeatureDrawerLayout>
		</>
	);
}

