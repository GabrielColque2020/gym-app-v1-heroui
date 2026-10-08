"use server";

import { getAuthenticatedSession } from "@/features/auth/session";
import { getExerciseProgress, getProgressExercises } from "@/features/exercise-progress/services/exercise-progress-queries";

// El estudiante sale de la sesion: cada uno ve solo su propio progreso.
async function requireStudentId() {
	const session = await getAuthenticatedSession();

	if (!session || session.role !== "STUDENT") {
		throw new Error( "Debes iniciar sesión como estudiante para ver tu progreso." );
	}

	return session.sub;
}

export async function getStudentProgressExercisesAction() {
	return getProgressExercises( await requireStudentId() );
}

export async function getStudentExerciseProgressAction( exerciseId: string ) {
	return getExerciseProgress( await requireStudentId(), exerciseId.trim() );
}
