"use client";

import { Button } from "@heroui/react";
import { PencilLine } from "lucide-react";

type CoachEditRoutineSheetTriggerProps = {
	isMobile: boolean;
	onPressAction: () => void;
};

export function CoachEditRoutineSheetTrigger( {
	isMobile,
	onPressAction,
}: CoachEditRoutineSheetTriggerProps ) {
	return (
		<Button
			variant={ "outline" }
			className={ isMobile
				? "bg-accent-foreground border border-accent/50 text-accent shadow-sm"
				: "bg-surface border border-accent/50 text-accent shadow-sm"
			}
			onPress={ onPressAction }
		>
			<PencilLine className={ "size-4" }/>
			{ !isMobile && "Editar rutina" }
		</Button>
	);
}
