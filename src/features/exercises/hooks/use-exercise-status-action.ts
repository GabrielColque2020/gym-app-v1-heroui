"use client";

import type { ExerciseListItem } from "@/features/exercises/types/exercise-list-item";

import { toast } from "@heroui/react";
import { useDeactivateExercise, useRestoreExercise } from "@/features/exercises/hooks/use-exercises";

type UseExerciseStatusActionOptions = {
	exercise: ExerciseListItem;
};

export function useExerciseStatusAction( { exercise }: UseExerciseStatusActionOptions ) {
	const deactivateExercise = useDeactivateExercise();
	const restoreExercise = useRestoreExercise();
	const statusMutation = exercise.active ? deactivateExercise : restoreExercise;
	const statusLabel = exercise.active ? "Desactivar" : "Restaurar";
	const statusClassName = exercise.active ? "text-danger" : "text-success";

	async function changeStatus() {
		try {
			await statusMutation.mutateAsync( exercise.id );
			toast.success( exercise.active ? "Ejercicio desactivado" : "Ejercicio restaurado", {
				description: exercise.active
					? "Quedo inactivo en el catalogo."
					: "Vuelve a estar disponible.",
			} );
		} catch {
			toast.danger( exercise.active ? "Error al desactivar" : "Error al restaurar", {
				description: exercise.active
					? "No se pudo desactivar el ejercicio."
					: "No se pudo activar el ejercicio.",
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
