"use client";

import { toast } from "@heroui/react";

import { useToggleCoachExerciseStatus } from "@/features/role/coach/exercises/hooks/use-coach-exercises";
import type { CoachExerciseListItem } from "@/features/role/coach/exercises/types/coach-exercise-list-item";

type UseCoachExerciseStatusActionOptions = {
	exercise: CoachExerciseListItem;
};

export function useCoachExerciseStatusAction( { exercise }: UseCoachExerciseStatusActionOptions ) {
	const toggleCoachExerciseStatus = useToggleCoachExerciseStatus();
	const statusLabel = exercise.active ? "Desactivar" : "Restaurar";
	const statusClassName = exercise.active ? "text-danger" : "text-success";

	async function changeStatus() {
		try {
			await toggleCoachExerciseStatus.mutateAsync( {
				active: !exercise.active,
				bodyPart: exercise.bodyPart,
				category: exercise.category,
				coachExerciseId: exercise.sourceType === "coach" ? exercise.coachExerciseId : null,
				equipment: exercise.equipment,
				globalExerciseId: exercise.globalExerciseId,
				imageUrl: exercise.imageUrl ?? "",
				instructions: exercise.instructions ?? "",
				muscleGroup: exercise.muscleGroup,
				name: exercise.name,
				sourceType: exercise.sourceType,
				target: exercise.target,
				videoUrl: exercise.videoUrl ?? "",
				externalId: exercise.externalId,
			} );
			toast.success( exercise.active ? "Ejercicio desactivado" : "Ejercicio restaurado", {
				description: exercise.active
					? "Quedo inactivo solo para tu catalogo."
					: "Vuelve a estar disponible en tu catalogo.",
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
		isPending: toggleCoachExerciseStatus.isPending,
		statusClassName,
		statusLabel,
	};
}
