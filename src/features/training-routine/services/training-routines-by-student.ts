import { Prisma } from "@/generated/prisma/client";
import { QUERY_ACCELERATE_CACHE } from "@/constants/query";
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

const trainingRoutineInclude = {
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
} satisfies Prisma.TrainingRoutineInclude;

export type TrainingRoutineStudent = Prisma.UserGetPayload<{
	select: typeof trainingRoutineStudentSelect;
}>;

export type TrainingRoutineDay = Prisma.TrainingRoutineGetPayload<{
	include: typeof trainingRoutineInclude;
}>["routineDays"][number];

export type TrainingRoutine = Prisma.TrainingRoutineGetPayload<{
	include: typeof trainingRoutineInclude;
}>;

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
		cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
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

	const routines = await prisma.trainingRoutine.findMany( {
		cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
		include: trainingRoutineInclude,
		orderBy: {
			week: "asc",
		},
		where: {
			month,
			studentId,
			year,
		},
	} ) as TrainingRoutine[];

	return {
		month,
		routines,
		student,
		year,
	};
}

export type TrainingRoutinesByStudent = Awaited<ReturnType<typeof getTrainingRoutinesByStudentBase>>;
