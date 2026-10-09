"use server";

import { runAction } from "@/lib/run-action";
import { getAuthenticatedSession } from "@/features/auth/session";
import { getExerciseProgress, getProgressExercises } from "@/features/exercise-progress/services/exercise-progress-queries";
import prisma from "@/lib/prisma";

// El entrenador solo ve el progreso de sus propios estudiantes. Devuelve `null`
// si el estudiante no existe o es de otro entrenador: sin distinguir un caso del
// otro, para no confirmar que una cuenta ajena existe.
async function findOwnStudent( studentId: string ) {
	const session = await getAuthenticatedSession();

	if (!session || session.role !== "COACH") {
		throw new Error( "Tenés que iniciar sesión como entrenador para ver el progreso." );
	}

	if (!studentId.trim()) return null;

	return ( await prisma.user.findFirst( {
		select: {
			id: true,
			name: true,
		},
		where: {
			active: true,
			coachId: session.sub,
			id: studentId.trim(),
			role: "STUDENT",
		},
	} ) ) as { id: string; name: string } | null;
}

export async function getCoachStudentProgressExercisesAction( studentId: string ) {
	return runAction( "No se pudo cargar el progreso del estudiante.", async () => {
		const student = await findOwnStudent( studentId );

		if (!student) return null;

		return {
			exercises: await getProgressExercises( student.id ),
			student,
		};
	} );
}

export async function getCoachStudentExerciseProgressAction( studentId: string, exerciseId: string ) {
	return runAction( "No se pudo cargar el progreso del ejercicio.", async () => {
		const student = await findOwnStudent( studentId );

		if (!student) return null;

		return getExerciseProgress( student.id, exerciseId.trim() );
	} );
}
