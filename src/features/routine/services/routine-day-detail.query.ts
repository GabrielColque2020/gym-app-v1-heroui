import { Prisma } from "@/generated/prisma/client";

export type GetRoutineDayDetailInput = {
	coachId?: string | null;
	routineDayId: string;
	studentId?: string | null;
};

export const routineDayDetailInclude = {
	routines: {
		include: {
			variants: {
				include: {
					variantExercise: {
						select: {
							active: true,
							bodyPart: true,
							externalId: true,
							id: true,
							imageUrl: true,
							instructions: true,
							name: true,
							videoUrl: true,
							globalExercise: {
								select: {
									imageUrl: true,
									instructions: true,
									videoUrl: true,
								},
							},
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
					externalId: true,
					id: true,
					imageUrl: true,
					instructions: true,
					name: true,
					tips: true,
					videoUrl: true,
					globalExercise: {
						select: {
							imageUrl: true,
							instructions: true,
							videoUrl: true,
						},
					},
				},
			},
		},
		orderBy: {
			order: "asc",
		},
	},
	trainingRoutineWeek: {
		include: {
			trainingRoutineMonth: {
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
	},
} satisfies Prisma.RoutineDayInclude;

export function normalizeRoutineDayDetailInput( {
	coachId,
	routineDayId,
	studentId,
}: GetRoutineDayDetailInput ) {
	return {
		coachId,
		routineDayId: routineDayId.trim(),
		studentId: studentId?.trim(),
	};
}

export function buildRoutineDayDetailWhere( {
	coachId,
	routineDayId,
	studentId,
}: ReturnType<typeof normalizeRoutineDayDetailInput> ): Prisma.RoutineDayWhereInput {
	return {
		id: routineDayId,
		trainingRoutineWeek: {
			trainingRoutineMonth: {
				student: {
					active: true,
					coachId: coachId ?? undefined,
					id: studentId || undefined,
					role: "STUDENT",
				},
			},
		},
	};
}
