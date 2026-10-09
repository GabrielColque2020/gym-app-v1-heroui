"use client";

import type { StudentListItem } from "@/features/students/actions/get-students";

import { Button, Spinner } from "@heroui/react";
import { RotateCcw } from "lucide-react";

import { useStudentStatusAction } from "@/features/students/hooks/use-student-status-action";

type StudentRestoreButtonProps = {
	student: StudentListItem;
};

// Para un estudiante inactivo, lo unico que se puede hacer con el es volver a
// activarlo: ocupa el lugar de "Abrir", que no existe para un inactivo. Es de un
// toque, sin confirmar, porque no le saca nada a nadie.
export function StudentRestoreButton( { student }: StudentRestoreButtonProps ) {
	const { changeStatus, isPending } = useStudentStatusAction( { student } );

	if (student.active) return null;

	return (
		<Button
			aria-label={ `Restaurar a ${ student.name }` }
			className={ "shrink-0" }
			isDisabled={ isPending }
			size={ "sm" }
			variant={ "secondary" }
			onPress={ () => void changeStatus() }
		>
			{ isPending ? <Spinner color={ "current" } size={ "sm" }/> : <RotateCcw className={ "size-4" }/> }
			Restaurar
		</Button>
	);
}
