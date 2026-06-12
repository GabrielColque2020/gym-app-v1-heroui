"use server";

import prisma from "@/lib/prisma";
import {
	emptyToNull,
	type CreateExerciseInput,
	isBodyPartValue,
	normalizeSearchName,
	type UpdateExerciseInput,
} from "@/features/admin/exercises/services/exercise-form";

function validateExerciseInput( input: CreateExerciseInput ) {
	const name = input.name.trim();

	if (name.length < 2) {
		throw new Error( "El nombre del ejercicio debe tener al menos 2 caracteres." );
	}

	if (!isBodyPartValue( input.bodyPart )) {
		throw new Error( "Selecciona una parte del cuerpo valida." );
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
		return await prisma.exercise.create( {
			data: validateExerciseInput( input ),
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al crear el ejercicio.";

		throw new Error( `No se pudo crear el ejercicio. ${ message }` );
	}
}

export async function updateExerciseAction( input: UpdateExerciseInput ) {
	try {
		return await prisma.exercise.update( {
			data: validateExerciseInput( input ),
			where: {
				id: input.id,
			},
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al actualizar el ejercicio.";

		throw new Error( `No se pudo actualizar el ejercicio. ${ message }` );
	}
}

export async function deactivateExerciseAction( id: string ) {
	try {
		return await prisma.exercise.update( {
			data: {
				active: false,
			},
			where: {
				id,
			},
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al desactivar el ejercicio.";

		throw new Error( `No se pudo desactivar el ejercicio. ${ message }` );
	}
}

export async function restoreExerciseAction( id: string ) {
	try {
		return await prisma.exercise.update( {
			data: {
				active: true,
			},
			where: {
				id,
			},
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al restaurar el ejercicio.";

		throw new Error( `No se pudo restaurar el ejercicio. ${ message }` );
	}
}
