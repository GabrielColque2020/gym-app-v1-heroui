"use client";

import { unwrapped } from "@/lib/action-result";
import { useQuery } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import {
	getCoachStudentExerciseProgressAction,
	getCoachStudentProgressExercisesAction,
} from "@/features/role/coach/exercise-progress/actions/get-exercise-progress";

// El estudiante entrena cuando el entrenador no esta mirando: se pide al abrir
// la pantalla, mostrando mientras tanto lo que ya habia.
export function useCoachStudentProgressExercises( studentId: string ) {
	return useQuery( {
		...QUERY_DEFAULTS.coach,
		queryFn: () => unwrapped( getCoachStudentProgressExercisesAction )( studentId ),
		queryKey: [ "coach-student-progress-exercises", studentId ] as const,
		refetchOnMount: "always",
	} );
}

export function useCoachStudentExerciseProgress( studentId: string, exerciseId: string | null ) {
	return useQuery( {
		...QUERY_DEFAULTS.coach,
		enabled: Boolean( exerciseId ),
		queryFn: () => unwrapped( getCoachStudentExerciseProgressAction )( studentId, exerciseId ?? "" ),
		queryKey: [ "coach-student-exercise-progress", studentId, exerciseId ?? "none" ] as const,
		refetchOnMount: "always",
	} );
}
