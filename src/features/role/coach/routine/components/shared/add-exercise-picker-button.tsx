import { Button } from "@heroui/react";
import { Plus } from "lucide-react";

type AddExercisePickerButtonProps = {
	onPress: () => void;
};

export function AddExercisePickerButton( { onPress }: AddExercisePickerButtonProps ) {
	return (
		<Button
			variant={ "secondary" }
			className={ "shadow-sm" }
			// className={ "shrink-0 border border-dashed border-accent bg-surface px-3 text-accent" }
			onPress={ onPress }
		>
			<Plus className={ "size-4" }/>
			Agregar ejercicio
		</Button>
	);
}
