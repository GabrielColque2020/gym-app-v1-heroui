"use server";

import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

import { getAuthenticatedSession } from "@/features/auth/session";
import { getRoutineDayAction } from "@/features/routine/actions/get-routine-day";
import { getStudentRoutineSessionAction } from "@/features/role/student/routine/actions/get-routine-session";
import {
	buildStudentRoutineProgressRows,
	resolveStudentRoutineExercises,
} from "@/features/role/student/routine/actions/save-routine-session.utils";
import type { StudentRoutineSessionSaveInput } from "@/features/routine/services/routine-session";

type SaveStudentRoutineSessionInput = StudentRoutineSessionSaveInput & {
	studentId?: string | null;
};

export async function saveStudentRoutineSessionAction( {
	exercises,
	routineDayId,
	studentId,
}: SaveStudentRoutineSessionInput ) {
	try {
		const session = await getAuthenticatedSession();

		if (!session) {
			throw new Error( "Debes iniciar sesion para guardar tu rutina." );
		}

		if (session.role !== "STUDENT") {
			throw new Error( "No tienes permisos para guardar esta rutina." );
		}

		const activeStudentId = studentId?.trim() || session.sub;

		if (activeStudentId !== session.sub) {
			throw new Error( "La rutina solicitada no pertenece al estudiante autenticado." );
		}

		const normalizedRoutineDayId = routineDayId.trim();

		if (!normalizedRoutineDayId) {
			throw new Error( "Selecciona un dia valido antes de guardar cambios." );
		}

		const routineDay = await getRoutineDayAction( {
			routineDayId: normalizedRoutineDayId,
			studentId: activeStudentId,
		} );
		const resolvedExercises = resolveStudentRoutineExercises( routineDay, exercises );
		const progressRows = buildStudentRoutineProgressRows( routineDay, resolvedExercises, activeStudentId );

		await prisma.$transaction(
			async ( tx ) => {
				await tx.exerciseProgress.deleteMany( {
					where: {
						dayNumber: routineDay.dayNumber,
						month: routineDay.trainingRoutine.month,
						studentId: activeStudentId,
						week: routineDay.trainingRoutine.week,
						year: routineDay.trainingRoutine.year,
					},
				} );

				if (progressRows.length > 0) {
					await tx.exerciseProgress.createMany( {
						data: progressRows as never,
					} );
				}

				await tx.routineDay.update( {
					data: {
						isFinalized: true,
					},
					where: {
						id: routineDay.id,
					},
				} );
			},
			{ isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
		);

		return await getStudentRoutineSessionAction( {
			routineDayId: routineDay.id,
			studentId: activeStudentId,
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al guardar la rutina del estudiante.";

		throw new Error( `No se pudo guardar la rutina del estudiante. ${ message }` );
	}
}

