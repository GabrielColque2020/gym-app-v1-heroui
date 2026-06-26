"use server";

import { getAuthenticatedSession } from "@/features/auth/session";
import { isMealTimeValue, type MealTimeValue } from "@/features/mealPlans/services/meal-plan-formatters";
import type { CreateMealPlanInput, DeleteMealPlanInput, UpdateMealPlanInput } from "@/features/mealPlans/services/meal-plans-form";
import prisma from "@/lib/prisma";

function assertDescription( description: string ) {
	const trimmedDescription = description.trim();

	if (trimmedDescription.length < 2) {
		throw new Error( "La descripcion debe tener al menos 2 caracteres." );
	}

	return trimmedDescription;
}

function assertStudentId( studentId: string ) {
	const normalizedStudentId = studentId.trim();

	if (!normalizedStudentId) {
		throw new Error( "Debes seleccionar un estudiante." );
	}

	return normalizedStudentId;
}

function assertMealTime( title: string ): MealTimeValue {
	if (!isMealTimeValue( title )) {
		throw new Error( "El tipo de comida seleccionado no es valido." );
	}

	return title as MealTimeValue;
}

async function assertCoachSession() {
	const session = await getAuthenticatedSession();

	if (!session) {
		throw new Error( "Debes iniciar sesion para gestionar planes alimenticios." );
	}

	if (session.role !== "COACH") {
		throw new Error( "No tienes permisos para gestionar planes alimenticios." );
	}

	return session;
}

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
		throw new Error( "No se encontro un estudiante valido para gestionar sus planes alimenticios." );
	}

	return student;
}

async function assertMealPlanForStudent( id: string, studentId: string ) {
	const mealPlan = await prisma.mealPlan.findFirst( {
		where: {
			id,
			studentId,
		},
	} );

	if (!mealPlan) {
		throw new Error( "No se encontro el plan alimenticio seleccionado." );
	}

	return mealPlan;
}

export async function createMealPlanAction( input: CreateMealPlanInput ) {
	try {
		const session = await assertCoachSession();
		const studentId = assertStudentId( input.studentId );
		await assertCoachStudent( studentId, session.sub );

		const title = assertMealTime( input.title );
		const description = assertDescription( input.description );
		const lastMealPlan = await prisma.mealPlan.aggregate( {
			_max: {
				order: true,
			},
			where: {
				studentId,
			},
		} );

		return prisma.mealPlan.create( {
			data: {
				description,
				order: ( lastMealPlan._max.order ?? 0 ) + 1,
				studentId,
				title,
			},
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al crear el plan alimenticio.";

		throw new Error( `No se pudo crear el plan alimenticio. ${ message }` );
	}
}

export async function updateMealPlanAction( input: UpdateMealPlanInput ) {
	try {
		const session = await assertCoachSession();
		const studentId = assertStudentId( input.studentId );
		await assertCoachStudent( studentId, session.sub );
		await assertMealPlanForStudent( input.id, studentId );

		return prisma.mealPlan.update( {
			data: {
				description: assertDescription( input.description ),
				title: assertMealTime( input.title ),
			},
			where: {
				id: input.id,
			},
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al editar el plan alimenticio.";

		throw new Error( `No se pudo editar el plan alimenticio. ${ message }` );
	}
}

export async function deleteMealPlanAction( input: DeleteMealPlanInput ) {
	try {
		const session = await assertCoachSession();
		const studentId = assertStudentId( input.studentId );
		await assertCoachStudent( studentId, session.sub );
		await assertMealPlanForStudent( input.id, studentId );

		return prisma.mealPlan.delete( {
			where: {
				id: input.id,
			},
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al eliminar el plan alimenticio.";

		throw new Error( `No se pudo eliminar el plan alimenticio. ${ message }` );
	}
}
