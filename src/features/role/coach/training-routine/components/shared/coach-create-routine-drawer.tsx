"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
import { Plus } from "lucide-react";

import CoachRoutineStructure from "@/features/role/coach/training-routine/components/shared/coach-routine-structure";
import { FeatureDrawerLayout } from "@/features/shared/components/feature-drawer-layout";
import { useResponsiveDrawerPlacement } from "@/features/shared/hooks/use-responsive-drawer-placement";

type CoachCreateRoutineDrawerContentProps = {
	month: number;
	studentId: string;
	year: number;
};

export function CoachCreateRoutineDrawer( {
											  month,
											  studentId,
											  year,
										  }: CoachCreateRoutineDrawerContentProps ) {
	const [ isOpen, setIsOpen ] = useState( false );
	const placement = useResponsiveDrawerPlacement();
	const isMobile = placement === "bottom";

	return (
		<>
			<Button
				variant={ "secondary" }
				onPress={ () => setIsOpen( true ) }
			>
				<Plus className={ "size-4" }/>
				{ !isMobile && "Crear rutina" }
			</Button>
			<FeatureDrawerLayout
				isOpen={ isOpen }
				placement={ placement }
				rightContentClassName={ "w-[42rem]" }
				onOpenChangeAction={ setIsOpen }
			>
				<CoachRoutineStructure
					mode={ "create" }
					month={ month }
					studentId={ studentId }
					year={ year }
					onSavedAction={ () => setIsOpen( false ) }
				/>
			</FeatureDrawerLayout>
		</>
	);
}

