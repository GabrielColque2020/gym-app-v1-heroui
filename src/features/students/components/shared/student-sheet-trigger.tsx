import { Pencil, Plus } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

import type { StudentFormSheetProps } from "@/features/students/components/shared/student-sheet.types";

type StudentSheetTriggerProps = {
	isEditMode: boolean;
	onPress: () => void;
	props: StudentFormSheetProps;
	showEditTriggerLabel: boolean;
};

export function StudentSheetTrigger( {
	isEditMode,
	onPress,
	props,
	showEditTriggerLabel,
}: StudentSheetTriggerProps ) {
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
				<Pencil className={ "size-4 text-warning" }/>
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
