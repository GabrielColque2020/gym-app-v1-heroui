import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

type GetTrainingRoutinesByStudentBaseInput = {
	coachId?: string | null;
	month: number;
	studentId: string;
	year: number;
};

const trainingRoutineStudentSelect = {
	DescriptionStudent: {
		select: {
			objective: true,
		},
	},
	dni: true,
	email: true,
	id: true,
	name: true,
} satisfies Prisma.UserSelect;

const trainingRoutineWeekInclude = {
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
							tips: true,
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
} satisfies Prisma.TrainingRoutineWeekInclude;

export type TrainingRoutineStudent = Prisma.UserGetPayload<{
	select: typeof trainingRoutineStudentSelect;
}>;

export type TrainingRoutineDay = Prisma.TrainingRoutineWeekGetPayload<{
	include: typeof trainingRoutineWeekInclude;
}>["routineDays"][number];

export type TrainingRoutineWeek = Prisma.TrainingRoutineWeekGetPayload<{
	include: typeof trainingRoutineWeekInclude;
}>;

export type TrainingRoutineMonth = Prisma.TrainingRoutineMonthGetPayload<{
	include: {
		weeks: {
			include: typeof trainingRoutineWeekInclude;
			orderBy: {
				week: "asc";
			};
		};
	};
}>;

function validateMonth( month: number ) {
	if (!Number.isInteger( month ) || month < 1 || month > 12) {
		throw new Error( "El mes seleccionado no es valido." );
	}
}

function validateYear( year: number ) {
	if (!Number.isInteger( year ) || year < 2000 || year > 2100) {
		throw new Error( "El año seleccionado no es valido." );
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
		select: trainingRoutineStudentSelect,
		where: {
			active: true,
			coachId: coachId ?? undefined,
			id: studentId,
			role: "STUDENT",
		},
	} ) as TrainingRoutineStudent | null;

	if (!student) {
		throw new Error( "No se encontro un estudiante activo para consultar rutinas." );
	}

	const routineMonth = await prisma.trainingRoutineMonth.findFirst( {
		include: {
			weeks: {
				include: trainingRoutineWeekInclude,
				orderBy: {
					week: "asc",
				},
			},
		},
		where: {
			month,
			studentId,
			year,
		},
	} ) as TrainingRoutineMonth | null;

	return {
		month,
		routineMonth: routineMonth ?? {
			createdAt: new Date(),
			id: "",
			month,
			objective: null,
			studentId,
			updatedAt: new Date(),
			weeks: [],
			year,
		},
		student,
		year,
	};
}

export type TrainingRoutinesByStudent = Awaited<ReturnType<typeof getTrainingRoutinesByStudentBase>>;
