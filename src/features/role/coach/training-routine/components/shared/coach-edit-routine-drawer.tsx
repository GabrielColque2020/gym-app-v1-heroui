"use client";

import { useState } from "react";

import type { CoachTrainingRoutine } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";
import CoachRoutineStructure from "@/features/role/coach/training-routine/components/shared/coach-routine-structure";
import { CoachEditRoutineDrawerTrigger } from "@/features/role/coach/training-routine/components/shared/coach-edit-routine-drawer-trigger";
import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";

type CoachEditRoutineDrawerContentProps = {
	month: number;
	routineObjective?: string | null;
	routineWeeks: CoachTrainingRoutine[];
	studentId: string;
	year: number;
	hideTrigger?: boolean;
	isOpen?: boolean;
	onOpenChangeAction?: ( isOpen: boolean ) => void;
};

export function CoachEditRoutineDrawer( {
										   month,
										   routineObjective,
										   routineWeeks,
										   studentId,
										   year,
										   hideTrigger = false,
										   isOpen,
										   onOpenChangeAction,
									   }: CoachEditRoutineDrawerContentProps ) {
	const [ internalIsOpen, setInternalIsOpen ] = useState( false );
	const placement = useResponsiveDrawerPlacement();
	const isMobile = placement === "bottom";
	const open = isOpen ?? internalIsOpen;
	const setOpen = onOpenChangeAction ?? setInternalIsOpen;

	return (
		<>
			{ hideTrigger ? null : (
				<CoachEditRoutineDrawerTrigger
					isMobile={ isMobile }
					onPressAction={ () => setOpen( true ) }
				/>
			) }
			<FeatureDrawerLayout
				isOpen={ open }
				placement={ placement }
				onOpenChangeAction={ setOpen }
				rightContentClassName={ "w-[42rem]" }
			>
				<CoachRoutineStructure
					mode={ "edit" }
					month={ month }
					routineObjective={ routineObjective }
					routineWeeks={ routineWeeks }
					studentId={ studentId }
					year={ year }
					onSavedAction={ () => setOpen( false ) }
				/>
			</FeatureDrawerLayout>
		</>
	);
}

