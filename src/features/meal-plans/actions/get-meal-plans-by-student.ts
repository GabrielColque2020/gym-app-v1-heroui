"use server";

import type { ActionResult } from "@/lib/action-result";
import { runAction } from "@/lib/run-action";
import type { Prisma } from "@/generated/prisma/client";
import { getAuthenticatedSession } from "@/features/auth/session";
import { sortMealPlansByMealTime } from "@/features/meal-plans/services/meal-plan-formatters";
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
		throw new Error( "Tenés que seleccionar un estudiante." );
	}

	return normalizedStudentId;
}

async function assertStudentForSession( studentId: string, coachId: string, role: "COACH" | "STUDENT" ) {
	const student = await prisma.user.findFirst( {
		select: mealPlanStudentSelect,
		// El entrenador tambien ve el plan de un estudiante inactivo.
		where: role === "COACH"
			? {
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
				? "No se encontró el estudiante para consultar sus planes alimenticios."
				: "No se encontró un estudiante activo para consultar tus planes alimenticios.",
		);
	}

	if (role === "STUDENT" && coachId !== studentId) {
		throw new Error( "No podés consultar los planes alimenticios de otro estudiante." );
	}

	return student as unknown as MealPlanStudent;
}

export async function getMealPlansByStudentAction( { studentId }: GetMealPlansByStudentInput ): Promise<ActionResult<{
	mealPlans: MealPlanItem[];
	student: MealPlanStudent;
}>> {
	return runAction( "No se pudieron obtener los planes alimenticios del estudiante.", async () => {
		const session = await getAuthenticatedSession();

		if (!session) {
			throw new Error( "Tenés que iniciar sesión para ver los planes alimenticios." );
		}

		if (session.role !== "COACH" && session.role !== "STUDENT") {
			throw new Error( "No tenés permiso para consultar planes alimenticios." );
		}

		const normalizedStudentId = assertStudentId( studentId );
		const student = await assertStudentForSession( normalizedStudentId, session.sub, session.role );

		const mealPlans = await prisma.mealPlan.findMany( {
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

		// Se ordena aca para que el entrenador, el estudiante y el PDF vean lo mismo.
		return {
			mealPlans: sortMealPlansByMealTime( mealPlans ),
			student,
		};
	} );
}
