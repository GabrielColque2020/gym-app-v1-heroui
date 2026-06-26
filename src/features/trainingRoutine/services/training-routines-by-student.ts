import prisma from "@/lib/prisma";

type GetTrainingRoutinesByStudentBaseInput = {
	coachId?: string | null;
	month: number;
	studentId: string;
	year: number;
};

function validateMonth( month: number ) {
	if (!Number.isInteger( month ) || month < 1 || month > 12) {
		throw new Error( "El mes seleccionado no es valido." );
	}
}

function validateYear( year: number ) {
	if (!Number.isInteger( year ) || year < 2000 || year > 2100) {
		throw new Error( "El anio seleccionado no es valido." );
	}
}

export async function getTrainingRoutinesByStudentBase( {
	coachId,
	month,
	studentId,
	year,
}: GetTrainingRoutinesByStudentBaseInput ) {
	validateMonth( month );
	validateYear( year );

	const student = await prisma.user.findFirst( {
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
		where: {
			active: true,
			coachId: coachId ?? undefined,
			id: studentId,
			role: "STUDENT",
		},
	} );

	if (!student) {
		throw new Error( "No se encontro un estudiante activo para consultar rutinas." );
	}

	const routines = await prisma.trainingRoutine.findMany( {
		include: {
			routineDays: {
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
				},
				orderBy: {
					dayNumber: "asc",
				},
			},
		},
		orderBy: {
			week: "asc",
		},
		where: {
			month,
			studentId,
			year,
		},
	} );

	return {
		month,
		routines,
		student,
		year,
	};
}

export type TrainingRoutinesByStudent = Awaited<ReturnType<typeof getTrainingRoutinesByStudentBase>>;
export type TrainingRoutine = TrainingRoutinesByStudent[ "routines" ][ number ];
export type TrainingRoutineDay = TrainingRoutine[ "routineDays" ][ number ];
