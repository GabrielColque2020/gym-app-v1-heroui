"use client";

import { Sheet } from "@heroui-pro/react";
import { Button } from "@heroui/react";
import { Plus } from "@gravity-ui/icons";
import { useState } from "react";

import { AdminRoutineStructureSheetContent } from "@/features/admin/trainingRoutine/components/shared/AdminRoutineStructureSheetContent";

type AdminCreateRoutineSheetDesktopProps = {
	month: number;
	studentId: string;
	year: number;
};

export function AdminCreateRoutineSheetDesktop( {
													month,
													studentId,
													year,
												}: AdminCreateRoutineSheetDesktopProps ) {
	const [ isOpen, setIsOpen ] = useState( false );

	return (
		<Sheet isDetached isOpen={ isOpen } placement={ "right" } onOpenChange={ setIsOpen }>
			<Button
				className={ "bg-accent-foreground border border-accent/50 text-accent shadow-sm" }
				variant={ "outline" }
				onPress={ () => setIsOpen( true ) }
			>
				<Plus className={ "size-4" }/>
				Crear rutina
			</Button>
			<Sheet.Backdrop variant={ "opaque" }>
				<Sheet.Content>
					<Sheet.Dialog className={ "flex h-full min-h-0 flex-col" }>
						<Sheet.CloseTrigger className={ "absolute inset-e-4 top-4 z-10" }/>
						<AdminRoutineStructureSheetContent
							mode={ "create" }
							month={ month }
							studentId={ studentId }
							year={ year }
							onSaved={ () => setIsOpen( false ) }
						/>
					</Sheet.Dialog>
				</Sheet.Content>
			</Sheet.Backdrop>
		</Sheet>
	);
}
