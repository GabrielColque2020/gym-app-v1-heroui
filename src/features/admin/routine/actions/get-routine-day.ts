"use server";

import prisma from "@/lib/prisma";
import { TEMP_COACH_ID } from "@/features/admin/shared/tempCoach";

type GetRoutineDayInput = {
	routineDayId: string;
	studentId?: string | null;
};

export async function getRoutineDayAction( { routineDayId, studentId }: GetRoutineDayInput ) {
	try {
		const normalizedRoutineDayId = routineDayId.trim();
		const normalizedStudentId = studentId?.trim();

		if (!normalizedRoutineDayId) {
			throw new Error( "Selecciona un dia de rutina valido." );
		}

		const routineDay = await prisma.routineDay.findFirst( {
			include: {
				routines: {
					include: {
						exercise: {
							select: {
								active: true,
								bodyPart: true,
								id: true,
								imageUrl: true,
								name: true,
								videoUrl: true,
							},
						},
					},
					orderBy: {
						order: "asc",
					},
				},
				trainingRoutine: {
					include: {
						student: {
							select: {
								DescriptionStudent: {
									select: {
										objective: true,
									},
								},
								dni: true,
								email: true,
								id: true,
								name: true,
							},
						},
					},
				},
			},
			where: {
				id: normalizedRoutineDayId,
				trainingRoutine: {
					student: {
						active: true,
						coachId: TEMP_COACH_ID,
						id: normalizedStudentId || undefined,
						role: "STUDENT",
					},
				},
			},
		} );

		if (!routineDay) {
			throw new Error( "No se encontro el dia de rutina seleccionado." );
		}

		if (!routineDay.trainingRoutine.student) {
			throw new Error( "No se encontro el estudiante asociado a la rutina." );
		}

		return routineDay;
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudo obtener el dia de rutina. ${ message }` );
	}
}

export type AdminRoutineDayDetail = Awaited<ReturnType<typeof getRoutineDayAction>>;
export type AdminRoutineDayExercise = AdminRoutineDayDetail[ "routines" ][ number ];
