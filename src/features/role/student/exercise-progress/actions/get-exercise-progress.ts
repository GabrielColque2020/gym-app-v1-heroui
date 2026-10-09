"use server";

import { runAction } from "@/lib/run-action";
import { getAuthenticatedSession } from "@/features/auth/session";
import { getExerciseProgress, getProgressExercises } from "@/features/exercise-progress/services/exercise-progress-queries";

// El estudiante sale de la sesion: cada uno ve solo su propio progreso.
async function requireStudentId() {
	const session = await getAuthenticatedSession();

	if (!session || session.role !== "STUDENT") {
		throw new Error( "Tenés que iniciar sesión como estudiante para ver tu progreso." );
	}

	return session.sub;
}

export async function getStudentProgressExercisesAction() {
	return runAction( "No se pudo cargar tu progreso.", async () => {
		return getProgressExercises( await requireStudentId() );
	} );
}

export async function getStudentExerciseProgressAction( exerciseId: string ) {
	return runAction( "No se pudo cargar el progreso del ejercicio.", async () => {
		return getExerciseProgress( await requireStudentId(), exerciseId.trim() );
	} );
}
