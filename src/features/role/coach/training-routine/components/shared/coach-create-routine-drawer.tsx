"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
import { Plus } from "lucide-react";

import CoachRoutineStructure from "@/features/role/coach/training-routine/components/shared/coach-routine-structure";
import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";

type CoachCreateRoutineDrawerContentProps = {
	hideTrigger?: boolean;
	isOpen?: boolean;
	month: number;
	onOpenChangeAction?: ( isOpen: boolean ) => void;
	studentId: string;
	year: number;
};

export function CoachCreateRoutineDrawer( {
											  hideTrigger = false,
											  isOpen,
											  month,
											  onOpenChangeAction,
											  studentId,
											  year,
										  }: CoachCreateRoutineDrawerContentProps ) {
	const [ internalIsOpen, setInternalIsOpen ] = useState( false );
	const placement = useResponsiveDrawerPlacement();
	const open = isOpen ?? internalIsOpen;
	const setOpen = onOpenChangeAction ?? setInternalIsOpen;

	return (
		<>
			{ hideTrigger ? null : (
				<Button
					variant={ "secondary" }
					onPress={ () => setOpen( true ) }
				>
					<Plus className={ "size-4" }/>
					Crear rutina
				</Button>
			) }
			<FeatureDrawerLayout
				isOpen={ open }
				placement={ placement }
				rightContentClassName={ "w-[42rem]" }
				onOpenChangeAction={ setOpen }
			>
				<CoachRoutineStructure
					mode={ "create" }
					month={ month }
					routineObjective={ "" }
					studentId={ studentId }
					year={ year }
					onSavedAction={ () => setOpen( false ) }
				/>
			</FeatureDrawerLayout>
		</>
	);
}
