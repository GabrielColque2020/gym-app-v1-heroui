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

	return (
		<Button className={ props.triggerClassName } onPress={ onPress }>
			<Plus className={ "size-4" }/>
			Nuevo estudiante
		</Button>
	);
}
