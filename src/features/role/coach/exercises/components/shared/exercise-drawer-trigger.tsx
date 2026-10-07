import { Button } from "@heroui/react";
import { PencilLine, Plus } from "lucide-react";

type ExerciseDrawerTriggerProps = {
	ariaLabel: string;
	className?: string;
	isEditMode: boolean;
	// "Nuevo ejercicio" como boton de icono, para el encabezado del telefono.
	isIconOnlyCreate?: boolean;
	showEditTriggerLabel: boolean;
	onPress: () => void;
};

export function ExerciseDrawerTrigger( {
	ariaLabel,
	className,
	isEditMode,
	isIconOnlyCreate = false,
	showEditTriggerLabel,
	onPress,
}: ExerciseDrawerTriggerProps ) {
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
		<Button
			aria-label={ isIconOnlyCreate ? ariaLabel : undefined }
			className={ className }
			isIconOnly={ isIconOnlyCreate }
			onPress={ onPress }
		>
			<Plus className={ "size-4" }/>
			{ isIconOnlyCreate ? null : "Nuevo ejercicio" }
		</Button>
	);
}
