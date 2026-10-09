"use server";

import { runAction } from "@/lib/run-action";
import { requireCoachSession } from "@/features/auth/coach-session";
import prisma from "@/lib/prisma";
import {
	emptyToNull,
	type CreateExerciseInput,
	isBodyPartValue,
	normalizeSearchName,
	type UpdateExerciseInput,
} from "@/features/exercises/services/exercise-form";

function validateExerciseInput( input: CreateExerciseInput ) {
	const name = input.name.trim();

	if (name.length < 2) {
		throw new Error( "El nombre del ejercicio debe tener al menos 2 caracteres." );
	}

	if (!isBodyPartValue( input.bodyPart )) {
		throw new Error( "Seleccioná una parte del cuerpo valida." );
	}

	return {
		active: input.active,
		bodyPart: input.bodyPart,
		name,
		searchName: normalizeSearchName( name ),
		tips: emptyToNull( input.tips ),
	};
}

export async function createExerciseAction( input: CreateExerciseInput ) {
	return runAction( "No se pudo crear el ejercicio.", async () => {
		const session = await requireCoachSession( "crear ejercicios" );

		return await prisma.exerciseCoach.create( {
			data: {
				...validateExerciseInput( input ),
				coachId: session.sub,
			},
		} );
	} );
}

export async function updateExerciseAction( input: UpdateExerciseInput ) {
	return runAction( "No se pudo actualizar el ejercicio.", async () => {
		const session = await requireCoachSession( "actualizar ejercicios" );
		const exercise = await prisma.exerciseCoach.findFirst( {
			select: {
				id: true,
			},
			where: {
				coachId: session.sub,
				id: input.id,
			},
		} );

		if (!exercise) {
			throw new Error( "No se encontró el ejercicio solicitado." );
		}

		return await prisma.exerciseCoach.update( {
			data: validateExerciseInput( input ),
			where: {
				id: exercise.id,
			},
		} );
	} );
}

export async function deactivateExerciseAction( id: string ) {
	return runAction( "No se pudo desactivar el ejercicio.", async () => {
		const session = await requireCoachSession( "desactivar ejercicios" );
		const exercise = await prisma.exerciseCoach.findFirst( {
			select: {
				id: true,
			},
			where: {
				coachId: session.sub,
				id,
			},
		} );

		if (!exercise) {
			throw new Error( "No se encontró el ejercicio solicitado." );
		}

		return await prisma.exerciseCoach.update( {
			data: {
				active: false,
			},
			where: {
				id: exercise.id,
			},
		} );
	} );
}

export async function restoreExerciseAction( id: string ) {
	return runAction( "No se pudo restaurar el ejercicio.", async () => {
		const session = await requireCoachSession( "restaurar ejercicios" );
		const exercise = await prisma.exerciseCoach.findFirst( {
			select: {
				id: true,
			},
			where: {
				coachId: session.sub,
				id,
			},
		} );

		if (!exercise) {
			throw new Error( "No se encontró el ejercicio solicitado." );
		}

		return await prisma.exerciseCoach.update( {
			data: {
				active: true,
			},
			where: {
				id: exercise.id,
			},
		} );
	} );
}
