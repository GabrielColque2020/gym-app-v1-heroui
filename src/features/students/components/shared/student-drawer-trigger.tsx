import { Button } from "@heroui/react";
import { PencilLine, Plus } from "lucide-react";

import type { StudentFormDrawerProps } from "@/features/students/components/shared/student-drawer.types";

type StudentDrawerTriggerProps = {
	isEditMode: boolean;
	onPress: () => void;
	props: StudentFormDrawerProps;
	showEditTriggerLabel: boolean;
};

export function StudentDrawerTrigger( {
	isEditMode,
	onPress,
	props,
	showEditTriggerLabel,
}: StudentDrawerTriggerProps ) {
	if (props.hideTrigger) {
		return null;
	}

	if (isEditMode) {
		const studentName = props.mode === "edit" ? props.student.name : "estudiante";

		return (
			<Button
				isIconOnly={ !showEditTriggerLabel }
				aria-label={ `Editar ${ studentName }` }
				className={ props.triggerClassName }
				size={ "sm" }
				variant={ "ghost" }
				onPress={ onPress }
			>
				<PencilLine className={ "size-4 text-warning" }/>
				{ showEditTriggerLabel ? "Editar" : null }
			</Button>
		);
	}

	// En el telefono va solo el "+", junto al titulo, igual que en ejercicios.
	const isIconOnly = props.triggerVariant === "icon";

	return (
		<Button
			aria-label={ "Nuevo estudiante" }
			className={ props.triggerClassName }
			isIconOnly={ isIconOnly }
			onPress={ onPress }
		>
			<Plus className={ "size-4" }/>
			{ isIconOnly ? null : "Nuevo estudiante" }
		</Button>
	);
}
