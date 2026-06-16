"use client";

import { Sheet } from "@heroui-pro/react";
import { Button } from "@heroui/react";
import { Plus } from "@gravity-ui/icons";
import { useState } from "react";

import { AdminRoutineStructureSheetContent } from "@/features/admin/trainingRoutine/components/shared/AdminRoutineStructureSheetContent";

type AdminCreateRoutineSheetMobileProps = {
	month: number;
	studentId: string;
	year: number;
};

export function AdminCreateRoutineSheetMobile( {
												   month,
												   studentId,
												   year,
											   }: AdminCreateRoutineSheetMobileProps ) {
	const [ isOpen, setIsOpen ] = useState( false );

	return (
		<Sheet isDetached isOpen={ isOpen } placement={ "bottom" } onOpenChange={ setIsOpen }>
			<Button
				className={ "bg-accent-foreground border border-accent/50 text-accent shadow-sm" }
				variant={ "outline" }
				onPress={ () => setIsOpen( true ) }
			>
				<Plus className={ "size-4" }/>
			</Button>
			<Sheet.Backdrop variant={ "blur" }>
				<Sheet.Content className={ "mx-auto flex max-h-[92vh] w-full max-w-115 flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl" }>
					<Sheet.Handle/>
					<Sheet.Dialog className={ "flex min-h-0 flex-1 flex-col" }>
						<Sheet.CloseTrigger className={ "absolute inset-e-3 top-3 z-10" }/>
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
