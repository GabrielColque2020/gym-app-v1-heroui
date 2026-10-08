"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "@/constants/query";
import {
	getStudentExerciseProgressAction,
	getStudentProgressExercisesAction,
} from "@/features/role/student/exercise-progress/actions/get-exercise-progress";

// El progreso cambia cada vez que el estudiante entrena: se pide al abrir la
// pantalla, mostrando mientras tanto lo que ya habia.
export function useStudentProgressExercises() {
	return useQuery( {
		...QUERY_DEFAULTS.student,
		queryFn: getStudentProgressExercisesAction,
		queryKey: [ "student-progress-exercises" ] as const,
		refetchOnMount: "always",
	} );
}

export function useStudentExerciseProgress( exerciseId: string | null ) {
	return useQuery( {
		...QUERY_DEFAULTS.student,
		enabled: Boolean( exerciseId ),
		queryFn: () => getStudentExerciseProgressAction( exerciseId ?? "" ),
		queryKey: [ "student-exercise-progress", exerciseId ?? "none" ] as const,
		refetchOnMount: "always",
	} );
}
