"use server";

import { getAuthenticatedSession } from "@/features/auth/session";
import prisma from "@/lib/prisma";

type GetMealPlansByStudentInput = {
	studentId: string;
};

export async function getMealPlansByStudentAction( { studentId }: GetMealPlansByStudentInput ) {
	try {
		const session = await getAuthenticatedSession();

		if (!session) {
			throw new Error( "Debes iniciar sesion para ver los planes alimenticios." );
		}

		if (session.role !== "COACH") {
			throw new Error( "No tienes permisos para consultar planes alimenticios de estudiantes." );
		}

		if (!studentId.trim()) {
			throw new Error( "Debes seleccionar un estudiante." );
		}

		const student = await prisma.user.findFirst( {
			select: {
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
			},
			where: {
				active: true,
				coachId: session.sub,
				id: studentId,
				role: "STUDENT",
			},
		} );

		if (!student) {
			throw new Error( "No se encontro un estudiante activo para consultar sus planes alimenticios." );
		}

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
				studentId,
			},
		} );

		return {
			mealPlans,
			student,
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudieron obtener los planes alimenticios del estudiante. ${ message }` );
	}
}

export type MealPlansByStudent = Awaited<ReturnType<typeof getMealPlansByStudentAction>>;
export type AdminMealPlan = MealPlansByStudent[ "mealPlans" ][ number ];
