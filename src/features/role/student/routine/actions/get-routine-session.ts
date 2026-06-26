"use server";

import prisma from "@/lib/prisma";

import { getAuthenticatedSession } from "@/features/auth/session";
import { getRoutineDayAction } from "@/features/routine/actions/get-routine-day";
import type { StudentRoutineProgressEntry, StudentRoutineSessionDetail } from "@/features/routine/services/routine-session";

type GetStudentRoutineSessionInput = {
	routineDayId: string;
	studentId?: string | null;
};

export async function getStudentRoutineSessionAction( {
	routineDayId,
	studentId,
}: GetStudentRoutineSessionInput ): Promise<StudentRoutineSessionDetail> {
	try {
		const session = await getAuthenticatedSession();

		if (!session) {
			throw new Error( "Debes iniciar sesion para ver tu rutina." );
		}

		if (session.role !== "STUDENT") {
			throw new Error( "No tienes permisos para consultar esta rutina." );
		}

		const activeStudentId = studentId?.trim() || session.sub;

		if (activeStudentId !== session.sub) {
			throw new Error( "La rutina solicitada no pertenece al estudiante autenticado." );
		}

		const routineDay = await getRoutineDayAction( {
			routineDayId,
			studentId: activeStudentId,
		} );

		const exerciseIds = Array.from(
			new Set(
				routineDay.routines.flatMap( ( routine ) => [
					routine.exerciseId ?? routine.exercise?.id,
					...routine.variants.map( ( variant ) => variant.variantExerciseId ),
				] ).filter( ( exerciseId ): exerciseId is string => Boolean( exerciseId ) ),
			),
		);
		const variantExerciseIds = Array.from(
			new Set(
				routineDay.routines.flatMap( ( routine ) => routine.variants.map( ( variant ) => variant.variantExerciseId ) )
					.filter( ( exerciseId ): exerciseId is string => Boolean( exerciseId ) ),
			),
		);
		const progressEntries = ( await prisma.exerciseProgress.findMany( {
			orderBy: [
				{
					date: "desc",
				},
				{
					id: "desc",
				},
			],
			where: {
				studentId: activeStudentId,
				OR: [
					exerciseIds.length > 0
						? {
							exerciseId: {
								in: exerciseIds,
							},
						}
						: undefined,
					variantExerciseIds.length > 0
						? {
							variantExerciseId: {
								in: variantExerciseIds,
							},
						}
						: undefined,
				].filter( Boolean ) as Array<Record<string, unknown>>,
			},
		} ) ) as unknown as StudentRoutineProgressEntry[];

		return {
			...routineDay,
			progressEntries,
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la rutina del estudiante.";

		throw new Error( `No se pudo obtener la rutina del estudiante. ${ message }` );
	}
}
