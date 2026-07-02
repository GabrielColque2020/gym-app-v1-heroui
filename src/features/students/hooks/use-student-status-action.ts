"use client";

import type { StudentListItem } from "@/features/students/actions/get-students";

import { toast } from "@heroui/react";

import {
	useDeactivateStudent,
	useRestoreStudent,
} from "@/features/students/hooks/use-students";

type UseStudentStatusActionOptions = {
	student: StudentListItem;
};

export function useStudentStatusAction( { student }: UseStudentStatusActionOptions ) {
	const deactivateStudent = useDeactivateStudent();
	const restoreStudent = useRestoreStudent();
	const statusMutation = student.active ? deactivateStudent : restoreStudent;
	const statusLabel = student.active ? "Desactivar" : "Restaurar";
	const statusClassName = student.active ? "text-danger" : "text-success";

	async function changeStatus() {
		try {
			await statusMutation.mutateAsync( student.id );
			toast.success( student.active ? "Estudiante desactivado" : "Estudiante restaurado", {
				description: student.active
					? "Quedo inactivo para nuevas operaciones."
					: "Vuelve a estar disponible.",
			} );
		} catch {
			toast.danger( student.active ? "Error al desactivar" : "Error al restaurar", {
				description: student.active
					? "No se pudo desactivar el estudiante."
					: "No se pudo activar el estudiante.",
			} );
		}
	}

	return {
		changeStatus,
		isPending: statusMutation.isPending,
		statusClassName,
		statusLabel,
	};
}
