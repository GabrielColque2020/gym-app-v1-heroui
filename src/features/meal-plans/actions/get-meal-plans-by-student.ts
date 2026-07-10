"use server";

import type { Prisma } from "@/generated/prisma/client";
import { QUERY_ACCELERATE_CACHE } from "@/constants/query";
import { getAuthenticatedSession } from "@/features/auth/session";
import prisma from "@/lib/prisma";

type GetMealPlansByStudentInput = {
	studentId: string;
};

const mealPlanStudentSelect = {
	DescriptionStudent: {
		select: {
			objective: true,
			observations: true,
		},
	},
	dni: true,
	email: true,
	id: true,
	name: true,
} satisfies Prisma.UserSelect;

type MealPlanStudent = Prisma.UserGetPayload<{
	select: typeof mealPlanStudentSelect;
}>;

type MealPlanItem = Prisma.MealPlanGetPayload<Prisma.MealPlanDefaultArgs>;

function assertStudentId( studentId: string ) {
	const normalizedStudentId = studentId.trim();

	if (!normalizedStudentId) {
		throw new Error( "Debes seleccionar un estudiante." );
	}

	return normalizedStudentId;
}

async function assertStudentForSession( studentId: string, coachId: string, role: "COACH" | "STUDENT" ) {
	const student = await prisma.user.findFirst( {
		cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
		select: mealPlanStudentSelect,
		where: role === "COACH"
			? {
				active: true,
				coachId,
				id: studentId,
				role: "STUDENT",
			}
			: {
				active: true,
				id: studentId,
				role: "STUDENT",
			},
	} );

	if (!student) {
		throw new Error(
			role === "COACH"
				? "No se encontro un estudiante activo para consultar sus planes alimenticios."
				: "No se encontro un estudiante activo para consultar tus planes alimenticios.",
		);
	}

	if (role === "STUDENT" && coachId !== studentId) {
		throw new Error( "No puedes consultar los planes alimenticios de otro estudiante." );
	}

	return student as unknown as MealPlanStudent;
}

export async function getMealPlansByStudentAction( { studentId }: GetMealPlansByStudentInput ): Promise<{
	mealPlans: MealPlanItem[];
	student: MealPlanStudent;
}> {
	try {
		const session = await getAuthenticatedSession();

		if (!session) {
			throw new Error( "Debes iniciar sesion para ver los planes alimenticios." );
		}

		if (session.role !== "COACH" && session.role !== "STUDENT") {
			throw new Error( "No tienes permisos para consultar planes alimenticios." );
		}

		const normalizedStudentId = assertStudentId( studentId );
		const student = await assertStudentForSession( normalizedStudentId, session.sub, session.role );

		const mealPlans = await prisma.mealPlan.findMany( {
			cacheStrategy: QUERY_ACCELERATE_CACHE.standard,
			orderBy: [
				{
					order: "asc",
				},
				{
					title: "asc",
				},
			],
			where: {
				studentId: normalizedStudentId,
			},
		} ) as unknown as MealPlanItem[];

		return {
			mealPlans,
			student,
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudieron obtener los planes alimenticios del estudiante. ${ message }` );
	}
}
