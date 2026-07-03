"use client";

import { useState } from "react";
import { Copy } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

import { CoachCopyRoutineSheetInnerDesktop, } from "@/features/role/coach/training-routine/components/desktop/coach-copy-routine-sheet-inner-desktop";
import {
	CoachCopyRoutineSheetInnerMobile,
	type CoachCopyRoutineSheetInnerProps,
} from "@/features/role/coach/training-routine/components/mobile/coach-copy-routine-sheet-inner-mobile";
import { FeatureSheetLayout } from "@/features/shared/components/feature-sheet-layout";
import { useResponsiveSheetPlacement } from "@/features/shared/hooks/use-responsive-sheet-placement";

export type CoachCopyRoutineSheetContentProps = CoachCopyRoutineSheetInnerProps & {
	hideTrigger?: boolean;
	isOpen?: boolean;
	onOpenChangeAction?: ( isOpen: boolean ) => void;
};

export function CoachCopyRoutineSheet( {
										   hideTrigger = false,
										   isOpen,
										   onOpenChangeAction,
										   ...props
									   }: CoachCopyRoutineSheetContentProps ) {
	const [ internalIsOpen, setInternalIsOpen ] = useState( false );
	const placement = useResponsiveSheetPlacement();
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
			<FeatureSheetLayout
				isOpen={ open }
				placement={ placement }
				rightContentClassName={ "w-[42rem]" }
				onOpenChangeAction={ setOpen }
			>
				{ isMobile ? (
					<CoachCopyRoutineSheetInnerMobile { ...props } />
				) : (
					<CoachCopyRoutineSheetInnerDesktop { ...props } />
				) }
			</FeatureSheetLayout>
		</>
	);
}
