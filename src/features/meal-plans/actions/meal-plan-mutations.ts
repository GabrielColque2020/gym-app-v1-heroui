"use server";

import { runAction } from "@/lib/run-action";
import { getAuthenticatedSession } from "@/features/auth/session";
import { isMealTimeValue, type MealTimeValue } from "@/features/meal-plans/services/meal-plan-formatters";
import type { CreateMealPlanInput, DeleteMealPlanInput, UpdateMealPlanInput } from "@/features/meal-plans/services/meal-plans-form";
import prisma from "@/lib/prisma";

function assertDescription( description: string ) {
	const trimmedDescription = description.trim();

	if (trimmedDescription.length < 2) {
		throw new Error( "La descripción debe tener al menos 2 caracteres." );
	}

	return trimmedDescription;
}

// La nota es opcional: vacia se guarda como "sin nota".
function normalizeObservations( observations: string | null | undefined ) {
	return observations?.trim() || null;
}

function assertStudentId( studentId: string ) {
	const normalizedStudentId = studentId.trim();

	if (!normalizedStudentId) {
		throw new Error( "Tenés que seleccionar un estudiante." );
	}

	return normalizedStudentId;
}

function assertMealTime( title: string ): MealTimeValue {
	if (!isMealTimeValue( title )) {
		throw new Error( "El tipo de comida seleccionado no es válido." );
	}

	return title as MealTimeValue;
}

async function assertCoachSession() {
	const session = await getAuthenticatedSession();

	if (!session) {
		throw new Error( "Tenés que iniciar sesión para gestionar planes alimenticios." );
	}

	if (session.role !== "COACH") {
		throw new Error( "No tenés permiso para gestionar planes alimenticios." );
	}

	return session;
}

async function assertCoachStudent( studentId: string, coachId: string ) {
	const student = await prisma.user.findFirst( {
		select: {
			id: true,
		},
		// Tambien un estudiante inactivo: el entrenador puede dejarle el plan listo.
		where: {
			coachId,
			id: studentId,
			role: "STUDENT",
		},
	} );

	if (!student) {
		throw new Error( "No se encontró un estudiante válido para gestionar sus planes alimenticios." );
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
		throw new Error( "No se encontró el plan alimenticio seleccionado." );
	}

	return mealPlan;
}

export async function createMealPlanAction( input: CreateMealPlanInput ) {
	return runAction( "No se pudo crear el plan alimenticio.", async () => {
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
				observations: normalizeObservations( input.observations ),
				order: ( lastMealPlan._max.order ?? 0 ) + 1,
				studentId,
				title,
			},
		} );
	} );
}

export async function updateMealPlanAction( input: UpdateMealPlanInput ) {
	return runAction( "No se pudo editar el plan alimenticio.", async () => {
		const session = await assertCoachSession();
		const studentId = assertStudentId( input.studentId );
		await assertCoachStudent( studentId, session.sub );
		await assertMealPlanForStudent( input.id, studentId );

		return prisma.mealPlan.update( {
			data: {
				description: assertDescription( input.description ),
				observations: normalizeObservations( input.observations ),
				title: assertMealTime( input.title ),
			},
			where: {
				id: input.id,
			},
		} );
	} );
}

export async function deleteMealPlanAction( input: DeleteMealPlanInput ) {
	return runAction( "No se pudo eliminar el plan alimenticio.", async () => {
		const session = await assertCoachSession();
		const studentId = assertStudentId( input.studentId );
		await assertCoachStudent( studentId, session.sub );
		await assertMealPlanForStudent( input.id, studentId );

		return prisma.mealPlan.delete( {
			where: {
				id: input.id,
			},
		} );
	} );
}
