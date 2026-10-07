import { Prisma } from "@/generated/prisma/client";

export type GetRoutineDayDetailInput = {
	coachId?: string | null;
	routineDayId: string;
	studentId?: string | null;
	// Con valor, el dia se busca dentro de esa plantilla y no en la rutina de un estudiante.
	templateId?: string | null;
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
					// Para reconocer en el catalogo el ejercicio global del que salio.
					globalExerciseId: true,
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
			routineTemplate: {
				select: {
					id: true,
					name: true,
					objective: true,
				},
			},
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
	templateId,
}: GetRoutineDayDetailInput ) {
	return {
		coachId,
		routineDayId: routineDayId.trim(),
		studentId: studentId?.trim(),
		templateId: templateId?.trim(),
	};
}

export function buildRoutineDayDetailWhere( {
	coachId,
	routineDayId,
	studentId,
	templateId,
}: ReturnType<typeof normalizeRoutineDayDetailInput> ): Prisma.RoutineDayWhereInput {
	if (templateId) {
		return {
			id: routineDayId,
			trainingRoutineWeek: {
				routineTemplate: {
					// Una plantilla siempre se busca con su entrenador. Sin entrenador no
					// coincide ninguna, en vez de coincidir todas.
					coachId: coachId || "",
					id: templateId,
				},
			},
		};
	}

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
