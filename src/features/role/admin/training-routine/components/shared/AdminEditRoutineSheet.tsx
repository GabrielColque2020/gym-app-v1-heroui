"use client";

import { useState } from "react";
import { Pencil } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

import type { AdminTrainingRoutine } from "@/features/role/admin/training-routine/actions/get-training-routines-by-student";
import AdminRoutineStructure from "@/features/role/admin/training-routine/components/shared/AdminRoutineStructure";
import { FeatureSheetLayout } from "@/features/shared/components/FeatureSheetLayout";
import { useResponsiveSheetPlacement } from "@/features/shared/hooks/useResponsiveSheetPlacement";

type AdminEditRoutineSheetContentProps = {
	month: number;
	routines: AdminTrainingRoutine[];
	studentId: string;
	year: number;
	hideTrigger?: boolean;
	isOpen?: boolean;
	onOpenChange?: ( isOpen: boolean ) => void;
};

export function AdminEditRoutineSheet( {
	month,
	routines,
	studentId,
	year,
	hideTrigger = false,
	isOpen,
	onOpenChange,
}: AdminEditRoutineSheetContentProps ) {
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
					className={ isMobile
						? "bg-accent-foreground border border-accent/50 text-accent shadow-sm"
						: "bg-surface border border-accent/50 text-accent shadow-sm"
					}
					onPress={ () => setOpen( true ) }
				>
					<Pencil className={ "size-4" }/>
					{ !isMobile && "Editar rutina" }
				</Button>
			) }
			<FeatureSheetLayout
				isOpen={ open }
				placement={ placement }
				onOpenChange={ setOpen }
				rightContentClassName={ "w-[42rem]" }
			>
				<AdminRoutineStructure
					mode={ "edit" }
					month={ month }
					routines={ routines }
					studentId={ studentId }
					year={ year }
					onSaved={ () => setOpen( false ) }
				/>
			</FeatureSheetLayout>
		</>
	);
}
