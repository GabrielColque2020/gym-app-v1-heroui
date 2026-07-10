import { Button } from "@heroui/react";
import { ArrowLeftRight } from "lucide-react";

type ExerciseChangeDrawerTriggerProps = {
	hasVariants: boolean;
	onOpen: () => void;
};

export function ExerciseChangeDrawerTrigger( {
	hasVariants,
	onOpen,
}: ExerciseChangeDrawerTriggerProps ) {
	if (!hasVariants) return null;

	return (
		<Button size={ "sm" } variant={ "secondary" } onPress={ onOpen }>
			<ArrowLeftRight className={ "size-4" }/>
			Cambiar ejercicio
		</Button>
	);
}

