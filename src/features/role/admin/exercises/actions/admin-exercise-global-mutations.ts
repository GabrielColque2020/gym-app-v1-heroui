"use server";

import { requireAdminSession } from "@/features/auth/admin-session";
import { buildAdminExerciseGlobalSearchName } from "@/features/role/admin/exercises/services/admin-exercise-global-form";
import prisma from "@/lib/prisma";

type AdminExerciseGlobalMutationInput = {
	active: boolean;
	category: string;
	equipment: string;
	id: string;
	imageUrl: string;
	instructions: string;
	muscleGroup: string;
	name: string;
	target: string;
	videoUrl: string;
};

function normalizeText( value: string ) {
	return value.trim();
}

function normalizeNullableText( value: string ) {
	const trimmedValue = normalizeText( value );

	return trimmedValue.length > 0 ? trimmedValue : null;
}

function validateAdminExerciseGlobalInput( input: AdminExerciseGlobalMutationInput, attribution: string | null ) {
	const name = normalizeText( input.name );
	const category = normalizeText( input.category );
	const target = normalizeText( input.target );
	const muscleGroup = normalizeText( input.muscleGroup );
	const equipment = normalizeText( input.equipment );
	const instructions = normalizeText( input.instructions );

	if (name.length < 2) {
		throw new Error( "El nombre del ejercicio debe tener al menos 2 caracteres." );
	}

	if (category.length < 2) {
		throw new Error( "La categoria del ejercicio debe tener al menos 2 caracteres." );
	}

	if (target.length < 2) {
		throw new Error( "El target del ejercicio debe tener al menos 2 caracteres." );
	}

	if (muscleGroup.length < 2) {
		throw new Error( "El musculo principal debe tener al menos 2 caracteres." );
	}

	if (equipment.length < 2) {
		throw new Error( "El equipamiento debe tener al menos 2 caracteres." );
	}

	return {
		active: input.active,
		attribution,
		category,
		equipment,
		imageUrl: normalizeNullableText( input.imageUrl ),
		instructions: normalizeNullableText( instructions ),
		muscleGroup,
		name,
		searchName: buildAdminExerciseGlobalSearchName( {
			attribution: attribution ?? undefined,
			category,
			equipment,
			instructions,
			muscleGroup,
			name,
			target,
		} ),
		target,
		videoUrl: normalizeNullableText( input.videoUrl ),
	};
}

export async function updateAdminExerciseGlobalAction( input: AdminExerciseGlobalMutationInput ) {
	try {
		await requireAdminSession( "actualizar ejercicios globales" );
		const currentExercise = await prisma.exerciseGlobal.findUnique( {
			select: {
				attribution: true,
			},
			where: {
				id: input.id,
			},
		} );

		const data = validateAdminExerciseGlobalInput( input, currentExercise?.attribution ?? null );

		return await prisma.exerciseGlobal.update( {
			data,
			where: {
				id: input.id,
			},
		} );
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido al actualizar el ejercicio global.";

		throw new Error( `No se pudo actualizar el ejercicio global. ${ message }` );
	}
}
