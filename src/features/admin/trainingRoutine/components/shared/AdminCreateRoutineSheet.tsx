"use client";

import { Button } from "@heroui/react";
import { Plus } from "@gravity-ui/icons";
import { useState } from "react";

import { AdminRoutineStructure } from "@/features/admin/trainingRoutine/components/shared/AdminRoutineStructure";
import { FeatureSheetLayout } from "@/features/shared/components/FeatureSheetLayout";
import { useResponsiveSheetPlacement } from "@/features/shared/hooks/useResponsiveSheetPlacement";

type AdminCreateRoutineSheetContentProps = {
	month: number;
	studentId: string;
	year: number;
};

export function AdminCreateRoutineSheet( {
											 month,
											 studentId,
											 year,
										 }: AdminCreateRoutineSheetContentProps ) {
	const [ isOpen, setIsOpen ] = useState( false );
	const placement = useResponsiveSheetPlacement();
	const isMobile = placement === "bottom";

	return (
		<>
			<Button
				className={ isMobile
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
				onOpenChange={ setIsOpen }>
				<AdminRoutineStructure
					mode={ "create" }
					month={ month }
					studentId={ studentId }
					year={ year }
					onSaved={ () => setIsOpen( false ) }
				/>
			</FeatureSheetLayout>
		</>
	);
}
