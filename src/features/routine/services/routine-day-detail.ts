import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

type GetRoutineDayDetailBaseInput = {
	coachId?: string | null;
	routineDayId: string;
	studentId?: string | null;
};

const routineDayDetailInclude = {
	routines: {
		include: {
			variants: {
				include: {
					variantExercise: {
						select: {
							active: true,
							bodyPart: true,
							id: true,
							name: true,
						},
					},
				},
				orderBy: {
					createdAt: "desc",
				},
			},
			exercise: {
				select: {
					active: true,
					bodyPart: true,
					id: true,
					imageUrl: true,
					name: true,
					tips: true,
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
} satisfies Prisma.RoutineDayInclude;

export type RoutineDayDetail = Prisma.RoutineDayGetPayload<{
	include: typeof routineDayDetailInclude;
}>;

export type RoutineDayExercise = RoutineDayDetail[ "routines" ][ number ];

export async function getRoutineDayDetailBase( {
	coachId,
	routineDayId,
	studentId,
}: GetRoutineDayDetailBaseInput ): Promise<RoutineDayDetail> {
	const normalizedRoutineDayId = routineDayId.trim();
	const normalizedStudentId = studentId?.trim();

	if (!normalizedRoutineDayId) {
		throw new Error( "Selecciona un dia de rutina valido." );
	}

	const routineDay = await prisma.routineDay.findFirst( {
		include: routineDayDetailInclude,
		where: {
			id: normalizedRoutineDayId,
			trainingRoutine: {
				student: {
					active: true,
					coachId: coachId ?? undefined,
					id: normalizedStudentId || undefined,
					role: "STUDENT",
				},
			},
		},
	} ) as RoutineDayDetail | null;

	if (!routineDay) {
		throw new Error( "No se encontro el dia de rutina seleccionado." );
	}

	if (!routineDay.trainingRoutine.student) {
		throw new Error( "No se encontro el estudiante asociado a la rutina." );
	}

	return routineDay;
}
