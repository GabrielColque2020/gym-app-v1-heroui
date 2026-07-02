"use client";

import { useState } from "react";
import { Copy } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

import {
	AdminCopyRoutineSheetInnerDesktop,
} from "@/features/role/admin/training-routine/components/desktop/AdminCopyRoutineSheetInnerDesktop";
import {
	AdminCopyRoutineSheetInnerMobile,
	type AdminCopyRoutineSheetInnerProps,
} from "@/features/role/admin/training-routine/components/mobile/AdminCopyRoutineSheetInnerMobile";
import { FeatureSheetLayout } from "@/features/shared/components/FeatureSheetLayout";
import { useResponsiveSheetPlacement } from "@/features/shared/hooks/useResponsiveSheetPlacement";

export type AdminCopyRoutineSheetContentProps = AdminCopyRoutineSheetInnerProps & {
	hideTrigger?: boolean;
	isOpen?: boolean;
	onOpenChange?: ( isOpen: boolean ) => void;
};

export function AdminCopyRoutineSheet( {
	hideTrigger = false,
	isOpen,
	onOpenChange,
	...props
}: AdminCopyRoutineSheetContentProps ) {
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
					<AdminCopyRoutineSheetInnerMobile { ...props } />
				) : (
					<AdminCopyRoutineSheetInnerDesktop { ...props } />
				) }
			</FeatureSheetLayout>
		</>
	);
}
