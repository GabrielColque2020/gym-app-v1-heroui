"use server";

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
	try {
		const session = await requireCoachSession( "crear ejercicios" );

		return await prisma.exercise.create( {
			data: {
				...validateExerciseInput( input ),
				coachId: session.sub,
			},
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al crear el ejercicio.";

		throw new Error( `No se pudo crear el ejercicio. ${ message }` );
	}
}

export async function updateExerciseAction( input: UpdateExerciseInput ) {
	try {
		const session = await requireCoachSession( "actualizar ejercicios" );
		const exercise = await prisma.exercise.findFirst( {
			select: {
				id: true,
			},
			where: {
				coachId: session.sub,
				id: input.id,
			},
		} );

		if (!exercise) {
			throw new Error( "No se encontro el ejercicio solicitado." );
		}

		return await prisma.exercise.update( {
			data: validateExerciseInput( input ),
			where: {
				id: exercise.id,
			},
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al actualizar el ejercicio.";

		throw new Error( `No se pudo actualizar el ejercicio. ${ message }` );
	}
}

export async function deactivateExerciseAction( id: string ) {
	try {
		const session = await requireCoachSession( "desactivar ejercicios" );
		const exercise = await prisma.exercise.findFirst( {
			select: {
				id: true,
			},
			where: {
				coachId: session.sub,
				id,
			},
		} );

		if (!exercise) {
			throw new Error( "No se encontro el ejercicio solicitado." );
		}

		return await prisma.exercise.update( {
			data: {
				active: false,
			},
			where: {
				id: exercise.id,
			},
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al desactivar el ejercicio.";

		throw new Error( `No se pudo desactivar el ejercicio. ${ message }` );
	}
}

export async function restoreExerciseAction( id: string ) {
	try {
		const session = await requireCoachSession( "restaurar ejercicios" );
		const exercise = await prisma.exercise.findFirst( {
			select: {
				id: true,
			},
			where: {
				coachId: session.sub,
				id,
			},
		} );

		if (!exercise) {
			throw new Error( "No se encontro el ejercicio solicitado." );
		}

		return await prisma.exercise.update( {
			data: {
				active: true,
			},
			where: {
				id: exercise.id,
			},
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al restaurar el ejercicio.";

		throw new Error( `No se pudo restaurar el ejercicio. ${ message }` );
	}
}
