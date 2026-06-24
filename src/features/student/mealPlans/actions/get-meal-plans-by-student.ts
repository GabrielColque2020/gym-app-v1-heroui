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
			throw new Error( "Debes iniciar sesion para ver tus planes alimenticios." );
		}

		if (session.role !== "STUDENT") {
			throw new Error( "No tienes permisos para consultar planes alimenticios de estudiante." );
		}

		if (!studentId.trim()) {
			throw new Error( "Debes iniciar sesion para ver tus planes alimenticios." );
		}

		if (studentId.trim() !== session.sub) {
			throw new Error( "No puedes consultar los planes alimenticios de otro estudiante." );
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

		throw new Error( `No se pudieron obtener tus planes alimenticios. ${ message }` );
	}
}

export type StudentMealPlansByStudent = Awaited<ReturnType<typeof getMealPlansByStudentAction>>;
export type StudentMealPlan = StudentMealPlansByStudent[ "mealPlans" ][ number ];
