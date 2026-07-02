"use client";

import { useState } from "react";
import { Pencil } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

import type { CoachTrainingRoutine } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";
import CoachRoutineStructure from "@/features/role/coach/training-routine/components/shared/CoachRoutineStructure";
import { FeatureSheetLayout } from "@/features/shared/components/FeatureSheetLayout";
import { useResponsiveSheetPlacement } from "@/features/shared/hooks/useResponsiveSheetPlacement";

type CoachEditRoutineSheetContentProps = {
	month: number;
	routines: CoachTrainingRoutine[];
	studentId: string;
	year: number;
	hideTrigger?: boolean;
	isOpen?: boolean;
	onOpenChange?: ( isOpen: boolean ) => void;
};

export function CoachEditRoutineSheet( {
	month,
	routines,
	studentId,
	year,
	hideTrigger = false,
	isOpen,
	onOpenChange,
}: CoachEditRoutineSheetContentProps ) {
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
				<CoachRoutineStructure
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
