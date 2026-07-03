"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
import { Plus } from "lucide-react";

import CoachRoutineStructure from "@/features/role/coach/training-routine/components/shared/coach-routine-structure";
import { FeatureSheetLayout } from "@/features/shared/components/feature-sheet-layout";
import { useResponsiveSheetPlacement } from "@/features/shared/hooks/use-responsive-sheet-placement";

type CoachCreateRoutineSheetContentProps = {
	month: number;
	studentId: string;
	year: number;
};

export function CoachCreateRoutineSheet( {
											 month,
											 studentId,
											 year,
										 }: CoachCreateRoutineSheetContentProps ) {
	const [ isOpen, setIsOpen ] = useState( false );
	const placement = useResponsiveSheetPlacement();
	const isMobile = placement === "bottom";

	return (
		<>
			<Button
				className={
					isMobile
						? "bg-accent-foreground border border-accent/50 text-accent shadow-sm"
						: "bg-surface border border-accent/50 text-accent shadow-sm"
				}
				variant={ "outline" }
				onPress={ () => setIsOpen( true ) }
			>
				<Plus className={ "size-4" }/>
				{ !isMobile && "Crear rutina" }
			</Button>
			<FeatureSheetLayout
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
			</FeatureSheetLayout>
		</>
	);
}
