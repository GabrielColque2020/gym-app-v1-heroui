"use server";

import { requireCoachSession } from "@/features/auth/coach-session";
import { sortMealPlansByMealTime } from "@/features/meal-plans/services/meal-plan-formatters";
import prisma from "@/lib/prisma";

export type MealPlanCopySource = {
	id: string;
	// Las comidas del plan, en el orden en que se muestran.
	mealTimes: string[];
	name: string;
};

type CopyMealPlanInput = {
	sourceStudentId: string;
	studentId: string;
};

type CopySourceMeal = {
	description: string;
	observations: string | null;
	order: number;
	studentId: string | null;
	title: string;
};

async function assertCoachStudent( studentId: string, coachId: string ) {
	const student = await prisma.user.findFirst( {
		select: {
			id: true,
		},
		where: {
			active: true,
			coachId,
			id: studentId,
			role: "STUDENT",
		},
	} );

	if (!student) {
		throw new Error( "No se encontró un estudiante activo." );
	}
}

// Los otros estudiantes del entrenador que tienen plan cargado: de ellos se puede copiar.
export async function getMealPlanCopySourcesAction( { studentId }: { studentId: string } ): Promise<MealPlanCopySource[]> {
	try {
		const session = await requireCoachSession( "consultar planes para copiar" );
		const students = ( await prisma.user.findMany( {
			orderBy: {
				name: "asc",
			},
			select: {
				id: true,
				name: true,
			},
			where: {
				active: true,
				coachId: session.sub,
				id: {
					not: studentId.trim(),
				},
				role: "STUDENT",
			},
		} ) ) as Array<{ id: string; name: string }>;

		if (students.length === 0) return [];

		const meals = ( await prisma.mealPlan.findMany( {
			select: {
				order: true,
				studentId: true,
				title: true,
			},
			where: {
				studentId: {
					in: students.map( ( student ) => student.id ),
				},
			},
		} ) ) as unknown as Array<{ order: number; studentId: string | null; title: string }>;

		return students
			.map( ( student ) => ( {
				id: student.id,
				mealTimes: sortMealPlansByMealTime( meals.filter( ( meal ) => meal.studentId === student.id ) ).map( ( meal ) => meal.title ),
				name: student.name,
			} ) )
			.filter( ( student ) => student.mealTimes.length > 0 );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al consultar la base de datos.";

		throw new Error( `No se pudieron consultar los planes para copiar. ${ message }` );
	}
}

// Copia el plan entero de un estudiante a otro. El destino queda igual al
// origen: sus comidas anteriores se borran, en la misma transaccion en la que
// se crean las nuevas, para que nunca quede a medio copiar.
export async function copyMealPlanAction( input: CopyMealPlanInput ) {
	try {
		const session = await requireCoachSession( "copiar el plan alimenticio" );
		const studentId = input.studentId.trim();
		const sourceStudentId = input.sourceStudentId.trim();

		if (!studentId || !sourceStudentId) {
			throw new Error( "Elegí de qué estudiante copiar." );
		}

		if (studentId === sourceStudentId) {
			throw new Error( "No se puede copiar el plan de un estudiante sobre sí mismo." );
		}

		await assertCoachStudent( studentId, session.sub );
		await assertCoachStudent( sourceStudentId, session.sub );

		const sourceMeals = ( await prisma.mealPlan.findMany( {
			select: {
				description: true,
				observations: true,
				order: true,
				studentId: true,
				title: true,
			},
			where: {
				studentId: sourceStudentId,
			},
		} ) ) as unknown as CopySourceMeal[];

		if (sourceMeals.length === 0) {
			throw new Error( "Ese estudiante no tiene comidas cargadas para copiar." );
		}

		await prisma.$transaction( async ( tx ) => {
			await tx.mealPlan.deleteMany( {
				where: {
					studentId,
				},
			} );

			await tx.mealPlan.createMany( {
				data: sortMealPlansByMealTime( sourceMeals ).map( ( meal, index ) => ( {
					description: meal.description,
					observations: meal.observations,
					order: index + 1,
					studentId,
					title: meal.title as never,
				} ) ),
			} );
		} );

		return {
			copiedCount: sourceMeals.length,
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al copiar el plan alimenticio.";

		throw new Error( `No se pudo copiar el plan alimenticio. ${ message }` );
	}
}
