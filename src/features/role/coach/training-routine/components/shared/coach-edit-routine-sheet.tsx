"use client";

import { useState } from "react";

import type { CoachTrainingRoutine } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";
import CoachRoutineStructure from "@/features/role/coach/training-routine/components/shared/coach-routine-structure";
import { CoachEditRoutineSheetTrigger } from "@/features/role/coach/training-routine/components/shared/coach-edit-routine-sheet-trigger";
import { FeatureSheetLayout } from "@/features/shared/components/feature-sheet-layout";
import { useResponsiveSheetPlacement } from "@/features/shared/hooks/use-responsive-sheet-placement";

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
				<CoachEditRoutineSheetTrigger
					isMobile={ isMobile }
					onPress={ () => setOpen( true ) }
				/>
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
