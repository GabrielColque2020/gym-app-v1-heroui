"use client";

import type { AdminTrainingRoutine } from "@/features/admin/trainingRoutine/actions/get-training-routines-by-student";

import { Sheet } from "@heroui-pro/react";
import { Button } from "@heroui/react";
import { Pencil } from "@gravity-ui/icons";
import { useState } from "react";

import { AdminRoutineStructureSheetContent } from "@/features/admin/trainingRoutine/components/shared/AdminRoutineStructureSheetContent";

type AdminEditRoutineStructureSheetDesktopProps = {
	month: number;
	routines: AdminTrainingRoutine[];
	studentId: string;
	year: number;
};

export function AdminEditRoutineStructureSheetDesktop( {
														   month,
														   routines,
														   studentId,
														   year,
													   }: AdminEditRoutineStructureSheetDesktopProps ) {
	const [ isOpen, setIsOpen ] = useState( false );

	return (
		<Sheet isDetached isOpen={ isOpen } placement={ "right" } onOpenChange={ setIsOpen }>
			<Button
				className={ "bg-surface border border-accent/50 text-accent shadow-sm" }
				variant={ "ghost" }
				onPress={ () => setIsOpen( true ) }
			>
				<Pencil className={ "size-4" }/>
				Editar rutina
			</Button>
			<Sheet.Backdrop variant={ "opaque" }>
				<Sheet.Content>
					<Sheet.Dialog className={ "flex h-full min-h-0 flex-col" }>
						<Sheet.CloseTrigger className={ "absolute inset-e-4 top-4 z-10" }/>
						<AdminRoutineStructureSheetContent
							mode={ "edit" }
							month={ month }
							routines={ routines }
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
