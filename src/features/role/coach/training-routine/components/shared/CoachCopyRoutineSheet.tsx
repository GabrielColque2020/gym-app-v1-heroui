"use client";

import { useState } from "react";
import { Copy } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

import {
	CoachCopyRoutineSheetInnerDesktop,
} from "@/features/role/coach/training-routine/components/desktop/CoachCopyRoutineSheetInnerDesktop";
import {
	CoachCopyRoutineSheetInnerMobile,
	type CoachCopyRoutineSheetInnerProps,
} from "@/features/role/coach/training-routine/components/mobile/CoachCopyRoutineSheetInnerMobile";
import { FeatureSheetLayout } from "@/features/shared/components/FeatureSheetLayout";
import { useResponsiveSheetPlacement } from "@/features/shared/hooks/useResponsiveSheetPlacement";

export type CoachCopyRoutineSheetContentProps = CoachCopyRoutineSheetInnerProps & {
	hideTrigger?: boolean;
	isOpen?: boolean;
	onOpenChange?: ( isOpen: boolean ) => void;
};

export function CoachCopyRoutineSheet( {
	hideTrigger = false,
	isOpen,
	onOpenChange,
	...props
}: CoachCopyRoutineSheetContentProps ) {
	const [ internalIsOpen, setInternalIsOpen ] = useState( false );
	const placement = useResponsiveSheetPlacement();
	const isMobile = placement === "bottom";
	const open = isOpen ?? internalIsOpen;
	const setOpen = onOpenChange ?? setInternalIsOpen;

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
				onOpenChange={ setOpen }
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
