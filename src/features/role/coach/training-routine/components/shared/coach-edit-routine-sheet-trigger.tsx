"use client";

import { Pencil } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

type CoachEditRoutineSheetTriggerProps = {
	isMobile: boolean;
	onPress: () => void;
};

export function CoachEditRoutineSheetTrigger( {
	isMobile,
	onPress,
}: CoachEditRoutineSheetTriggerProps ) {
	return (
		<Button
			variant={ "outline" }
			className={ isMobile
				? "bg-accent-foreground border border-accent/50 text-accent shadow-sm"
				: "bg-surface border border-accent/50 text-accent shadow-sm"
			}
			onPress={ onPress }
		>
			<Pencil className={ "size-4" }/>
			{ !isMobile && "Editar rutina" }
		</Button>
	);
}
