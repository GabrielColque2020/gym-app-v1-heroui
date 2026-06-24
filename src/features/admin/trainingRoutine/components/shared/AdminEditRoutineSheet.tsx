"use client";

import type { AdminTrainingRoutine } from "@/features/admin/trainingRoutine/actions/get-training-routines-by-student";

import { Button } from "@heroui/react";
import { Pencil } from "@gravity-ui/icons";
import { useState } from "react";

import { AdminRoutineStructure } from "@/features/admin/trainingRoutine/components/shared/AdminRoutineStructure";
import { FeatureSheetLayout } from "@/features/shared/components/FeatureSheetLayout";
import { useResponsiveSheetPlacement } from "@/features/shared/hooks/useResponsiveSheetPlacement";

type AdminEditRoutineSheetContentProps = {
	month: number;
	routines: AdminTrainingRoutine[];
	studentId: string;
	year: number;
};

export function AdminEditRoutineSheet( {
										   month,
										   routines,
										   studentId,
										   year,
									   }: AdminEditRoutineSheetContentProps ) {
	const [ isOpen, setIsOpen ] = useState( false );

	const placement = useResponsiveSheetPlacement();
	const isMobile = placement === "bottom";

	return (
		<>
			<Button
				variant={ "outline" }
				className={ isMobile
					? "bg-accent-foreground border border-accent/50 text-accent shadow-sm"
					: "bg-surface border border-accent/50 text-accent shadow-sm"
				}
				onPress={ () => setIsOpen( true ) }
			>
				<Pencil className={ "size-4" }/>
				{ !isMobile && "Editar rutina" }
			</Button>
			<FeatureSheetLayout
				isOpen={ isOpen }
				placement={ placement }
				onOpenChange={ setIsOpen }
				rightContentClassName={ "w-[42rem]" }
			>
				<AdminRoutineStructure
					mode={ "edit" }
					month={ month }
					routines={ routines }
					studentId={ studentId }
					year={ year }
					onSaved={ () => setIsOpen( false ) }
				/>
			</FeatureSheetLayout>
		</>
	);
}
