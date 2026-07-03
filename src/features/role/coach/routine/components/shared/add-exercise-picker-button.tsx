import { Button } from "@heroui/react";
import { Plus } from "lucide-react";

type AddExercisePickerButtonProps = {
	onPress: () => void;
};

export function AddExercisePickerButton( { onPress }: AddExercisePickerButtonProps ) {
	return (
		<Button
			variant={ "ghost" }
			className={ "h-9 shrink-0 border border-dashed border-accent/50 bg-surface px-3 text-accent" }
			onPress={ onPress }
		>
			<Plus className={ "size-4" }/>
			Agregar ejercicio
		</Button>
	);
}
