import { Button } from "@heroui/react";
import { ArrowLeftRight } from "lucide-react";

type ExerciseChangeSheetTriggerProps = {
	hasVariants: boolean;
	onOpen: () => void;
};

export function ExerciseChangeSheetTrigger( {
	hasVariants,
	onOpen,
}: ExerciseChangeSheetTriggerProps ) {
	if (!hasVariants) return null;

	return (
		<Button size={ "sm" } variant={ "secondary" } onPress={ onOpen }>
			<ArrowLeftRight className={ "size-4" }/>
			Cambiar ejercicio
		</Button>
	);
}
