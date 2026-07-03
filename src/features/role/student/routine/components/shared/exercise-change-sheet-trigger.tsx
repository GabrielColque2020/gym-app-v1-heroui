import { ArrowRightArrowLeft } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

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
			<ArrowRightArrowLeft className={ "size-4" }/>
			Cambiar ejercicio
		</Button>
	);
}
