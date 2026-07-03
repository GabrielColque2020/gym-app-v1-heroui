import { Button } from "@heroui/react";
import { PencilLine, Plus } from "lucide-react";

type ExerciseSheetTriggerProps = {
	ariaLabel: string;
	className?: string;
	isEditMode: boolean;
	showEditTriggerLabel: boolean;
	onPress: () => void;
};

export function ExerciseSheetTrigger( {
	ariaLabel,
	className,
	isEditMode,
	showEditTriggerLabel,
	onPress,
}: ExerciseSheetTriggerProps ) {
	if (isEditMode) {
		return (
			<Button
				isIconOnly={ !showEditTriggerLabel }
				aria-label={ ariaLabel }
				className={ className }
				size={ "sm" }
				variant={ "ghost" }
				onPress={ onPress }
			>
				<PencilLine className={ "size-4 text-warning" }/>
				{ showEditTriggerLabel ? "Editar" : null }
			</Button>
		);
	}

	return (
		<Button className={ className } onPress={ onPress }>
			<Plus className={ "size-4" }/>
			Nuevo ejercicio
		</Button>
	);
}
